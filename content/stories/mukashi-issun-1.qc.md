# QC — mukashi-issun-1 (N3, chuẩn v2)

- **Nguồn và pháp lý**: truyện cổ tích dân gian Nhật Bản 一寸法師 (đã có trong Otogizōshi thời Muromachi, hơn 500 năm, không có tác giả, thuộc phạm vi công cộng). Bản kể do Claude tự viết bằng tiếng Nhật phân cấp, không chép sách tranh, phim hay bản kể của ai.
- **Bản thảo**: `content/sources/mukashi/mukashi-issun-1/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/mukashi/mukashi-issun-1`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1564 ký tự, 58 câu, câu TB 27.0 ký tự,
  từ vượt cấp 8.6%, từ đạt cấp 24.6%.
- **Từ vựng**: 31 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/mukashi-issun-1/chapter.mp3`, 5.4 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 33 |
| J | ông lão | `ja-JP-Neural2-C` rate=0.88 pitch=-5 | 4 |
| B | bà lão | `ja-JP-Neural2-B` rate=0.9 pitch=-3 | 3 |
| I | Issun-bōshi | `ja-JP-Neural2-C` rate=1.1 pitch=8 | 11 |
| C | đám trẻ trong làng | `ja-JP-Neural2-B` rate=1.1 pitch=6 | 1 |
| S | quan đại thần | `ja-JP-Neural2-C` rate=0.9 pitch=-3 | 4 |
| H | công chúa | `ja-JP-Neural2-B` rate=1.0 pitch=3 | 2 |

- **Bài học**: 4 điểm ngữ pháp (〜しか〜ない, 〜ないように, 〜ために, 〜ことになる), 4 câu hỏi hiểu bài. Kệ: `folktale-jp`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
