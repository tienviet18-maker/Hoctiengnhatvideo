# QC — shinchan-moms-lucky-day-full

- **Nguồn**: kênh 「【アニメ】クレヨンしんちゃん公式チャンネル」, video 「【クレヨンしんちゃん】いいことありそうな一日だゾ《アニメ公式》」 (youtubeId `CTISRtOtZDk`, 424 giây). Kiểm tự động khi làm gói: cho nhúng, công khai, chạy từ IP ở Nhật.
- **Clip**: 1.04–412.01 (411 giây, 84 dòng).
- **Dây chuyền**: `scripts/video-pipeline` — Whisper (âm thanh tải tạm, đã xoá) + phụ đề tự động YouTube; Gemini sửa chính tả/dấu câu theo 2 bản nghe, bỏ câu không chắc (7 câu bị bỏ trong đoạn), dịch + giải thích 11 ngôn ngữ; furigana kuromoji; cấp từ vựng theo `data/jlpt/`. Claude duyệt mẫu tiếng Việt/Anh theo lô.
- **Mốc thời gian**: theo Whisper.
- **Cấp độ**: N4.
