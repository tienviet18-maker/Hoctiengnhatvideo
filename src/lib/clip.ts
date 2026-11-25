/**
 * Đoạn học trong một video YouTube. Mỗi bài video là một clip nằm giữa video gốc
 * (trung vị bắt đầu ở giây ~128 của video dài ~11 phút), nên trình phát phải mở đúng
 * đoạn này thay vì từ giây 0. Cùng công thức với scripts/gen-catalog.mjs.
 */
export function clipWindow(
  lines: readonly { start: number; end: number }[],
  durationSec: number,
): { start: number; end: number } {
  if (!lines.length) return { start: 0, end: durationSec };
  return {
    start: Math.max(0, Math.floor(lines[0].start - 2)),
    end: Math.min(durationSec, Math.ceil(lines[lines.length - 1].end + 1.5)),
  };
}
