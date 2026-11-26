"use client";

import { useCallback, useEffect, useState } from "react";
import { useLang } from "./LangProvider";
import AccountSheet from "./AccountSheet";
import VipWelcome from "./VipWelcome";
import WebVipCheckout from "./WebVipCheckout";
import { formatVnd, refreshVip, WEB_VIP_LAUNCH_ENDS_AT, WEB_VIP_PRICES, type WebVipPrice } from "../lib/web-vip";

/**
 * Giá VIP. Giá thường gấp đôi giá ra mắt; trong đợt ra mắt (tới LAUNCH_ENDS_AT) bán giá
 * ra mắt và gạch giá thường. Hết hạn: người mua mới trả giá thường (giá tăng thật), nên giá
 * gạch là giá thật, đúng 景品表示法 (so sánh với giá bán trong tương lai đã định sẵn).
 * Người mua trong đợt ra mắt giữ giá ra mắt khi gia hạn. Chỉ sửa giá ở đây.
 * TODO(Việt): chốt ngày kết thúc theo ngày ra mắt thật.
 */
export const PLANS = [
  { key: "yearly", months: 12, launchJpy: 7800, regularJpy: 15600 },
  { key: "sixMonths", months: 6, launchJpy: 4400, regularJpy: 8800 },
  { key: "monthly", months: 1, launchJpy: 900, regularJpy: 1800 },
] as const;
type PlanKey = (typeof PLANS)[number]["key"];
export const LAUNCH_ENDS_AT = "2027-03-31T23:59:59+09:00";

/**
 * Việt chốt 25/11/2026: bản web chạy giá ra mắt có gạch giá; bản iOS không gạch giá,
 * bán đúng giá ra mắt và chỉ so với giá tháng. Bản iOS build với NEXT_PUBLIC_PLATFORM=ios.
 */
const IS_IOS_BUILD = process.env.NEXT_PUBLIC_PLATFORM === "ios";
const yen = (n: number) => `¥${n.toLocaleString("ja-JP")}`;

/** Gói web (VNĐ, chuyển khoản) tương ứng gói hiển thị. */
const WEB_PLAN: Record<PlanKey, WebVipPrice["plan"]> = { yearly: "12m", sixMonths: "6m", monthly: "1m" };

/**
 * Màn hình paywall (mở khoá toàn bộ).
 * Bản web: giá VNĐ, mua bằng chuyển khoản VietQR qua vimai.jp (SePay); cần đăng nhập vì VIP
 * gắn với tài khoản. Bản iOS: giá yên, In-App Purchase (chưa nối, nút tắt).
 */
export default function Paywall({ onClose, onUnlocked }: { onClose: () => void; onUnlocked?: () => void }) {
  if (IS_IOS_BUILD) return <PaywallIos onClose={onClose} />;
  return <PaywallWeb onClose={onClose} onUnlocked={onUnlocked} />;
}

function PaywallWeb({ onClose, onUnlocked }: { onClose: () => void; onUnlocked?: () => void }) {
  const { ui } = useLang();
  const [plan, setPlan] = useState<PlanKey>("yearly");
  const [step, setStep] = useState<"plans" | "pay">("plans");
  const [signIn, setSignIn] = useState(false);
  const [welcome, setWelcome] = useState(false);
  const [prices, setPrices] = useState<WebVipPrice[]>(WEB_VIP_PRICES);
  // Giá thật của tài khoản (giữ giá ra mắt nếu đã mua trong đợt)
  useEffect(() => {
    let alive = true;
    void refreshVip().then((s) => {
      if (alive && s?.prices?.length) setPrices(s.prices);
    });
    return () => {
      alive = false;
    };
  }, []);
  const needSignIn = useCallback(() => setSignIn(true), []);
  const paid = useCallback(() => setWelcome(true), []);
  const offerEnd = new Date(WEB_VIP_LAUNCH_ENDS_AT).toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" });
  const priceOf = (k: PlanKey) => prices.find((p) => p.plan === WEB_PLAN[k]) ?? WEB_VIP_PRICES.find((p) => p.plan === WEB_PLAN[k])!;
  const offerOn = prices.some((p) => p.launch);
  const month = priceOf("monthly");

  if (welcome) {
    return (
      <VipWelcome
        onClose={() => {
          onUnlocked?.();
          onClose();
        }}
      />
    );
  }
  return (
    <div style={overlay} onClick={onClose}>
      <div style={sheet} onClick={(e) => e.stopPropagation()}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".08em", color: "var(--accent)" }}>VIP</div>
        <h2 style={{ fontSize: 21, fontWeight: 800, marginTop: 6, color: "var(--navy)" }}>{ui.paywall.title}</h2>
        <p style={{ fontSize: 14, color: "var(--muted)", marginTop: 6, lineHeight: 1.55 }}>{ui.paywall.subtitle}</p>
        {step === "pay" ? (
          <WebVipCheckout plan={WEB_PLAN[plan]} onBack={() => setStep("plans")} onPaid={paid} onNeedSignIn={needSignIn} />
        ) : (
          <>
            {offerOn && (
              <div style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 8, background: "#FDECEC", color: "#B91C2B", borderRadius: 8, padding: "6px 10px", fontSize: 12.5, fontWeight: 700 }}>
                {ui.paywall.launchOffer} −50% · {ui.paywall.until.replace("{date}", offerEnd)}
              </div>
            )}
            <div role="radiogroup" style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
              {PLANS.map((p) => {
                const on = plan === p.key;
                const price = priceOf(p.key);
                const perMonth = Math.round(price.payVnd / p.months / 1000) * 1000;
                const savePct = Math.round((1 - price.payVnd / (month.payVnd * p.months)) * 100);
                return (
                  <button key={p.key} type="button" role="radio" aria-checked={on} onClick={() => setPlan(p.key)} style={planBtn(on)}>
                    <span>
                      <span style={{ display: "block", fontWeight: 700, fontSize: 15 }}>{ui.paywall[p.key]}</span>
                      {savePct > 0 && (
                        <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--accent)", marginTop: 2 }}>
                          {ui.paywall.save.replace("{n}", String(savePct))}
                          {p.key === "yearly" ? ` · ${ui.paywall.bestValue}` : ""}
                        </span>
                      )}
                    </span>
                    <span style={{ marginLeft: "auto", textAlign: "right" }}>
                      {price.launch && (
                        <span style={{ display: "block", fontSize: 12, color: "var(--muted)", textDecoration: "line-through" }}>{formatVnd(price.listVnd)}</span>
                      )}
                      <span style={{ display: "block", fontWeight: 800, fontSize: 18, color: price.launch ? "var(--accent)" : "var(--navy)" }}>{formatVnd(price.payVnd)}</span>
                      {p.months > 1 && (
                        <span style={{ display: "block", fontSize: 12, color: "var(--muted)" }}>
                          ≈ {formatVnd(perMonth)}{ui.paywall.perMonth}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 10, lineHeight: 1.5 }}>{ui.webvip.terms.replace("{date}", offerEnd)}</p>
            <button type="button" className="btn-primary" style={{ marginTop: 18 }} onClick={() => setStep("pay")}>
              {ui.webvip.buy}
            </button>
            <button type="button" className="btn-ghost" style={{ marginTop: 10 }} onClick={onClose}>
              {ui.paywall.later}
            </button>
          </>
        )}
      </div>
      {signIn && (
        <div onClick={(e) => e.stopPropagation()}>
          <AccountSheet onClose={() => setSignIn(false)} />
        </div>
      )}
    </div>
  );
}

