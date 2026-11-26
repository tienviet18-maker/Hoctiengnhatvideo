// Dựng bộ thẻ soạn sẵn cho tab Ôn tập từ kho thẻ ViBJT (repo tienviet18-maker/BJT).
//
//   BJT_DIR=../bjt node scripts/decks/build-decks.mjs
//
// Nguồn:
// - Thẻ gốc (ja, cách đọc, nghĩa vi/en, câu ví dụ vi/en, mã audio): $BJT_DIR/content/bjt_content/cards/*.json
// - Bản dịch 9 ngôn ngữ còn lại: content/sources/decks/tr/*.jsonl, mỗi dòng
//   {"id": "<id thẻ BJT>", "m": {<lang>: nghĩa}, "ex": {<lang>: dịch câu ví dụ}, "vi"?: sửa nghĩa vi, "en"?: sửa nghĩa en}
// Thẻ chỉ được đưa vào khi nghĩa và câu ví dụ đủ 11 ngôn ngữ, nên bộ thẻ lớn dần theo bản dịch.
//
// Đầu ra (commit cùng repo, verify không cần repo BJT):
// - public/decks/<deck>.json     thẻ của từng bộ (tải khi người dùng mở bộ, không nằm trong bundle)
// - public/decks/extras.json     câu ví dụ + giọng đọc cho từ đã có trong truyện/video (tra theo chữ viết)
// - public/audio/bjt/<id>.mp3    giọng đọc từ và câu ví dụ (chỉ file của thẻ đã đưa vào)
// - src/lib/decks.generated.ts   danh sách bộ và số thẻ
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { vocabLevel } from "../lib/level.mjs";

const root = new URL("../..", import.meta.url).pathname;
const BJT = resolve(process.env.BJT_DIR ?? join(root, "../bjt"));
const LANGS = ["vi", "en", "zh-Hans", "zh-Hant", "ko", "tl", "ne", "id", "pt", "my", "th"];
// Cấp BJT → nhãn N gần đúng (chỉ dùng cho kính ngữ và ngữ pháp; từ vựng tra danh sách JLPT thật)
const J2N = { J5: "N4", J4: "N3", J3: "N3", J2: "N2", J1: "N1", "J1+": "N1" };

const load = (n) => JSON.parse(readFileSync(join(BJT, "content/bjt_content/cards", `${n}.json`), "utf8")).cards;
const vocab = load("vocab");
const keigo = load("keigo");
const grammar = load("grammar");

// Bản dịch
const tr = new Map();
const trDir = join(root, "content/sources/decks/tr");
for (const f of existsSync(trDir) ? readdirSync(trDir).filter((x) => x.endsWith(".jsonl")).sort() : []) {
  readFileSync(join(trDir, f), "utf8").split("\n").forEach((line, i) => {
    if (!line.trim()) return;
    try {
      const o = JSON.parse(line);
      tr.set(o.id, { ...(tr.get(o.id) ?? {}), ...o });
    } catch (e) {
      throw new Error(`${f}:${i + 1}: ${e.message}`);
    }
  });
}

// Nghĩa 11 ngôn ngữ sẵn có trong truyện/video (dùng lại cho từ trùng)
const known = new Map();
for (const dir of ["content/stories", "content/videos"]) {
  for (const f of readdirSync(join(root, dir)).filter((x) => x.endsWith(".json"))) {
    const d = JSON.parse(readFileSync(join(root, dir, f), "utf8"));
    for (const s of d.sentences ?? d.lines ?? []) {
      for (const v of s.vocab ?? []) {
        const full = LANGS.every((l) => v.meanings?.[l]?.trim());
        if (!known.has(v.word) || (full && !known.get(v.word).full)) known.set(v.word, { reading: v.reading, meanings: v.meanings, full });
      }
    }
  }
}

const full = (t) => !!t && LANGS.every((l) => typeof t[l] === "string" && t[l].trim());
const missing = { meaning: 0, example: 0 };

/** Ghép thẻ BJT với bản dịch; trả null khi chưa đủ 11 ngôn ngữ. */
function card(c, kind, lv) {
  const t = tr.get(c.id) ?? {};
  const k = kind === "vocab" ? known.get(c.ja) : undefined;
  const m = k?.full && k.reading === c.reading ? k.meanings : { vi: t.vi ?? c.vi, en: t.en ?? c.en, ...(t.m ?? {}) };
  const ex = { vi: c.example.vi, en: c.example.en, ...(t.ex ?? {}) };
  if (!full(m)) missing.meaning++;
  if (!full(ex)) missing.example++;
  if (!full(m) || !full(ex)) return null;
  const out = { id: c.id, kind, w: c.ja, r: c.reading ?? "", lv, m: pick(m), ex: { ja: c.example.ja, t: pick(ex) } };
  if (c.audio?.word) out.aw = c.audio.word;
  if (c.audio?.example) out.ae = c.audio.example;
  if (c.keigoMap) out.km = c.keigoMap;
  if (c.form) out.form = c.form;
  return out;
}
const pick = (t) => Object.fromEntries(LANGS.map((l) => [l, t[l].trim()]));

