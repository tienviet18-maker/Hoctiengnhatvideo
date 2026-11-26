# Kiến trúc G0 — Module Học tiếng Nhật qua video và sách (ViMai)

## Mục tiêu
Web app tại `video.vimai.jp`: học tiếng Nhật qua video YouTube nhúng và truyện phân cấp, 11 ngôn ngữ giao diện/dịch, mô hình Tadoku nhưng chuẩn tiếng Nhật + bản dịch hơn hẳn.

## Stack
- **Next.js (App Router) + TypeScript + Tailwind CSS** — đồng hệ vimai-ecosystem.
- Nội dung là dữ liệu tĩnh: mỗi video/truyện = 1 file JSON trong `content/videos/`, `content/stories/`; build tĩnh tối đa, không backend riêng ở MVP.
- Âm thanh đọc câu (truyện) lưu dạng file tĩnh trong `public/audio/`.
- Tiến độ học, thẻ SRS, streak: localStorage trên máy người dùng ở MVP; cờ VIP đơn giản theo tài khoản ViMai, chưa nối thanh toán.

## Schema nội dung (dùng chung cho video và truyện)
- `Sentence`: `ja` (câu Nhật), `furigana` (mảng {surface, reading} theo từng từ), `romaji`, `translations` (đối tượng theo mã ngôn ngữ), `vocab` (từ, cách đọc, nghĩa theo ngôn ngữ, mức JLPT), `grammarNote` (cho nút "Giải thích", chủ yếu ở truyện).
- `VideoContent`: `id`, `youtubeId`, `titles` (theo ngôn ngữ), `level` (N5–N1), `category`, `durationSec`, `lines` (Sentence + `start`/`end`), `teaser` (start/end + file .ass).
- `StoryContent`: `id`, `titles`, `level`, `topic`, `cover` (mô tả/đường dẫn ảnh), `sentences` (Sentence + `audio` đường dẫn file đọc câu).
- Mã ngôn ngữ: `vi, en, zh-Hans, zh-Hant, ko, tl, ne, id, pt, my, th`. Thiếu bản dịch: fallback `en` → `ja`.

## Cấu trúc thư mục chính
- `src/app/` — 5 tab: Video, Sách, Tin tức (Sắp có), Thư viện, Hồ sơ + onboarding chọn ngôn ngữ.
- `src/i18n/locales/<lang>.json` — chữ giao diện từng ngôn ngữ; font stack riêng cho ne/my/th/zh/ko khai báo ở CSS toàn cục.
- `src/lib/` — types schema, bộ nạp nội dung, SRS (thuật toán lặp lại ngắt quãng), lưu trữ local.
- `skills/` — `vimai-video-sub`, `vimai-story` (đường ống sản xuất nội dung, G2).
- `docs/` — tài liệu kiến trúc và kiểm chứng.

## Deploy
- Cloudflare Worker + Workers Static Assets (`wrangler.toml`): Next xuất tĩnh (`output: "export"`), Worker chặn nội dung VIP và chuyển tiếp đăng nhập Firebase; domain `miraigo.vimai.jp` (docs/deploy.md).

## Quy ước làm việc (chốt 24/11/2026)
- Muse xây dựng toàn bộ; Claude trên iMac kiểm duyệt độc lập tại các điểm kiểm nội bộ (kiến trúc, mockup, nội dung mẫu, bản xem trước cuối).
- Việt trao toàn quyền thực thi; việc cần thẻ duyệt của Việt (đẩy GitHub, nối Cloudflare) **gom vào 1 lần duyệt duy nhất** ở cuối, không xin duyệt lẻ từng bước.
