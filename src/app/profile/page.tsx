"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLang } from "../../components/LangProvider";
import Paywall from "../../components/Paywall";
import { LANGUAGE_CODES, LANGUAGE_NAMES, pickText } from "../../lib/i18n";
import { VIMAI_APPS, writeReviewUrl } from "../../lib/vimai";

const RESET_LABEL = { vi: "Làm lại từ đầu (xoá dữ liệu trên máy này)", en: "Start over (clear data on this device)" };

const chevron = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="2" aria-hidden style={{ marginLeft: "auto", flexShrink: 0 }}>
    <path d="M9 6l6 6-6 6" />
  </svg>
);

export default function ProfilePage() {
  const { ui, lang, profile, updateProfile } = useLang();
  const router = useRouter();
  const [paywall, setPaywall] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const reviewUrl = writeReviewUrl();

  const row: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "0 16px", minHeight: 52,
    textDecoration: "none", color: "var(--text)", fontSize: 15, fontWeight: 600, background: "transparent",
    border: 0, fontFamily: "inherit", textAlign: "left", cursor: "pointer",
  };
  const divider: React.CSSProperties = { borderTop: "1px solid var(--border)" };

  const resetAll = () => {
    for (const k of Object.keys(window.localStorage)) {
      if (k.startsWith("vimai-video:")) window.localStorage.removeItem(k);
    }
    router.push("/onboarding");
  };

  return (
    <div className="page">
      <h1 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-.02em" }}>{ui.tabs.profile}</h1>

      <div className="card" style={{ marginTop: 14, padding: 14, display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--navy)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18, flexShrink: 0 }}>
          {(profile.name || "M").slice(0, 1).toUpperCase()}
        </span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 16 }}>{profile.name || ui.app.name}</div>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>{profile.vip ? ui.profile.planVip : ui.profile.planFree}</div>
        </div>
      </div>

      {!profile.vip && (
        <button
          type="button"
          onClick={() => setPaywall(true)}
          style={{
            marginTop: 10, width: "100%", border: 0, borderRadius: 14, padding: "14px 16px", cursor: "pointer", fontFamily: "inherit",
            background: "linear-gradient(135deg, #14213D 0%, #1F3864 60%, #8A2E1D 140%)", color: "#fff", textAlign: "left",
            display: "flex", alignItems: "center", gap: 12,
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".08em", color: "#14213D", background: "#F5C542", borderRadius: 6, padding: "3px 7px" }}>VIP</span>
          <span style={{ flex: 1, minWidth: 0 }}>
            <span style={{ display: "block", fontSize: 15, fontWeight: 700 }}>{ui.paywall.title}</span>
            <span style={{ display: "block", fontSize: 12, color: "#C9D4EA", marginTop: 2, lineHeight: 1.4 }}>{ui.paywall.subtitle}</span>
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden><path d="M9 6l6 6-6 6" /></svg>
        </button>
      )}

      <h2 style={{ fontSize: 15, fontWeight: 700, margin: "20px 0 8px" }}>{ui.me.vimaiTitle}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 }}>
        {VIMAI_APPS.map((a) => {
          const body = (
            <>
              <span aria-hidden style={{ width: 40, height: 40, borderRadius: 11, background: a.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>
                Vi
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, marginTop: 8, lineHeight: 1.25 }}>{a.name}</span>
              <span style={{ fontSize: 11, color: "var(--muted)", marginTop: 2, lineHeight: 1.35 }}>{ui.me[a.key]}</span>
            </>
          );
          const st: React.CSSProperties = { display: "flex", flexDirection: "column", alignItems: "flex-start", padding: 12, textDecoration: "none", color: "inherit", minHeight: 44 };
          return a.url ? (
            <a key={a.key} href={a.url} target="_blank" rel="noopener" className="card" style={st}>{body}</a>
          ) : (
            <div key={a.key} className="card" style={st}>{body}</div>
          );
        })}
      </div>

      <div className="card" style={{ marginTop: 20, padding: 0, overflow: "hidden" }}>
        <button type="button" style={row} onClick={() => setLangOpen(true)} aria-haspopup="dialog">
          {ui.profile.language}
          <span style={{ marginLeft: "auto", fontSize: 14, fontWeight: 500, color: "var(--muted)" }}>{LANGUAGE_NAMES[lang]}</span>
          {chevron}
        </button>
        <Link href="/paths" style={{ ...row, ...divider }}>
          {ui.me.paths}
          {chevron}
        </Link>
        {reviewUrl && (
          <a href={reviewUrl} style={{ ...row, ...divider }}>
            {ui.me.rate}
            {chevron}
          </a>
        )}
      </div>

      <button type="button" onClick={resetAll} style={{ marginTop: 18, minHeight: 44, background: "none", border: "none", color: "var(--accent)", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", padding: 0 }}>
        {pickText(RESET_LABEL, lang)}
      </button>

      <footer style={{ marginTop: 12, fontSize: 11.5, color: "var(--muted)", lineHeight: 1.6 }}>
        <div style={{ fontWeight: 700, color: "var(--navy)" }}>{ui.me.madeBy}</div>
        <div>© 2026 ViMai Ecosystem. All rights reserved.</div>
        <div>{ui.me.contentNote}</div>
      </footer>

      {langOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={ui.profile.language}
          onClick={() => setLangOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(11,18,32,.5)", zIndex: 60, display: "flex", alignItems: "flex-end", justifyContent: "center" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "#fff", width: "100%", maxWidth: 430, borderRadius: "20px 20px 0 0", padding: "8px 0 calc(16px + env(safe-area-inset-bottom))", maxHeight: "75vh", overflowY: "auto" }}
          >
            <div aria-hidden style={{ width: 36, height: 4, borderRadius: 2, background: "var(--border)", margin: "4px auto 10px" }} />
            <div style={{ fontSize: 16, fontWeight: 700, padding: "0 20px 8px" }}>{ui.profile.language}</div>
            {LANGUAGE_CODES.map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => {
                  updateProfile({ lang: code });
                  setLangOpen(false);
                }}
                style={{ ...row, padding: "0 20px", fontWeight: code === lang ? 700 : 500, background: code === lang ? "#EAF0F8" : "transparent" }}
              >
                {LANGUAGE_NAMES[code]}
                {code === lang && <span style={{ marginLeft: "auto", color: "var(--navy)", fontWeight: 800 }}>✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {paywall && <Paywall onClose={() => setPaywall(false)} />}
    </div>
  );
}
