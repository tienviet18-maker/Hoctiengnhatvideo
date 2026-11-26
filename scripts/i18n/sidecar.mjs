// Bản dịch bổ sung theo ngôn ngữ cho gói truyện (sidecar), ví dụ tiếng Sinhala.
// File: content/translations/<lang>/<id>.tsv, mỗi dòng "KHOÁ<TAB>bản dịch":
//   TITLE            tên truyện
//   T<n> / G<n>      câu n: bản dịch / giải thích ngữ pháp (n đếm từ 0)
//   V<TAB><en><TAB>  nghĩa từ vựng, khoá bằng nghĩa tiếng Anh (dùng chung trong gói)
//   P<n> / Q<n>      bài học: ý nghĩa mẫu ngữ pháp n / giải thích câu đố n
// Dòng bắt đầu bằng # là chú thích. Builder gọi applySidecar sau khi dựng gói để không mất bản dịch.
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";

/** Dấu vân tay nội dung gốc (ja + en) để phát hiện gói bị dựng lại khác đi sau khi đã dịch. */
export function fingerprint(pack) {
  return createHash("sha1").update(slots(pack).map((s) => `${s.key}\u0001${s.en}`).join("\u0002")).digest("hex").slice(0, 12);
}

export function parseSidecar(text) {
  const m = new Map();
  const vocab = new Map();
  for (const raw of text.split("\n")) {
    const line = raw.replace(/\r$/, "");
    if (!line.trim() || line.startsWith("#")) continue;
    const parts = line.split("\t");
    if (parts[0] === "V") {
      if (parts.length !== 3 || !parts[2].trim()) throw new Error(`dòng V hỏng: ${line}`);
      vocab.set(parts[1], parts[2].trim());
    } else {
      if (parts.length !== 2 || !parts[1].trim()) throw new Error(`dòng hỏng: ${line}`);
      if (m.has(parts[0])) throw new Error(`khoá trùng: ${parts[0]}`);
      m.set(parts[0], parts[1].trim());
    }
  }
  return { m, vocab };
}

/** Các ô cần dịch của một gói: [{key, ja, en, obj}] (vocab gộp theo nghĩa en). */
export function slots(pack) {
  const out = [];
  if (pack.titles?.en) out.push({ key: "TITLE", ja: pack.titles.ja ?? "", en: pack.titles.en, obj: pack.titles });
  pack.sentences.forEach((s, i) => {
    if (s.translations?.en) out.push({ key: `T${i}`, ja: s.ja, en: s.translations.en, obj: s.translations });
    if (s.grammarNote?.en) out.push({ key: `G${i}`, ja: s.ja, en: s.grammarNote.en, obj: s.grammarNote });
    for (const v of s.vocab ?? []) if (v.meanings?.en) out.push({ key: "V", ja: v.word, en: v.meanings.en, obj: v.meanings });
  });
  (pack.lesson?.grammarPoints ?? []).forEach((g, i) => {
    if (g.meaning?.en) out.push({ key: `P${i}`, ja: g.pattern, en: g.meaning.en, obj: g.meaning });
  });
  (pack.lesson?.quiz ?? []).forEach((q, i) => {
    if (q.explain?.en) out.push({ key: `Q${i}`, ja: q.ja, en: q.explain.en, obj: q.explain });
  });
  return out;
}

const globalCache = new Map();
/** Nghĩa từ vựng gom từ mọi sidecar cùng ngôn ngữ: một nghĩa en chỉ cần dịch một lần cho cả kho. */
export function globalVocab(root, lang) {
  if (globalCache.has(lang)) return globalCache.get(lang);
  const dir = join(root, "content/translations", lang);
  const g = new Map();
  for (const f of existsSync(dir) ? readdirSync(dir).filter((x) => x.endsWith(".tsv")).sort() : []) {
    for (const [k, v] of parseSidecar(readFileSync(join(dir, f), "utf8")).vocab) if (!g.has(k)) g.set(k, v);
  }
  globalCache.set(lang, g);
  return g;
}

export function sidecarPath(root, lang, id) {
  return join(root, "content/translations", lang, `${id}.tsv`);
}

/** Ghi bản dịch sidecar vào gói. Trả về số ô còn thiếu (0 = đủ). Ném lỗi nếu có khoá thừa. */
export function applySidecar(pack, lang, root, { strict = false } = {}) {
  const p = sidecarPath(root, lang, pack.id);
  if (!existsSync(p)) return null;
  const text = readFileSync(p, "utf8");
  const fp = /^#@src (\w+)/m.exec(text)?.[1];
  if (fp && fp !== fingerprint(pack)) throw new Error(`${pack.id}: nội dung gốc đã đổi sau khi dịch ${lang} (#@src ${fp}) — dịch lại các ô đổi rồi xoá dòng #@src`);
  const { m, vocab } = parseSidecar(text);
  const g = globalVocab(root, lang);
  const used = new Set();
  let missing = 0;
  for (const s of slots(pack)) {
    const val = s.key === "V" ? vocab.get(s.en) ?? g.get(s.en) : m.get(s.key);
    if (val) {
      s.obj[lang] = val;
      if (s.key !== "V") used.add(s.key);
    } else missing++;
  }
  const extra = [...m.keys()].filter((k) => !used.has(k));
  if (extra.length && strict) throw new Error(`${pack.id}: khoá thừa ${extra.slice(0, 5).join(", ")}`);
  return missing;
}
