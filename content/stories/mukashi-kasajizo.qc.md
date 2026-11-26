# QC — mukashi-kasajizo (N3, chuẩn v2)

- **Nguồn và pháp lý**: truyện cổ tích dân gian Nhật Bản 笠地蔵 (lưu truyền khuyết danh từ thời Edo trở về trước, phạm vi công cộng). Bản kể do Claude tự viết bằng tiếng Nhật phân cấp, không chép câu chữ của bản in, sách tranh hay lời hát (bài hò của các tượng Jizō được thay bằng lời tự viết).
- **Bản thảo**: `content/sources/mukashi/mukashi-kasajizo/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/mukashi/mukashi-kasajizo`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1712 ký tự, 59 câu, câu TB 29.0 ký tự,
  từ vượt cấp 6.2%, từ đạt cấp 15.0%.
- **Từ vựng**: 26 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/mukashi-kasajizo/chapter.mp3`, 6.2 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 35 |
| J | ông lão | `ja-JP-Neural2-C` rate=0.86 pitch=-5 | 14 |
| B | bà lão | `ja-JP-Neural2-B` rate=0.88 pitch=-6 | 7 |
| M | người bán hàng ở chợ | `ja-JP-Neural2-C` rate=1.06 pitch=0 | 2 |
| Z | các tượng Jizō | `ja-JP-Neural2-C` rate=0.8 pitch=-13 | 1 |

- **Bài học**: 4 điểm ngữ pháp (せっかく〜のに, 〜なんて, 〜しかない, かえって), 4 câu hỏi hiểu bài. Kệ: `folktale-jp`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
