# QC — mukashi-kaguya-2 (N3, chuẩn v2)

- **Nguồn và pháp lý**: dựa trên 竹取物語 (Taketori Monogatari, khoảng thế kỷ 9–10, tác giả khuyết danh, truyện văn xuôi cổ nhất Nhật Bản, thuộc phạm vi công cộng). Bản kể do Claude tự viết bằng tiếng Nhật phân cấp, không chép bản dịch hiện đại, sách tranh hay phim (kể cả phim hoạt hình còn bản quyền).
- **Bản thảo**: `content/sources/mukashi/mukashi-kaguya-2/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/mukashi/mukashi-kaguya-2`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1729 ký tự, 58 câu, câu TB 29.8 ký tự,
  từ vượt cấp 5.4%, từ đạt cấp 35.0%.
- **Từ vựng**: 53 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/mukashi-kaguya-2/chapter.mp3`, 6.1 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 44 |
| K | công chúa Kaguya | `ja-JP-Neural2-B` rate=0.95 pitch=1 | 4 |
| J | ông lão đốn tre | `ja-JP-Neural2-C` rate=0.88 pitch=-5 | 1 |
| R | hoàng tử Kuramochi | `ja-JP-Neural2-C` rate=1.0 pitch=-1 | 1 |
| S | người thợ | `ja-JP-Neural2-C` rate=1.12 pitch=3 | 2 |
| U | Hữu đại thần | `ja-JP-Neural2-C` rate=1.05 pitch=1 | 1 |
| D | Đại nạp ngôn | `ja-JP-Neural2-C` rate=0.95 pitch=-8 | 2 |
| M | Thiên hoàng | `ja-JP-Neural2-C` rate=0.85 pitch=-2 | 3 |

- **Bài học**: 4 điểm ngữ pháp (〜(さ)せる, まるで〜ようだ, 〜ずに, 〜ふりをする), 4 câu hỏi hiểu bài. Kệ: `folktale-jp`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
