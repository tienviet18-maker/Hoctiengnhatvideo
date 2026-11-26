// In các ô cần dịch của gói để dịch: node scripts/i18n/extract.mjs <lang> <id>...
// Chỉ in ô chưa có trong sidecar. Dạng: KHOÁ | ja | en
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { slots, parseSidecar, sidecarPath, globalVocab } from "./sidecar.mjs";
const root = new URL("../..", import.meta.url).pathname;
const [lang, ...ids] = process.argv.slice(2);
for (const id of ids) {
  const pack = JSON.parse(readFileSync(join(root, "content/stories", `${id}.json`), "utf8"));
  const p = sidecarPath(root, lang, id);
  const have = existsSync(p) ? parseSidecar(readFileSync(p, "utf8")) : { m: new Map(), vocab: new Map() };
  console.log(`### ${id} (${pack.level})`);
  const seenV = new Set();
  for (const s of slots(pack)) {
    if (s.key === "V") {
      if (seenV.has(s.en) || have.vocab.has(s.en) || globalVocab(root, lang).has(s.en)) continue;
      seenV.add(s.en);
      console.log(`V\t${s.en}\t[${s.ja}]`);
    } else if (!have.m.has(s.key)) console.log(`${s.key}\t${s.key[0] === "G" || !s.ja ? "" : s.ja + " ‖ "}${s.en}`);
  }
}
