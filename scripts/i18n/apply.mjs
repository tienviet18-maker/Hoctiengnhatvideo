// Gộp sidecar vào mọi gói truyện: node scripts/i18n/apply.mjs <lang> [ids...] [--check] [--rehash]
// Thêm id phía sau để chỉ gộp các gói đó (builder gọi sau khi dựng gói).
// --check : không ghi. LỖI nếu sidecar hỏng, gói chưa gộp, thiếu dòng #@h, hoặc thiếu ô lúc dịch.
//           Ô gốc đổi / ô mới sau khi dịch chỉ CẢNH BÁO (không chặn cổng của luồng khác).
// --rehash: sau khi dịch lại các ô đã đổi, ghi lại dòng #@h theo gói hiện tại.
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { applySidecar, hashLine, sidecarPath } from "./sidecar.mjs";
const root = new URL("../..", import.meta.url).pathname;
const lang = process.argv[2];
const check = process.argv.includes("--check");
const rehash = process.argv.includes("--rehash");
const only = process.argv.slice(3).filter((a) => !a.startsWith("--"));
const dir = join(root, "content/translations", lang);
let bad = 0, done = 0, warn = 0;
for (const f of existsSync(dir) ? readdirSync(dir).filter((x) => x.endsWith(".tsv")).sort() : []) {
  const id = f.replace(/\.tsv$/, "");
  if (only.length && !only.includes(id)) continue;
  const p = join(root, "content/stories", `${id}.json`);
  if (!existsSync(p)) { console.error(`${id}: không có gói`); bad++; continue; }
  const raw = readFileSync(p, "utf8");
  const pack = JSON.parse(raw);
  const sp = sidecarPath(root, lang, id);
  let st = readFileSync(sp, "utf8");
  if (rehash && !check) {
    st = st.replace(/^#@(h|src) [^\n]*\n/gm, "");
    writeFileSync(sp, st);
  }
  const before = JSON.stringify(pack);
  let r;
  try { r = applySidecar(pack, lang, root, { strict: true }); }
  catch (e) { console.error(String(e.message ?? e)); bad++; continue; }
  if (!/^#@h /m.test(st)) {
    if (check) { console.error(`${id}: sidecar ${lang} chưa có dòng #@h (chạy apply.mjs ${lang} ${id})`); bad++; }
    else {
      st = st.replace(/^#@src [^\n]*\n/m, "");
      writeFileSync(sp, st.replace(/^(#[^@][^\n]*\n)?/, (h) => `${h}${hashLine(pack)}\n`));
    }
  }
  if (r.missing) { console.error(`${id}: thiếu ${r.missing} ô ${lang}`); bad++; }
  if (r.stale) { console.warn(`  cảnh báo ${id}: ${r.stale} ô ${lang} cần dịch lại (gốc đổi sau khi dịch) — đang hiện tiếng Anh`); warn++; }
  const changed = JSON.stringify(pack) !== before;
  if (changed && check) { console.error(`${id}: gói chưa gộp sidecar ${lang} (chạy apply.mjs ${lang} ${id})`); bad++; }
  if (changed && !check) {
    const indent = /^\{\n( +)"/.exec(raw)?.[1].length ?? 1;
    writeFileSync(p, JSON.stringify(pack, null, indent) + "\n");
  }
  done++;
}
console.log(`Sidecar ${lang}: ${done} gói, ${bad} lỗi${warn ? `, ${warn} gói cần dịch lại một phần` : ""}.`);
if (bad) process.exit(1);
