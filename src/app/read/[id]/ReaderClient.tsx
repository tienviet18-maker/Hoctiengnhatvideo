"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "../../../components/LangProvider";
import Furigana from "../../../components/Furigana";
import WordPopup from "../../../components/WordPopup";
import Paywall from "../../../components/Paywall";
import LessonPanel from "./LessonPanel";
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
const SPEEDS = [0.75, 0.9, 1, 1.25];
const EMPTY_PROGRESS: Record<string, Progress> = {};

function fmt(sec: number) {
  const s = Math.max(0, Math.floor(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/**
 * Đọc và nghe chung một màn (docs/ux-plan.md mục 2.4).
 * - Gói v2 có audioTrack: một file liền cho cả chương, câu đang đọc lấy theo `t`.
 * - Gói cũ: mỗi câu một file, phát nối tiếp từng câu.
 * Cả hai đều phát liên tục khi tắt màn hình (một thẻ <audio>, Media Session).
 */
export default function ReaderClient({ story }: { story: StoryContent }) {
  const { ui, lang, profile } = useLang();
  const [tab, setTab] = useState<"story" | "lesson">("story");
  const [showFuri, setShowFuri] = useState(true);
  const [showTr, setShowTr] = useState(false);
  const [showRomaji, setShowRomaji] = useState(false);
  const [fontStep, setFontStep] = useState(1);
  const [openEx, setOpenEx] = useState<Record<number, boolean>>({});
  const [popup, setPopup] = useState<VocabItem | null>(null);
  const [idx, setIdx] = useState(0);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(false);
  const [speedStep, setSpeedStep] = useState(2);
  const [time, setTime] = useState(0);
  const progress = useLocalJson(PROGRESS_KEY, EMPTY_PROGRESS);
  const seen = progress[story.id]?.pos ?? 0;

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const idxRef = useRef(0);
  const stopAtRef = useRef<number | null>(null);
  const singleRef = useRef(false);
  const wordTapRef = useRef(false);
  const loggedRef = useRef(false);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const total = story.sentences.length;
  const track = story.audioTrack && story.sentences.every((s) => s.t) ? story.audioTrack : null;
  const duration = track
    ? track.durationSec
    : 0;
  const locked = !story.free && !profile.vip;

  const vocab = useMemo(() => {
    const map = new Map<string, VocabItem>();
    for (const s of story.sentences) for (const v of s.vocab) if (!map.has(v.word)) map.set(v.word, v);
    return [...map.values()];
  }, [story.sentences]);

  const markSeen = useCallback(
    (i: number) => {
      const next = Math.max(seen, i + 1);
      if (next !== seen) saveProgress(story.id, next, total);
      if (next >= total && !loggedRef.current) {
        loggedRef.current = true;
        logActivity({ stories: 1, minutes: Math.max(2, Math.round((duration || total * 4) / 60)) });
      }
    },
    [seen, story.id, total, duration],
  );

  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const a = new Audio();
      a.preload = "auto";
      audioRef.current = a;
    }
    return audioRef.current;
  }, []);

  const setActive = useCallback((i: number) => {
    idxRef.current = i;
    setIdx(i);
  }, []);

  /** Phát từ câu i. single = chỉ phát một câu rồi dừng (nút "Nghe lại câu"). */
  const playFrom = useCallback(
    (i: number, single = false) => {
      const a = getAudio();
      a.playbackRate = SPEEDS[speedStep];
      setActive(i);
      setStarted(true);
      setFinished(false);
      singleRef.current = single;
      const s = story.sentences[i];
      if (track && s.t) {
        if (!a.src.endsWith(track.src)) a.src = track.src;
        a.currentTime = s.t[0];
        stopAtRef.current = single ? s.t[1] : null;
      } else {
        a.src = s.audio;
      }
      void a.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    },
    [getAudio, setActive, speedStep, story.sentences, track],
  );

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setPlaying(false);
  }, []);

  const resumeIdx = seen > 0 && seen < total ? seen : 0;

  const toggle = useCallback(() => {
    if (playing) return pause();
    const a = audioRef.current;
    if (started && a && a.src && !finished) {
      singleRef.current = false;
      stopAtRef.current = null;
      void a.play().then(() => setPlaying(true), () => setPlaying(false));
    } else {
      playFrom(started && !finished ? idxRef.current : resumeIdx);
    }
  }, [playing, pause, started, finished, playFrom, resumeIdx]);

  const goPrev = useCallback(() => playFrom(Math.max(0, idxRef.current - 1)), [playFrom]);
  const goNext = useCallback(() => playFrom(Math.min(total - 1, idxRef.current + 1)), [playFrom, total]);

  // Sự kiện audio: cập nhật câu đang đọc, dừng sau một câu, phát nối câu ở gói cũ.
  useEffect(() => {
    const a = getAudio();
    const onTime = () => {
      setTime(a.currentTime);
      if (track) {
        const t = a.currentTime;
        if (stopAtRef.current !== null && t >= stopAtRef.current) {
          stopAtRef.current = null;
          a.pause();
          setPlaying(false);
          return;
        }
        let i = idxRef.current;
        while (i + 1 < total && t >= story.sentences[i + 1].t![0]) i++;
        while (i > 0 && t < story.sentences[i].t![0]) i--;
        if (i !== idxRef.current) {
          markSeen(idxRef.current);
          setActive(i);
        }
      }
    };
    const onEnded = () => {
      const i = idxRef.current;
      markSeen(i);
      if (!track && !singleRef.current && i + 1 < total) {
        setActive(i + 1);
        a.src = story.sentences[i + 1].audio;
        void a.play();
        return;
      }
      setPlaying(false);
      if (track || i + 1 >= total) setFinished(!singleRef.current || i + 1 >= total);
    };
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnded);
    a.addEventListener("pause", onPause);
    a.addEventListener("play", onPlay);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnded);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("play", onPlay);
    };
  }, [getAudio, track, total, story.sentences, markSeen, setActive]);

  // Dừng audio khi rời trang
  useEffect(() => () => audioRef.current?.pause(), []);

  // Tốc độ
  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = SPEEDS[speedStep];
  }, [speedStep]);

  // Media Session: màn hình khoá, tai nghe, nút trên vô lăng
  const title = pickText(story.titles, lang);
  useEffect(() => {
    if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({ title, artist: "MiraiGo", album: story.level });
    navigator.mediaSession.setActionHandler("play", toggle);
    navigator.mediaSession.setActionHandler("pause", pause);
    navigator.mediaSession.setActionHandler("previoustrack", goPrev);
    navigator.mediaSession.setActionHandler("nexttrack", goNext);
  }, [title, story.level, toggle, pause, goPrev, goNext]);

  // Tự cuộn tới câu đang đọc khi đang phát
  useEffect(() => {
    if (!playing || tab !== "story") return;
    rowRefs.current[idx]?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [idx, playing, tab]);

  if (locked) {
    return (
      <div style={{ padding: 20 }}>
        <Link href="/books" aria-label={ui.common.back} style={{ color: "var(--navy)", textDecoration: "none", fontSize: 20 }}>←</Link>
        <h1 style={{ fontSize: 19, fontWeight: 700, marginTop: 16 }}>{title}</h1>
        <Paywall onClose={() => history.back()} />
      </div>
    );
  }

  const pct = track
    ? Math.min(100, (time / Math.max(1, duration)) * 100)
    : Math.round(((started ? idx + 1 : seen) / Math.max(1, total)) * 100);

  const onRowClick = (i: number) => {
    if (wordTapRef.current) {
      wordTapRef.current = false;
      return;
    }
    markSeen(i);
    if (playing) playFrom(i);
    else setActive(i);
  };

  const chipStyle = (on: boolean): React.CSSProperties => ({
    fontSize: 12, fontWeight: 600, padding: "0 12px", height: 32, borderRadius: 999, cursor: "pointer", fontFamily: "inherit",
    border: on ? "1px solid var(--navy)" : "1px solid var(--border)",
    background: on ? "var(--navy)" : "transparent", color: on ? "#fff" : "var(--text)",
  });
  const ctrlBtn: React.CSSProperties = {
    width: 52, height: 52, border: 0, background: "transparent", display: "flex", alignItems: "center",
    justifyContent: "center", cursor: "pointer", color: "#fff",
  };

  return (
    <div className="page-flush" style={{ paddingBottom: tab === "story" ? 200 : 32 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 4, padding: "12px 12px 0 8px" }}>
        <Link
          href="/books"
          aria-label={ui.common.back}
          style={{ width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text)" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M15 6l-6 6 6 6" /></svg>
        </Link>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontSize: 15, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</h1>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>
            {story.level} · {story.source === "original" ? ui.reader.sourceOriginal : ui.reader.sourceAozora}
          </div>
        </div>
      </div>

      <div
        role="tablist"
        style={{ margin: "8px 20px 0", display: "grid", gridTemplateColumns: "1fr 1fr", background: "var(--muted-bg)", borderRadius: 12, padding: 4 }}
      >
        {(["story", "lesson"] as const).map((k) => (
          <button
            key={k}
            type="button"
            role="tab"
            aria-selected={tab === k}
            onClick={() => setTab(k)}
            style={{
              height: 36, borderRadius: 9, border: 0, cursor: "pointer", fontFamily: "inherit", fontSize: 14,
              fontWeight: tab === k ? 700 : 600, color: tab === k ? "var(--text)" : "var(--muted)",
              background: tab === k ? "#fff" : "transparent", boxShadow: tab === k ? "0 1px 2px rgba(20,33,61,.1)" : "none",
            }}
          >
            {k === "story" ? ui.reader.tabStory : ui.reader.tabLesson}
          </button>
        ))}
      </div>

      {tab === "lesson" ? (
        <LessonPanel story={story} vocab={vocab} onWord={setPopup} />
      ) : (
        <>
          <div style={{ display: "flex", gap: 8, padding: "10px 20px 0", flexWrap: "wrap" }}>
            <button type="button" aria-pressed={showFuri} style={chipStyle(showFuri)} onClick={() => setShowFuri((v) => !v)}>{ui.reader.furigana}</button>
            <button type="button" aria-pressed={showTr} style={chipStyle(showTr)} onClick={() => setShowTr((v) => !v)}>{ui.reader.translate}</button>
            <button type="button" aria-pressed={showRomaji} style={chipStyle(showRomaji)} onClick={() => setShowRomaji((v) => !v)}>{ui.reader.romaji}</button>
            <button
              type="button"
              aria-label={ui.reader.fontSize}
              style={chipStyle(false)}
              onClick={() => setFontStep((s) => (s + 1) % FONT_SIZES.length)}
            >
              Aa
            </button>
          </div>

          <div style={{ padding: "8px 20px 0" }}>
            {story.sentences.map((s, i) => {
              const active = i === idx && started;
              const selected = i === idx;
              return (
                <div
                  key={i}
                  ref={(el) => {
                    rowRefs.current[i] = el;
                  }}
                  onClick={() => onRowClick(i)}
                  style={{
                    padding: "10px 12px", margin: "4px -12px", borderRadius: 12, cursor: "pointer",
                    background: active ? "#FFF4D6" : "transparent",
                    opacity: started && i < idx && !active ? 0.6 : 1,
                    transition: "background .2s",
                  }}
                >
                  <div
                    lang="ja"
                    className={`jp${showFuri ? "" : " no-furi"}`}
                    style={{ fontSize: FONT_SIZES[fontStep], lineHeight: 2.1, fontWeight: 500 }}
                  >
                    <Furigana
                      segments={s.furigana}
                      vocab={s.vocab}
                      onWord={(v) => {
                        wordTapRef.current = true;
                        setPopup(v);
                      }}
                    />
                  </div>
                  {showRomaji && s.romaji && (
                    <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>{s.romaji}</div>
                  )}
                  {showTr && (
                    <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 2, lineHeight: 1.5 }}>{pickText(s.translations, lang)}</div>
                  )}
                  {selected && (
                    <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 13, fontWeight: 600 }}>
                      {!showTr && (
                        <button
                          type="button"
                          className="link-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenEx((o) => ({ ...o, [-1 - i]: !o[-1 - i] }));
                          }}
                        >
                          {ui.reader.translate}
                        </button>
                      )}
                      {s.grammarNote && Object.keys(s.grammarNote).length > 0 && (
                        <button
                          type="button"
                          className="link-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenEx((o) => ({ ...o, [i]: !o[i] }));
                          }}
                        >
                          {ui.reader.explain}
                        </button>
                      )}
                      <button
                        type="button"
                        className="link-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          playFrom(i, true);
                        }}
                      >
                        {ui.reader.replay}
                      </button>
                    </div>
                  )}
                  {selected && !showTr && openEx[-1 - i] && (
                    <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 6, lineHeight: 1.5 }}>{pickText(s.translations, lang)}</div>
                  )}
                  {selected && openEx[i] && s.grammarNote && (
                    <div style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.55, background: "#fff", border: "1px solid #F2DFB5", borderRadius: 10, padding: "10px 12px" }}>
                      {pickText(s.grammarNote, lang)}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {popup && (
        <div style={{ position: "fixed", left: 16, right: 16, bottom: tab === "story" ? 196 : 16, maxWidth: 398, margin: "0 auto", zIndex: 50 }}>
          <WordPopup key={`${popup.word}|${popup.reading}`} vocab={popup} sourceId={story.id} onClose={() => setPopup(null)} />
        </div>
      )}

      {tab === "story" && (
        <div
          style={{
            position: "fixed", left: 0, right: 0, bottom: 0, maxWidth: 430, margin: "0 auto", zIndex: 40,
            background: "#14213D", color: "#fff", padding: "12px 20px calc(16px + env(safe-area-inset-bottom))", borderRadius: "20px 20px 0 0",
          }}
        >
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(pct)}
            style={{ height: 4, borderRadius: 2, background: "#2A3A5C" }}
          >
            <div style={{ width: `${pct}%`, height: 4, borderRadius: 2, background: "var(--accent)" }} />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#9FB0CF", marginTop: 6 }}>
            <span>
              {track ? `${fmt(time)} · ` : ""}
              {finished
                ? ui.reader.finished
                : !started && resumeIdx > 0
                  ? ui.reader.resume.replace("{n}", String(resumeIdx + 1))
                  : ui.reader.sentenceOf.replace("{i}", String(idx + 1)).replace("{n}", String(total))}
            </span>
            {track && <span>−{fmt(duration - time)}</span>}
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
            <button
              type="button"
              aria-label={ui.reader.speed}
              onClick={() => setSpeedStep((s) => (s + 1) % SPEEDS.length)}
              style={{ width: 56, height: 44, borderRadius: 10, border: "1px solid #33456A", background: "transparent", color: "#fff", fontFamily: "inherit", fontWeight: 600, fontSize: 13, cursor: "pointer" }}
            >
              {SPEEDS[speedStep]}×
            </button>
            <button type="button" aria-label={ui.reader.prev} onClick={goPrev} style={ctrlBtn}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M6 6h2v12H6zM20 6v12L9.5 12z" /></svg>
            </button>
            <button
              type="button"
              aria-label={playing ? ui.reader.pause : ui.reader.play}
              onClick={toggle}
              style={{ width: 64, height: 64, borderRadius: "50%", border: 0, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              {playing ? (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#14213D" aria-hidden><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
              ) : (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#14213D" aria-hidden><path d="M8 5.5v13l11-6.5z" /></svg>
              )}
            </button>
            <button type="button" aria-label={ui.reader.next} onClick={goNext} style={ctrlBtn}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 6h2v12h-2zM4 6v12l10.5-6z" /></svg>
            </button>
            <span style={{ width: 56 }} aria-hidden />
          </div>
          <div style={{ fontSize: 11, color: "#9FB0CF", textAlign: "center", marginTop: 6 }}>{ui.reader.bgHint}</div>
        </div>
      )}
    </div>
  );
}
