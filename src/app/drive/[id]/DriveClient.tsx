"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLang } from "../../../components/LangProvider";
import { pickText } from "../../../lib/i18n";
import { logActivity } from "../../../lib/store";
import type { JlptLevel, Translations } from "../../../lib/content-schema";

interface DriveSentence {
  ja: string;
  audio: string;
}

interface DriveStory {
  id: string;
  titles: Translations;
  level: JlptLevel;
  sentences: DriveSentence[];
}

export default function DriveClient({
  story,
  next,
}: {
  story: DriveStory;
  next: { id: string; titles: Translations } | null;
}) {
  const { ui, lang } = useLang();
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const loggedRef = useRef(false);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [done, setDone] = useState(false);
  const total = story.sentences.length;
  const title = pickText(story.titles, lang);

  const getAudio = () => {
    if (!audioRef.current) audioRef.current = new Audio();
    return audioRef.current;
  };

  const playFrom = useCallback(
    (i: number) => {
      const a = getAudio();
      a.src = story.sentences[i].audio;
      void a.play().then(
        () => setPlaying(true),
        () => setPlaying(false),
      );
    },
    [story],
  );

  const goNext = useCallback(() => {
    if (idx < total - 1) {
      const n = idx + 1;
      setIdx(n);
      playFrom(n);
    } else if (next) {
      sessionStorage.setItem("vimai-drive-autoplay", "1");
      router.push(`/drive/${next.id}`);
    } else {
      setPlaying(false);
      setDone(true);
    }
  }, [idx, total, next, playFrom, router]);

  const goPrev = useCallback(() => {
    const p = Math.max(0, idx - 1);
    setIdx(p);
    playFrom(p);
  }, [idx, playFrom]);

  const toggle = useCallback(() => {
    const a = getAudio();
    if (playing) {
      a.pause();
      setPlaying(false);
    } else if (done) {
      setDone(false);
      setIdx(0);
      playFrom(0);
    } else {
      playFrom(idx);
    }
  }, [playing, done, idx, playFrom]);

  // Tự phát khi được mở từ danh sách / chuyển bài (cờ đặt trong sessionStorage,
  // vì trang tĩnh không đọc được searchParams lúc prerender)
  useEffect(() => {
    if (sessionStorage.getItem("vimai-drive-autoplay") === "1") {
      sessionStorage.removeItem("vimai-drive-autoplay");
      playFrom(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Hết một câu: lặp lại / sang câu tiếp / hết bài
  useEffect(() => {
    const a = getAudio();
    const onEnded = () => {
      if (repeat) {
        playFrom(idx);
        return;
      }
      if (idx < total - 1) {
        const n = idx + 1;
        setIdx(n);
        playFrom(n);
        return;
      }
      if (!loggedRef.current) {
        loggedRef.current = true;
        logActivity({ stories: 1 });
      }
      if (next) {
        sessionStorage.setItem("vimai-drive-autoplay", "1");
        router.push(`/drive/${next.id}`);
      } else {
        setPlaying(false);
        setDone(true);
      }
    };
    a.addEventListener("ended", onEnded);
    return () => a.removeEventListener("ended", onEnded);
  }, [idx, repeat, total, next, playFrom, router]);

  // Điều khiển từ màn hình khoá / tai nghe (Media Session)
  useEffect(() => {
    if (typeof navigator === "undefined" || !("mediaSession" in navigator)) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artist: `${story.level} · ${ui.drive.title}`,
    });
    navigator.mediaSession.setActionHandler("play", () => playFrom(idx));
    navigator.mediaSession.setActionHandler("pause", () => {
      getAudio().pause();
      setPlaying(false);
    });
    navigator.mediaSession.setActionHandler("previoustrack", goPrev);
    navigator.mediaSession.setActionHandler("nexttrack", goNext);
  }, [title, story.level, ui.drive.title, idx, playFrom, goPrev, goNext]);

  // Dừng audio khi rời trang
  useEffect(
    () => () => {
      audioRef.current?.pause();
    },
    [],
  );

  return (
    <div className="drive-stage">
      <div className="drive-top">
        <Link href="/drive" className="drive-back" aria-label={ui.common.back}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m14 6-6 6 6 6" />
          </svg>
        </Link>
        <span className="lvl">{story.level}</span>
      </div>

      <h1 className="drive-title">{title}</h1>
      <p className="drive-count">
        {ui.drive.sentence} {Math.min(idx + 1, total)} / {total}
      </p>

      <p className="drive-sentence jp" lang="ja">
        {done ? ui.drive.finished : story.sentences[idx].ja}
      </p>

      <div className="progress-track drive-progress">
        <div style={{ width: `${((idx + (done ? 1 : 0)) / total) * 100}%`, height: "100%", background: "var(--accent)", borderRadius: 99 }} />
      </div>

      <div className="drive-controls">
        <button type="button" className="drive-btn side" onClick={goPrev} aria-label="Previous">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M6 5h2.5v14H6zM19 5.5v13L9.5 12z" />
          </svg>
        </button>
        <button type="button" className="drive-btn main" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
          {playing ? (
            <svg width="52" height="52" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />
            </svg>
          ) : (
            <svg width="52" height="52" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          )}
        </button>
        <button type="button" className="drive-btn side" onClick={goNext} aria-label="Next">
          <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M15.5 5H18v14h-2.5zM5 5.5v13L14.5 12z" />
          </svg>
        </button>
      </div>

      <button
        type="button"
        className={`chip drive-repeat${repeat ? " on" : ""}`}
        onClick={() => setRepeat((r) => !r)}
        aria-pressed={repeat}
      >
        {ui.drive.repeat}
      </button>

      {next && (
        <p className="drive-next">
          {ui.drive.nextStory}: {pickText(next.titles, lang)}
        </p>
      )}
    </div>
  );
}
