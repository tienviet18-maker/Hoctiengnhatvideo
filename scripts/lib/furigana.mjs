// Furigana cho một câu bất kỳ (kuromoji), cùng định dạng FuriganaSegment của app.
// Dùng chung cho bộ thẻ ôn; cùng thuật toán với scripts/produce/build-story.mjs.
export const KANJI = /[一-鿿㐀-䶿々〆ヶ]/;
export const kata2hira = (s) => s.replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));

/** Tách cụm kanji+okurigana theo cách đọc: 呼び/よび -> [呼:よ][び] */
export function alignToken(surface, reading) {
  if (!KANJI.test(surface)) return [{ surface, reading: "" }];
  const parts = surface.match(/[一-鿿㐀-䶿々〆ヶ]+|[^一-鿿㐀-䶿々〆ヶ]+/g);
  const re = new RegExp("^" + parts.map((p) => (KANJI.test(p) ? "(.+?)" : `(${kata2hira(p).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`)).join("") + "$");
  const mm = kata2hira(reading).match(re);
  if (!mm) return [{ surface, reading: kata2hira(reading) }];
  return parts.map((p, i) => ({ surface: p, reading: KANJI.test(p) ? mm[i + 1] : "" }));
}

function merge(segs) {
  const out = [];
  for (const g of segs) {
    const last = out[out.length - 1];
    if (!g.reading && last && !last.reading) last.surface += g.surface;
    else out.push({ ...g });
  }
  return out;
}

/** Câu -> mảnh furigana. `fixed`: {chữ: cách đọc} ép cho từ kuromoji hay đọc sai (vd. từ chính của thẻ). */
export function furigana(tokenizer, ja, fixed = {}) {
  const keys = Object.keys(fixed).filter((k) => KANJI.test(k)).sort((a, b) => b.length - a.length);
  const segs = [];
  let rest = ja;
  while (rest) {
    let hit = -1, word = null;
    for (const w of keys) {
      const i = rest.indexOf(w);
      if (i >= 0 && (hit < 0 || i < hit)) { hit = i; word = w; }
    }
    const plain = hit < 0 ? rest : rest.slice(0, hit);
    for (const t of tokenizer.tokenize(plain))
      segs.push(...alignToken(t.surface_form, t.reading ? kata2hira(t.reading) : t.surface_form));
    if (hit < 0) break;
    segs.push(...alignToken(word, fixed[word]));
    rest = rest.slice(hit + word.length);
  }
  return merge(segs);
}

/** Có kanji nào chưa có cách đọc không (để báo lỗi khi dựng). */
export const bareKanji = (segs) => segs.some((s) => !s.reading && KANJI.test(s.surface));
