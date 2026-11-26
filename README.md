# ViMai Video — Học tiếng Nhật qua video & truyện (video.vimai.jp)

Ứng dụng web học tiếng Nhật theo phương pháp đa đọc/nghe hiểu (comprehensible input):
xem video YouTube có phụ đề đã kiểm chứng, đọc truyện ngắn có furigana + audio từng câu,
chép chính tả, nói đuổi (shadowing) và ôn từ vựng theo SRS. 11 ngôn ngữ giao diện,
giá VIP ¥900/1 tháng, ¥4.400/6 tháng, ¥7.800/1 năm.

## Công nghệ

- Next.js 16 (App Router, Cache Components + Partial Prerendering) + React 19 + TypeScript
- Tailwind CSS v4
- Nội dung dạng file JSON có schema chặt (`src/lib/content-schema.ts`), kiểm chứng tự động 100%
- Triển khai: Cloudflare Worker + Static Assets (miền `miraigo.vimai.jp`, docs/deploy.md)

## Chạy cục bộ

```bash
npm install
npm run dev        # tự sinh catalog trước khi chạy (predev)
```

## Cổng chất lượng (bắt buộc trước khi coi là "xong")

```bash
npm run verify     # = qc nội dung + typecheck + lint + build
```

Không một thay đổi nào được coi là hoàn thành nếu `npm run verify` chưa xanh toàn bộ.
Chi tiết chuẩn kỹ thuật: `docs/engineering-standard.md`. Kiến trúc: `docs/architecture.md`.

## Cấu trúc

| Thư mục | Vai trò |
|---|---|
| `src/app/` | Các trang: trang chủ (video), `/books`, `/read/[id]`, `/watch/[id]`, `/library`, `/profile`, `/onboarding`, `/news` |
| `src/lib/content.ts` | Đăng ký toàn bộ gói nội dung — nguồn sự thật duy nhất về thứ tự danh mục |
| `src/lib/catalog.generated.ts` | **File sinh tự động** (không sửa tay): chỉ mục metadata nhẹ cho trang danh sách, sinh bởi `scripts/gen-catalog.mjs` |
| `src/lib/content-schema.ts` | Schema TypeScript của video/truyện |
| `content/videos/`, `content/stories/` | Dữ liệu nội dung (JSON) + ghi chú QC (`.qc.md`) cho từng gói |
| `public/audio/<storyId>/` | Audio đọc từng câu (TTS) |
| `public/teasers/` | Phụ đề `.ass` cho đoạn teaser của video |
| `scripts/` | `qc-content.mjs` (kiểm chứng nội dung), `gen-catalog.mjs` (sinh chỉ mục) |
| `skills/` | Quy trình sản xuất nội dung: `vimai-video-sub` (lọc video), `vimai-story` (viết truyện) |

## Quy trình thêm nội dung

1. Viết gói JSON theo schema + ghi chú `.qc.md` (nguồn, lựa chọn biên tập, điểm đã kiểm).
2. Đăng ký vào `src/lib/content.ts` (import + mảng) — catalog tự sinh lại khi build.
3. Truyện: sinh audio TTS vào `public/audio/<id>/NNN.mp3`.
4. Chạy `npm run verify` — phải 0 lỗi mới tính xong một đợt.

## Giới hạn triển khai cần theo dõi

- Cloudflare Pages: tối đa **20.000 file / lần triển khai**, 25MB / file. Hiện tại ~4.800 file,
  trong đó audio ~2.300 file / ~107MB. Khi audio vượt ~10.000 file: chuyển audio sang
  Cloudflare R2 và đổi tiền tố đường dẫn trong schema (xem `docs/engineering-standard.md`).
- Trang danh sách chỉ tải catalog metadata (~68KB); nội dung đầy đủ chỉ nạp ở trang chi tiết.
