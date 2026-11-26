// Gộp sidecar vào mọi gói truyện: node scripts/i18n/apply.mjs <lang> [--check]
// Thêm id phía sau để chỉ gộp các gói đó (builder gọi sau khi dựng gói).
// --check: không ghi, báo lỗi nếu gói có sidecar mà còn thiếu ô hoặc gói chưa đồng bộ.
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { applySidecar, fingerprint, sidecarPath } from "./sidecar.mjs";
const root = new URL("../..", import.meta.url).pathname;
const lang = process.argv[2];
const check = process.argv.includes("--check");
const only = process.argv.slice(3).filter((a) => !a.startsWith("--"));
const dir = join(root, "content/translations", lang);
let bad = 0, done = 0;
for (const f of existsSync(dir) ? readdirSync(dir).filter((x) => x.endsWith(".tsv")) : []) {
  const id = f.replace(/\.tsv$/, "");
  if (only.length && !only.includes(id)) continue;
  const p = join(root, "content/stories", `${id}.json`);
  if (!existsSync(p)) { console.error(`${id}: không có gói`); bad++; continue; }
  const raw = readFileSync(p, "utf8");
  const pack = JSON.parse(raw);
  const before = JSON.stringify(pack);
  const missing = applySidecar(pack, lang, root, { strict: true });
  const sp = sidecarPath(root, lang, id);
  const st = readFileSync(sp, "utf8");
  if (!/^#@src /m.test(st)) {
    if (check) { console.error(`${id}: sidecar ${lang} chưa có dòng #@src`); bad++; }
    else writeFileSync(sp, st.replace(/^(#[^\n]*\n)?/, (h) => `${h}#@src ${fingerprint(pack)}\n`));
  }
  if (missing) { console.error(`${id}: thiếu ${missing} ô ${lang}`); bad++; }
  const changed = JSON.stringify(pack) !== before;
  if (changed && check) { console.error(`${id}: gói chưa gộp sidecar ${lang} (chạy apply.mjs ${lang})`); bad++; }
  if (changed && !check) {
    const indent = /^\{\n( +)"/.exec(raw)?.[1].length ?? 1;
    writeFileSync(p, JSON.stringify(pack, null, indent) + "\n");
  }
  done++;
}
console.log(`Sidecar ${lang}: ${done} gói, ${bad} lỗi.`);
if (bad) process.exit(1);
