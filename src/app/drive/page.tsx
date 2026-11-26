"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "../../components/LangProvider";
import Paywall from "../../components/Paywall";
import { LISTED_STORIES } from "../../lib/catalog.generated";
import { pickText } from "../../lib/i18n";
import type { JlptLevel } from "../../lib/content-schema";

const LEVELS: (JlptLevel | "all")[] = ["all", "N5", "N4", "N3", "N2", "N1"];

export default function DrivePage() {
  const { ui, lang, profile } = useLang();
  const router = useRouter();
  const [level, setLevel] = useState<(typeof LEVELS)[number]>("all");
  const [paywall, setPaywall] = useState(false);

  const filtered = useMemo(
    () => LISTED_STORIES.filter((s) => level === "all" || s.level === level),
    [level],
  );

  const open = (id: string, free: boolean) => {
    if (!free && !profile.vip) {
      setPaywall(true);
      return;
    }
    sessionStorage.setItem("vimai-drive-autoplay", "1");
    router.push(`/drive/${id}`);
  };

  return (
    <div className="page">
      <header style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--accent)" }} />
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--navy)", letterSpacing: "-.02em" }}>
          {ui.drive.title}
        </h1>
      </header>
      <p style={{ marginTop: 8, fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{ui.drive.hint}</p>

      <div style={{ display: "flex", gap: 8, marginTop: 16, overflowX: "auto", paddingBottom: 2 }}>
        {LEVELS.map((l) => (
          <button key={l} type="button" className={`chip${level === l ? " on" : ""}`} onClick={() => setLevel(l)}>
            {l === "all" ? ui.common.allLevels : l}
          </button>
        ))}
      </div>

      <div style={{ marginTop: 8 }}>
        {filtered.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => open(s.id, s.free)}
            style={{
              display: "flex", gap: 12, alignItems: "center", width: "100%", textAlign: "left",
              padding: "14px 0", background: "none", border: "none",
              borderBottom: "1px solid var(--border)", cursor: "pointer",
              color: "inherit", fontFamily: "inherit",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 44, height: 44, borderRadius: "50%", flexShrink: 0,
                background: "var(--navy)", color: "#fff", display: "flex",
                alignItems: "center", justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
            <span style={{ minWidth: 0, flex: 1 }}>
              <span style={{ display: "block", fontSize: 14, fontWeight: 600, lineHeight: 1.35 }}>
                {pickText(s.titles, lang)}
              </span>
              <span style={{ display: "block", fontSize: 12, color: "var(--muted)", marginTop: 2 }}>
                {s.sentenceCount} {ui.drive.sentence.toLowerCase()}
              </span>
            </span>
            <span className="lvl">{s.level}</span>
            {s.free && <span className="free-badge">{ui.common.free}</span>}
          </button>
        ))}
      </div>

      {paywall && <Paywall onClose={() => setPaywall(false)} />}
    </div>
  );
}
