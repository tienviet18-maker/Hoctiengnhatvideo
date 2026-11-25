import type { FuriganaSegment, VocabItem } from "../lib/content-schema";

/** Tìm từ vựng khớp với 1 mảnh furigana (theo bề mặt chữ). */
export function matchVocab(
  seg: FuriganaSegment,
  vocab: VocabItem[] | undefined,
): VocabItem | undefined {
  if (!vocab || seg.reading === "") return undefined;
  return vocab.find(
    (v) => v.word === seg.surface || v.word.startsWith(seg.surface),
  );
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
  return (
    <>
      {segments.map((seg, i) => {
        const hit = onWord ? matchVocab(seg, vocab) : undefined;
        const inner = seg.reading ? (
          <ruby>
            {seg.surface}
            <rt>{seg.reading}</rt>
          </ruby>
        ) : (
          seg.surface
        );
        return hit ? (
          <button
            key={i}
            type="button"
            className="word-btn"
            onClick={() => onWord?.(hit)}
          >
            {inner}
          </button>
        ) : (
          <span key={i}>{inner}</span>
        );
      })}
    </>
  );
}
