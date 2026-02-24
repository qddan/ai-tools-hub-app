import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test("should load and display main content", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/AI Tools Hub/);
    await expect(page.locator("h1").first()).toBeVisible();
  });

  test("should display navigation links", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("header nav");
    await expect(nav.getByRole("link", { name: "Browse Tools" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Categories" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "MCP Servers" })).toBeVisible();
  });

  test("should display featured tools section", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: /Featured/i }),
    ).toBeVisible();
  });

  test("should navigate to tools page from nav", async ({ page }) => {
    await page.goto("/");
    await page
      .locator("header nav")
      .getByRole("link", { name: "Browse Tools" })
      .click();
    await expect(page).toHaveURL(/\/tools/);
  });
});
