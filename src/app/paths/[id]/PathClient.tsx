"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLang } from "../../../components/LangProvider";
import Paywall from "../../../components/Paywall";
import { STORY_INDEX, VIDEO_INDEX } from "../../../lib/catalog.generated";
import { pickText } from "../../../lib/i18n";
import { getPath } from "../../../lib/paths";
import { PROGRESS_KEY, useLocalJson, type Progress } from "../../../lib/store";
import { useState } from "react";

const STORY_MAP = new Map(STORY_INDEX.map((s) => [s.id, s]));
const VIDEO_MAP = new Map(VIDEO_INDEX.map((v) => [v.id, v]));

export default function PathClient({ pathId }: { pathId: string }) {
  const { ui, lang, profile } = useLang();
  const router = useRouter();
  const [paywall, setPaywall] = useState(false);
  const progress = useLocalJson<Record<string, Progress>>(PROGRESS_KEY, {});

  const path = getPath(pathId);
  const items = useMemo(() => {
    if (!path) return [];
    return path.items
      .map((id) => {
        const story = STORY_MAP.get(id);
        if (story) return { id, kind: "story" as const, titles: story.titles, level: story.level, free: story.free };
        const video = VIDEO_MAP.get(id);
        if (video) return { id, kind: "video" as const, titles: video.titles, level: video.level, free: video.free };
        return null;
      })
      .filter((x) => x !== null);
  }, [path]);

  if (!path) {
    return (
      <div className="page">
        <Link href="/" style={{ color: "var(--navy)", textDecoration: "none", fontWeight: 600 }}>← {ui.common.back}</Link>
      </div>
    );
  }

  const info = ui.paths[path.id];
  const doneCount = items.filter((it) => {
    const p = progress[it.id];
    return p && p.total > 0 && p.pos / p.total >= 0.9;
  }).length;

  const open = (it: (typeof items)[number]) => {
    if (it.kind === "story" && !it.free && !profile.vip) {
      setPaywall(true);
      return;
    }
    router.push(it.kind === "story" ? `/read/${it.id}` : `/watch/${it.id}`);
  };

  return (
    <div className="page">
      <Link href="/" style={{ color: "var(--navy)", textDecoration: "none", fontWeight: 600, fontSize: 14 }}>← {ui.common.back}</Link>
      <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--navy)", letterSpacing: "-.02em", marginTop: 12 }}>
        {info.name}
      </h1>
      <p style={{ marginTop: 6, fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{info.desc}</p>
      <p style={{ marginTop: 10, fontSize: 13, fontWeight: 700, color: "var(--navy)" }}>
        {doneCount} / {items.length} {ui.paths.lessons}
      </p>
      <div className="progress-track" style={{ marginTop: 6 }}>
        <i style={{ width: `${items.length ? (doneCount / items.length) * 100 : 0}%` }} />
      </div>

      <div style={{ marginTop: 10 }}>
        {items.map((it, i) => {
          const p = progress[it.id];
          const ratio = p && p.total > 0 ? p.pos / p.total : 0;
          const done = ratio >= 0.9;
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => open(it)}
              style={{
                display: "flex", gap: 12, alignItems: "center", width: "100%", textAlign: "left",
                padding: "13px 0", background: "none", border: "none",
                borderBottom: "1px solid var(--border)", cursor: "pointer",
                color: "inherit", fontFamily: "inherit",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 34, height: 34, borderRadius: "50%", flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 800,
                  background: done ? "var(--ok)" : ratio > 0 ? "#eaf0f8" : "var(--muted-bg)",
                  color: done ? "#fff" : "var(--navy)",
                  border: done ? "none" : "1px solid var(--border)",
                }}
              >
                {done ? "✓" : i + 1}
              </span>
              <span style={{ minWidth: 0, flex: 1 }}>
                <span style={{ display: "block", fontSize: 14, fontWeight: 600, lineHeight: 1.35 }}>
                  {pickText(it.titles, lang)}
                </span>
                <span style={{ display: "block", fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                  {it.kind === "story" ? ui.tabs.books : ui.tabs.video}
                  {done ? ` · ${ui.paths.done}` : ratio > 0 ? ` · ${Math.round(ratio * 100)}%` : ""}
                </span>
              </span>
              <span className="lvl">{it.level}</span>
              {it.free ? <span className="free-badge">{ui.common.free}</span> : <span className="lock-badge">{ui.common.vip}</span>}
            </button>
          );
        })}
      </div>

      {paywall && <Paywall onClose={() => setPaywall(false)} />}
    </div>
  );
}
