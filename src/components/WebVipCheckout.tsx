"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./LangProvider";
import { useAccount } from "../lib/account";
import {
  formatVnd,
  qrUrl,
  refreshVip,
  startOrder,
  type VipBank,
  type VipOrder,
  type WebVipPlan,
} from "../lib/web-vip";

const POLL_MS = 4000;

/**
 * Bước trả tiền của VIP web: tạo đơn trên vimai.jp, hiện VietQR + thông tin chuyển khoản, rồi hỏi
 * trạng thái vài giây một lần. Tiền về (SePay báo vimai.jp) thì gọi onPaid.
 */
export default function WebVipCheckout({
  plan,
  onBack,
  onPaid,
  onNeedSignIn,
}: {
  plan: WebVipPlan;
  onBack: () => void;
  onPaid: () => void;
  onNeedSignIn: () => void;
}) {
  const { ui } = useLang();
  const w = ui.webvip;
  const account = useAccount();
  const [order, setOrder] = useState<{ order: VipOrder; bank: VipBank } | null>(null);
  const [error, setError] = useState(false);
  const [underpaid, setUnderpaid] = useState<VipOrder | null>(null);
  const startExpiry = useRef<string | null | undefined>(undefined);
  const signedIn = account.status === "signed-in";

  // Tạo đơn khi đã đăng nhập
  useEffect(() => {
    if (!signedIn) return;
    let alive = true;
    void (async () => {
      const before = await refreshVip();
      startExpiry.current = before?.expiresAt ?? null;
      const r = await startOrder(plan);
      if (!alive) return;
      if (r.ok) setOrder({ order: r.order, bank: r.bank });
      else if (r.error === "sign_in") onNeedSignIn();
      else setError(true);
    })();
    return () => {
      alive = false;
    };
  }, [signedIn, plan, onNeedSignIn]);

  // Chờ tiền về: đơn biến mất và hạn VIP đổi (gói thời hạn) là đã trả
  useEffect(() => {
    if (!order) return;
    const ref = order.order.ref;
    const t = window.setInterval(async () => {
      const s = await refreshVip();
      if (!s) return;
      if (s.order?.ref === ref && s.order.status === "underpaid") setUnderpaid(s.order);
      const paid = s.vip && s.order?.ref !== ref && s.expiresAt !== startExpiry.current;
      if (paid) {
        window.clearInterval(t);
        onPaid();
      }
    }, POLL_MS);
    return () => window.clearInterval(t);
  }, [order, onPaid]);

  if (!signedIn) {
    return (
      <div style={{ marginTop: 16 }}>
        <p style={{ fontSize: 14, lineHeight: 1.55 }}>{w.needSignIn}</p>
        <button type="button" className="btn-primary" style={{ marginTop: 14 }} onClick={onNeedSignIn}>
          {ui.account.signIn}
        </button>
        <button type="button" className="btn-ghost" style={{ marginTop: 10 }} onClick={onBack}>
          {w.back}
        </button>
      </div>
    );
  }
  if (error) {
    return (
      <div style={{ marginTop: 16 }}>
        <p style={{ fontSize: 14, color: "var(--accent)" }}>{w.error}</p>
        <button type="button" className="btn-ghost" style={{ marginTop: 10 }} onClick={onBack}>
          {w.back}
        </button>
      </div>
    );
  }
  if (!order) return <p style={{ marginTop: 18, color: "var(--muted)" }}>{w.loading}</p>;

  const { bank } = order;
  const o = order.order;
  const rows: [string, string, boolean][] = [
    [w.amount, formatVnd(o.payVnd), true],
    [w.note, o.transferNote, true],
    [w.bank, bank.bankName, false],
    [w.accountNo, bank.accountNo, true],
    [w.holder, bank.accountName, false],
  ];
  return (
    <div style={{ marginTop: 14 }}>
      <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--navy)" }}>{w.payTitle}</h3>
      <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 4, lineHeight: 1.5 }}>{w.scan}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={qrUrl(bank, o.payVnd, o.transferNote)}
        alt="VietQR"
        width={220}
        height={220}
        style={{ display: "block", margin: "12px auto 4px", borderRadius: 12, border: "1px solid var(--border)" }}
      />
      <div style={{ border: "1px solid var(--border)", borderRadius: 12, marginTop: 10 }}>
        {rows.map(([k, v, copy], i) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderTop: i ? "1px solid var(--border)" : 0 }}>
            <span style={{ fontSize: 12.5, color: "var(--muted)", width: 96, flexShrink: 0 }}>{k}</span>
            <span style={{ fontSize: 14, fontWeight: 700, flex: 1, minWidth: 0, wordBreak: "break-all" }}>{v}</span>
            {copy && <CopyBtn text={k === w.amount ? String(o.payVnd) : v} />}
          </div>
        ))}
      </div>
      {underpaid ? (
        <p style={{ fontSize: 13, color: "var(--accent)", marginTop: 12, lineHeight: 1.5 }}>
          {w.underpaid.replace("{got}", formatVnd(underpaid.receivedVnd ?? 0)).replace("{need}", formatVnd(underpaid.payVnd))}
        </p>
      ) : (
        <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
          <span className="pulse-dot" aria-hidden style={{ width: 8, height: 8, borderRadius: 4, background: "#2E9E5B", flexShrink: 0 }} />
          {w.waiting}
        </p>
      )}
      <button type="button" className="btn-ghost" style={{ marginTop: 8 }} onClick={onBack}>
        {w.back}
      </button>
    </div>
  );
}

function CopyBtn({ text }: { text: string }) {
  const { ui } = useLang();
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={() => void navigator.clipboard?.writeText(text).then(() => setDone(true))}
      style={{ border: "1px solid var(--border)", background: "#fff", borderRadius: 8, fontSize: 12, fontWeight: 700, padding: "6px 10px", cursor: "pointer", fontFamily: "inherit", color: "var(--navy)", minHeight: 32 }}
    >
      {done ? ui.account.copied : ui.webvip.copy}
    </button>
  );
}
