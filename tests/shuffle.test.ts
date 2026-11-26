import { test } from "node:test";
import assert from "node:assert/strict";
import { seededOrder } from "../src/lib/shuffle.ts";

test("seededOrder là hoán vị và cố định theo hạt giống", () => {
  const a = seededOrder(4, "pack:0");
  assert.deepEqual([...a].sort(), [0, 1, 2, 3]);
  assert.deepEqual(seededOrder(4, "pack:0"), a);
});

test("đáp án đúng ở vị trí 0 không còn luôn đứng đầu", () => {
  let first = 0;
  for (let q = 0; q < 400; q++) if (seededOrder(4, `pack-x:${q}`)[0] === 0) first++;
  assert.ok(first > 60 && first < 140, `đứng đầu ${first}/400`);
});
