"use client";

import { useLang } from "./LangProvider";
import { useAccount } from "../lib/account";

/** Màn cảm ơn hiện một lần ngay khi tiền về (học theo vip_welcome của ViBJT). */
export default function VipWelcome({ onClose }: { onClose: () => void }) {
  const { ui } = useLang();
  const account = useAccount();
  const email = account.status === "signed-in" ? (account.user.email ?? "") : "";
  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{ position: "fixed", inset: 0, background: "rgba(11,18,32,.6)", zIndex: 80, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}
    >
      <div style={{ background: "#fff", color: "var(--text)", borderRadius: 20, padding: "28px 22px", maxWidth: 400, width: "100%", textAlign: "center" }}>
        <div style={{ display: "inline-block", fontSize: 13, fontWeight: 800, letterSpacing: ".08em", color: "#14213D", background: "#F5C542", borderRadius: 8, padding: "5px 10px" }}>VIP</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--navy)", marginTop: 14 }}>{ui.webvip.welcomeTitle}</h2>
        <p style={{ fontSize: 14.5, lineHeight: 1.6, marginTop: 10, color: "var(--muted)" }}>{ui.webvip.welcomeBody.replace("{email}", email)}</p>
        <button type="button" className="btn-primary" style={{ marginTop: 20 }} onClick={onClose}>
          {ui.webvip.welcomeCta}
        </button>
      </div>
    </div>
  );
}
