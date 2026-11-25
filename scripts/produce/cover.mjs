// Dựng bìa chuẩn v2 (3:4, 900×1200, webp) bằng scripts/produce/cover.html + Playwright.
//   node scripts/produce/cover.mjs <chương.ja.txt> [...]
// Dữ liệu bìa lấy từ front matter: cover_ja, cover_jsub, cover_motif, cover_font, cover_shelf, cover_title.
// Chạy lại lệnh này là thay được toàn bộ bìa khi đổi mẫu.
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { parseSource } from "./build-story.mjs";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = new URL("../..", import.meta.url).pathname;
mkdirSync(join(root, "public/covers"), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 1200 } });
for (const file of process.argv.slice(2)) {
  const { meta } = parseSource(file);
  const d = {
    id: meta.id, level: meta.level, ja: meta.cover_ja, jsub: meta.cover_jsub, motif: meta.cover_motif ?? "sun",
    font: meta.cover_font, series: meta.cover_shelf, title: meta.cover_title,
  };
  await page.goto("file://" + join(root, "scripts/produce/cover.html") + "?d=" + encodeURIComponent(JSON.stringify(d)));
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  const png = join(root, "public/covers", `${meta.id}.png`);
  await page.screenshot({ path: png });
  const webp = join(root, "public/covers", `${meta.id}.webp`);
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", png, "-c:v", "libwebp", "-quality", "88", webp]);
  execFileSync("rm", [png]);
  console.log(`✓ bìa ${meta.id}`);
}
await browser.close();
