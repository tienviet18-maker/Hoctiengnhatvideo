"use client";

import { useLang } from "./LangProvider";

const PRICE_MONTH_JPY = 550;
const PRICE_YEAR_JPY = 4980;
const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;

/**
 * Màn hình paywall kiểu Tadoku (mở khoá toàn bộ).
 * MVP chưa nối thanh toán — nút nâng cấp để dành, chỉ hiển thị gói và giá đích
 * của MiraiGo (CLAUDE.md mục 2): ¥550/tháng, ¥4.980/năm.
 */
export default function Paywall({ onClose }: { onClose: () => void }) {
  const { ui } = useLang();
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(11,18,32,.55)",
        zIndex: 60,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#fff",
          // Paywall cũng mở trên nền tối (trang video/lái xe): không thừa hưởng chữ trắng
          color: "var(--text)",
          width: "100%",
          maxWidth: 430,
          borderRadius: "20px 20px 0 0",
          padding: "24px 20px 28px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: ".08em",
            color: "var(--accent)",
          }}
        >
          VIP
        </div>
        <h2 style={{ fontSize: 21, fontWeight: 800, marginTop: 6, color: "var(--navy)" }}>
          {ui.paywall.title}
        </h2>
        <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 6, lineHeight: 1.55 }}>
          {ui.paywall.subtitle}
        </p>

        <div
          style={{
            border: "2px solid var(--navy)",
            borderRadius: 12,
            padding: "14px 16px",
            marginTop: 18,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div>
            <div style={{ fontWeight: 700, fontSize: 15 }}>{ui.paywall.yearly}</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>{ui.paywall.bestValue}</div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{ fontWeight: 800, fontSize: 18, color: "var(--navy)" }}>{yen(PRICE_YEAR_JPY)}</div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>≈ {yen(Math.round(PRICE_YEAR_JPY / 12))} / {ui.paywall.monthly}</div>
          </div>
        </div>

        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "14px 16px",
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 15 }}>{ui.paywall.monthly}</div>
          <div style={{ marginLeft: "auto", fontWeight: 800, fontSize: 18 }}>{yen(PRICE_MONTH_JPY)}</div>
        </div>

        <button type="button" className="btn-primary" style={{ marginTop: 18 }} disabled>
          {ui.paywall.upgrade}
        </button>
        <button type="button" className="btn-ghost" style={{ marginTop: 10 }} onClick={onClose}>
          {ui.paywall.later}
        </button>
      </div>
    </div>
  );
}
