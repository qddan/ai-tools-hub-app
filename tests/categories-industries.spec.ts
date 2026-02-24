import { test, expect } from "@playwright/test";

test.describe("Categories Page", () => {
  test("should load categories listing", async ({ page }) => {
    await page.goto("/categories");
    await expect(page).toHaveTitle(/Categories/);
  });

  test("should display category cards with tool counts", async ({ page }) => {
    await page.goto("/categories");
    const links = page.locator('[href^="/categories/"]');
    expect(await links.count()).toBeGreaterThan(0);
  });

  test("should navigate to category detail", async ({ page }) => {
    await page.goto("/categories");
    await page.locator('[href^="/categories/"]').first().click();
    await expect(page).toHaveURL(/\/categories\//);
  });
});

test.describe("Industries Page", () => {
  test("should load industries listing", async ({ page }) => {
    await page.goto("/industries");
    await expect(page).toHaveTitle(/Industry/);
  });

  test("should display industry cards with tool counts", async ({ page }) => {
    await page.goto("/industries");
    const links = page.locator('[href^="/industries/"]');
    expect(await links.count()).toBeGreaterThan(0);
  });
});

test.describe("Navigation", () => {
  test("should navigate between all main sections via header", async ({
    page,
  }) => {
    await page.goto("/");
    const nav = page.locator("header nav");

    await nav.getByRole("link", { name: "Browse Tools" }).click();
    await expect(page).toHaveURL(/\/tools/);

    await nav.getByRole("link", { name: "Categories" }).click();
    await expect(page).toHaveURL(/\/categories/);

    await nav.getByRole("link", { name: "MCP Servers" }).click();
    await expect(page).toHaveURL(/\/mcp/);
  });

  test("should show not found page for invalid routes", async ({ page }) => {
    await page.goto("/this-page-does-not-exist");
    await expect(page.getByText(/not found/i)).toBeVisible();
  });
});
