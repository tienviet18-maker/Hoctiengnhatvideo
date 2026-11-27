# QC — shinchan-playing-with-a-flashlight

- **Nguồn**: kênh 「【アニメ】クレヨンしんちゃん公式チャンネル」, video 「【クレヨンしんちゃん】かいちゅう電灯で遊ぶゾ《アニメ公式》」 (youtubeId `POlgNMFomiA`, 465 giây). Kiểm tự động khi làm gói: cho nhúng, công khai, chạy từ IP ở Nhật.
- **Clip**: 2.83–448.05 (445 giây, 121 dòng).
- **Dây chuyền**: `scripts/video-pipeline` — Whisper (âm thanh tải tạm, đã xoá) + phụ đề tự động YouTube; Gemini sửa chính tả/dấu câu theo 2 bản nghe, bỏ câu không chắc (13 câu bị bỏ trong đoạn), dịch + giải thích 11 ngôn ngữ; furigana kuromoji; cấp từ vựng theo `data/jlpt/`. Claude duyệt mẫu tiếng Việt/Anh theo lô.
- **Mốc thời gian**: theo Whisper.
- **Cấp độ**: N4.
