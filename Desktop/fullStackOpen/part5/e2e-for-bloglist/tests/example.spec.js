// @ts-check
const { test, expect, describe, beforeEach } = require("@playwright/test");

describe("blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        username: "testingUser",
        name: "testname",
        password: "testtest",
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
      // ...
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByTestId("username-input").fill("testingUser");
      await page.getByTestId("password-input").fill("testtest");
    });
  });
});
