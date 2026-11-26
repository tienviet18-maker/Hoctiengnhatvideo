"use client";

import { useState } from "react";
import { useLang } from "./LangProvider";
import AccountSheet from "./AccountSheet";
import { deleteAccount, signOutAccount, useAccount } from "../lib/account";
import { deleteCloudProgress } from "../lib/cloud-sync";
import { cachedVip } from "../lib/web-vip";

/** Thẻ tài khoản ở tab Tôi: đăng nhập / email đang dùng / hạn VIP / đăng xuất / xoá tài khoản. */
export default function AccountCard({ onRenew }: { onRenew: () => void }) {
  const { ui, lang } = useLang();
  const a = ui.account;
  const account = useAccount();
  const [sheet, setSheet] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [now] = useState(() => Date.now());

  if (account.status === "off" || account.status === "loading") return null;
  if (account.status === "signed-out") {
    return (
      <div className="card" style={{ marginTop: 10, padding: 14 }}>
        <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.5 }}>{a.why}</p>
        <button type="button" className="btn-primary" style={{ marginTop: 12 }} onClick={() => setSheet(true)}>
          {a.signIn}
        </button>
        {sheet && <AccountSheet onClose={() => setSheet(false)} />}
      </div>
    );
  }

  const user = account.user;
  const vip = cachedVip();
  const expires = vip?.vip && vip.expiresAt ? new Date(vip.expiresAt) : null;
  const daysLeft = expires ? Math.ceil((expires.getTime() - now) / 86_400_000) : null;
  const dateText = expires?.toLocaleDateString(lang === "vi" ? "vi-VN" : lang, { timeZone: "Asia/Tokyo" });

  const doDelete = async () => {
    const e = await deleteAccount(() => deleteCloudProgress(user.uid));
    setConfirm(false);
    setMsg(e === "recent" ? a.recent : e ? a.errOther : null);
  };

  return (
    <div className="card" style={{ marginTop: 10, padding: 14 }}>
      <div style={{ fontSize: 14, fontWeight: 700, wordBreak: "break-all" }}>{a.signedInAs.replace("{email}", user.email ?? user.name ?? "")}</div>
      <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 4 }}>{a.synced}</div>
      {expires && (
        <div style={{ marginTop: 10, fontSize: 13.5, fontWeight: 700, color: "var(--navy)" }}>
          {ui.webvip.until.replace("{date}", dateText ?? "")}
          {daysLeft !== null && daysLeft <= 7 && (
            <div style={{ fontWeight: 600, color: "var(--accent)", marginTop: 4 }}>{ui.webvip.expiring.replace("{n}", String(daysLeft))}</div>
          )}
          <button type="button" className="btn-ghost" style={{ marginTop: 8 }} onClick={onRenew}>
            {ui.webvip.renew}
          </button>
        </div>
      )}
      {msg && <p style={{ fontSize: 13, color: "var(--accent)", marginTop: 8 }}>{msg}</p>}
      <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
        <button type="button" style={linkBtn} onClick={() => void signOutAccount()}>
          {a.signOut}
        </button>
        <button type="button" style={{ ...linkBtn, color: "var(--muted)" }} onClick={() => setConfirm(true)}>
          {a.delete}
        </button>
      </div>
      {confirm && (
        <div role="alertdialog" style={{ marginTop: 10, background: "#FDECEC", borderRadius: 10, padding: 12 }}>
          <p style={{ fontSize: 13, lineHeight: 1.5 }}>{a.deleteConfirm}</p>
          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            <button type="button" style={{ ...linkBtn, color: "#B91C2B" }} onClick={() => void doDelete()}>
              {a.deleteYes}
            </button>
            <button type="button" style={linkBtn} onClick={() => setConfirm(false)}>
              {a.cancel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const linkBtn: React.CSSProperties = {
  border: 0, background: "none", color: "var(--navy)", fontWeight: 700, fontSize: 13, cursor: "pointer",
  fontFamily: "inherit", padding: "8px 0", minHeight: 36,
};
