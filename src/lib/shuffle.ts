/**
 * Xáo thứ tự cố định theo một chuỗi hạt giống (cùng gói + cùng câu hỏi thì luôn ra cùng thứ tự, khớp giữa
 * máy chủ và máy khách). Dùng cho đáp án câu hỏi Bài học: nhiều gói lưu đáp án đúng ở vị trí đầu.
 */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Trả về hoán vị của 0..n-1 (Fisher–Yates với bộ sinh mulberry32). */
export function seededOrder(n: number, seed: string): number[] {
  let a = hash(seed) || 1;
  const rand = () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const order = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}
