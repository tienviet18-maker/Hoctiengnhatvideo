import type { ReactNode } from "react";
import type { FuriganaSegment, VocabItem } from "../lib/content-schema";

/** Tìm từ vựng khớp với 1 mảnh furigana (theo bề mặt chữ). Ưu tiên khớp chính xác. */
export function matchVocab(
  seg: FuriganaSegment,
  vocab: VocabItem[] | undefined,
): VocabItem | undefined {
  if (!vocab || seg.reading === "") return undefined;
  return (
    vocab.find((v) => v.word === seg.surface) ??
    vocab.find((v) => v.word.startsWith(seg.surface))
  );
}

const TRAILING_HIRAGANA = /[ぁ-ゟ]+$/;

/** Các dạng chuỗi để dò một từ trong câu: nguyên dạng, bỏ đuôi okurigana (動詞/形容詞 đã chia). */
function candidates(word: string): string[] {
  const out = [word];
  const stem = word.replace(TRAILING_HIRAGANA, "");
  if (stem && stem !== word) out.push(stem);
  // Từ toàn kana đã chia (うれしい -> うれしかった): bỏ ký tự cuối
  if (stem === "" && word.length >= 3) out.push(word.slice(0, -1));
  return out;
}

/**
 * Gán từ vựng cho từng ký tự của câu (ghép các mảnh furigana).
 * Trước đây chỉ mảnh có cách đọc (kanji) mới bấm được, nên ~9% từ vựng
 * (từ katakana/hiragana, từ có tiền tố お/ご nằm trong mảnh kana) không bấm được.
 */
function assignOwners(segments: FuriganaSegment[], vocab: VocabItem[]): (VocabItem | null)[] {
  const full = segments.map((s) => s.surface).join("");
  const owner: (VocabItem | null)[] = new Array(full.length).fill(null);
  for (const v of vocab) {
    let placed = false;
    for (const w of candidates(v.word)) {
      let from = 0;
      while (!placed) {
        const at = full.indexOf(w, from);
        if (at < 0) break;
        let free = true;
        for (let k = at; k < at + w.length; k++) {
          if (owner[k]) {
            free = false;
            break;
          }
        }
        if (free) {
          for (let k = at; k < at + w.length; k++) owner[k] = v;
          placed = true;
        } else {
          from = at + 1;
        }
      }
      if (placed) break;
    }
  }
  return owner;
}

interface Piece {
  surface: string;
  reading: string;
  vocab: VocabItem | null;
}

function buildPieces(segments: FuriganaSegment[], vocab: VocabItem[] | undefined): Piece[] {
  if (!vocab || vocab.length === 0) {
    return segments.map((s) => ({ surface: s.surface, reading: s.reading, vocab: null }));
  }
  const owner = assignOwners(segments, vocab);
  const pieces: Piece[] = [];
  let pos = 0;
  for (const seg of segments) {
    const len = seg.surface.length;
    if (seg.reading) {
      // Mảnh có cách đọc không tách được: lấy chủ của ký tự đầu tiên có chủ trong mảnh
      let v: VocabItem | null = null;
      for (let k = pos; k < pos + len; k++) {
        if (owner[k]) {
          v = owner[k];
          break;
        }
      }
      pieces.push({ surface: seg.surface, reading: seg.reading, vocab: v ?? matchVocab(seg, vocab) ?? null });
    } else {
      // Mảnh kana: tách theo ranh giới chủ sở hữu từng ký tự
      let start = 0;
      for (let k = 1; k <= len; k++) {
        if (k === len || owner[pos + k] !== owner[pos + start]) {
          pieces.push({ surface: seg.surface.slice(start, k), reading: "", vocab: owner[pos + start] });
          start = k;
        }
      }
    }
    pos += len;
  }
  return pieces;
}

export default function Furigana({
  segments,
  vocab,
  onWord,
}: {
  segments: FuriganaSegment[];
  vocab?: VocabItem[];
  onWord?: (v: VocabItem) => void;
}) {
  const pieces = onWord
    ? buildPieces(segments, vocab)
    : segments.map((s) => ({ surface: s.surface, reading: s.reading, vocab: null }));

  // Gộp các mảnh liền nhau cùng một từ thành một nút bấm
  const out: ReactNode[] = [];
  let i = 0;
  while (i < pieces.length) {
    const v = pieces[i].vocab;
    let j = i + 1;
    if (v) while (j < pieces.length && pieces[j].vocab === v) j++;
    const inner = pieces.slice(i, j).map((p, k) =>
      p.reading ? (
        <ruby key={k}>
          {p.surface}
          <rt>{p.reading}</rt>
        </ruby>
      ) : (
        <span key={k}>{p.surface}</span>
      ),
    );
    out.push(
      v ? (
        <button key={i} type="button" className="word-btn" onClick={() => onWord?.(v)}>
          {inner}
        </button>
      ) : (
        <span key={i}>{inner}</span>
      ),
    );
    i = j;
  }
  return <>{out}</>;
}
