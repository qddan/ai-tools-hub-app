import { test, expect } from "@playwright/test";

test.describe("Tools Page", () => {
  test("should load tools listing page", async ({ page }) => {
    await page.goto("/tools");
    await expect(page).toHaveTitle(/Browse AI Tools/);
    await expect(page.getByText("tools found")).toBeVisible();
  });

  test("should display tool cards", async ({ page }) => {
    await page.goto("/tools");
    const cards = page.locator('[href^="/tools/"]');
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test("should have search functionality", async ({ page }) => {
    await page.goto("/tools");
    const searchInput = page.getByPlaceholder(/Search tools/i);
    await expect(searchInput).toBeVisible();
    await searchInput.fill("ChatGPT");
    await searchInput.press("Enter");
    await expect(page).toHaveURL(/search=ChatGPT/);
  });

  test("should have sort and category options", async ({ page }) => {
    await page.goto("/tools");
    await expect(page.getByRole("button", { name: "Popular" })).toBeVisible();
    await expect(
      page.getByRole("button", { name: "All Categories" }),
    ).toBeVisible();
  });
});

test.describe("Tool Detail Page", () => {
  test("should load ChatGPT detail page", async ({ page }) => {
    await page.goto("/tools/chatgpt");
    await expect(page.getByRole("heading", { name: "ChatGPT" })).toBeVisible();
    await expect(page.getByText("by OpenAI")).toBeVisible();
  });

  test("should display features and use cases tabs", async ({ page }) => {
    await page.goto("/tools/chatgpt");
    await expect(page.getByRole("tab", { name: "Features" })).toBeVisible();
    await expect(page.getByRole("tab", { name: "Use Cases" })).toBeVisible();
  });

  test("should have back to tools link", async ({ page }) => {
    await page.goto("/tools/chatgpt");
    await page.getByText("Back to Tools").click();
    await expect(page).toHaveURL(/\/tools/);
  });

  test("should have visit website button", async ({ page }) => {
    await page.goto("/tools/chatgpt");
    await expect(page.getByText("Visit Website")).toBeVisible();
  });

  test("should show not found page for non-existent tool", async ({ page }) => {
    await page.goto("/tools/non-existent-tool-xyz");
    await expect(
      page.getByRole("heading", { name: /not found/i }),
    ).toBeVisible();
  });
});
