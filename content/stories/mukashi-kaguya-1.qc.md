# QC — mukashi-kaguya-1 (N3, chuẩn v2)

- **Nguồn và pháp lý**: dựa trên 竹取物語 (Taketori Monogatari, khoảng thế kỷ 9–10, tác giả khuyết danh, truyện văn xuôi cổ nhất Nhật Bản, thuộc phạm vi công cộng). Bản kể do Claude tự viết bằng tiếng Nhật phân cấp, không chép bản dịch hiện đại, sách tranh hay phim (kể cả phim hoạt hình còn bản quyền).
- **Bản thảo**: `content/sources/mukashi/mukashi-kaguya-1/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/mukashi/mukashi-kaguya-1`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1662 ký tự, 58 câu, câu TB 28.7 ký tự,
  từ vượt cấp 10.0%, từ đạt cấp 24.9%.
- **Từ vựng**: 36 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/mukashi-kaguya-1/chapter.mp3`, 5.9 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 33 |
| J | ông lão đốn tre | `ja-JP-Neural2-C` rate=0.88 pitch=-5 | 8 |
| B | bà lão | `ja-JP-Neural2-B` rate=0.9 pitch=-3 | 4 |
| K | công chúa Kaguya | `ja-JP-Neural2-B` rate=0.95 pitch=1 | 8 |
| M | người trong làng, các quý tộc | `ja-JP-Neural2-C` rate=1.0 pitch=0 | 5 |

- **Bài học**: 4 điểm ngữ pháp (〜ほど, 〜ばかり, 〜てもらう, 〜たいものだ), 4 câu hỏi hiểu bài. Kệ: `folktale-jp`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
