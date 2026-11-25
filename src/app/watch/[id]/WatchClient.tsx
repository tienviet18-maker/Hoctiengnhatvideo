"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLang } from "../../../components/LangProvider";
import Furigana from "../../../components/Furigana";
import WordPopup from "../../../components/WordPopup";
import Paywall from "../../../components/Paywall";
import type { TimedLine, VideoContent, VocabItem } from "../../../lib/content-schema";
import { pickText } from "../../../lib/i18n";
import { logActivity, QUEUE_KEY, removeFromQueue, saveProgress, useLocalJson } from "../../../lib/store";
import { VIDEO_INDEX, formatDuration } from "../../../lib/catalog.generated";

interface YTPlayer {
  getCurrentTime(): number;
  getPlayerState(): number;
  seekTo(sec: number, allowSeekAhead?: boolean): void;
  playVideo(): void;
  pauseVideo(): void;
  setPlaybackRate(rate: number): void;
  destroy(): void;
}
interface YTNamespace {
  Player: new (el: HTMLElement, opts: Record<string, unknown>) => YTPlayer;
}
declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

type Mode = "subtitles" | "dictation" | "shadowing" | "queue";

function normalize(s: string): string {
  return s.replace(/[\s。、！？・「」『』.,!?…ー―]/g, "").toLowerCase();
}

