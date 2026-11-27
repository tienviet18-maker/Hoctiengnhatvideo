# QC — peppa-my-birthday-party-full

- **Nguồn**: kênh 「ペッパピッグ Peppa Pig - 公式チャンネル」, video 「ペッパピッグ | わたしのおたんじょうびパーティ | Peppa Pig Japanese | 子供向けアニメ」 (youtubeId `To5fN_7OHxA`, 307 giây). Kiểm tự động khi làm gói: cho nhúng, công khai, chạy từ IP ở Nhật.
- **Clip**: 3.47–281.9 (278 giây, 102 dòng).
- **Dây chuyền**: `scripts/video-pipeline` — Whisper (âm thanh tải tạm, đã xoá) + phụ đề tự động YouTube; Gemini sửa chính tả/dấu câu theo 2 bản nghe, bỏ câu không chắc (3 câu bị bỏ trong đoạn), dịch + giải thích 11 ngôn ngữ; furigana kuromoji; cấp từ vựng theo `data/jlpt/`. Claude duyệt mẫu tiếng Việt/Anh theo lô.
- **Mốc thời gian**: theo Whisper.
- **Cấp độ**: N4.
