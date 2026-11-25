"use client";

import { useLang } from "../../components/LangProvider";

export default function NewsPage() {
  const { ui } = useLang();
  return (
    <div className="page" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: 14 }}>
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="var(--navy)" strokeWidth="1.6" strokeLinecap="round">
        <path d="M4 6h16M4 12h16M4 18h10" />
      </svg>
      <div style={{ fontSize: 18, fontWeight: 700, color: "var(--navy)" }}>{ui.tabs.news}</div>
      <div style={{ fontSize: 14, color: "var(--muted)" }}>{ui.news.comingSoon}</div>
    </div>
  );
}