export default function WatchClient({
  videoId,
  youtubeId,
  video,
}: {
  videoId: string;
  youtubeId: string;
  video: VideoContent | null;
}) {
  const { ui, lang, profile } = useLang();
  const lines: TimedLine[] = useMemo(() => video?.lines ?? [], [video]);
  const locked = !!video && !video.free && !profile.vip;

  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const [playerReady, setPlayerReady] = useState(false);
  const [mode, setMode] = useState<Mode>("subtitles");
  const [activeIdx, setActiveIdx] = useState(0);
  const [popup, setPopup] = useState<VocabItem | null>(null);
  const [rate, setRate] = useState(1);
  const [loopLine, setLoopLine] = useState(false);
  const [perLine, setPerLine] = useState(false);
  const [showRomaji, setShowRomaji] = useState(true);
  const [showTrans, setShowTrans] = useState(true);
  const loopLineRef = useRef(false);
  const perLineRef = useRef(false);
  const pausedLineRef = useRef(-1);
  const activeIdxRef = useRef(0);
  const lastSavedRef = useRef(-10);
  const router = useRouter();
  const queue = useLocalJson<string[]>(QUEUE_KEY, []);
  const queueRef = useRef<string[]>([]);
  const endedRef = useRef(false);

  const [dictIdx, setDictIdx] = useState(0);
  const [dictInput, setDictInput] = useState("");
  const [dictResult, setDictResult] = useState<null | boolean>(null);

  const [recording, setRecording] = useState(false);
  const [recordUrl, setRecordUrl] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const playSecondsRef = useRef(0);
  const loggedOpenRef = useRef(false);

  /* Nạp YouTube IFrame API và tạo player */
  useEffect(() => {
    let cancelled = false;
    const init = () => {
      if (cancelled || !mountRef.current || !window.YT) return;
      playerRef.current = new window.YT.Player(mountRef.current, {
        videoId: youtubeId,
        playerVars: { rel: 0, playsinline: 1 },
        events: { onReady: () => setPlayerReady(true) },
      });
    };
    if (window.YT?.Player) {
      init();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        init();
      };
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
    }
    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy();
      } catch {
        /* bỏ qua */
      }
      playerRef.current = null;
    };
  }, [youtubeId]);

  const seekPlay = useCallback((sec: number) => {
    const p = playerRef.current;
    if (!p) return;
    pausedLineRef.current = -1;
    p.seekTo(sec, true);
    p.playVideo();
  }, []);

  /* Theo dõi thời gian phát: highlight câu, dừng ở cuối câu khi chép/shadowing, ghi hoạt động */
  useEffect(() => {
    if (!playerReady) return;
    const iv = window.setInterval(() => {
      const p = playerRef.current;
      if (!p) return;
      const t = p.getCurrentTime();
      const state = p.getPlayerState();
      if (state === 0 && video && !endedRef.current) {
        endedRef.current = true;
        const q = queueRef.current;
        const qi = q.indexOf(video.id);
        if (qi >= 0 && q[qi + 1]) router.push(`/watch/${q[qi + 1]}`);
      }
      if (state === 1) {
        endedRef.current = false;
        playSecondsRef.current += 0.25;
        if (playSecondsRef.current >= 60) {
          playSecondsRef.current = 0;
          logActivity({ minutes: 1 });
        }
      }
      // Lưu tiến độ thưa (mỗi ~5 giây hoặc khi nhảy xa) thay vì 4 lần/giây
      if (video && Math.abs(t - lastSavedRef.current) >= 5) {
        lastSavedRef.current = t;
        saveProgress(videoId, t, video.durationSec);
      }
      if (!lines.length) return;

      // Câu "đang giữ" vừa chạy qua điểm kết thúc (cửa sổ 1 giây, tránh bắt nhầm khi tua xa)
      const held = activeIdxRef.current;
      const heldLine = lines[held];
      const justEnded = !!heldLine && t >= heldLine.end && t < heldLine.end + 1;
      if (justEnded && state === 1) {
        if (mode === "subtitles" && loopLineRef.current) {
          p.seekTo(heldLine.start, true);
          return;
        }
        if ((mode === "shadowing" || (mode === "subtitles" && perLineRef.current)) && pausedLineRef.current !== held) {
          pausedLineRef.current = held;
          p.pauseVideo();
          return;
        }
      }
      if (mode === "dictation") {
        const dl = lines[dictIdx];
        if (dl && state === 1 && t >= dl.end && t < dl.end + 1 && pausedLineRef.current !== -2 - dictIdx) {
          pausedLineRef.current = -2 - dictIdx;
          p.pauseVideo();
        }
      }

      // Câu hiện tại = câu cuối cùng đã bắt đầu (khoảng lặng giữa hai câu vẫn giữ câu trước,
      // trước đây rơi về câu CUỐI video và cuộn danh sách xuống đáy)
      let idx = 0;
      for (let i = lines.length - 1; i >= 0; i--) {
        if (t >= lines[i].start) {
          idx = i;
          break;
        }
      }
      if (idx !== activeIdxRef.current) {
        activeIdxRef.current = idx;
        if (pausedLineRef.current >= 0 && pausedLineRef.current !== idx) pausedLineRef.current = -1;
        setActiveIdx(idx);
      }
    }, 250);
    return () => window.clearInterval(iv);
  }, [playerReady, lines, mode, dictIdx, video, videoId, router]);

  useEffect(() => {
    loopLineRef.current = loopLine;
  }, [loopLine]);
  useEffect(() => {
    perLineRef.current = perLine;
  }, [perLine]);
  useEffect(() => {
    if (playerReady) playerRef.current?.setPlaybackRate(rate);
  }, [rate, playerReady]);

  useEffect(() => {
    queueRef.current = queue;
  }, [queue]);

  useEffect(() => {
    if (video && !loggedOpenRef.current) {
      loggedOpenRef.current = true;
      logActivity({ videos: 1 });
    }
  }, [video]);

  useEffect(() => {
    if (mode === "subtitles") {
      lineRefs.current[activeIdx]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [activeIdx, mode]);

  const checkDictation = () => {
    const line = lines[dictIdx];
    if (!line) return;
    setDictResult(normalize(dictInput) === normalize(line.ja));
  };

  const toggleRecord = async () => {
    if (recording) {
      recorderRef.current?.stop();
      setRecording(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      chunksRef.current = [];
      rec.ondataavailable = (e) => chunksRef.current.push(e.data);
      rec.onstop = () => {
        stream.getTracks().forEach((tr) => tr.stop());
        setRecordUrl(URL.createObjectURL(new Blob(chunksRef.current, { type: "audio/webm" })));
      };
      recorderRef.current = rec;
      rec.start();
      setRecording(true);
    } catch {
      setRecording(false);
    }
  };

  if (locked) {
    return (
      <div style={{ background: "var(--stage)", minHeight: "100dvh", color: "#fff", padding: 20 }}>
        <Link href="/" style={{ color: "#fff", textDecoration: "none", fontSize: 20 }}>←</Link>
        <div style={{ marginTop: 40 }}>
          <span className="lock-badge">VIP</span>
          <h1 style={{ fontSize: 19, fontWeight: 700, marginTop: 12, lineHeight: 1.45 }}>
            {pickText(video!.titles, lang)}
          </h1>
        </div>
        <Paywall onClose={() => history.back()} />
      </div>
    );
  }

  const activeLine = lines[activeIdx];
  const dictLine = lines[dictIdx];

  return (
    <div className="on-dark" style={{ background: "var(--stage)", minHeight: "100dvh", color: "var(--text)", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px 8px", color: "#F1F5F9" }}>
        <Link href="/" style={{ color: "#F1F5F9", textDecoration: "none", fontSize: 20, lineHeight: 1 }}>←</Link>
        <span style={{ fontSize: 14, fontWeight: 600, flex: 1, minWidth: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {video ? pickText(video.titles, lang) : youtubeId}
        </span>
        {video && <span className="lvl">{video.level}</span>}
      </div>

      <div style={{ margin: "4px 16px 0", borderRadius: 12, overflow: "hidden", background: "#000", aspectRatio: "16/9" }}>
        <div ref={mountRef} style={{ width: "100%", height: "100%" }} />
      </div>

      {video && (
        <div style={{ display: "flex", gap: 8, padding: "14px 16px 4px" }}>
          {(
            [
              ["subtitles", ui.player.modeSubtitles],
              ["dictation", ui.player.modeDictation],
              ["shadowing", ui.player.modeShadowing],
              ["queue", ui.player.modeQueue],
            ] as [Mode, string][]
          ).map(([m, label]) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              style={{
                flex: 1, textAlign: "center", fontSize: 13, fontWeight: 600, padding: "9px 0",
                borderRadius: 10, cursor: "pointer", fontFamily: "inherit",
                border: "1px solid var(--stage-border)",
                background: mode === m ? "var(--navy)" : "transparent",
                color: mode === m ? "#fff" : "var(--muted)",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {video && (
        <div style={{ display: "flex", gap: 6, padding: "10px 16px 0", flexWrap: "wrap", alignItems: "center" }}>
          {[0.5, 0.75, 1, 1.25, 1.5].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRate(r)}
              style={{
                fontSize: 12, fontWeight: 700, padding: "6px 10px", borderRadius: 99, cursor: "pointer", fontFamily: "inherit",
                border: "1px solid var(--stage-border)",
                background: rate === r ? "var(--accent)" : "transparent",
                color: rate === r ? "#fff" : "#A8B6C8",
              }}
            >
              {r}×
            </button>
          ))}
          {(
            [
              [loopLine, setLoopLine, ui.player.loopLine],
              [perLine, setPerLine, ui.player.perLine],
              [showTrans, setShowTrans, ui.player.translation],
              [showRomaji, setShowRomaji, ui.player.romaji],
            ] as [boolean, (v: boolean) => void, string][]
          ).map(([on, set, label]) => (
            <button
              key={label}
              type="button"
              aria-pressed={on}
              onClick={() => set(!on)}
              style={{
                fontSize: 12, fontWeight: 700, padding: "6px 10px", borderRadius: 99, cursor: "pointer", fontFamily: "inherit",
                border: "1px solid var(--stage-border)",
                background: on ? "var(--navy)" : "transparent",
                color: on ? "#fff" : "#A8B6C8",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {!video && (
        <div style={{ margin: "16px", background: "var(--stage2)", border: "1px solid var(--stage-border)", borderRadius: 12, padding: 16 }}>
          <span className="lvl">{ui.player.autoSubtitles}</span>
          <p style={{ color: "#CBD5E1", fontSize: 14, lineHeight: 1.6, marginTop: 10 }}>
            {ui.player.customNotice}
          </p>
        </div>
      )}

      {video && mode === "subtitles" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "8px 16px 16px" }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <button
              type="button"
              disabled={activeIdx <= 0}
              onClick={() => lines[activeIdx - 1] && seekPlay(lines[activeIdx - 1].start)}
              style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "1px solid var(--stage-border)", background: "transparent", color: activeIdx <= 0 ? "var(--stage-border)" : "#CBD5E1", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
            >
              ← {ui.player.prevLine}
            </button>
            <button
              type="button"
              disabled={activeIdx >= lines.length - 1}
              onClick={() => lines[activeIdx + 1] && seekPlay(lines[activeIdx + 1].start)}
              style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "1px solid var(--stage-border)", background: "transparent", color: activeIdx >= lines.length - 1 ? "var(--stage-border)" : "#CBD5E1", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}
            >
              {ui.player.nextLine} →
            </button>
          </div>
          {lines.map((line, i) => (
            <div
              key={i}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              onClick={() => seekPlay(line.start)}
              style={{
                padding: "10px 12px", borderRadius: 12, marginBottom: 6, cursor: "pointer",
                background: i === activeIdx ? "var(--stage2)" : "transparent",
                border: i === activeIdx ? "1px solid var(--stage-border)" : "1px solid transparent",
              }}
            >
              <div className="jp" style={{ fontSize: 19, lineHeight: 2.15, fontWeight: 500, color: i === activeIdx ? "#fff" : "#CBD5E1" }}>
                <Furigana segments={line.furigana} vocab={line.vocab} onWord={setPopup} />
              </div>
              {showRomaji && <div style={{ fontSize: 12, color: "var(--muted)" }}>{line.romaji}</div>}
              {showTrans && (
                <div style={{ fontSize: 14, color: i === activeIdx ? "#E2E8F0" : "#A8B6C8", marginTop: 2 }}>
                  {pickText(line.translations, lang)}
                </div>
              )}
            </div>
          ))}
          <div style={{ fontSize: 11, color: "var(--muted)", textAlign: "center", padding: "6px 0 2px" }}>
            {ui.player.tapWordHint}
          </div>
          {popup && (
            <div style={{ position: "sticky", bottom: 8 }}>
              <WordPopup key={`${popup.word}|${popup.reading}`} vocab={popup} sourceId={video.id} onClose={() => setPopup(null)} dark />
            </div>
          )}
        </div>
      )}

      {video && mode === "queue" && (
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px 16px" }}>
          {queue.length === 0 && (
            <p style={{ color: "#A8B6C8", fontSize: 13, lineHeight: 1.6 }}>{ui.queue.empty}</p>
          )}
          {queue.map((qid) => {
            const item = VIDEO_INDEX.find((v) => v.id === qid);
            if (!item) return null;
            const current = qid === video.id;
            return (
              <div key={qid} style={{ display: "flex", gap: 10, alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--stage-border)" }}>
                <button
                  type="button"
                  onClick={() => router.push(`/watch/${qid}`)}
                  style={{ flex: 1, minWidth: 0, textAlign: "left", background: "none", border: "none", cursor: "pointer", color: "inherit", fontFamily: "inherit", padding: 0 }}
                >
                  <span style={{ display: "block", fontSize: 14, fontWeight: current ? 800 : 600, color: current ? "var(--accent)" : "#E2E8F0", lineHeight: 1.35 }}>
                    {pickText(item.titles, lang)}
                  </span>
                  <span style={{ display: "block", fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                    {item.level} · {formatDuration(item.durationSec)}
                    {current ? ` · ${ui.queue.nowPlaying}` : ""}
                  </span>
                </button>
                <button
                  type="button"
                  aria-label="×"
                  onClick={() => removeFromQueue(qid)}
                  style={{ width: 28, height: 28, borderRadius: "50%", border: "1px solid var(--stage-border)", background: "transparent", color: "#A8B6C8", fontSize: 15, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}

      {video && mode === "dictation" && dictLine && (
        <div style={{ flex: 1, padding: "14px 16px 18px", color: "#F1F5F9" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
            {lines.map((_, i) => (
              <span key={i} style={{ width: 22, height: 5, borderRadius: 99, background: i < dictIdx ? "var(--ok)" : i === dictIdx ? "var(--accent)" : "var(--stage2)", border: "1px solid var(--stage-border)" }} />
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <button type="button" onClick={() => seekPlay(dictLine.start)} style={{ width: 52, height: 52, borderRadius: "50%", background: "#fff", color: "var(--stage)", border: "none", fontSize: 20, cursor: "pointer" }}>▶</button>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>
              {dictIdx + 1} / {lines.length}
            </span>
          </div>
          <textarea
            className="jp"
            value={dictInput}
            onChange={(e) => setDictInput(e.target.value)}
            placeholder={ui.dictation.placeholder}
            rows={3}
            style={{ width: "100%", background: "var(--stage2)", border: "1.5px solid var(--navy)", borderRadius: 12, padding: 14, fontSize: 17, color: "#fff", fontFamily: "inherit", resize: "none" }}
          />
          {dictResult !== null && (
            <div style={{ marginTop: 14, borderRadius: 12, padding: "12px 14px", background: dictResult ? "rgba(47,158,110,.14)" : "rgba(224,62,45,.12)", border: `1px solid ${dictResult ? "var(--ok)" : "var(--accent)"}` }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: dictResult ? "#7BD8AE" : "#F0A49B" }}>
                {dictResult ? ui.dictation.correct : ui.dictation.incorrect}
              </div>
              <div className="jp" style={{ fontSize: 16, marginTop: 5, lineHeight: 2 }}>
                <Furigana segments={dictLine.furigana} vocab={dictLine.vocab} onWord={setPopup} />
              </div>
              <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{pickText(dictLine.translations, lang)}</div>
            </div>
          )}
          {popup && (
            <div style={{ marginTop: 12 }}>
              <WordPopup key={`${popup.word}|${popup.reading}`} vocab={popup} sourceId={video.id} onClose={() => setPopup(null)} dark />
            </div>
          )}
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button type="button" onClick={() => seekPlay(dictLine.start)} style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: "1px solid var(--stage-border)", background: "transparent", color: "#CBD5E1", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
              ▶ {ui.reader.listen}
            </button>
            {dictResult === true && dictIdx < lines.length - 1 ? (
              <button type="button" onClick={() => { setDictIdx(dictIdx + 1); setDictInput(""); setDictResult(null); }} style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: "none", background: "var(--navy)", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
                {ui.common.next}
              </button>
            ) : (
              <button type="button" onClick={checkDictation} style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: "none", background: "var(--navy)", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
                {ui.dictation.check}
              </button>
            )}
          </div>
        </div>
      )}

      {video && mode === "shadowing" && activeLine && (
        <div style={{ flex: 1, padding: "14px 16px 18px", color: "#F1F5F9" }}>
          <div className="jp" style={{ fontSize: 20, lineHeight: 2.15, fontWeight: 500, background: "var(--stage2)", border: "1px solid var(--stage-border)", borderRadius: 12, padding: "12px 14px" }}>
            <Furigana segments={activeLine.furigana} vocab={activeLine.vocab} onWord={setPopup} />
          </div>
          <div style={{ fontSize: 14, color: "#A8B6C8", marginTop: 8 }}>{pickText(activeLine.translations, lang)}</div>
          {popup && (
            <div style={{ marginTop: 12 }}>
              <WordPopup key={`${popup.word}|${popup.reading}`} vocab={popup} sourceId={video.id} onClose={() => setPopup(null)} dark />
            </div>
          )}
          <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
            <button type="button" onClick={() => seekPlay(activeLine.start)} style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: "1px solid var(--stage-border)", background: "transparent", color: "#CBD5E1", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
              ▶ {ui.reader.listen}
            </button>
            <button type="button" onClick={toggleRecord} style={{ flex: 1, padding: "13px 0", borderRadius: 12, border: "none", background: recording ? "var(--accent)" : "var(--navy)", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
              {recording ? "■" : "●"} {recording ? ui.player.stop : ui.player.record}
            </button>
          </div>
          {recordUrl && (
            <audio src={recordUrl} controls style={{ width: "100%", marginTop: 14 }} />
          )}
        </div>
      )}
    </div>
  );
}