const decks = [];
const files = {};
const audio = new Set();
const add = (id, cards) => {
  files[id] = cards;
  for (const c of cards) {
    if (c.aw) audio.add(c.aw);
    if (c.ae) audio.add(c.ae);
  }
};

// Tiếng Nhật công sở: chỉ từ có trong danh sách JLPT, chia theo cấp N
const office = {};
for (const c of vocab) {
  const l = vocabLevel(c.ja, c.reading);
  if (!l) continue;
  const lv = `N${l}`;
  const x = card(c, "vocab", lv);
  if (x) (office[lv] ??= []).push(x);
}
for (const lv of ["N5", "N4", "N3", "N2", "N1"]) {
  const cards = office[lv] ?? [];
  if (!cards.length) continue;
  add(`office-${lv}`, cards);
  decks.push({ id: `office-${lv}`, group: "office", level: lv, count: cards.length });
}

// Kính ngữ
const kg = keigo.map((c) => card(c, "keigo", J2N[c.level] ?? "N3")).filter(Boolean);
if (kg.length) {
  add("keigo", kg);
  decks.push({ id: "keigo", group: "keigo", level: null, count: kg.length });
}

// Ngữ pháp N3–N1 (cấp BJT J3 trở lên)
const gram = {};
for (const c of grammar) {
  if (!["J3", "J2", "J1", "J1+"].includes(c.level)) continue;
  const lv = J2N[c.level];
  const x = card(c, "grammar", lv);
  if (x) (gram[lv] ??= []).push(x);
}
for (const lv of ["N3", "N2", "N1"]) {
  const cards = gram[lv] ?? [];
  if (!cards.length) continue;
  add(`grammar-${lv}`, cards);
  decks.push({ id: `grammar-${lv}`, group: "grammar", level: lv, count: cards.length });
}

// Câu ví dụ + giọng đọc cho từ đã có trong truyện/video
const extras = {};
for (const c of vocab) {
  if (!known.has(c.ja) || extras[c.ja]) continue;
  const t = tr.get(c.id) ?? {};
  const ex = { vi: c.example.vi, en: c.example.en, ...(t.ex ?? {}) };
  if (!full(ex)) continue;
  extras[c.ja] = { r: c.reading, ex: { ja: c.example.ja, t: pick(ex) }, ...(c.audio?.word ? { aw: c.audio.word } : {}), ...(c.audio?.example ? { ae: c.audio.example } : {}) };
  if (c.audio?.word) audio.add(c.audio.word);
  if (c.audio?.example) audio.add(c.audio.example);
}

// Ghi file
const outDir = join(root, "public/decks");
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });
for (const [id, cards] of Object.entries(files)) writeFileSync(join(outDir, `${id}.json`), JSON.stringify(cards));
writeFileSync(join(outDir, "extras.json"), JSON.stringify(extras));

const audDir = join(root, "public/audio/bjt");
rmSync(audDir, { recursive: true, force: true });
mkdirSync(audDir, { recursive: true });
let lost = 0;
for (const id of audio) {
  const src = join(BJT, "audio/mp3", `${id}.mp3`);
  if (existsSync(src)) copyFileSync(src, join(audDir, `${id}.mp3`));
  else lost++;
}

writeFileSync(
  join(root, "src/lib/decks.generated.ts"),
  `// Sinh tự động bởi scripts/decks/build-decks.mjs — đừng sửa tay.
import type { JlptLevel } from "./content-schema";

export type DeckGroup = "office" | "keigo" | "grammar";
export interface DeckInfo {
  id: string;
  group: DeckGroup;
  level: JlptLevel | null;
  count: number;
}

export const DECKS: DeckInfo[] = ${JSON.stringify(decks, null, 1)};
`,
);

const total = decks.reduce((n, d) => n + d.count, 0);
console.log(`✓ ${decks.length} bộ, ${total} thẻ; ${Object.keys(extras).length} từ có thêm ví dụ; ${audio.size} file audio${lost ? `, THIẾU ${lost}` : ""}`);
console.log(`  chưa đủ 11 ngôn ngữ: nghĩa ${missing.meaning}, câu ví dụ ${missing.example}`);
