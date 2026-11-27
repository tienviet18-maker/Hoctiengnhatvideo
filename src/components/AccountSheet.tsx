"use client";

import { useState } from "react";
import { useLang } from "./LangProvider";
import { isInAppBrowser, resetPassword, signInEmail, signInGoogle, type AuthError } from "../lib/account";
import { FIREBASE_ENABLED } from "../lib/firebase-config";

const sheet: React.CSSProperties = {
  position: "fixed", inset: 0, background: "rgba(11,18,32,.55)", zIndex: 70,
  display: "flex", alignItems: "flex-end", justifyContent: "center",
};
const panel: React.CSSProperties = {
  background: "#fff", color: "var(--text)", width: "100%", maxWidth: 430,
  borderRadius: "20px 20px 0 0", padding: "22px 20px 28px", maxHeight: "92vh", overflowY: "auto",
};
const input: React.CSSProperties = {
  width: "100%", height: 46, borderRadius: 10, border: "1px solid var(--border)", padding: "0 12px",
  fontSize: 15, fontFamily: "inherit", marginTop: 8, color: "var(--text)", background: "#fff",
};

/** Màn đăng nhập (Google hoặc email + mật khẩu). Đóng khi đăng nhập xong (onDone). */
export default function AccountSheet({ onClose, onDone }: { onClose: () => void; onDone?: () => void }) {
  const { ui } = useLang();
  const a = ui.account;
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const inApp = isInAppBrowser();

  const errText = (e: AuthError) =>
    e === "wrong" ? a.errWrong : e === "weak" ? a.errWeak : e === "in-use" ? a.errInUse : e === "invalid-email" ? a.errEmail : a.errOther;

  const finish = (e: AuthError | null) => {
    setBusy(false);
    if (!e) {
      onDone?.();
      onClose();
    } else if (e !== "cancelled") setMsg(errText(e));
  };

  const google = async () => {
    setBusy(true);
    setMsg(null);
    finish(await signInGoogle());
  };
  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setBusy(true);
    setMsg(null);
    finish(await signInEmail(email, pw, mode === "signup"));
  };
  const forgot = async () => {
    if (!email.trim()) {
      setMsg(a.errEmail);
      return;
    }
    setBusy(true);
    const e = await resetPassword(email);
    setBusy(false);
    setMsg(e ? errText(e) : a.resetSent.replace("{email}", email.trim()));
  };

  return (
    <div style={sheet} onClick={onClose} role="dialog" aria-modal="true" aria-label={a.signIn}>
      <div style={panel} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--navy)" }}>{mode === "signup" ? a.signUp : a.signIn}</h2>
        <p style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 6, lineHeight: 1.5 }}>{a.why}</p>

        {!FIREBASE_ENABLED ? (
          <p style={{ marginTop: 18, fontWeight: 600 }}>{a.comingSoon}</p>
        ) : (
          <>
            {inApp && (
              <div style={{ marginTop: 14, background: "#FFF6DB", borderRadius: 10, padding: 12, fontSize: 13, lineHeight: 1.5 }}>
                {a.inApp}{" "}
                <button
                  type="button"
                  onClick={() => {
                    void navigator.clipboard?.writeText(window.location.href).then(() => setCopied(true));
                  }}
                  style={{ border: 0, background: "none", color: "var(--accent)", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", padding: 0 }}
                >
                  {copied ? a.copied : a.copyLink}
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={google}
              disabled={busy}
              style={{
                marginTop: 16, width: "100%", height: 48, borderRadius: 12, border: "1px solid var(--border)", background: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontSize: 15, fontWeight: 700,
                fontFamily: "inherit", cursor: "pointer", color: "var(--text)",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
              </svg>
              {a.google}
            </button>
            <div style={{ textAlign: "center", fontSize: 12, color: "var(--muted)", margin: "14px 0 2px" }}>{a.or}</div>
            <form onSubmit={submit}>
              <input style={input} type="email" autoComplete="email" placeholder={a.email} value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input
                style={input}
                type="password"
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                placeholder={a.password}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                required
                minLength={6}
              />
              {msg && <p style={{ fontSize: 13, marginTop: 10, color: "var(--accent)", lineHeight: 1.45 }}>{msg}</p>}
              <button type="submit" className="btn-primary" style={{ marginTop: 14 }} disabled={busy}>
                {mode === "signup" ? a.signUp : a.signInEmail}
              </button>
            </form>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12, gap: 10 }}>
              <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} style={linkBtn}>
                {mode === "signin" ? a.toSignUp : a.toSignIn}
              </button>
              {mode === "signin" && (
                <button type="button" onClick={forgot} style={linkBtn} disabled={busy}>
                  {a.forgot}
                </button>
              )}
            </div>
          </>
        )}
        <button type="button" className="btn-ghost" style={{ marginTop: 14 }} onClick={onClose}>
          {ui.paywall.later}
        </button>
      </div>
    </div>
  );
}

const linkBtn: React.CSSProperties = {
  border: 0, background: "none", color: "var(--navy)", fontWeight: 600, fontSize: 13, cursor: "pointer",
  fontFamily: "inherit", padding: "8px 0", minHeight: 36, textAlign: "left",
};
