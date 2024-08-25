// @ts-check
const { test, expect, describe, beforeEach } = require("@playwright/test");

describe("blog app", () => {
  let token;
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        username: "testingUser",
        name: "testname",
        password: "testtest",
      },
    });

    const response = await request.post("http://localhost:3003/api/login", {
      data: {
        username: "testingUser",
        password: "testtest",
      },
    });
    const responseBody = await response.json();
    await page.waitForTimeout(500);
    token = responseBody.token;

    await request.post("http://localhost:3003/api/blogs", {
      data: {
        title: "testing title",
        author: "testingUser",
        url: "www.test.com",
        likes: 0,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByTestId("login-form")).toBeVisible();
  });

  describe("Login tests ", () => {
    test("Fails with incorrect credentials", async ({ page }) => {
      await page.getByTestId("username-input").fill("testingUser");
      await page.getByTestId("password-input").fill("wrongPassword");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText(/Wrong credentials/i)).toBeVisible();
    });

    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByTestId("username-input").fill("testingUser");
      await page.getByTestId("password-input").fill("testtest");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText(/Successful/i)).toBeVisible();
    });
  });
  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId("username-input").fill("testingUser");
      await page.getByTestId("password-input").fill("testtest");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("a new blog can be created", async ({ page, request }) => {
      await page.getByRole("button", { name: "new blog" }).click();

      await page.getByTestId("title-input").fill("testing blog");
      await page.getByTestId("author-input").fill("tester");

      await page.getByTestId("url-input").fill("www.test.com");
      await page.getByTestId("submit-btn").click();

      await expect(page.getByText("testing blog")).toBeVisible();
      await expect(page.getByText("tester")).toBeVisible();
    });

    test("blog can be liked", async ({ page }) => {
      // to be continued
      await page.getByRole("button", { name: "view" }).first().click();
      let likesContentBefore = await page
        .getByTestId("testing-likes")
        .first()
        .innerText();

      const likesBefore = parseInt(likesContentBefore.replace(/\D/g, ""));

      await page.getByRole("button", { name: "like" }).click();
      await page.waitForTimeout(500);

      const likesContentAfter = await page
        .getByTestId("testing-likes")
        .first()
        .innerText();

      const likesAfter = parseInt(likesContentAfter.replace(/\D/g, ""));
      console.log("likes before", likesBefore);
      console.log("likes after", likesAfter);
      expect(likesAfter).toBe(likesBefore + 1);
    });

    test("user that added blog can delete a blog", async ({ page }) => {
      await expect(page.getByText("testing title")).toBeVisible();
      await expect(page.getByText("testingUser")).toBeVisible();

      await page.getByRole("button", { name: "view" }).first().click();

      page.on("dialog", (dialog) => dialog.accept());
      await page.getByRole("button", { name: "remove blog" }).click();

      await expect(page.getByText("testing title")).not.toBeVisible();
      await expect(page.getByText("testingUser")).not.toBeVisible();
    });

    test("only logged in user can see the delete button", async ({ page }) => {
      await page.getByRole("button", { name: "view" }).first().click();
      expect(page.getByRole("button", { name: "remove blog" })).toBeVisible();
      await page.getByRole("button", { name: "log out" }).click();
      expect(
        page.getByRole("button", { name: "remove blog" })
      ).not.toBeVisible();
    });
  });
  describe("order of likes", () => {
    beforeEach(async ({ page, request }) => {
      await request.post("http://localhost:3003/api/blogs", {
        data: {
          title: "mostLikesBlog",
          author: "testingUser",
          url: "www.testThatHasMostLikes.com",
          likes: 999,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await page.goto("http://localhost:5173");
    });
    test("blogs are arranged in order of likes", async ({ page }) => {
      await page.getByRole("button", { name: "view" }).first().click();
      await page.getByRole("button", { name: "view" }).last().click();
      await expect(page.getByTestId("testing-likes").first()).toContainText(
        "likes: 999"
      );
    });
  });
});
