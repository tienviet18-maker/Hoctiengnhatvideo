# Dây chuyền video MiraiGo

Biến video YouTube (chỉ NHÚNG, không lưu video) thành gói học chuẩn v2. Chạy trên iMac (IP ở Nhật, không bị YouTube 429).

| Bước | Script | Việc |
|---|---|---|
| 1 | `prepare.py` | Kiểm cho nhúng/công khai → phụ đề tự động `ja-orig` + Whisper (âm thanh tải tạm, xoá ngay) → cắt clip 45–240s, khoảng trống ≤ 8s, dòng ≤ 12s |
| 2 | `annotate.py` | Gemini (gói miễn phí) nhận 2 bản nghe mỗi dòng → giữ/sửa/bỏ câu, dịch 11 ngôn ngữ, `grammarNote`, từ vựng |
| 3 | `build.py` | Furigana/romaji (kuromoji), cấp JLPT theo `data/jlpt/`, bỏ câu trùng, kiểm lại luật clip, ghi gói + `.qc.md` + teaser, đăng ký `src/lib/content.ts` |
| — | `run.sh N` | Chạy N video kế tiếp trong `queue.tsv`, rồi `npm run qc` |

Sau mỗi lô: Claude đọc mẫu tiếng Việt/Anh, `npm run verify` trên bản clone sạch, mở PR (tự gộp khi xanh).

Cài đặt một lần (ngoài repo): `~/ytsub-test/yt-dlp` (bản độc lập mới nhất, `--js-runtimes node`), `~/ytsub-test/whisper-env` (faster-whisper),
key Gemini ở `~/ytsub-test/.gemini_key` (chmod 600, KHÔNG commit). Kênh mới: thêm vào `src/lib/series.ts` + nhãn 11 ngôn ngữ trước khi chạy.

`queue.tsv`: youtubeId, series, cấp, category, thời lượng, tiêu đề — 4 kênh đã kiểm (Peppa Pig 公式, TED-Ed 日本語, YUYU Podcast, Japanese with Shun).
