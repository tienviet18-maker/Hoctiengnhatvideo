import type { FuriganaSegment } from "./content-schema";

const KANJI = /[一-鿿㐀-䶿々〆ヶ]/;
const KANJI_RUN = /[一-鿿㐀-䶿々〆ヶ]+|[^一-鿿㐀-䶿々〆ヶ]+/g;
const kata2hira = (s: string) => s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Một từ + cách đọc -> mảnh furigana, tách okurigana: 呼び/よび -> [呼:よ][び].
 * Không tách được thì gắn cả cách đọc lên cả từ (vẫn có furigana).
 */
export function alignWord(word: string, reading: string): FuriganaSegment[] {
  if (!KANJI.test(word) || !reading) return [{ surface: word, reading: "" }];
  const parts = word.match(KANJI_RUN) ?? [word];
  const re = new RegExp("^" + parts.map((p) => (KANJI.test(p) ? "(.+?)" : `(${esc(kata2hira(p))})`)).join("") + "$");
  const m = kata2hira(reading).match(re);
  if (!m) return [{ surface: word, reading: kata2hira(reading) }];
  return parts.map((p, i) => ({ surface: p, reading: KANJI.test(p) ? m[i + 1] : "" }));
}

export const hasKanji = (s: string) => KANJI.test(s);
