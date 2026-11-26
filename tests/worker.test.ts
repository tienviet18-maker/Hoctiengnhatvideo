import assert from "node:assert/strict";
import { test } from "node:test";
import worker, { grantActive } from "../worker/index.ts";

test("VIP còn hiệu lực: chưa thu hồi và chưa hết hạn", () => {
  const now = Date.parse("2026-11-26T10:00:00Z");
  assert.equal(grantActive(null, now), false);
  assert.equal(grantActive({ revoked_at: null, expires_at: null }, now), true);
  assert.equal(grantActive({ revoked_at: "2026-11-01T00:00:00Z", expires_at: null }, now), false);
  assert.equal(grantActive({ revoked_at: null, expires_at: "2026-11-26T10:00:01Z" }, now), true);
  assert.equal(grantActive({ revoked_at: null, expires_at: "2026-11-26T09:59:59Z" }, now), false);
});

const env = {
  ASSETS: { fetch: async () => new Response("asset") },
  DB: { prepare: () => ({ bind: () => ({ first: async () => null }) }) },
  FIREBASE_PROJECT_ID: "miraigo-vimai",
};

test("không bao giờ trả thẳng /_locked, nội dung VIP cần đăng nhập", async () => {
  const get = (p: string, h: Record<string, string> = {}) =>
    worker.fetch(new Request(`https://miraigo.vimai.jp${p}`, { headers: h }), env as never);
  assert.equal((await get("/_locked/videos/x.json")).status, 404);
  assert.equal((await get("/api/content/videos/x")).status, 401);
  assert.equal((await get("/api/content/videos/x", { authorization: "Bearer a.b.c" })).status, 401);
  assert.equal((await get("/api/content/secrets/x")).status, 404);
  assert.equal((await get("/api/content/videos/..%2Fetc")).status, 404);
  assert.equal(await (await get("/watch/x")).text(), "asset");
});
