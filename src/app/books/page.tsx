"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLang } from "../../components/LangProvider";
import Paywall from "../../components/Paywall";
import StoryCover from "../../components/StoryCover";
import { STORY_INDEX, type StoryIndexItem } from "../../lib/catalog.generated";
import { pickText } from "../../lib/i18n";
import type { JlptLevel } from "../../lib/content-schema";
import { PROGRESS_KEY, useLocalJson, type Progress } from "../../lib/store";

const LEVELS: (JlptLevel | "all")[] = ["all", "N5", "N4", "N3", "N2", "N1"];
const EMPTY_PROGRESS: Record<string, Progress> = {};

/** Thứ tự kệ trong tab Truyện (docs/ux-plan.md mục 2.2). folktale = cổ tích/ngụ ngôn của gói cũ. */
const SHELF_ORDER = ["rakugo", "mystery", "ghost", "literature", "folktale-jp", "hometown", "world", "life-series", "folktale", "life"] as const;
type ShelfKey = (typeof SHELF_ORDER)[number];

/** Gói v2 có shelf; gói cũ suy ra từ topic/source. */
function shelfOf(s: StoryIndexItem): ShelfKey {
  if (s.shelf) return s.shelf;
  if (s.topic === "classics") return "literature";
  if (s.topic === "folktale") return "folktale";
  return "life";
}

/** Một bộ truyện nhiều chương chỉ hiện chương đầu trên kệ (hoặc chương đang nghe dở). */
function collapseSeries(list: StoryIndexItem[], progress: Record<string, Progress>): StoryIndexItem[] {
  const out: StoryIndexItem[] = [];
  const seen = new Map<string, number>();
  for (const s of list) {
    if (!s.series) {
      out.push(s);
      continue;
    }
    const at = seen.get(s.series.id);
    if (at === undefined) {
      seen.set(s.series.id, out.length);
      out.push(s);
      continue;
    }
    const cur = out[at];
    const pCur = progress[cur.id]?.updatedAt ?? 0;
    const pNew = progress[s.id]?.updatedAt ?? 0;
    if (pNew > pCur || (!pCur && !pNew && s.series.index < cur.series!.index)) out[at] = s;
  }
  return out;
}

export default function BooksPage() {
  const { ui, lang, profile } = useLang();
  const router = useRouter();
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("all");
  const [open, setOpen] = useState<ShelfKey | null>(null);
  const [paywall, setPaywall] = useState(false);
  const progress = useLocalJson(PROGRESS_KEY, EMPTY_PROGRESS);

  const shelves = useMemo(() => {
    const filtered = STORY_INDEX.filter((s) => level === "all" || s.level === level);
    const by = new Map<ShelfKey, StoryIndexItem[]>();
    for (const s of filtered) {
      const k = shelfOf(s);
      if (!by.has(k)) by.set(k, []);
      by.get(k)!.push(s);
    }
    return SHELF_ORDER.filter((k) => by.has(k)).map((k) => ({ key: k, items: collapseSeries(by.get(k)!, progress) }));
  }, [level, progress]);

  const pctOf = (id: string) => {
    const p = progress[id];
    return p ? Math.min(100, Math.round((p.pos / Math.max(1, p.total)) * 100)) : 0;
  };

  const openStory = (s: StoryIndexItem) => {
    if (!s.free && !profile.vip) {
      setPaywall(true);
      return;
    }
    router.push(`/read/${s.id}`);
  };

  const tile = (s: StoryIndexItem, width: number) => (
    <button
      key={s.id}
      type="button"
      onClick={() => openStory(s)}
      style={{ width, flexShrink: 0, background: "none", border: 0, padding: 0, cursor: "pointer", textAlign: "left", fontFamily: "inherit", color: "inherit" }}
    >
      <StoryCover story={s} title={pickText(s.titles, lang)} width={width} pct={pctOf(s.id)} />
      <span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", fontSize: 12.5, fontWeight: 600, lineHeight: 1.35, marginTop: 6 }}>
        {pickText(s.titles, lang)}
      </span>
    </button>
  );

  if (open) {
    const shelf = shelves.find((s) => s.key === open);
    return (
      <div className="page">
        <button type="button" onClick={() => setOpen(null)} className="link-btn" style={{ fontSize: 14, fontWeight: 600 }}>
          ← {ui.tabs.books}
        </button>
        <h1 style={{ fontSize: 22, fontWeight: 800, marginTop: 6 }}>
          {ui.shelves[open]} <span style={{ fontSize: 14, color: "var(--muted)", fontWeight: 600 }}>· {shelf?.items.length ?? 0}</span>
        </h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "16px 12px", marginTop: 16 }}>
          {shelf?.items.map((s) => (
            <div key={s.id} style={{ minWidth: 0 }}>{tile(s, 104)}</div>
          ))}
        </div>
        {paywall && <Paywall onClose={() => setPaywall(false)} />}
      </div>
    );
  }

  return (
    <div className="page">
      <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.02em" }}>{ui.tabs.books}</h1>

      <Link
        href="/drive"
        className="card"
        style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 14, textDecoration: "none", background: "var(--navy)", borderColor: "var(--navy)" }}
      >
        <span aria-hidden style={{ width: 44, height: 44, borderRadius: "50%", flexShrink: 0, background: "#fff", color: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
        </span>
        <span style={{ minWidth: 0, flex: 1 }}>
          <span style={{ display: "block", fontSize: 15, fontWeight: 700, color: "#fff" }}>{ui.drive.title}</span>
          <span style={{ display: "block", fontSize: 12, color: "#c9d8ee", marginTop: 2, lineHeight: 1.4 }}>{ui.drive.hint}</span>
        </span>
      </Link>

      <div style={{ display: "flex", gap: 8, marginTop: 14, overflowX: "auto", paddingBottom: 2 }}>
        {LEVELS.map((l) => (
          <button key={l} type="button" className={`chip${level === l ? " on" : ""}`} onClick={() => setLevel(l)}>
            {l === "all" ? ui.common.allLevels : l}
          </button>
        ))}
      </div>

      {shelves.map((sh) => (
        <section key={sh.key} style={{ marginTop: 22 }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
            <h2 style={{ fontSize: 17, fontWeight: 700 }}>
              {ui.shelves[sh.key]} <span style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>· {sh.items.length}</span>
            </h2>
            {sh.items.length > 3 && (
              <button type="button" className="link-btn" style={{ fontSize: 13, fontWeight: 600 }} onClick={() => setOpen(sh.key)}>
                {ui.common.seeAll}
              </button>
            )}
          </div>
          <div style={{ display: "flex", gap: 12, overflowX: "auto", margin: "10px -20px 0", padding: "0 20px 4px" }}>
            {sh.items.slice(0, 12).map((s) => tile(s, 104))}
          </div>
        </section>
      ))}

      {paywall && <Paywall onClose={() => setPaywall(false)} />}
    </div>
  );
}
