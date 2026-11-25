# QC — mukashi-tsuru-2 (N3, chuẩn v2)

- **Nguồn và pháp lý**: truyện cổ tích dân gian Nhật Bản 鶴の恩返し (truyền miệng nhiều vùng từ thời Edo trở về trước, không có tác giả, thuộc phạm vi công cộng). Bản kể do Claude tự viết bằng tiếng Nhật phân cấp; KHÔNG dựa vào vở kịch 夕鶴 (Kinoshita Junji, còn bản quyền) — không dùng tên つう, 与ひょう hay tình tiết riêng của vở đó.
- **Bản thảo**: `content/sources/mukashi/mukashi-tsuru-2/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/mukashi/mukashi-tsuru-2`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1479 ký tự, 57 câu, câu TB 25.9 ký tự,
  từ vượt cấp 4.9%, từ đạt cấp 26.6%.
- **Từ vựng**: 40 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/mukashi-tsuru-2/chapter.mp3`, 5.4 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 32 |
| J | ông lão | `ja-JP-Neural2-C` rate=0.88 pitch=-5 | 7 |
| B | bà lão | `ja-JP-Neural2-B` rate=0.9 pitch=-3 | 7 |
| T | cô gái | `ja-JP-Neural2-B` rate=1.0 pitch=4 | 9 |
| D | chủ tiệm vải | `ja-JP-Neural2-C` rate=1.05 pitch=2 | 2 |

- **Bài học**: 4 điểm ngữ pháp (〜のに, 〜ずつ, 〜たら, 〜たびに), 4 câu hỏi hiểu bài. Kệ: `folktale-jp`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