const overlay: React.CSSProperties = {
  position: "fixed", inset: 0, background: "rgba(11,18,32,.55)", zIndex: 60,
  display: "flex", alignItems: "flex-end", justifyContent: "center",
};
const sheet: React.CSSProperties = {
  background: "#fff", color: "var(--text)", width: "100%", maxWidth: 430, borderRadius: "20px 20px 0 0",
  padding: "24px 20px 28px", maxHeight: "94vh", overflowY: "auto",
};
const planBtn = (on: boolean): React.CSSProperties => ({
  border: on ? "2px solid var(--navy)" : "1px solid var(--border)",
  borderRadius: 12, padding: on ? "13px 15px" : "14px 16px", background: "#fff",
  display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontFamily: "inherit",
  color: "var(--text)", textAlign: "left", minHeight: 44,
});

/** Bản iOS: giá yên, không gạch giá; In-App Purchase chưa nối (nút tắt). */
function PaywallIos({ onClose }: { onClose: () => void }) {
  const { ui } = useLang();
  const [plan, setPlan] = useState<PlanKey>("yearly");
  // Paywall có thể được prerender (trang truyện/video VIP): chỉ đọc giờ sau khi mount
  const [now, setNow] = useState(0);
  useEffect(() => {
    const t = window.setTimeout(() => setNow(Date.now()), 0);
    return () => window.clearTimeout(t);
  }, []);
  // Trước khi mount (now = 0) coi như đang trong đợt ra mắt để không nhảy giá
  const offerOn = !IS_IOS_BUILD && (now === 0 || now < Date.parse(LAUNCH_ENDS_AT));
  const offerEnd = new Date(LAUNCH_ENDS_AT).toLocaleDateString("ja-JP", { timeZone: "Asia/Tokyo" });
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

        {offerOn && (
          <div style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 8, background: "#FDECEC", color: "#B91C2B", borderRadius: 8, padding: "6px 10px", fontSize: 12.5, fontWeight: 700 }}>
            {ui.paywall.launchOffer} −50% · {ui.paywall.until.replace("{date}", offerEnd)}
          </div>
        )}
        <div role="radiogroup" style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
          {PLANS.map((p) => {
            const on = plan === p.key;
            // iOS: luôn bán giá ra mắt, không gạch. Web: giá ra mắt tới hạn, sau đó giá thường.
            const useLaunch = IS_IOS_BUILD || offerOn;
            const price = useLaunch ? p.launchJpy : p.regularJpy;
            const monthPrice = useLaunch ? PLANS[2].launchJpy : PLANS[2].regularJpy;
            const perMonth = Math.round(price / p.months);
            const savePct = Math.round((1 - price / (monthPrice * p.months)) * 100);
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
                  {savePct > 0 && (
                    <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--accent)", marginTop: 2 }}>
                      {ui.paywall.save.replace("{n}", String(savePct))}
                      {p.key === "yearly" ? ` · ${ui.paywall.bestValue}` : ""}
                    </span>
                  )}
                </span>
                <span style={{ marginLeft: "auto", textAlign: "right" }}>
                  {offerOn && (
                    <span style={{ display: "block", fontSize: 12, color: "var(--muted)", textDecoration: "line-through" }}>{yen(p.regularJpy)}</span>
                  )}
                  <span style={{ display: "block", fontWeight: 800, fontSize: 18, color: offerOn ? "var(--accent)" : "var(--navy)" }}>{yen(price)}</span>
                  {p.months > 1 && (
                    <span style={{ display: "block", fontSize: 12, color: "var(--muted)" }}>
                      ≈ {yen(perMonth)}{ui.paywall.perMonth}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {offerOn && (
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 10, lineHeight: 1.5 }}>
            {ui.paywall.offerTerms.replace("{date}", offerEnd)}
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
