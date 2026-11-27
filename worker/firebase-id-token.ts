/**
 * Kiểm tra Firebase ID token (JWT RS256 do securetoken.google.com ký) ngay trong Worker, không cần
 * service account. Chép từ vimai-ecosystem src/lib/firebase-id-token.ts (giữ giống nhau).
 * https://firebase.google.com/docs/auth/admin/verify-id-tokens#verify_id_tokens_using_a_third-party_jwt_library
 */

export type FirebaseJwk = { kid: string; n: string; e: string; kty?: string; alg?: string };

export type VerifiedIdToken = { uid: string; email: string | null; emailVerified: boolean; provider: string | null };

export type IdTokenError = "malformed" | "bad_alg" | "unknown_key" | "bad_signature" | "bad_claims" | "expired";

/** Lệch giờ chấp nhận được giữa máy chủ Google và Cloudflare. */
const SKEW_SECONDS = 300;

function b64urlBytes(part: string): Uint8Array<ArrayBuffer> | null {
  if (!/^[A-Za-z0-9_-]*$/.test(part)) return null;
  const b64 = part.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((part.length + 3) % 4);
  try {
    const bin = atob(b64);
    const out = new Uint8Array(new ArrayBuffer(bin.length));
    for (let i = 0; i < bin.length; i += 1) out[i] = bin.charCodeAt(i);
    return out;
  } catch {
    return null;
  }
}

function b64urlJson(part: string): Record<string, unknown> | null {
  const bytes = b64urlBytes(part);
  if (!bytes) return null;
  try {
    const value = JSON.parse(new TextDecoder().decode(bytes));
    return value && typeof value === "object" && !Array.isArray(value) ? value : null;
  } catch {
    return null;
  }
}

export async function verifyFirebaseIdToken(
  token: string,
  projectId: string,
  keys: FirebaseJwk[],
  nowSeconds = Math.floor(Date.now() / 1000),
): Promise<{ ok: true; token: VerifiedIdToken } | { ok: false; error: IdTokenError }> {
  if (typeof token !== "string" || token.length > 4096) return { ok: false, error: "malformed" };
  const parts = token.split(".");
  if (parts.length !== 3) return { ok: false, error: "malformed" };
  const header = b64urlJson(parts[0]);
  const payload = b64urlJson(parts[1]);
  const signature = b64urlBytes(parts[2]);
  if (!header || !payload || !signature) return { ok: false, error: "malformed" };
  if (header.alg !== "RS256") return { ok: false, error: "bad_alg" };
  const jwk = keys.find((key) => key.kid === header.kid);
  if (!jwk) return { ok: false, error: "unknown_key" };

  let valid = false;
  try {
    const key = await crypto.subtle.importKey(
      "jwk",
      { kty: "RSA", n: jwk.n, e: jwk.e, alg: "RS256", ext: true },
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["verify"],
    );
    valid = await crypto.subtle.verify(
      "RSASSA-PKCS1-v1_5",
      key,
      signature,
      new TextEncoder().encode(`${parts[0]}.${parts[1]}`),
    );
  } catch {
    valid = false;
  }
  if (!valid) return { ok: false, error: "bad_signature" };

  const { aud, iss, sub, exp, iat, auth_time: authTime } = payload as Record<string, unknown>;
  if (aud !== projectId || iss !== `https://securetoken.google.com/${projectId}`) {
    return { ok: false, error: "bad_claims" };
  }
  if (typeof sub !== "string" || sub.length === 0 || sub.length > 128) return { ok: false, error: "bad_claims" };
  if (typeof exp !== "number" || typeof iat !== "number") return { ok: false, error: "bad_claims" };
  if (iat > nowSeconds + SKEW_SECONDS) return { ok: false, error: "bad_claims" };
  if (typeof authTime === "number" && authTime > nowSeconds + SKEW_SECONDS) return { ok: false, error: "bad_claims" };
  if (exp <= nowSeconds - SKEW_SECONDS) return { ok: false, error: "expired" };

  const firebase = (payload.firebase ?? {}) as Record<string, unknown>;
  return {
    ok: true,
    token: {
      uid: sub,
      email: typeof payload.email === "string" ? payload.email.slice(0, 200) : null,
      emailVerified: payload.email_verified === true,
      provider: typeof firebase.sign_in_provider === "string" ? firebase.sign_in_provider : null,
    },
  };
}

/** Khóa công khai của Firebase Auth (JWK), Google đổi khóa vài ngày một lần. */
export const FIREBASE_JWKS_URL =
  "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com";

let cached: { keys: FirebaseJwk[]; until: number } | null = null;

/** Lấy khóa (giữ trong bộ nhớ của isolate theo Cache-Control của Google, tối đa 6 giờ). */
export async function firebaseKeys(force = false): Promise<FirebaseJwk[]> {
  const now = Date.now();
  if (!force && cached && cached.until > now) return cached.keys;
  const res = await fetch(FIREBASE_JWKS_URL, { cf: { cacheTtl: 3600 } } as RequestInit);
  if (!res.ok) throw new Error(`firebase keys ${res.status}`);
  const json = (await res.json()) as { keys?: FirebaseJwk[] };
  const keys = (json.keys ?? []).filter((k) => typeof k.kid === "string" && typeof k.n === "string");
  const maxAge = Number(/max-age=(\d+)/.exec(res.headers.get("cache-control") ?? "")?.[1] ?? 3600);
  cached = { keys, until: now + Math.min(Math.max(maxAge, 60), 6 * 3600) * 1000 };
  return keys;
}

/** Kiểm tra token với khóa hiện tại; khóa lạ thì tải lại khóa một lần (Google vừa đổi khóa). */
export async function verifyIdTokenOnline(token: string, projectId: string) {
  let result = await verifyFirebaseIdToken(token, projectId, await firebaseKeys());
  if (!result.ok && result.error === "unknown_key") {
    result = await verifyFirebaseIdToken(token, projectId, await firebaseKeys(true));
  }
  return result;
}
