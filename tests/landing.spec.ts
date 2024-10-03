import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Project Protocol/);
});

test("top three links to appropriate pages", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Icon for Search resources" }).click();
  await expect(page).toHaveURL(/resources/);

  await page.goBack();
  await page.getByRole("link", { name: "Icon for Rate my PO" }).click();
  await expect(page).toHaveURL(/rate-my-po/);

  await page.goBack();
  await page.getByRole("link", { name: "Icon for Register to vote" }).click();
  await expect(page).toHaveURL(/content\/en-US\/vote/);
});

test("locale switcher changes language", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Español" }).click();
  await expect(
    page.getByRole("link", { name: "Icon for Registrarse para votar" })
  ).toHaveAttribute("href", /content\/es-MX\/vote/);
});
