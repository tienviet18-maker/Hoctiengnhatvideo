"use client";

import { useState } from "react";
import { useLang } from "./LangProvider";

/**
 * Giá VIP (Việt chốt 25/11/2026): 1 tháng ¥900, các gói dài rẻ hơn theo tháng.
 * Chỉ sửa giá ở đây. % tiết kiệm tính thật từ giá 1 tháng, không dùng giá gạch giả.
 */
export const PLANS = [
  { key: "yearly", months: 12, priceJpy: 7800 },
  { key: "sixMonths", months: 6, priceJpy: 4400 },
  { key: "monthly", months: 1, priceJpy: 900 },
] as const;
type PlanKey = (typeof PLANS)[number]["key"];
const MONTH_JPY = 900;

/**
 * Ưu đãi ra mắt (Việt chốt 25/11/2026): giảm 50% năm đầu của gói năm cho người mua
 * trước hạn. Giá gạch là giá năm thật (¥7.800), nên đây là giá so sánh đúng luật
 * (景品表示法). Trên iOS làm bằng Introductory Offer "pay up front" của App Store.
 * Hết hạn: tự ẩn, paywall chỉ còn so sánh với giá tháng.
 * TODO(Việt): chốt ngày kết thúc theo ngày ra mắt thật.
 */
export const LAUNCH_OFFER = {
  plan: "yearly" as const,
  firstPeriodJpy: 3900,
  endsAt: "2027-03-31T23:59:59+09:00",
};
const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;

/**
 * Màn hình paywall (mở khoá toàn bộ). Chưa nối thanh toán thật: nút nâng cấp
 * đang tắt cho tới đợt In-App Purchase / SePay (docs/ux-plan.md mục 6).
 */
export default function Paywall({ onClose }: { onClose: () => void }) {
  const { ui } = useLang();
  const [plan, setPlan] = useState<PlanKey>("yearly");
  // Paywall chỉ mở sau thao tác của người dùng (không prerender), nên đọc giờ lúc mount
  const [now] = useState(() => Date.now());
  const offerOn = now < Date.parse(LAUNCH_OFFER.endsAt);
  const offerEnd = new Date(LAUNCH_OFFER.endsAt).toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" });
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

        <div role="radiogroup" style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
          {PLANS.map((p) => {
            const on = plan === p.key;
            const perMonth = Math.round(p.priceJpy / p.months);
            const savePct = Math.round((1 - p.priceJpy / (MONTH_JPY * p.months)) * 100);
            return (
              <button
                key={p.key}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setPlan(p.key)}
                style={{
                  border: on ? "2px solid var(--navy)" : "1px solid var(--border)",
                  borderRadius: 12, padding: on ? "13px 15px" : "14px 16px", background: "#fff",
                  display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontFamily: "inherit",
                  color: "var(--text)", textAlign: "left", minHeight: 44,
                }}
              >
                <span>
                  <span style={{ display: "block", fontWeight: 700, fontSize: 15 }}>{ui.paywall[p.key]}</span>
                  {offerOn && p.key === LAUNCH_OFFER.plan && (
                    <span style={{ display: "inline-block", fontSize: 11, fontWeight: 800, color: "#fff", background: "var(--accent)", borderRadius: 6, padding: "2px 7px", marginTop: 4 }}>
                      {ui.paywall.launchOffer} −{Math.round((1 - LAUNCH_OFFER.firstPeriodJpy / p.priceJpy) * 100)}%
                    </span>
                  )}
                  {savePct > 0 && !(offerOn && p.key === LAUNCH_OFFER.plan) && (
                    <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--accent)", marginTop: 2 }}>
                      {ui.paywall.save.replace("{n}", String(savePct))}
                      {p.key === "yearly" ? ` · ${ui.paywall.bestValue}` : ""}
                    </span>
                  )}
                </span>
                {offerOn && p.key === LAUNCH_OFFER.plan ? (
                  <span style={{ marginLeft: "auto", textAlign: "right" }}>
                    <span style={{ display: "block", fontSize: 12, color: "var(--muted)", textDecoration: "line-through" }}>{yen(p.priceJpy)}</span>
                    <span style={{ display: "block", fontWeight: 800, fontSize: 20, color: "var(--accent)" }}>{yen(LAUNCH_OFFER.firstPeriodJpy)}</span>
                    <span style={{ display: "block", fontSize: 11.5, color: "var(--muted)" }}>
                      {ui.paywall.firstYear} · ≈ {yen(Math.round(LAUNCH_OFFER.firstPeriodJpy / 12))}{ui.paywall.perMonth}
                    </span>
                  </span>
                ) : (
                  <span style={{ marginLeft: "auto", textAlign: "right" }}>
                    <span style={{ display: "block", fontWeight: 800, fontSize: 18, color: "var(--navy)" }}>{yen(p.priceJpy)}</span>
                    {p.months > 1 && (
                      <span style={{ display: "block", fontSize: 12, color: "var(--muted)" }}>
                        ≈ {yen(perMonth)}{ui.paywall.perMonth}
                      </span>
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {offerOn && (
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 10, lineHeight: 1.5 }}>
            {ui.paywall.offerTerms.replace("{date}", offerEnd).replace("{price}", yen(PLANS[0].priceJpy))}
          </p>
        )}

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
