"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLang } from "../components/LangProvider";
import Paywall from "../components/Paywall";
import { VIDEO_INDEX, formatDuration } from "../lib/catalog.generated";
import { PATHS } from "../lib/paths";
import { SERIES, seriesOf } from "../lib/series";
import { pickText } from "../lib/i18n";
import type { JlptLevel, VideoCategory } from "../lib/content-schema";
import {
  addCustomVideo,
  CUSTOM_KEY,
  PROGRESS_KEY,
  QUEUE_KEY,
  toggleQueue,
  useLocalJson,
  type CustomVideo,
  type Progress,
} from "../lib/store";

const LEVELS: (JlptLevel | "all")[] = ["all", "N5", "N4", "N3", "N2", "N1"];

function extractYoutubeId(raw: string): string | null {
  const s = raw.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
  const m = s.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  return m ? m[1] : null;
}

const rowStyle: React.CSSProperties = {
  display: "flex",
  gap: 12,
  alignItems: "center",
  width: "100%",
  textAlign: "left",
  padding: "12px 0",
  background: "none",
  border: "none",
  borderBottom: "1px solid var(--border)",
  cursor: "pointer",
  color: "inherit",
  fontFamily: "inherit",
};

export default function HomePage() {
  const { ui, lang, profile, ready } = useLang();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("all");
  const [category, setCategory] = useState<VideoCategory | "all">("all");
  const [series, setSeries] = useState<string>("all");
  const queue = useLocalJson<string[]>(QUEUE_KEY, []);
  const [paywall, setPaywall] = useState(false);
  const [link, setLink] = useState("");
  const custom = useLocalJson<CustomVideo[]>(CUSTOM_KEY, []);
  const progress = useLocalJson<Record<string, Progress>>(PROGRESS_KEY, {});

  useEffect(() => {
    if (ready && !profile.onboarded) router.replace("/onboarding");
  }, [ready, profile.onboarded, router]);

  const filtered = useMemo(
    () =>
      VIDEO_INDEX.filter((v) => {
        if (level !== "all" && v.level !== level) return false;
        if (category !== "all" && v.category !== category) return false;
        if (series !== "all" && seriesOf(v.id) !== series) return false;
        if (!query) return true;
        const q = query.toLowerCase();
        return (
          pickText(v.titles, lang).toLowerCase().includes(q) ||
          Object.values(v.titles).some((t) => t?.toLowerCase().includes(q))
        );
      }),
    [level, category, series, query, lang],
  );

  const continueVideo = useMemo(() => {
    const entries = Object.entries(progress)
      .filter(([id]) => VIDEO_INDEX.some((v) => v.id === id))
      .sort((a, b) => b[1].updatedAt - a[1].updatedAt);
    if (!entries.length) return null;
    const [id, p] = entries[0];
    const video = VIDEO_INDEX.find((v) => v.id === id)!;
    return { video, pct: Math.min(100, Math.round((p.pos / Math.max(1, p.total)) * 100)) };
  }, [progress]);

  const openVideo = (id: string, free: boolean) => {
    if (!free && !profile.vip) {
      setPaywall(true);
      return;
    }
    router.push(`/watch/${id}`);
  };

  const submitLink = () => {
    const id = extractYoutubeId(link);
    if (!id) return;
    addCustomVideo({ youtubeId: id, title: id, addedAt: Date.now() });
    setLink("");
    router.push(`/watch/custom-${id}`);
  };

  return (
    <div className="page">
      <header style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--accent)" }} />
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--navy)", letterSpacing: "-.02em" }}>
          {ui.app.name}
        </h1>
        <span
          style={{
            marginLeft: "auto",
            fontSize: 11,
            fontWeight: 700,
            color: "var(--navy)",
            background: "var(--muted-bg)",
            border: "1px solid var(--border)",
            padding: "4px 10px",
            borderRadius: 999,
          }}
        >
          {profile.vip ? ui.profile.planVip : ui.common.free}
        </span>
      </header>

      <div
        style={{
          marginTop: 16,
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "var(--muted-bg)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          padding: "11px 14px",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={ui.common.search}
          style={{ border: "none", background: "transparent", outline: "none", fontSize: 14, width: "100%", fontFamily: "inherit" }}
        />
      </div>

      <div style={{ display: "flex", gap: 14, marginTop: 16, overflowX: "auto", paddingBottom: 4 }}>
        {SERIES.map((s) => {
          const first = VIDEO_INDEX.find((v) => seriesOf(v.id) === s.key);
          if (!first) return null;
          const on = series === s.key;
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => setSeries(on ? "all" : s.key)}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "center", flexShrink: 0, width: 76, padding: 0 }}
            >
              <span
                style={{
                  display: "block", width: 62, height: 62, margin: "0 auto", borderRadius: "50%", overflow: "hidden",
                  border: on ? "3px solid var(--accent)" : "2px solid var(--border)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`https://i.ytimg.com/vi/${first.youtubeId}/hqdefault.jpg`} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </span>
              <span style={{ display: "block", fontSize: 11, fontWeight: on ? 800 : 600, color: on ? "var(--accent)" : "var(--navy)", marginTop: 6, lineHeight: 1.3 }}>
                {ui.series[s.key as keyof typeof ui.series]}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 14, overflowX: "auto", paddingBottom: 2 }}>
        {LEVELS.map((l) => (
          <button key={l} type="button" className={`chip${level === l ? " on" : ""}`} onClick={() => setLevel(l)}>
            {l === "all" ? ui.common.allLevels : l}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 8, overflowX: "auto", paddingBottom: 2 }}>
        {(["all", "conversation", "podcast", "anime", "song"] as const).map((c) => (
          <button key={c} type="button" className={`chip${category === c ? " on" : ""}`} onClick={() => setCategory(c)}>
            {c === "all" ? ui.categories.all : ui.categories[c]}
          </button>
        ))}
      </div>

      <Link
        href="/drive"
        className="card"
        style={{
          display: "flex", gap: 12, alignItems: "center", marginTop: 16,
          textDecoration: "none", color: "inherit", background: "var(--navy)", borderColor: "var(--navy)",
        }}
      >
        <span
          aria-hidden
          style={{
            width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
            background: "#fff", color: "var(--navy)", display: "flex",
            alignItems: "center", justifyContent: "center",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </span>
        <span style={{ minWidth: 0, flex: 1 }}>
          <span style={{ display: "block", fontSize: 15, fontWeight: 700, color: "#fff" }}>{ui.drive.title}</span>
          <span style={{ display: "block", fontSize: 12, color: "#c9d8ee", marginTop: 2, lineHeight: 1.4 }}>{ui.drive.hint}</span>
        </span>
      </Link>

      <h2 style={{ fontSize: 16, fontWeight: 700, margin: "20px 0 4px" }}>{ui.paths.title}</h2>
      <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>{ui.paths.subtitle}</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
        {PATHS.map((p) => {
          const info = ui.paths[p.id];
          const done = p.items.filter((id) => {
            const pr = progress[id];
            return pr && pr.total > 0 && pr.pos / pr.total >= 0.9;
          }).length;
          return (
            <Link
              key={p.id}
              href={`/paths/${p.id}`}
              className="card"
              style={{ textDecoration: "none", color: "inherit", display: "block" }}
            >
              <span style={{ display: "block", fontSize: 14, fontWeight: 700, color: "var(--navy)", lineHeight: 1.3 }}>{info.name}</span>
              <span style={{ display: "block", fontSize: 11, color: "var(--muted)", marginTop: 4, lineHeight: 1.45 }}>{info.desc}</span>
              <span style={{ display: "block", fontSize: 11, fontWeight: 700, color: "var(--navy)", marginTop: 8 }}>
                {done}/{p.items.length} {ui.paths.lessons}
              </span>
              <span className="progress-track" style={{ display: "block", marginTop: 5 }}>
                <i style={{ width: `${(done / p.items.length) * 100}%` }} />
              </span>
            </Link>
          );
        })}
      </div>

      {continueVideo && (
        <>
          <h2 style={{ fontSize: 16, fontWeight: 700, margin: "18px 0 12px" }}>{ui.common.continueWatching}</h2>
          <button
            type="button"
            className="card"
            style={{ display: "flex", gap: 12, alignItems: "center", width: "100%", textAlign: "left", cursor: "pointer", fontFamily: "inherit" }}
            onClick={() => openVideo(continueVideo.video.id, continueVideo.video.free)}
          >
            <span className="thumb" style={{ width: 128, height: 76 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`https://i.ytimg.com/vi/${continueVideo.video.youtubeId}/hqdefault.jpg`} alt="" />
              <span className="dur">{formatDuration(continueVideo.video.durationSec)}</span>
            </span>
            <span style={{ minWidth: 0, flex: 1 }}>
              <span style={{ display: "block", fontSize: 14, fontWeight: 600, lineHeight: 1.35 }}>
                {pickText(continueVideo.video.titles, lang)}
              </span>
              <span className="progress-track" style={{ display: "block", marginTop: 10 }}>
                <i style={{ width: `${continueVideo.pct}%` }} />
              </span>
              <span style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 12, color: "var(--muted)", marginTop: 6 }}>
                <span className="lvl">{continueVideo.video.level}</span>
                {ui.categories[continueVideo.video.category]}
              </span>
            </span>
          </button>
        </>
      )}

      <h2 style={{ fontSize: 16, fontWeight: 700, margin: "18px 0 4px" }}>
        {ui.tabs.video} <span style={{ fontSize: 13, fontWeight: 600, color: "var(--muted)" }}>· {filtered.length}</span>
      </h2>
      {filtered.map((v) => (
        <div key={v.id} style={{ position: "relative" }}>
        <button type="button" onClick={() => openVideo(v.id, v.free)} style={rowStyle}>
          <span className="thumb" style={{ width: 112, height: 66 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`} alt="" />
            <span className="tag">{v.free ? <span className="free-badge">{ui.common.free}</span> : <span className="lock-badge">VIP</span>}</span>
            <span className="dur">{formatDuration(v.durationSec)}</span>
          </span>
          <span style={{ minWidth: 0 }}>
            <span style={{ display: "block", fontSize: 14, fontWeight: 600, lineHeight: 1.35 }}>{pickText(v.titles, lang)}</span>
            <span style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
              <span className="lvl">{v.level}</span>
              {ui.categories[v.category]}
            </span>
          </span>
        </button>
        <button
          type="button"
          aria-label={ui.queue.add}
          title={ui.queue.add}
          onClick={() => toggleQueue(v.id)}
          style={{
            position: "absolute", right: 8, bottom: 10, width: 30, height: 30, borderRadius: "50%",
            border: "1px solid var(--border)", cursor: "pointer", fontFamily: "inherit",
            fontSize: 15, fontWeight: 800, lineHeight: 1,
            background: queue.includes(v.id) ? "var(--accent)" : "var(--card)",
            color: queue.includes(v.id) ? "#fff" : "var(--navy)",
          }}
        >
          {queue.includes(v.id) ? "✓" : "+"}
        </button>
        </div>
      ))}

      <h2 style={{ fontSize: 16, fontWeight: 700, margin: "20px 0 10px" }}>{ui.player.addOwnVideo}</h2>
      <div style={{ display: "flex", gap: 8 }}>
        <input className="input" value={link} onChange={(e) => setLink(e.target.value)} placeholder="youtube.com/watch?v=..." />
        <button type="button" className="btn-primary" style={{ width: "auto", padding: "12px 18px" }} onClick={submitLink}>
          +
        </button>
      </div>
      {custom.map((c) => (
        <Link key={c.youtubeId} href={`/watch/custom-${c.youtubeId}`} style={{ ...rowStyle, textDecoration: "none" }}>
          <span className="thumb" style={{ width: 112, height: 66 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://i.ytimg.com/vi/${c.youtubeId}/hqdefault.jpg`} alt="" />
            <span className="tag"><span className="free-badge">{ui.player.autoSubtitles}</span></span>
          </span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>{c.title}</span>
        </Link>
      ))}

      {paywall && <Paywall onClose={() => setPaywall(false)} />}
    </div>
  );
}
