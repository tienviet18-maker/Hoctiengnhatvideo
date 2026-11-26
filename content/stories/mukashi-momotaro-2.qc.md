# QC — mukashi-momotaro-2 (N3, chuẩn v2)

- **Nguồn và pháp lý**: truyện cổ tích dân gian Nhật Bản 桃太郎 (được kể truyền miệng, đã in từ thời Edo, không có tác giả, thuộc phạm vi công cộng). Bản kể do Claude tự viết bằng tiếng Nhật phân cấp, không chép sách tranh, phim hay bản kể của ai.
- **Bản thảo**: `content/sources/mukashi/mukashi-momotaro-2/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/mukashi/mukashi-momotaro-2`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1612 ký tự, 62 câu, câu TB 26.0 ký tự,
  từ vượt cấp 4.1%, từ đạt cấp 31.0%.
- **Từ vựng**: 46 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/mukashi-momotaro-2/chapter.mp3`, 5.8 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 34 |
| J | ông lão | `ja-JP-Neural2-C` rate=0.88 pitch=-5 | 1 |
| B | bà lão | `ja-JP-Neural2-B` rate=0.9 pitch=-3 | 1 |
| M | Momotarō | `ja-JP-Neural2-C` rate=1.02 pitch=2 | 8 |
| V | dân làng | `ja-JP-Neural2-C` rate=1.0 pitch=-1 | 2 |
| I | chú chó | `ja-JP-Neural2-C` rate=1.1 pitch=4 | 2 |
| S | chú khỉ | `ja-JP-Neural2-C` rate=1.18 pitch=9 | 3 |
| K | chim trĩ | `ja-JP-Neural2-B` rate=1.12 pitch=7 | 3 |
| O | đại vương quỷ | `ja-JP-Neural2-C` rate=0.8 pitch=-15 | 4 |
| A | quỷ lính | `ja-JP-Neural2-C` rate=1.05 pitch=-8 | 4 |

- **Bài học**: 4 điểm ngữ pháp (〜どころか, 〜ことはない, 〜ずにはいられない, 〜うえに), 4 câu hỏi hiểu bài. Kệ: `folktale-jp`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
