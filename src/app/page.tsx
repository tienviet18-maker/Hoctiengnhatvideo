"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLang } from "../components/LangProvider";
import { STORY_INDEX, VIDEO_INDEX } from "../lib/catalog.generated";
import { pickText } from "../lib/i18n";
import { SERIES, seriesOf } from "../lib/series";
import {
  ACTIVITY_KEY,
  DECK_KEY,
  PROGRESS_KEY,
  getStreak,
  useLocalJson,
  type DayActivity,
  type DeckCard,
  type Progress,
} from "../lib/store";

const EMPTY_PROGRESS: Record<string, Progress> = {};
const EMPTY_DECK: DeckCard[] = [];
const EMPTY_ACTIVITY: Record<string, DayActivity> = {};

/** Màu bìa nhỏ ổn định theo id (bìa chữ kiểu bunko, chưa có ảnh). */
const COVER_TONES = [
  ["#F3D9B5", "#5A2D0C"],
  ["#20262E", "#F5C542"],
  ["#3B3A4A", "#E8E2F2"],
  ["#DCE6F2", "#1F3864"],
  ["#EFE6D2", "#2B1D14"],
  ["#E3EFE6", "#1E4D36"],
] as const;
function tone(id: string) {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return COVER_TONES[h % COVER_TONES.length];
}

function fill(s: string, n: number) {
  return s.replace("{n}", String(n));
}

