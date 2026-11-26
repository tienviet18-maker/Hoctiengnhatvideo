# QC — mukashi-hanasaka (N3, chuẩn v2)

- **Nguồn và pháp lý**: truyện cổ tích dân gian Nhật Bản 花咲かじいさん (lưu truyền từ trước thời Edo, khuyết danh, phạm vi công cộng). Bản kể do Claude tự viết bằng tiếng Nhật phân cấp, kể nhẹ nhàng đoạn chú chó chết, không chép câu chữ của bản in hay sách tranh nào.
- **Bản thảo**: `content/sources/mukashi/mukashi-hanasaka/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/mukashi/mukashi-hanasaka`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1707 ký tự, 61 câu, câu TB 28.0 ký tự,
  từ vượt cấp 10.9%, từ đạt cấp 28.8%.
- **Từ vựng**: 41 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/mukashi-hanasaka/chapter.mp3`, 6.1 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 37 |
| O | ông lão thật thà | `ja-JP-Neural2-C` rate=0.85 pitch=-7 | 7 |
| B | bà lão thật thà | `ja-JP-Neural2-B` rate=0.9 pitch=-4 | 3 |
| I | ông hàng xóm tham lam | `ja-JP-Neural2-C` rate=1.05 pitch=-12 | 8 |
| S | chú chó Shiro | `ja-JP-Neural2-C` rate=1.05 pitch=6 | 2 |
| K | quan hầu | `ja-JP-Neural2-C` rate=1.0 pitch=-3 | 2 |
| T | lãnh chúa | `ja-JP-Neural2-C` rate=0.82 pitch=-9 | 2 |

- **Bài học**: 4 điểm ngữ pháp (〜おかげで, 〜のせいで, 〜ないうちに, 〜わけがない), 4 câu hỏi hiểu bài. Kệ: `folktale-jp`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
