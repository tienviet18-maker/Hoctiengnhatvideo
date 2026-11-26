import assert from "node:assert/strict";
import { test } from "node:test";
import { mergeSync } from "../src/lib/sync-merge.ts";

test("gộp hồ sơ: máy chủ thắng, không mang cờ VIP", () => {
  const out = mergeSync(
    { profile: { lang: "vi", name: "An", onboarded: true, vip: true } },
    { profile: { lang: "en", name: "", onboarded: false, vip: true } },
  );
  assert.deepEqual(out.profile, { lang: "en", name: "An", onboarded: true });
});

test("gộp thẻ ôn: hợp theo id, giữ thẻ ôn nhiều hơn", () => {
  const out = mergeSync(
    { deck: [{ id: "a", reps: 3, due: 1 }, { id: "b", reps: 0, due: 5 }] },
    { deck: [{ id: "a", reps: 1, due: 9 }, { id: "c", reps: 2, due: 2 }] },
  );
  const byId = Object.fromEntries((out.deck as { id: string; reps: number }[]).map((c) => [c.id, c.reps]));
  assert.deepEqual(byId, { a: 3, b: 0, c: 2 });
});

test("gộp hoạt động và tiến độ không làm mất gì", () => {
  const out = mergeSync(
    {
      activity: { "2026-11-26": { videos: 2, stories: 0, minutes: 10 } },
      progress: { x: { pos: 5, total: 10, updatedAt: 200 }, y: { pos: 1, total: 4, updatedAt: 50 } },
      custom: [{ youtubeId: "abc", title: "A", addedAt: 2 }],
    },
    {
      activity: { "2026-11-26": { videos: 1, stories: 3, minutes: 4 }, "2026-11-25": { videos: 1, stories: 1, minutes: 1 } },
      progress: { x: { pos: 2, total: 10, updatedAt: 100 }, y: { pos: 3, total: 4, updatedAt: 90 } },
      custom: [{ youtubeId: "abc", title: "A", addedAt: 2 }, { youtubeId: "def", title: "B", addedAt: 1 }],
    },
  );
  assert.deepEqual(out.activity, {
    "2026-11-26": { videos: 2, stories: 3, minutes: 10 },
    "2026-11-25": { videos: 1, stories: 1, minutes: 1 },
  });
  assert.equal((out.progress as Record<string, { pos: number }>).x.pos, 5);
  assert.equal((out.progress as Record<string, { pos: number }>).y.pos, 3);
  assert.deepEqual((out.custom as { youtubeId: string }[]).map((c) => c.youtubeId), ["def", "abc"]);
});

test("dữ liệu hỏng bị bỏ qua", () => {
  const out = mergeSync({ deck: "x", progress: [1], activity: null }, { deck: [{ nope: 1 }], profile: 3 });
  assert.deepEqual(out.deck, []);
  assert.deepEqual(out.progress, {});
  assert.deepEqual(out.activity, {});
});