function todayKey(ts: number) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export default function HomePage() {
  const { ui, lang, profile, ready } = useLang();
  const router = useRouter();
  const progress = useLocalJson(PROGRESS_KEY, EMPTY_PROGRESS);
  const deck = useLocalJson(DECK_KEY, EMPTY_DECK);
  const activity = useLocalJson(ACTIVITY_KEY, EMPTY_ACTIVITY);

  useEffect(() => {
    if (ready && !profile.onboarded) router.replace("/onboarding");
  }, [ready, profile.onboarded, router]);

  // Giờ hiện tại chỉ đọc sau khi mount (prerender không được dùng new Date()); 0 = chưa có.
  const [now, setNow] = useState(0);
  useEffect(() => {
    const t = window.setTimeout(() => setNow(Date.now()), 0);
    return () => window.clearTimeout(t);
  }, []);
  // activity là phụ thuộc để streak tính lại khi có hoạt động mới
  const streak = useMemo(() => (now && activity ? getStreak() : 0), [activity, now]);
  const minutesToday = now ? activity[todayKey(now)]?.minutes ?? 0 : 0;
  const due = useMemo(() => (now ? deck.filter((c) => c.due <= now).length : 0), [deck, now]);

  const resume = useMemo(() => {
    const entries = Object.entries(progress).sort((a, b) => b[1].updatedAt - a[1].updatedAt);
    for (const [id, p] of entries) {
      const pct = Math.min(100, Math.round((p.pos / Math.max(1, p.total)) * 100));
      const story = STORY_INDEX.find((s) => s.id === id);
      if (story) return { href: `/read/${id}`, title: pickText(story.titles, lang), meta: story.level, pct, id };
      const video = VIDEO_INDEX.find((v) => v.id === id);
      if (video) return { href: `/watch/${id}`, title: pickText(video.titles, lang), meta: video.level, pct, id };
    }
    const first = STORY_INDEX.find((s) => s.free);
    return first
      ? { href: `/read/${first.id}`, title: pickText(first.titles, lang), meta: first.level, pct: 0, id: first.id }
      : null;
  }, [progress, lang]);

  const newest = useMemo(() => STORY_INDEX.slice(-8).reverse(), []);
  const newVideos = useMemo(() => VIDEO_INDEX.slice(-6).reverse(), []);
  // "Đang hot": truyện chuẩn v2 mới nhất (có audio liền) + video mới nhất của từng kênh
  const featured = useMemo(() => {
    const stories = STORY_INDEX.filter((s) => s.audioTrack).slice(-3).reverse()
      .map((s) => ({ kind: "story" as const, id: s.id, title: pickText(s.titles, lang), level: s.level, img: null as string | null }));
    const videos = SERIES.map((k) => [...VIDEO_INDEX].reverse().find((v) => seriesOf(v.id) === k.key)).filter((v) => !!v)
      .map((v) => ({ kind: "video" as const, id: v.id, title: pickText(v.titles, lang), level: v.level, img: `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg` }));
    const out: typeof stories = [];
    for (let i = 0; i < Math.max(stories.length, videos.length); i++) {
      if (videos[i]) out.push(videos[i]);
      if (stories[i]) out.push(stories[i]);
    }
    return out;
  }, [lang]);

  const hour = now ? new Date(now).getHours() : 12;
  const greet = hour < 11 ? ui.home.morning : hour < 18 ? ui.home.afternoon : ui.home.evening;

  return (
    <div className="page">
      <header style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span
          aria-hidden
          style={{ width: 28, height: 28, borderRadius: 8, background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="var(--accent)" /></svg>
        </span>
        <span style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-.02em", color: "var(--navy)" }}>{ui.app.name}</span>
        {streak > 0 && (
          <span
            style={{
              marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, padding: "6px 10px",
              borderRadius: 999, background: "var(--card)", border: "1px solid var(--border)", fontSize: 13, fontWeight: 700,
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C2410C" strokeWidth="2" aria-hidden>
              <path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-9z" />
            </svg>
            {fill(ui.home.streak, streak)}
          </span>
        )}
      </header>

      <h1 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-.02em", lineHeight: 1.25, marginTop: 14 }}>
        {greet}
        {profile.name ? `, ${profile.name}` : ""}
      </h1>
      <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>{fill(ui.home.todayMinutes, minutesToday)}</div>

      <h2 style={{ fontSize: 17, fontWeight: 700, margin: "16px 0 10px" }}>{ui.home.hot}</h2>
      <div style={{ display: "flex", gap: 12, overflowX: "auto", scrollSnapType: "x mandatory", margin: "0 -20px", padding: "0 20px 4px" }}>
        {featured.map((f) => (
          <Link
            key={f.id}
            href={f.kind === "video" ? `/watch/${f.id}` : `/read/${f.id}`}
            style={{
              position: "relative", width: "82%", maxWidth: 320, flexShrink: 0, height: 180, borderRadius: 16, overflow: "hidden",
              scrollSnapAlign: "start", textDecoration: "none", color: "#fff",
              background: f.img ? "#000" : tone(f.id)[0],
            }}
          >
            {f.img ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={f.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span lang="ja" aria-hidden style={{ position: "absolute", right: 18, top: 14, writingMode: "vertical-rl", fontFamily: "'Noto Serif JP', serif", fontWeight: 700, fontSize: 26, color: tone(f.id)[1], letterSpacing: ".1em" }}>
                {f.title.slice(0, 8)}
              </span>
            )}
            <span style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,.75) 100%)" }} />
            <span style={{ position: "absolute", left: 14, right: 14, bottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 700, background: "rgba(255,255,255,.2)", borderRadius: 6, padding: "2px 7px" }}>
                {f.kind === "video" ? ui.tabs.video : ui.tabs.books} · {f.level}
              </span>
              <span style={{ display: "block", fontSize: 16, fontWeight: 700, lineHeight: 1.3, marginTop: 6 }}>{f.title}</span>
            </span>
          </Link>
        ))}
      </div>

      {resume && (
        <Link
          href={resume.href}
          style={{
            marginTop: 18, background: "var(--navy)", borderRadius: 18, padding: 14, display: "flex", gap: 14,
            alignItems: "center", textDecoration: "none", color: "#fff",
          }}
        >
          <span
            aria-hidden
            style={{
              width: 60, height: 80, flexShrink: 0, borderRadius: 6, background: tone(resume.id)[0], color: tone(resume.id)[1],
              fontSize: 11, fontWeight: 800, padding: 6, display: "flex", alignItems: "flex-end", boxShadow: "0 2px 6px rgba(0,0,0,.25)",
            }}
          >
            {resume.meta}
          </span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: "block", fontSize: 11, fontWeight: 700, letterSpacing: ".08em", color: "#B9C8E4", textTransform: "uppercase" }}>
              {resume.pct > 0 ? ui.home.continue : ui.home.startHere}
            </span>
            <span style={{ display: "block", fontSize: 16, fontWeight: 700, marginTop: 4, lineHeight: 1.3 }}>{resume.title}</span>
            {resume.pct > 0 && (
              <span style={{ display: "block", height: 4, borderRadius: 2, background: "rgba(255,255,255,.2)", marginTop: 10 }}>
                <span style={{ display: "block", width: `${resume.pct}%`, height: 4, borderRadius: 2, background: "var(--accent)" }} />
              </span>
            )}
          </span>
          <span
            aria-hidden
            style={{ width: 48, height: 48, borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="var(--navy)" /></svg>
          </span>
        </Link>
      )}

      <Link
        href="/library"
        className="card"
        style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "inherit" }}
      >
        <span
          aria-hidden
          style={{ width: 40, height: 40, borderRadius: 10, background: "#FDECEC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B91C2B" strokeWidth="2"><rect x="4" y="5" width="16" height="14" rx="2" /><path d="M8 10h8M8 14h5" /></svg>
        </span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: "block", fontSize: 14, fontWeight: 700 }}>
            {due > 0 ? fill(ui.home.reviewDue, due) : ui.home.reviewEmpty}
          </span>
          <span style={{ display: "block", fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
            {due > 0 ? ui.home.reviewDueHint : ui.home.reviewEmptyHint}
          </span>
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" aria-hidden><path d="M9 6l6 6-6 6" /></svg>
      </Link>

      <div style={{ marginTop: 22, display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <h2 style={{ fontSize: 17, fontWeight: 700 }}>{ui.home.newOnShelf}</h2>
        <Link href="/books" style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)", textDecoration: "none" }}>{ui.common.seeAll}</Link>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 10, overflowX: "auto", paddingBottom: 4 }}>
        {newest.map((s) => {
          const [bg, fg] = tone(s.id);
          return (
            <Link
              key={s.id}
              href={`/read/${s.id}`}
              style={{
                width: 96, height: 128, flexShrink: 0, borderRadius: 6, background: bg, color: fg, padding: 8,
                display: "flex", flexDirection: "column", justifyContent: "space-between", textDecoration: "none",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 800, lineHeight: 1.3, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 4, WebkitBoxOrient: "vertical" }}>
                {pickText(s.titles, lang)}
              </span>
              <span style={{ fontSize: 10, fontWeight: 700 }}>{s.level}{s.free ? "" : " · VIP"}</span>
            </Link>
          );
        })}
      </div>

      <div style={{ marginTop: 22, display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <h2 style={{ fontSize: 17, fontWeight: 700 }}>{ui.home.newVideos}</h2>
        <Link href="/video" style={{ fontSize: 13, fontWeight: 600, color: "var(--navy)", textDecoration: "none" }}>{ui.common.seeAll}</Link>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 10, overflowX: "auto", paddingBottom: 4 }}>
        {newVideos.map((v) => (
          <Link key={v.id} href={`/watch/${v.id}`} style={{ width: 168, flexShrink: 0, textDecoration: "none", color: "inherit" }}>
            <span className="thumb" style={{ width: 168, height: 95, display: "block" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://i.ytimg.com/vi/${v.youtubeId}/mqdefault.jpg`} alt="" loading="lazy" />
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.35, marginTop: 6, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" } as React.CSSProperties}>
              {pickText(v.titles, lang)}
            </span>
          </Link>
        ))}
      </div>

      <Link href="/paths" className="card" style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "inherit" }}>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: "block", fontSize: 15, fontWeight: 700 }}>{ui.paths.title}</span>
          <span style={{ display: "block", fontSize: 12, color: "var(--muted)", marginTop: 2, lineHeight: 1.4 }}>{ui.paths.subtitle}</span>
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" aria-hidden><path d="M9 6l6 6-6 6" /></svg>
      </Link>
    </div>
  );
}
