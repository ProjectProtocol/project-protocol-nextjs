import { test, expect } from "@playwright/test";

const USER_EMAIL = "e2e-test-user@user.com";
const USER_PW = "P@ssword";

test("allows user to log in and return to original page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Icon for Register to vote" }).click();
  await page.getByRole("link", { name: "Sign up" }).click();

  await page.getByRole("link", { name: "Log in" }).click();

  await page.locator("input#login-email").fill(USER_EMAIL);
  await page.locator("input#login-password").fill(USER_PW);

  await page.locator("button[type='submit']").click();

  await expect(page.getByText("Sign in successful!")).toBeVisible();

  await expect(page).toHaveURL("/content/en-US/vote");
});
