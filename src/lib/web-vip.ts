"use client";
/**
 * VIP web của MiraiGo: mua bằng chuyển khoản (VietQR, SePay) qua hệ VIP chung của ViMai trên
 * vimai.jp (vimai-ecosystem docs/WEB_VIP.md). VIP gắn với tài khoản Firebase, không gắn với máy.
 * Máy chỉ nhớ bản sao (để mở khoá khi mất mạng); nội dung VIP thật do Worker kiểm ở máy chủ.
 */
import { currentUser, idToken } from "./account";
import { WEBVIP_API, WEBVIP_APP } from "./firebase-config";
import { loadProfile, notifyStore, PROFILE_KEY } from "./store";

export type WebVipPlan = "1m" | "6m" | "12m";

export interface WebVipPrice {
  plan: WebVipPlan;
  months: number;
  listVnd: number;
  payVnd: number;
  launch: boolean;
}

/** Giá hiển thị trước khi hỏi máy chủ (giống WEB_VIP_PLANS ở vimai.jp; máy chủ là giá cuối). */
export const WEB_VIP_PRICES: WebVipPrice[] = [
  { plan: "12m", months: 12, listVnd: 2_598_000, payVnd: 1_299_000, launch: true },
  { plan: "6m", months: 6, listVnd: 1_498_000, payVnd: 749_000, launch: true },
  { plan: "1m", months: 1, listVnd: 318_000, payVnd: 159_000, launch: true },
];
export const WEB_VIP_LAUNCH_ENDS_AT = "2027-03-31T15:00:00.000Z";

export interface VipOrder {
  ref: string;
  transferNote: string;
  listVnd: number;
  payVnd: number;
  status: "pending" | "underpaid";
  receivedVnd: number | null;
  plan: WebVipPlan | null;
}

export interface VipBank {
  bankId: string;
  bankName: string;
  accountNo: string;
  accountName: string;
}

export interface WebVipStatus {
  vip: boolean;
  expiresAt: string | null;
  order: VipOrder | null;
  prices: WebVipPrice[] | null;
}

export const formatVnd = (v: number) => `${v.toLocaleString("vi-VN")}đ`;

/** Ảnh VietQR của SePay, đúng số tiền và nội dung. */
export function qrUrl(bank: VipBank, amountVnd: number, note: string): string {
  const q = new URLSearchParams({ acc: bank.accountNo, bank: bank.bankId, amount: String(amountVnd), des: note });
  return `https://qr.sepay.vn/img?${q}`;
}

const CACHE_KEY = "vimai-video:webvip:v1";
interface Cache {
  uid: string;
  vip: boolean;
  expiresAt: string | null;
}

function readCache(): Cache | null {
  try {
    const v = JSON.parse(window.localStorage.getItem(CACHE_KEY) ?? "null");
    return v && typeof v.uid === "string" ? v : null;
  } catch {
    return null;
  }
}

function activeNow(c: { vip: boolean; expiresAt: string | null } | null): boolean {
  if (!c?.vip) return false;
  return !c.expiresAt || Date.parse(c.expiresAt) > Date.now();
}

/** Ghi cờ VIP của hồ sơ theo tài khoản đang đăng nhập (bản dev giữ công tắc VIP thử). */
function applyVip(vip: boolean) {
  const p = loadProfile();
  if (p.vip === vip) return;
  window.localStorage.setItem(PROFILE_KEY, JSON.stringify({ ...p, vip }));
  notifyStore();
}

/** Hạn VIP đã biết của tài khoản đang đăng nhập (bản sao trên máy). */
export function cachedVip(): { vip: boolean; expiresAt: string | null } | null {
  const u = currentUser();
  const c = readCache();
  return u && c && c.uid === u.uid ? { vip: activeNow(c), expiresAt: c.expiresAt } : null;
}

/** Đổi tài khoản: mở khoá ngay theo bản sao, rồi hỏi máy chủ. */
export function onAccountVip(uid: string | null): void {
  if (process.env.NEXT_PUBLIC_DEV_TOOLS === "1") return;
  if (!uid) {
    applyVip(false);
    return;
  }
  const c = readCache();
  applyVip(!!c && c.uid === uid && activeNow(c));
  void refreshVip();
}

function parseStatus(json: Record<string, unknown>): WebVipStatus | null {
  if (typeof json.vip !== "boolean") return null;
  const prices = (json.prices as { plans?: WebVipPrice[] } | undefined)?.plans ?? null;
  return {
    vip: json.vip,
    expiresAt: typeof json.expiresAt === "string" ? json.expiresAt : null,
    order: (json.order as VipOrder | null) ?? null,
    prices,
  };
}

/** Hỏi vimai.jp trạng thái VIP; null khi không hỏi được (giữ nguyên bản sao). */
export async function refreshVip(): Promise<WebVipStatus | null> {
  const u = currentUser();
  const token = await idToken().catch(() => null);
  if (!u || !token) return null;
  try {
    const res = await fetch(`${WEBVIP_API}/api/webvip/status?app=${WEBVIP_APP}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    if (!res.ok) return null;
    const status = parseStatus(await res.json());
    if (!status || currentUser()?.uid !== u.uid) return null;
    window.localStorage.setItem(CACHE_KEY, JSON.stringify({ uid: u.uid, vip: status.vip, expiresAt: status.expiresAt }));
    if (process.env.NEXT_PUBLIC_DEV_TOOLS !== "1") applyVip(activeNow(status));
    return status;
  } catch {
    return null;
  }
}

export type StartResult =
  | { ok: true; order: VipOrder; bank: VipBank }
  | { ok: false; error: "sign_in" | "unavailable" };

/** Tạo (hoặc lấy lại) đơn chuyển khoản cho gói `plan`. */
export async function startOrder(plan: WebVipPlan): Promise<StartResult> {
  const token = await idToken().catch(() => null);
  if (!token) return { ok: false, error: "sign_in" };
  try {
    const res = await fetch(`${WEBVIP_API}/api/webvip/start`, {
      method: "POST",
      headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
      body: JSON.stringify({ app: WEBVIP_APP, plan }),
    });
    if (res.status === 401) return { ok: false, error: "sign_in" };
    if (!res.ok) return { ok: false, error: "unavailable" };
    const json = (await res.json()) as { order?: VipOrder; bank?: VipBank };
    if (!json.order?.transferNote || !json.bank?.accountNo) return { ok: false, error: "unavailable" };
    return { ok: true, order: json.order, bank: json.bank };
  } catch {
    return { ok: false, error: "unavailable" };
  }
}
