# QC — mukashi-momotaro-1 (N3, chuẩn v2)

- **Nguồn và pháp lý**: truyện cổ tích dân gian Nhật Bản 桃太郎 (được kể truyền miệng, đã in từ thời Edo, không có tác giả, thuộc phạm vi công cộng). Bản kể do Claude tự viết bằng tiếng Nhật phân cấp, không chép sách tranh, phim hay bản kể của ai.
- **Bản thảo**: `content/sources/mukashi/mukashi-momotaro-1/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/mukashi/mukashi-momotaro-1`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1856 ký tự, 62 câu, câu TB 29.9 ký tự,
  từ vượt cấp 8.0%, từ đạt cấp 25.9%.
- **Từ vựng**: 45 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/mukashi-momotaro-1/chapter.mp3`, 6.5 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 34 |
| J | ông lão | `ja-JP-Neural2-C` rate=0.88 pitch=-5 | 4 |
| B | bà lão | `ja-JP-Neural2-B` rate=0.9 pitch=-3 | 4 |
| M | Momotarō | `ja-JP-Neural2-C` rate=1.02 pitch=2 | 11 |
| V | dân làng | `ja-JP-Neural2-C` rate=1.0 pitch=-1 | 2 |
| I | chú chó | `ja-JP-Neural2-C` rate=1.1 pitch=4 | 4 |
| S | chú khỉ | `ja-JP-Neural2-C` rate=1.18 pitch=9 | 2 |
| K | chim trĩ | `ja-JP-Neural2-B` rate=1.12 pitch=7 | 1 |

- **Bài học**: 4 điểm ngữ pháp (〜につれて, 〜からには, 〜ところだ, 〜なんか), 4 câu hỏi hiểu bài. Kệ: `folktale-jp`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
