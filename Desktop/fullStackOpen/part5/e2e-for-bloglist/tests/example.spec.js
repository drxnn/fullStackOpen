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
    token = responseBody.token;

    await request.post("http://localhost:3003/api/blogs", {
      data: {
        title: "testing titile",
        author: "testingUser",
        url: "www.test.com",
        likes: 2,
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
    beforeEach(async ({ page, request }) => {
      // await request.post("http://localhost:3003/api/testing/reset");
      await page.getByTestId("username-input").fill("testingUser");
      await page.getByTestId("password-input").fill("testtest");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("a new blog can be created", async ({ page, request }) => {
      await page.getByRole("button", { name: "new blog" }).click();
      await page.getByTestId("title-input").fill("testing blog");
      await page.getByTestId("author-input").fill("tester");

      await page.getByTestId("url-input").fill("www.test.com");
      await page.getByRole("button", { name: "create new blog" }).click();

      await expect(page.getByText("testing blog")).toBeVisible();
      await expect(page.getByText("tester")).toBeVisible();
      // commented out because the application works in a way that it doesn't immediately show the url unless you click to view more details// will add later
      // await expect(page.getByText("www.test.com")).toBeVisible();
    });

    test("blog can be liked", async ({ page, request }) => {
      // to be continued
      await page.getByRole("button", { name: "view" }).first().click();
      let likesContent = await page
        .getByTestId("testing-likes")
        .first()
        .allInnerTexts();
      const numberToCheck = likesContent[0];
      numberToCheck.slice(0, 7);
      console.log(numberToCheck);
    });
  });
});
