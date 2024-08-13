// @ts-check
const { test, expect, describe, beforeEach } = require("@playwright/test");

describe("blog app", () => {
  beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5174");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByTestId("login-form")).toBeVisible();
  });
});
