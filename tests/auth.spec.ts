import { test, expect } from "@playwright/test";

const USER_EMAIL = "e2e-test-user@user.com";
const USER_PW = "P@ssword";

test("allows user to log in and return to original page", async ({ page }) => {
  // Go to Voting rights article before accessing log in screen
  const originalPath = "/en-US/content/vote";
  await page.goto(originalPath);
  await page.getByRole("link", { name: "Sign up" }).click();
  await page.getByRole("link", { name: "Log in" }).click();

  await page.locator("input#login-email").fill(USER_EMAIL);
  await page.locator("input#login-password").fill(USER_PW);

  await page.locator("button[type='submit']").click();

  await expect(page.getByText("Sign in successful!")).toBeVisible();

  // Check that user is redirected to voting article after login
  await expect(page).toHaveURL(originalPath);
});

// Test forgot password and redirect to original page
test("user is redirected to original page after password reset", async ({
  page,
}) => {
  const originalPath = "/en-US/content/contact-us";
  await page.goto(originalPath);
  await page.getByRole("link", { name: "Sign up" }).click();
  await page.getByRole("link", { name: "Log in" }).click();
  await page.getByRole("link", { name: "Log in" }).click();
  await page.getByRole("link", { name: "Forgot password?" }).click();

  await page.locator("input#Email-address").fill("bogus-e2e@username.com");
  await page.locator("button[type='submit']").click();
  await expect(page).toHaveURL(originalPath);
});

// Test
