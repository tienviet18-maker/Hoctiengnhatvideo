# QC — mukashi-issun-2 (N3, chuẩn v2)

- **Nguồn và pháp lý**: truyện cổ tích dân gian Nhật Bản 一寸法師 (đã có trong Otogizōshi thời Muromachi, hơn 500 năm, không có tác giả, thuộc phạm vi công cộng). Bản kể do Claude tự viết bằng tiếng Nhật phân cấp, không chép sách tranh, phim hay bản kể của ai.
- **Bản thảo**: `content/sources/mukashi/mukashi-issun-2/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/mukashi/mukashi-issun-2`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1490 ký tự, 60 câu, câu TB 24.8 ký tự,
  từ vượt cấp 9.9%, từ đạt cấp 39.1%.
- **Từ vựng**: 36 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/mukashi-issun-2/chapter.mp3`, 5.1 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 29 |
| I | Issun-bōshi | `ja-JP-Neural2-C` rate=1.1 pitch=8 | 9 |
| H | công chúa | `ja-JP-Neural2-B` rate=1.0 pitch=3 | 10 |
| O | quỷ anh | `ja-JP-Neural2-C` rate=0.85 pitch=-12 | 6 |
| K | quỷ em | `ja-JP-Neural2-C` rate=1.15 pitch=-4 | 3 |
| S | quan đại thần | `ja-JP-Neural2-C` rate=0.9 pitch=-3 | 1 |
| J | ông lão | `ja-JP-Neural2-C` rate=0.88 pitch=-5 | 1 |
| B | bà lão | `ja-JP-Neural2-B` rate=0.9 pitch=-3 | 1 |

- **Bài học**: 4 điểm ngữ pháp (〜みたいに, 〜ながら, 〜(よ)うとする, 〜ば), 4 câu hỏi hiểu bài. Kệ: `folktale-jp`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
