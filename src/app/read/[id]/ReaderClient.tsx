"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "../../../components/LangProvider";
import Furigana from "../../../components/Furigana";
import WordPopup from "../../../components/WordPopup";
import Paywall from "../../../components/Paywall";
import type { StoryContent, VocabItem } from "../../../lib/content-schema";
import { pickText } from "../../../lib/i18n";
import {
  logActivity,
  PROGRESS_KEY,
  saveProgress,
  useLocalJson,
  type Progress,
} from "../../../lib/store";

const FONT_SIZES = [16, 18, 21];

export default function ReaderClient({ story }: { story: StoryContent }) {
  const { ui, lang, profile } = useLang();
  const [openTr, setOpenTr] = useState<Record<number, boolean>>({});
  const [openEx, setOpenEx] = useState<Record<number, boolean>>({});
  const [fontStep, setFontStep] = useState(1);
  const [popup, setPopup] = useState<VocabItem | null>(null);
  const progress = useLocalJson<Record<string, Progress>>(PROGRESS_KEY, {});
  const seen = progress[story.id]?.pos ?? 0;
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const loggedRef = useRef(false);

  if (!story.free && !profile.vip) {
    return (
      <div style={{ padding: 20 }}>
        <Link href="/books" style={{ color: "var(--navy)", textDecoration: "none", fontSize: 20 }}>←</Link>
        <h1 style={{ fontSize: 19, fontWeight: 700, marginTop: 16 }}>{pickText(story.titles, lang)}</h1>
        <Paywall onClose={() => history.back()} />
      </div>
    );
  }

  const total = story.sentences.length;
  const pct = total ? Math.min(100, Math.round((seen / total) * 100)) : 0;

  const markSeen = (idx: number) => {
    const next = Math.max(seen, idx + 1);
    if (next !== seen) {
      saveProgress(story.id, next, total);
      if (next >= total && !loggedRef.current) {
        loggedRef.current = true;
        logActivity({ stories: 1, minutes: 2 });
      }
    }
  };

  const playAudio = (src: string, idx: number) => {
    markSeen(idx);
    if (!audioRef.current) audioRef.current = new Audio();
    audioRef.current.src = src;
    void audioRef.current.play();
  };

  return (
    <div className="page-flush">
      <div style={{ display: "flex", alignItems: "center", padding: "16px 20px 0" }}>
        <Link href="/books" style={{ color: "var(--text)", textDecoration: "none", fontSize: 20, lineHeight: 1 }}>←</Link>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>{ui.reader.fontSize}</span>
          {FONT_SIZES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setFontStep(i)}
              style={{
                width: 30, height: 30, borderRadius: 8, cursor: "pointer", fontFamily: "inherit",
                border: "1px solid var(--border)", fontWeight: 700,
                fontSize: 11 + i * 2,
                background: fontStep === i ? "var(--navy)" : "#fff",
                color: fontStep === i ? "#fff" : "var(--navy)",
              }}
            >
              A
            </button>
          ))}
        </div>
      </div>

      <div style={{ margin: "16px 20px 0", borderRadius: 16, background: "var(--navy-dark)", color: "#fff", padding: "20px" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".08em", color: "#B9CDE8" }}>
          {story.level} · {story.source === "original" ? ui.reader.sourceOriginal : ui.reader.sourceAozora}
        </div>
        <h1 style={{ fontSize: 21, fontWeight: 800, lineHeight: 1.35, marginTop: 8 }}>
          {pickText(story.titles, lang)}
        </h1>
        <div className="progress-track" style={{ marginTop: 14, background: "rgba(255,255,255,.25)" }}>
          <i style={{ width: `${pct}%` }} />
        </div>
        <div style={{ fontSize: 12, color: "#B9CDE8", marginTop: 6 }}>
          {ui.reader.progress} {pct}%
        </div>
      </div>

      <div style={{ padding: "6px 20px 0" }}>
        {story.sentences.map((s, i) => (
          <div key={i} style={{ padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
            <div
              className="jp"
              style={{ fontSize: FONT_SIZES[fontStep], lineHeight: 2.2, fontWeight: 500 }}
              onClick={() => markSeen(i)}
            >
              <Furigana segments={s.furigana} vocab={s.vocab} onWord={setPopup} />
            </div>
            {openTr[i] && (
              <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 6, background: "var(--muted-bg)", borderRadius: 8, padding: "8px 10px" }}>
                {pickText(s.translations, lang)}
              </div>
            )}
            {openEx[i] && s.grammarNote && (
              <div style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.55, background: "#FFF8E6", border: "1px solid #F2DFB5", borderRadius: 10, padding: "10px 12px" }}>
                {pickText(s.grammarNote, lang)}
              </div>
            )}
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button type="button" className="chip" onClick={() => playAudio(s.audio, i)}>
                ▶ {ui.reader.listen}
              </button>
              <button
                type="button"
                className={`chip${openTr[i] ? " on" : ""}`}
                onClick={() => {
                  markSeen(i);
                  setOpenTr((o) => ({ ...o, [i]: !o[i] }));
                }}
              >
                {ui.reader.translate}
              </button>
              {s.grammarNote && Object.keys(s.grammarNote).length > 0 && (
                <button
                  type="button"
                  className={`chip${openEx[i] ? " on" : ""}`}
                  onClick={() => {
                    markSeen(i);
                    setOpenEx((o) => ({ ...o, [i]: !o[i] }));
                  }}
                >
                  {ui.reader.explain}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {popup && (
        <div style={{ position: "fixed", left: 16, right: 16, bottom: 16, maxWidth: 398, margin: "0 auto", zIndex: 50 }}>
          <WordPopup key={`${popup.word}|${popup.reading}`} vocab={popup} sourceId={story.id} onClose={() => setPopup(null)} />
        </div>
      )}

      <div style={{ padding: "16px 20px 24px" }}>
        <Link href="/books" className="btn-primary" style={{ textDecoration: "none" }}>
          {ui.common.back}
        </Link>
      </div>
    </div>
  );
}
