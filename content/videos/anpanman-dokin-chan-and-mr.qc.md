# QC — anpanman-dokin-chan-and-mr

- **Nguồn**: kênh 「それいけ!アンパンマン【アニメ公式】」, video 「ドキンちゃんとショウガナイさん【アンパンマンアニメ公式】」 (youtubeId `Jbk8JEAr8AE`, 637 giây). Kiểm tự động khi làm gói: cho nhúng, công khai, chạy từ IP ở Nhật.
- **Clip**: 2.81–605.31 (602 giây, 91 dòng).
- **Dây chuyền**: `scripts/video-pipeline` — Whisper (âm thanh tải tạm, đã xoá) + phụ đề tự động YouTube; Gemini sửa chính tả/dấu câu theo 2 bản nghe, bỏ câu không chắc (19 câu bị bỏ trong đoạn), dịch + giải thích 11 ngôn ngữ; furigana kuromoji; cấp từ vựng theo `data/jlpt/`. Claude duyệt mẫu tiếng Việt/Anh theo lô.
- **Mốc thời gian**: theo Whisper.
- **Cấp độ**: N5.
