# QC — mukashi-urashima-1 (N3, chuẩn v2)

- **Nguồn và pháp lý**: truyện cổ tích dân gian Nhật Bản (đã có trong Nihon Shoki, Man'yōshū, Otogizōshi — hơn 1.000 năm, không có tác giả, thuộc phạm vi công cộng). Bản kể do Claude tự viết bằng tiếng Nhật phân cấp, không chép sách tranh, phim hay bản kể của ai.
- **Bản thảo**: `content/sources/mukashi/mukashi-urashima-1/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/mukashi/mukashi-urashima-1`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1629 ký tự, 59 câu, câu TB 27.6 ký tự,
  từ vượt cấp 1.9%, từ đạt cấp 20.0%.
- **Từ vựng**: 42 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/mukashi-urashima-1/chapter.mp3`, 5.7 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 34 |
| U | Urashima Tarō | `ja-JP-Neural2-C` rate=0.98 pitch=0 | 12 |
| C | đám trẻ con | `ja-JP-Neural2-B` rate=1.1 pitch=6 | 3 |
| K | rùa | `ja-JP-Neural2-C` rate=0.85 pitch=-6 | 6 |
| O | công chúa Otohime | `ja-JP-Neural2-B` rate=0.92 pitch=2 | 4 |

- **Bài học**: 4 điểm ngữ pháp (〜たり〜たり, 〜てはいけない, 〜ていただく, 〜にちがいない), 4 câu hỏi hiểu bài. Kệ: `folktale-jp`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
