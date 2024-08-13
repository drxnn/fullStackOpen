// @ts-check
const { test, expect, describe, beforeEach } = require("@playwright/test");

describe("blog app", () => {
  beforeEach(async ({ page, request }) => {
    // await request.post("http://localhost:3003/api/reset");
    // await request.post("http://localhost:3003/api/users", {
    //   username: "Enzo",
    //   password: "enzoenzo",
    // });
    await page.goto("http://localhost:5174");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByTestId("login-form")).toBeVisible();
  });

  describe("Login tests ", () => {
    test("Fails with incorrect credentials", async ({ page }) => {
      await page.getByTestId("username-input").fill("Enzo");
      await page.getByTestId("password-input").fill("wrongpassword");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText(/Wrong credentials/i)).toBeVisible();
    });

    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByTestId("username-input").fill("Enzo");
      await page.getByTestId("password-input").fill("enzoenzo");
      await page.getByRole("button", { name: "login" }).click();
      await expect(page.getByText(/Successful/i)).toBeVisible();
    });
  });
});
