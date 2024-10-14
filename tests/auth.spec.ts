import { test, expect } from "@playwright/test";
import { randomUUID } from "crypto";

const USER_EMAIL = "e2e-test-user@user.com";
const USER_PW = "P@ssword";
test("allows user to log in and return to original page", async ({ page }) => {
  // Go to Voting rights article before accessing log in screen
  await page.goto("/content/en-US/vote");
  await page.getByRole("link", { name: "Sign up" }).click();
  await page.getByRole("link", { name: "Log in" }).click();

  await page.locator("input#login-email").fill(USER_EMAIL);
  await page.locator("input#login-password").fill(USER_PW);

  await page.locator("button[type='submit']").click();

  await expect(page.getByText("Sign in successful!")).toBeVisible();

  // Check that user is redirected to voting article after login
  await expect(page).toHaveURL("/content/en-US/vote");
});

// Test forgot password and redirect to original page
test("user is redirected to original page after password reset", async ({
  page,
}) => {
  const originalPath = "/content/en-US/contact-us";
  await page.goto(originalPath);
  await page.getByRole("link", { name: "Sign up" }).click();
  await page.getByRole("link", { name: "Log in" }).click();
  await page.getByRole("link", { name: "Log in" }).click();
  await page.getByRole("link", { name: "Forgot password?" }).click();

  await page.locator("input#Email-address").fill("bogus-e2e@username.com");
  await page.locator("button[type='submit']").click();
  await expect(page).toHaveURL(originalPath);
});

// Test Registration and redirect to original page
/**
 * 1. Sign up user - maybe special name to prevent emails, and hardcode confirmation token
 * 2. Assert confirmation page
 * 3. Assert flash messages
 * 4. Assert redirect to original page
 * 5. Access account page
 * 6. Assert ability to delete account
 * 7. Assert redirect to original page
 * 8. Assert flash messages
 */
test("account creation and deletion", async ({ page }) => {
  const { email, password } = generateRandomEmailAndPassword();
  const originalPath = "/rate-my-po";
  await page.goto(originalPath);
  await page.getByRole("link", { name: "Sign up" }).click();
  await page.locator("input#signup-email").fill(email);
  await page.locator("input#signup-password").fill(password);
  await page.locator("button[type='submit']").click();

  await expect(page).toHaveURL("/auth/confirmations");
  await page.getByRole("link", { name: "OK" }).click();

  await expect(page).toHaveURL(originalPath);

  await page.getByTitle("Account").locator("visible=true").click();
  await expect(page).toHaveURL("/account");

  await page.getByRole("button", { name: "Delete" }).click();
  await page.locator("input#Password").fill(password);
  await page.locator("button[type='submit']").click();

  await expect(page).toHaveURL(originalPath);
  await expect(page.getByText("Account successfully deleted")).toBeVisible();

  // Check that the navbar refreshed to logged out state
  await expect(page.locator('a[title="Account"]')).not.toBeVisible();
});

function generateRandomEmailAndPassword() {
  return {
    email: `e2e-delete-me-${randomUUID()}@user.com`,
    password: randomUUID(),
  };
}
