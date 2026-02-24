import { chromium } from "playwright";
import * as path from "path";

async function takeScreenshots() {
  const browser = await chromium.launch();
  const dir = path.join(__dirname, "../public/screenshots");

  const pages = [
    { name: "homepage", url: "http://localhost:3000/", width: 1280 },
    { name: "homepage-mobile", url: "http://localhost:3000/", width: 390 },
    { name: "tools", url: "http://localhost:3000/tools", width: 1280 },
    { name: "tool-detail", url: "http://localhost:3000/tools/chatgpt", width: 1280 },
    { name: "mcp-servers", url: "http://localhost:3000/mcp", width: 1280 },
    { name: "mcp-detail", url: "http://localhost:3000/mcp/filesystem-mcp", width: 1280 },
    { name: "categories", url: "http://localhost:3000/categories", width: 1280 },
  ];

  for (const p of pages) {
    const context = await browser.newContext({
      viewport: { width: p.width, height: 900 },
    });
    const page = await context.newPage();
    await page.goto(p.url, { waitUntil: "networkidle" });
    await page.screenshot({
      path: path.join(dir, `${p.name}.png`),
      fullPage: false,
    });
    console.log(`✅ ${p.name}.png`);
    await context.close();
  }

  // Dark mode screenshot
  const darkCtx = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    colorScheme: "dark",
  });
  const darkPage = await darkCtx.newPage();
  await darkPage.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await darkPage.screenshot({
    path: path.join(dir, "homepage-dark.png"),
    fullPage: false,
  });
  console.log("✅ homepage-dark.png");
  await darkCtx.close();

  await browser.close();
  console.log("\nAll screenshots saved to public/screenshots/");
}

takeScreenshots().catch(console.error);
