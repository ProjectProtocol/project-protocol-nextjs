import { test, expect } from "@playwright/test";

const homeRoute = "/en-US";

test("has title", async ({ page }) => {
  await page.goto(homeRoute);
  await expect(page).toHaveTitle(/Project Protocol/);
});

test("top three links to appropriate pages", async ({ page }) => {
  await page.goto(homeRoute);
  await page.getByRole("link", { name: "Icon for Search resources" }).click();
  await expect(page).toHaveURL(/en-US\/resources/);

  await page.goBack();
  await page.getByRole("link", { name: "Icon for Rate my PO" }).click();
  await expect(page).toHaveURL(/\en-US\/rate-my-po/);

  await page.goBack();
  await page.getByRole("link", { name: "Icon for Register to vote" }).click();
  await expect(page).toHaveURL(/en-US\/content\/vote/);
});

test("locale switcher changes language", async ({ page }) => {
  await page.goto(homeRoute);
  await page.getByRole("link", { name: "Español" }).click();
  await expect(
    page.getByRole("link", { name: "Icon for Registrarse para votar" })
  ).toHaveAttribute("href", /es-MX\/content\/vote/);
});
