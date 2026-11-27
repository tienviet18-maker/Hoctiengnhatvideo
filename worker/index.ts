/**
 * Worker của miraigo.vimai.jp: phục vụ bản web tĩnh (out/, Workers Static Assets) và vài đường máy chủ.
 *
 * - /api/content/<videos|stories>/<id>: phần VIP của một gói (scripts/gen-locked.mjs ghi ở /_locked/).
 *   Cần `Authorization: Bearer <Firebase ID token>` của project MiraiGo, và tài khoản có VIP còn hạn trong
 *   bảng web_vip_grants (D1 vimai-cms của vimai.jp, chỉ đọc). VIP gắn với tài khoản, không gắn với máy:
 *   bản iOS sau này dùng chung project Firebase và cùng bảng này.
 * - /_locked/*: không bao giờ trả thẳng.
 * - /__/auth/*, /__/firebase/*: chuyển tiếp trang đăng nhập của Firebase về cùng tên miền app (giống ViBJT),
 *   để đăng nhập Google chạy được trên iOS Safari và trình duyệt chặn cookie bên thứ ba.
 * Còn lại: file tĩnh.
 */
import { verifyIdTokenOnline } from "./firebase-id-token.ts";

interface D1Like {
  prepare(sql: string): { bind(...values: unknown[]): { first<T>(): Promise<T | null> } };
}

export interface Env {
  ASSETS: { fetch(req: Request | string): Promise<Response> };
  DB: D1Like;
  FIREBASE_PROJECT_ID: string;
}

const KINDS = new Set(["videos", "stories"]);
const ID_RE = /^[a-z0-9][a-z0-9-]{0,80}$/;

function json(body: unknown, status = 200, extra: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "private, no-store", ...extra },
  });
}

/** VIP còn hiệu lực: chưa thu hồi, trọn đời hoặc chưa tới hạn (giống webVipGrantActive ở vimai.jp). */
export function grantActive(row: { revoked_at: string | null; expires_at: string | null } | null, now = Date.now()) {
  if (!row || row.revoked_at) return false;
  if (!row.expires_at) return true;
  return Date.parse(row.expires_at) > now;
}

async function vipOf(env: Env, uid: string) {
  const row = await env.DB.prepare(
    `SELECT revoked_at, expires_at FROM web_vip_grants WHERE app = 'miraigo' AND uid = ?`,
  )
    .bind(uid)
    .first<{ revoked_at: string | null; expires_at: string | null }>();
  return { active: grantActive(row), expiresAt: row?.expires_at ?? null };
}

async function lockedContent(req: Request, env: Env, kind: string, id: string) {
  if (!KINDS.has(kind) || !ID_RE.test(id)) return json({ error: "not_found" }, 404);
  const raw = req.headers.get("authorization") ?? "";
  const token = raw.toLowerCase().startsWith("bearer ") ? raw.slice(7).trim() : "";
  if (!token || !env.FIREBASE_PROJECT_ID) return json({ error: "sign_in" }, 401);
  const verified = await verifyIdTokenOnline(token, env.FIREBASE_PROJECT_ID).catch(() => null);
  if (!verified?.ok) return json({ error: "sign_in" }, 401);
  let vip;
  try {
    vip = await vipOf(env, verified.token.uid);
  } catch (error) {
    console.error("[content] vip lookup failed", error);
    return json({ error: "unavailable" }, 503);
  }
  if (!vip.active) return json({ error: "vip_required" }, 403);
  const file = await env.ASSETS.fetch(new URL(`/_locked/${kind}/${id}.json`, req.url).toString());
  if (!file.ok) return json({ error: "not_found" }, 404);
  return new Response(file.body, {
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "private, no-store" },
  });
}

async function firebaseHelper(req: Request, env: Env, url: URL) {
  // authDomain của app = tên miền app; trang đăng nhập thật nằm ở <project>.firebaseapp.com
  const target = `https://${env.FIREBASE_PROJECT_ID}.firebaseapp.com${url.pathname}${url.search}`;
  const init: RequestInit = { method: req.method, headers: req.headers, redirect: "manual" };
  if (req.method !== "GET" && req.method !== "HEAD") init.body = req.body;
  return fetch(target, init);
}

const worker = {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    const path = url.pathname;
    if (path.startsWith("/_locked/")) return new Response("Not found", { status: 404 });
    if (path.startsWith("/__/auth/") || path.startsWith("/__/firebase/")) return firebaseHelper(req, env, url);
    const m = /^\/api\/content\/([a-z]+)\/([^/]+)$/.exec(path);
    if (m) {
      if (req.method !== "GET") return json({ error: "method" }, 405);
      return lockedContent(req, env, m[1], m[2]);
    }
    if (path.startsWith("/api/")) return json({ error: "not_found" }, 404);
    return env.ASSETS.fetch(req);
  },
};

export default worker;
