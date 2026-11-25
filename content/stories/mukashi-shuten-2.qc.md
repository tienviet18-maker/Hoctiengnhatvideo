# QC — mukashi-shuten-2 (N3, chuẩn v2)

- **Nguồn và pháp lý**: dựa trên truyện 酒呑童子 trong 御伽草子 (Otogizōshi, thời Muromachi thế kỷ 14–16, khuyết danh, thuộc phạm vi công cộng). Bản kể do Claude tự viết bằng tiếng Nhật phân cấp, không chép bản dịch hiện đại, manga, anime hay game có bản quyền.
- **Bản thảo**: `content/sources/mukashi/mukashi-shuten-2/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/mukashi/mukashi-shuten-2`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1667 ký tự, 58 câu, câu TB 28.7 ký tự,
  từ vượt cấp 7.1%, từ đạt cấp 39.4%.
- **Từ vựng**: 58 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/mukashi-shuten-2/chapter.mp3`, 6.0 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 37 |
| D | Shuten-dōji | `ja-JP-Neural2-C` rate=0.82 pitch=-11 | 10 |
| R | Minamoto no Raikō | `ja-JP-Neural2-C` rate=0.95 pitch=-5 | 5 |
| K | Sakata no Kintoki | `ja-JP-Neural2-C` rate=1.12 pitch=4 | 1 |
| W | Watanabe no Tsuna | `ja-JP-Neural2-C` rate=1.0 pitch=0 | 1 |
| O | ba ông lão (thần) | `ja-JP-Neural2-C` rate=0.8 pitch=-9 | 1 |
| H | người con gái bị bắt | `ja-JP-Neural2-B` rate=1.0 pitch=2 | 1 |
| J | các cô gái được cứu | `ja-JP-Neural2-B` rate=1.05 pitch=5 | 1 |
| P | quan Đại nạp ngôn | `ja-JP-Neural2-C` rate=1.05 pitch=2 | 1 |

- **Bài học**: 4 điểm ngữ pháp (〜てみせる, 〜たことがない, 〜というのに, 〜のためなら), 4 câu hỏi hiểu bài. Kệ: `folktale-jp`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
