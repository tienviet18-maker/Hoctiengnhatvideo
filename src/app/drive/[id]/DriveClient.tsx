"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLang } from "../../../components/LangProvider";
import Paywall from "../../../components/Paywall";
import { pickText } from "../../../lib/i18n";
import { logActivity } from "../../../lib/store";
import { stop as stopStoryPlayer } from "../../../lib/player";
import type { FuriganaSegment, JlptLevel, Translations } from "../../../lib/content-schema";
import Furigana from "../../../components/Furigana";
import { useFullContent } from "../../../lib/full-content";

interface DriveSentence {
  ja: string;
  furigana: FuriganaSegment[];
  audio: string;
}

interface DriveStory {
  id: string;
  titles: Translations;
  level: JlptLevel;
  free: boolean;
  sentences: DriveSentence[];
}

/**
 * Dùng chung MỘT phần tử audio cho mọi bài trong chế độ lái xe: khi tự chuyển
 * sang truyện kế tiếp, iOS Safari chỉ cho phát tiếp trên phần tử đã được người
 * dùng "mở khoá" bằng thao tác chạm — tạo Audio mới ở mỗi trang dễ bị chặn tự phát.
 */
let sharedAudio: HTMLAudioElement | null = null;

export default function DriveClient({
  story: storyProp,
  next: nextRaw,
}: {
  story: DriveStory;
  next: { id: string; titles: Translations; free: boolean } | null;
}) {
  const { ui, lang, profile } = useLang();
  // Chương VIP: trang tĩnh không mang câu nào; tài khoản VIP tải qua Worker (/api/content)
  const full = useFullContent("stories", storyProp.free ? storyProp : { ...storyProp, partial: true as const }, profile.vip);
  const story = full.item;
  const locked = !story.free && full.status !== "ready";
  // Không tự chuyển sang truyện VIP khi chưa có VIP (sẽ chỉ gặp màn paywall giữa lúc lái xe)
  const next = nextRaw && (nextRaw.free || profile.vip) ? nextRaw : null;
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
    if (!audioRef.current) {
      if (!sharedAudio) sharedAudio = new Audio();
      audioRef.current = sharedAudio;
    }
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
  // Chương VIP: chờ tải xong nội dung rồi mới phát
  useEffect(() => {
    if (locked) return;
    if (sessionStorage.getItem("vimai-drive-autoplay") === "1") {
      sessionStorage.removeItem("vimai-drive-autoplay");
      playFrom(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locked]);

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

  // Chế độ lái xe có audio riêng: tắt trình phát truyện để không phát chồng
  useEffect(() => stopStoryPlayer(), []);

  // Dừng audio khi rời trang
  useEffect(
    () => () => {
      audioRef.current?.pause();
    },
    [],
  );

  // Chặn truy cập thẳng URL /drive/<id> của truyện VIP (danh sách /drive đã chặn, URL thì chưa)
  if (locked) {
    return (
      <div className="drive-stage">
        <div className="drive-top">
          <Link href="/drive" className="drive-back" aria-label={ui.common.back}>←</Link>
          <span className="lvl">{story.level}</span>
        </div>
        <h1 className="drive-title">{title}</h1>
        {full.status === "loading" ? (
          <p style={{ marginTop: 16 }}>{ui.webvip.loading}</p>
        ) : full.status === "error" ? (
          <button type="button" className="btn-primary" style={{ marginTop: 16 }} onClick={full.retry}>
            {ui.webvip.retry}
          </button>
        ) : (
          <Paywall onClose={() => history.back()} />
        )}
      </div>
    );
  }

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
        <span><span>{done ? ui.drive.finished : <Furigana segments={story.sentences[idx].furigana} />}</span></span>
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
