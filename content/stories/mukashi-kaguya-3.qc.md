# QC — mukashi-kaguya-3 (N3, chuẩn v2)

- **Nguồn và pháp lý**: dựa trên 竹取物語 (Taketori Monogatari, khoảng thế kỷ 9–10, tác giả khuyết danh, truyện văn xuôi cổ nhất Nhật Bản, thuộc phạm vi công cộng). Bản kể do Claude tự viết bằng tiếng Nhật phân cấp, không chép bản dịch hiện đại, sách tranh hay phim (kể cả phim hoạt hình còn bản quyền).
- **Bản thảo**: `content/sources/mukashi/mukashi-kaguya-3/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/mukashi/mukashi-kaguya-3`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1706 ký tự, 57 câu, câu TB 29.9 ký tự,
  từ vượt cấp 8.3%, từ đạt cấp 24.9%.
- **Từ vựng**: 39 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/mukashi-kaguya-3/chapter.mp3`, 6.0 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 35 |
| K | công chúa Kaguya | `ja-JP-Neural2-B` rate=0.95 pitch=1 | 12 |
| J | ông lão đốn tre | `ja-JP-Neural2-C` rate=0.88 pitch=-5 | 3 |
| B | bà lão | `ja-JP-Neural2-B` rate=0.9 pitch=-3 | 3 |
| M | Thiên hoàng | `ja-JP-Neural2-C` rate=0.85 pitch=-2 | 2 |
| T | người cõi trời (thiên nhân) | `ja-JP-Neural2-B` rate=0.82 pitch=-6 | 2 |

- **Bài học**: 4 điểm ngữ pháp (〜なければならない, 〜はず, 〜まま, 〜ように命じる), 4 câu hỏi hiểu bài. Kệ: `folktale-jp`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
