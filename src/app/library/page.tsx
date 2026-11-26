"use client";

import { useEffect, useMemo, useState } from "react";
import DeckShelf from "./DeckShelf";
import { useLang } from "../../components/LangProvider";
import { pickText } from "../../lib/i18n";
import {
  ACTIVITY_KEY,
  DECK_KEY,
  reviewCard,
  useLocalJson,
  type DayActivity,
  type DeckCard,
} from "../../lib/store";

function Ring({ pct, size = 74, stroke = 7 }: { pct: number; size?: number; stroke?: number }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const clamped = Math.max(0, Math.min(1, pct));
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--accent)" strokeWidth={stroke}
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - clamped)}
      />
    </svg>
  );
}

const GOALS = { videos: 1, stories: 1, minutes: 5 };
const EMPTY_ACTIVITY: Record<string, DayActivity> = {};
const EMPTY_DECK: DeckCard[] = [];

function dayKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const DAY_MS = 24 * 60 * 60 * 1000;

type Extra = { r: string; ex: { ja: string; t: Record<string, string> }; aw?: string; ae?: string };

function play(id?: string) {
  if (!id) return;
  void new Audio(`/audio/bjt/${id}.mp3`).play().catch(() => {});
}

export default function LibraryPage() {
  const { ui, lang } = useLang();
  const deck = useLocalJson<DeckCard[]>(DECK_KEY, EMPTY_DECK);
  const activity = useLocalJson<Record<string, DayActivity>>(ACTIVITY_KEY, EMPTY_ACTIVITY);
  const [gradedIds, setGradedIds] = useState<string[]>([]);
  const [flipped, setFlipped] = useState(false);
  const [now, setNow] = useState(0);
  // Câu ví dụ + giọng đọc cho từ tự lưu từ truyện/video (public/decks/extras.json), tải khi cần
  const [extras, setExtras] = useState<Record<string, Extra> | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setNow(Date.now()), 0);
    const iv = window.setInterval(() => setNow(Date.now()), 30000);
    return () => {
      window.clearTimeout(t);
      window.clearInterval(iv);
    };
  }, []);

  const today = now
    ? activity[dayKey(new Date(now))] ?? { videos: 0, stories: 0, minutes: 0 }
    : { videos: 0, stories: 0, minutes: 0 };

  const streak = useMemo(() => {
    if (!now) return 0;
    const has = (ts: number) => {
      const a = activity[dayKey(new Date(ts))];
      return !!a && a.videos + a.stories + a.minutes > 0;
    };
    let n = 0;
    let cursor = now;
    if (!has(cursor)) cursor -= DAY_MS;
    while (has(cursor)) {
      n += 1;
      cursor -= DAY_MS;
    }
    return n;
  }, [activity, now]);

  const queue = useMemo(() => {
    if (!now) return [];
    return deck
      .filter((c) => c.due <= now && !gradedIds.includes(c.id))
      .sort((a, b) => a.due - b.due);
  }, [deck, gradedIds, now]);

  const dueTotal = useMemo(() => {
    if (!now) return 0;
    return deck.filter((c) => c.due <= now).length;
  }, [deck, now]);

  const current = queue[0];
  const needExtras = !!current && !current.example && extras === null;
  useEffect(() => {
    if (!needExtras) return;
    let off = false;
    fetch("/decks/extras.json")
      .then((r) => r.json())
      .then((x) => !off && setExtras(x))
      .catch(() => !off && setExtras({}));
    return () => {
      off = true;
    };
  }, [needExtras]);
  const extra = current && !current.example ? extras?.[current.word] : undefined;
  const example = current?.example ?? (extra && extra.r === current?.reading ? extra.ex : undefined);
  const aw = current?.aw ?? (example ? extra?.aw : undefined);
  const ae = current?.ae ?? (example ? extra?.ae : undefined);
  const grade = (g: "again" | "good") => {
    if (!current) return;
    reviewCard(current.id, g);
    setGradedIds((ids) => [...ids, current.id]);
    setFlipped(false);
  };

  const goalItems = [
    { label: ui.library.goalVideos, value: today.videos, goal: GOALS.videos },
    { label: ui.library.goalStories, value: today.stories, goal: GOALS.stories },
    { label: ui.library.goalMinutes, value: today.minutes, goal: GOALS.minutes },
  ];

  return (
    <div className="page">
      <header style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--accent)" }} />
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--navy)", letterSpacing: "-.02em" }}>
          {ui.tabs.library}
        </h1>
        <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, color: "var(--navy)", background: "#EAF0F8", padding: "5px 10px", borderRadius: 999 }}>
          {ui.library.streak}: {streak} {ui.library.days}
        </span>
      </header>

      <h2 style={{ fontSize: 16, fontWeight: 700, margin: "20px 0 12px" }}>{ui.library.todayGoal}</h2>
      <div style={{ display: "flex", gap: 10 }}>
        {goalItems.map((g) => (
          <div key={g.label} className="card" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 6px" }}>
            <div style={{ position: "relative" }}>
              <Ring pct={g.value / g.goal} />
              <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "var(--navy)" }}>
                {g.value}/{g.goal}
              </span>
            </div>
            <span style={{ fontSize: 12, color: "var(--muted)", textAlign: "center" }}>{g.label}</span>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 16, fontWeight: 700, margin: "22px 0 12px" }}>
        {ui.library.reviewToday} · {dueTotal} {ui.library.dueCards}
      </h2>
      {current ? (
        <div className="card" style={{ padding: 18 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <span className="jp" style={{ fontSize: 26, fontWeight: 700 }}>{current.word}</span>
            <span className="jp" style={{ fontSize: 14, color: "var(--muted)" }}>{current.reading}</span>
            <span className="lvl" style={{ marginLeft: "auto" }}>{current.level}</span>
          </div>
          {flipped ? (
            <>
              <div style={{ fontSize: 16, marginTop: 12 }}>{pickText(current.meanings, lang)}</div>
              {current.form && (
                <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 6 }}>
                  {ui.library.form}: <span lang="ja" className="jp" style={{ color: "var(--text)" }}>{current.form}</span>
                </div>
              )}
              {current.keigoMap && (
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 10, fontSize: 14 }}>
                  <tbody>
                    {([
                      [ui.library.keigoPlain, current.keigoMap.plain],
                      [ui.library.keigoTeinei, current.keigoMap.teinei],
                      [ui.library.keigoSonkei, current.keigoMap.sonkei],
                      [ui.library.keigoKenjou, current.keigoMap.kenjou],
                    ] as [string, string][]).map(([k, v]) => (
                      <tr key={k} style={{ borderTop: "1px solid var(--border)" }}>
                        <td style={{ padding: "6px 8px 6px 0", color: "var(--muted)", fontSize: 12, whiteSpace: "nowrap" }}>{k}</td>
                        <td lang="ja" className="jp" style={{ padding: "6px 0", fontWeight: 600 }}>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {example && (
                <div style={{ marginTop: 12, background: "#F7F9FC", borderRadius: 10, padding: "10px 12px" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)" }}>{ui.library.example}</div>
                  <div lang="ja" className="jp" style={{ fontSize: 15, marginTop: 2, lineHeight: 1.6 }}>{example.ja}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{pickText(example.t, lang)}</div>
                </div>
              )}
              {(aw || ae) && (
                <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 13, fontWeight: 600 }}>
                  {aw && <button type="button" className="link-btn" onClick={() => play(aw)}>▶ {ui.library.playWord}</button>}
                  {ae && <button type="button" className="link-btn" onClick={() => play(ae)}>▶ {ui.library.playExample}</button>}
                </div>
              )}
              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button type="button" onClick={() => grade("again")} style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "1px solid var(--accent)", background: "#fff", color: "var(--accent)", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  {ui.library.again}
                </button>
                <button type="button" onClick={() => grade("good")} style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "none", background: "var(--navy)", color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  {ui.library.good}
                </button>
              </div>
            </>
          ) : (
            <button type="button" className="btn-primary" style={{ marginTop: 16 }} onClick={() => setFlipped(true)}>
              {ui.library.showMeaning}
            </button>
          )}
          <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 12, textAlign: "center" }}>
            {gradedIds.length + 1} / {gradedIds.length + queue.length}
          </div>
        </div>
      ) : (
        <div className="card" style={{ padding: 16, fontSize: 14, color: "var(--muted)", lineHeight: 1.6 }}>
          {ui.library.noDueCards}
        </div>
      )}

      <DeckShelf deck={deck} />

      <h2 style={{ fontSize: 16, fontWeight: 700, margin: "22px 0 8px" }}>
        {ui.library.savedWords} ({deck.length})
      </h2>
      {deck.map((c) => (
        <div key={c.id} style={{ display: "flex", gap: 10, alignItems: "baseline", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
          <span className="jp" style={{ fontWeight: 700, fontSize: 16 }}>{c.word}</span>
          <span className="jp" style={{ fontSize: 12, color: "var(--muted)" }}>{c.reading}</span>
          <span style={{ fontSize: 14, color: "var(--muted)", marginLeft: "auto", textAlign: "right" }}>{pickText(c.meanings, lang)}</span>
        </div>
      ))}
    </div>
  );
}
