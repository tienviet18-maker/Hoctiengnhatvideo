"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "../../components/LangProvider";
import Paywall from "../../components/Paywall";
import { STORY_INDEX } from "../../lib/catalog.generated";
import { pickText } from "../../lib/i18n";
import type { JlptLevel } from "../../lib/content-schema";
import { PROGRESS_KEY, useLocalJson, type Progress } from "../../lib/store";

const LEVELS: (JlptLevel | "all")[] = ["all", "N5", "N4", "N3", "N2", "N1"];

export default function BooksPage() {
  const { ui, lang, profile } = useLang();
  const router = useRouter();
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("all");
  const [paywall, setPaywall] = useState(false);
  const progress = useLocalJson<Record<string, Progress>>(PROGRESS_KEY, {});

  const filtered = useMemo(
    () => STORY_INDEX.filter((s) => level === "all" || s.level === level),
    [level],
  );

  const open = (id: string, free: boolean) => {
    if (!free && !profile.vip) {
      setPaywall(true);
      return;
    }
    router.push(`/read/${id}`);
  };

  return (
    <div className="page">
      <header style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--accent)" }} />
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--navy)", letterSpacing: "-.02em" }}>
          {ui.tabs.books}
        </h1>
      </header>

      <div style={{ display: "flex", gap: 8, marginTop: 16, overflowX: "auto", paddingBottom: 2 }}>
        {LEVELS.map((l) => (
          <button key={l} type="button" className={`chip${level === l ? " on" : ""}`} onClick={() => setLevel(l)}>
            {l === "all" ? ui.common.allLevels : l}
          </button>
        ))}
      </div>

      {filtered.map((s) => {
        const p = progress[s.id];
        const pct = p ? Math.min(100, Math.round((p.pos / Math.max(1, p.total)) * 100)) : 0;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => open(s.id, s.free)}
            style={{
              display: "block", width: "100%", textAlign: "left", marginTop: 14, cursor: "pointer", fontFamily: "inherit",
              border: "1px solid var(--border)", borderRadius: 16, padding: 0, overflow: "hidden", background: "#fff",
            }}
          >
            <span style={{ display: "flex", gap: 14, background: "var(--navy-dark)", color: "#fff", padding: "18px 18px 14px" }}>
              {s.cover && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.cover} alt="" width={72} height={96} loading="lazy"
                  style={{ flex: "none", width: 72, height: 96, borderRadius: 6, objectFit: "cover", boxShadow: "0 2px 8px rgba(0,0,0,.25)" }} />
              )}
              <span style={{ display: "block", flex: 1, minWidth: 0 }}>
              <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span className="lvl" style={{ background: "#fff" }}>{s.level}</span>
                {s.free ? <span className="free-badge">{ui.common.free}</span> : <span className="lock-badge">VIP</span>}
                <span style={{ marginLeft: "auto", fontSize: 12, color: "#B9CDE8" }}>
                  {s.sentenceCount} {ui.common.sentences}
                </span>
              </span>
              <span style={{ display: "block", fontSize: 18, fontWeight: 800, lineHeight: 1.35, marginTop: 10 }}>
                {pickText(s.titles, lang)}
              </span>
              </span>
            </span>
            <span style={{ display: "block", padding: "12px 18px 14px" }}>
              <span className="progress-track" style={{ display: "block" }}>
                <i style={{ width: `${pct}%` }} />
              </span>
              <span style={{ display: "block", fontSize: 12, color: "var(--muted)", marginTop: 6 }}>
                {ui.reader.progress} {pct}%
              </span>
            </span>
          </button>
        );
      })}

      {paywall && <Paywall onClose={() => setPaywall(false)} />}
    </div>
  );
}
