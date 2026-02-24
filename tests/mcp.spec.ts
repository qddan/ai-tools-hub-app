import { test, expect } from "@playwright/test";

test.describe("MCP Servers Page", () => {
  test("should load MCP listing page", async ({ page }) => {
    await page.goto("/mcp");
    await expect(page).toHaveTitle(/MCP Servers/);
    await expect(
      page.getByRole("heading", { name: "MCP Servers" }),
    ).toBeVisible();
  });

  test("should display server cards", async ({ page }) => {
    await page.goto("/mcp");
    const cards = page.locator('[href^="/mcp/"]');
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThanOrEqual(11);
  });

  test("should display MCP explanation section", async ({ page }) => {
    await page.goto("/mcp");
    await expect(page.getByText("MCP là gì?")).toBeVisible();
  });

  test("should display deployment types section", async ({ page }) => {
    await page.goto("/mcp");
    await expect(
      page.getByRole("heading", { name: "Deployment Types" }),
    ).toBeVisible();
  });

  test("should display category badges", async ({ page }) => {
    await page.goto("/mcp");
    await expect(page.getByText("Browse by Category")).toBeVisible();
  });
});

test.describe("MCP Server Detail Page", () => {
  test("should load Filesystem MCP detail page", async ({ page }) => {
    await page.goto("/mcp/filesystem-mcp");
    await expect(
      page.getByRole("heading", { name: "Filesystem MCP" }),
    ).toBeVisible();
    await expect(page.locator("text=Local Development").first()).toBeVisible();
  });

  test("should display pros and cons", async ({ page }) => {
    await page.goto("/mcp/filesystem-mcp");
    await expect(page.getByRole("heading", { name: "Ưu điểm" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Nhược điểm" }),
    ).toBeVisible();
  });

  test("should display setup guide", async ({ page }) => {
    await page.goto("/mcp/filesystem-mcp");
    await expect(page.getByText("Hướng dẫn cài đặt")).toBeVisible();
  });

  test("should display best for section", async ({ page }) => {
    await page.goto("/mcp/playwright-mcp");
    await expect(page.getByText("Phù hợp nhất cho")).toBeVisible();
  });

  test("should have back to MCP servers link", async ({ page }) => {
    await page.goto("/mcp/github-mcp");
    await page.getByText("Back to MCP Servers").click();
    await expect(page).toHaveURL(/\/mcp/);
  });

  test("should show not found for non-existent server", async ({ page }) => {
    await page.goto("/mcp/non-existent-server-xyz");
    await expect(
      page.getByRole("heading", { name: /not found/i }),
    ).toBeVisible();
  });
});
