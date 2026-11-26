# QC — mukashi-shitakiri (N3, chuẩn v2)

- **Nguồn và pháp lý**: truyện cổ tích dân gian Nhật Bản 舌切り雀 (lưu truyền từ trước thời Edo, khuyết danh, phạm vi công cộng). Bản kể do Claude tự viết bằng tiếng Nhật phân cấp, không chép câu chữ của bản in hay sách tranh nào.
- **Bản thảo**: `content/sources/mukashi/mukashi-shitakiri/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/mukashi/mukashi-shitakiri`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1806 ký tự, 62 câu, câu TB 29.1 ký tự,
  từ vượt cấp 5.9%, từ đạt cấp 21.4%.
- **Từ vựng**: 40 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/mukashi-shitakiri/chapter.mp3`, 6.4 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 31 |
| O | ông lão hiền | `ja-JP-Neural2-C` rate=0.85 pitch=-8 | 10 |
| B | bà lão xấu bụng | `ja-JP-Neural2-B` rate=0.98 pitch=-6 | 12 |
| S | chim sẻ Chun | `ja-JP-Neural2-B` rate=1.08 pitch=7 | 5 |
| T | đàn chim sẻ | `ja-JP-Neural2-B` rate=1.0 pitch=3 | 1 |
| U | người tắm bò | `ja-JP-Neural2-C` rate=1.0 pitch=-2 | 3 |

- **Bài học**: 4 điểm ngữ pháp (〜くせに, 〜に違いない, 〜ついでに, 〜よりしかたがない), 4 câu hỏi hiểu bài. Kệ: `folktale-jp`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
