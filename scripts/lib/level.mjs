// Đo độ khó một văn bản tiếng Nhật bằng số liệu (chuẩn nội dung v2, docs/content-standard.md).
// Tách từ bằng kuromoji (IPADIC), tra cấp từng từ trong data/jlpt/jlpt-vocab.json.
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const kuromoji = require("kuromoji");
const root = new URL("../..", import.meta.url).pathname;
export const JLPT = JSON.parse(readFileSync(join(root, "data/jlpt/jlpt-vocab.json"), "utf8"));
export const LEVEL_NUM = { N5: 5, N4: 4, N3: 3, N2: 2, N1: 1 };

const kata2hira = (s) => s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
const CONTENT_POS = new Set(["名詞", "動詞", "形容詞", "副詞"]);
const SKIP_DETAIL = new Set(["固有名詞", "数", "代名詞", "非自立", "接尾"]);

/** Cấp JLPT của một từ (5…1), hoặc undefined nếu từ không nằm trong danh sách. */
export function wordLevel(word, reading) {
  return JLPT[word] ?? (reading ? JLPT["kana:" + kata2hira(reading)] : undefined);
}

// Cấp của một mục từ vựng: tra theo chữ viết; chỉ tra theo cách đọc khi từ viết toàn kana.
// (Tra cách đọc cho từ có kanji dễ trúng từ đồng âm: 怪談 かいだん ≠ 階段 N5.)
export function vocabLevel(word, reading) {
  if (JLPT[word]) return JLPT[word];
  return reading && !/[\u3400-\u9fff々]/.test(word) ? JLPT["kana:" + kata2hira(reading)] : undefined;
}

export function loadTokenizer() {
  const dicPath = join(dirname(require.resolve("kuromoji")), "..", "dict");
  return new Promise((res, rej) => kuromoji.builder({ dicPath }).build((e, t) => (e ? rej(e) : res(t))));
}

/**
 * Số liệu độ khó của một văn bản so với cấp `level`:
 * - harder: tỉ lệ từ (có trong danh sách JLPT) khó hơn cấp bài
 * - atLevel: tỉ lệ từ đúng bằng cấp bài hoặc khó hơn (đo "không quá dễ")
 * - unlisted: tỉ lệ từ không có trong danh sách (từ mượn, tên riêng sót, từ hiếm)
 */
export function measure(tokenizer, sentences, level) {
  const target = LEVEL_NUM[level];
  const text = sentences.join("");
  let listed = 0, harder = 0, atLevel = 0, unlisted = 0;
  for (const t of tokenizer.tokenize(text)) {
    if (!CONTENT_POS.has(t.pos) || SKIP_DETAIL.has(t.pos_detail_1)) continue;
    const base = t.basic_form !== "*" ? t.basic_form : t.surface_form;
    const l = JLPT[base] ?? JLPT[t.surface_form] ?? (t.reading ? JLPT["kana:" + kata2hira(t.reading)] : undefined);
    if (!l) { unlisted++; continue; }
    listed++;
    if (l < target) harder++;
    if (l <= target) atLevel++;
  }
  const chars = text.length;
  return {
    chars,
    sentences: sentences.length,
    avgSentence: sentences.length ? chars / sentences.length : 0,
    kanjiRatio: chars ? (text.match(/[一-鿿]/g) || []).length / chars : 0,
    harder: listed ? harder / listed : 0,
    atLevel: listed ? atLevel / listed : 0,
    unlisted: listed + unlisted ? unlisted / (listed + unlisted) : 0,
  };
}
