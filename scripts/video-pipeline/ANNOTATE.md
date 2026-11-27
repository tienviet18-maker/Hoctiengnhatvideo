# Hướng dẫn cho luồng Claude dịch video (thay Gemini)

iMac đã làm bước 1 và đẩy file thô vào `scripts/video-pipeline/raw/<youtubeId>.json`.
Việc của mỗi luồng: viết `raw/<youtubeId>.ann.json` cho các video được giao, rồi ghép gói và mở PR.

## Đầu vào `raw/<id>.json`
- `series`, `level` (N5–N1), `category`, `meta` (title, channel, duration)
- `lines[i]`: `start`, `end`, `text` (Whisper), `asr` (phụ đề tự động YouTube cùng khung giờ, có thể rỗng hoặc lẫn câu kế bên), `agree` (độ khớp 0–1)
- `clips`: danh sách clip, mỗi clip là danh sách chỉ số dòng

## Đầu ra `raw/<id>.ann.json`
```json
{"clips": {"0": {"titles": {"vi": "...", "en": "...", ...11 ngôn ngữ},
  "lines": [{"i": 12, "keep": true, "ja": "...",
     "translations": {11 ngôn ngữ}, "grammarNote": {11 ngôn ngữ},
     "vocab": [{"word": "...", "reading": "ひらがな", "meanings": {11 ngôn ngữ}}],
     "readings": [{"surface": "từ có kanji", "reading": "ひらがな"}]},
   {"i": 13, "keep": false}]}}, "usage": []}
```
Khoá ngôn ngữ đúng thứ tự: `vi, en, zh-Hans, zh-Hant, ko, tl, ne, id, pt, my, th`. Mọi dòng của clip phải có mặt (kể cả `keep:false`).

## Quy tắc (chuẩn v2, docs/content-standard.md)
1. `ja` = đúng lời được NÓI. Dùng 2 bản nghe (`text` Whisper + `asr`) để sửa nghe nhầm, kanji, dấu câu (、。？！). Không thêm hay bịa chữ. Tên nhân vật viết đúng (しんのすけ, ペッパ, アンパンマン...).
2. Hai bản lệch nhau mà không chắc → `keep:false`. Tiếng hét/nhạc/bập bẹ → `keep:false`. KHÔNG ĐOÁN.
3. `translations`: dịch thẳng từ tiếng Nhật, tự nhiên, giữ loại câu. Tiếng Việt là chuẩn cao nhất.
4. `grammarNote`: 1–2 câu mỗi ngôn ngữ, trích mẫu ngữ pháp trong 「」, sắc thái, cách dùng ngoài đời ở Nhật khi có. Cùng nội dung ở mọi ngôn ngữ.
5. `vocab`: 0–3 từ đúng cấp clip hoặc khó hơn, có trong câu (dạng từ điển hoặc đã chia). `build.py` tự bỏ từ dưới cấp/không có trong `data/jlpt/`.
6. `readings`: MỌI từ có kanji trong `ja`, cách đọc đúng theo ngữ cảnh (今日 きょう, 日本 にほん…). Việt yêu cầu mọi kanji đều có furigana.
7. `titles`: "<Tên kênh>: <chủ đề>" ở 11 ngôn ngữ. Phần sau dấu `:` của bản `en` thành id gói.

## Sau khi viết xong mỗi video
```bash
python3 scripts/video-pipeline/build.py <youtubeId>     # ghi gói + .qc.md + teaser, tự đăng ký content.ts
node scripts/gen-catalog.mjs && npm run qc
```
Một lô = 5–10 video. Gộp main trước khi mở PR; nếu `src/lib/content.ts` xung đột: lấy bản của main rồi chạy `python3 scripts/video-pipeline/register.py`.
`npm run verify` trên bản clone sạch, ghi `docs/review-log.md`, mở PR.
