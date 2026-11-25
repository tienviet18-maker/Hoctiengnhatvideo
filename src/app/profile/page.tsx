"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLang } from "../../components/LangProvider";
import Paywall from "../../components/Paywall";
import Link from "next/link";
import { LANGUAGE_CODES, LANGUAGE_NAMES, pickText } from "../../lib/i18n";
import { VIMAI_APPS, writeReviewUrl } from "../../lib/vimai";

const RESET_LABEL = { vi: "Làm lại từ đầu (xoá dữ liệu trên máy này)", en: "Start over (clear data on this device)" };

export default function ProfilePage() {
  const { ui, lang, profile, updateProfile } = useLang();
  const router = useRouter();
  const [paywall, setPaywall] = useState(false);

  const reviewUrl = writeReviewUrl();
  const rowLink: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", minHeight: 44,
    textDecoration: "none", color: "var(--text)", fontSize: 15, fontWeight: 600,
  };

  const resetAll = () => {
    for (const k of Object.keys(window.localStorage)) {
      if (k.startsWith("vimai-video:")) window.localStorage.removeItem(k);
    }
    router.push("/onboarding");
  };

  return (
    <div className="page">
      <header style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--accent)" }} />
        <h1 style={{ fontSize: 20, fontWeight: 800, color: "var(--navy)", letterSpacing: "-.02em" }}>
          {ui.tabs.profile}
        </h1>
      </header>

      <div className="card" style={{ marginTop: 18, padding: 16, display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 46, height: 46, borderRadius: "50%", background: "var(--navy)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 18 }}>
          {(profile.name || "V").slice(0, 1).toUpperCase()}
        </span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 16 }}>{profile.name || ui.app.name}</div>
          <div style={{ fontSize: 13, color: "var(--muted)" }}>
            {ui.profile.plan}: {profile.vip ? ui.profile.planVip : ui.profile.planFree}
          </div>
        </div>
        {!profile.vip && (
          <button type="button" onClick={() => setPaywall(true)} style={{ marginLeft: "auto", background: "var(--navy)", color: "#fff", border: "none", fontWeight: 700, fontSize: 13, padding: "9px 14px", borderRadius: 9, cursor: "pointer", fontFamily: "inherit" }}>
            {ui.paywall.upgrade}
          </button>
        )}
      </div>

      <div className="card" style={{ marginTop: 14, padding: 0, overflow: "hidden" }}>
        <Link href="/paths" style={rowLink}>
          {ui.me.paths}
          <span aria-hidden style={{ marginLeft: "auto", color: "var(--muted)" }}>›</span>
        </Link>
        {reviewUrl && (
          <a href={reviewUrl} style={{ ...rowLink, borderTop: "1px solid var(--border)" }}>
            <span>
              <span style={{ display: "block" }}>{ui.me.rate}</span>
              <span style={{ display: "block", fontSize: 12, fontWeight: 400, color: "var(--muted)", marginTop: 2 }}>{ui.me.rateHint}</span>
            </span>
            <span aria-hidden style={{ marginLeft: "auto", color: "var(--muted)" }}>›</span>
          </a>
        )}
      </div>

      <h2 style={{ fontSize: 16, fontWeight: 700, margin: "22px 0 10px" }}>{ui.profile.language}</h2>
      <div style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
        {LANGUAGE_CODES.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => updateProfile({ lang: code })}
            style={{
              display: "flex", width: "100%", alignItems: "center", padding: "13px 16px", cursor: "pointer",
              background: code === lang ? "#EAF0F8" : "#fff", border: "none", borderBottom: "1px solid var(--border)",
              fontSize: 15, fontWeight: code === lang ? 700 : 500, color: "var(--text)", fontFamily: "inherit", textAlign: "left",
            }}
          >
            {LANGUAGE_NAMES[code]}
            {code === lang && <span style={{ marginLeft: "auto", color: "var(--navy)", fontWeight: 800 }}>✓</span>}
          </button>
        ))}
      </div>

      <h2 style={{ fontSize: 16, fontWeight: 700, margin: "26px 0 4px" }}>{ui.me.vimaiTitle}</h2>
      <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>{ui.me.vimaiHint}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 10 }}>
        {VIMAI_APPS.map((a) => {
          const body = (
            <>
              <span aria-hidden style={{ width: 40, height: 40, borderRadius: 10, background: a.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 15, flexShrink: 0 }}>
                {a.name.slice(0, 2)}
              </span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: "block", fontSize: 15, fontWeight: 700 }}>{a.name}</span>
                <span style={{ display: "block", fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{ui.me[a.key]}</span>
              </span>
            </>
          );
          const st: React.CSSProperties = { display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "inherit" };
          return a.url ? (
            <a key={a.key} href={a.url} target="_blank" rel="noopener" className="card" style={st}>{body}</a>
          ) : (
            <div key={a.key} className="card" style={st}>{body}</div>
          );
        })}
      </div>

      <button type="button" onClick={resetAll} style={{ marginTop: 26, background: "none", border: "none", color: "var(--accent)", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
        {pickText(RESET_LABEL, lang)}
      </button>

      <footer style={{ marginTop: 28, paddingTop: 16, borderTop: "1px solid var(--border)", fontSize: 12, color: "var(--muted)", lineHeight: 1.6 }}>
        <div style={{ fontWeight: 700, color: "var(--navy)" }}>{ui.me.madeBy}</div>
        <div>© 2026 ViMai Ecosystem. All rights reserved.</div>
        <div>{ui.me.contentNote}</div>
      </footer>

      {paywall && <Paywall onClose={() => setPaywall(false)} />}
    </div>
  );
}
