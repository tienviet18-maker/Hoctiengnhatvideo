// Dựng bìa (3:4, 900×1200, webp) cho gói của kệ nghe B/C từ trường "cover" trong meta.json.
//   node scripts/audio-shelf/cover.mjs content/sources/rakugo/rakugo-toki-soba [...]
// meta.cover = { ja, jsub?, motif, font, shelf, title }. Bộ truyện nhiều tập dùng chung một bìa (meta.coverId).
import { readFileSync, mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const root = new URL("../..", import.meta.url).pathname;
mkdirSync(join(root, "public/covers"), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 1200 } });
for (const dir of process.argv.slice(2)) {
  const meta = JSON.parse(readFileSync(join(dir, "meta.json"), "utf8"));
  const id = meta.coverId ?? meta.id;
  const webp = join(root, "public/covers", `${id}.webp`);
  if (meta.coverId && existsSync(webp) && !process.argv.includes("--force")) continue;
  const c = meta.cover;
  const d = { id, level: meta.level, ja: c.ja, jsub: c.jsub, motif: c.motif, font: c.font, series: c.shelf, title: c.title };
  await page.goto("file://" + join(root, "scripts/audio-shelf/cover.html") + "?d=" + encodeURIComponent(JSON.stringify(d)));
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
  const png = webp.replace(/\.webp$/, ".png");
  await page.screenshot({ path: png });
  execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-i", png, "-c:v", "libwebp", "-quality", "88", webp]);
  execFileSync("rm", [png]);
  console.log(`✓ bìa ${id}`);
}
await browser.close();
