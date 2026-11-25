# QC — mukashi-ushiwaka-1 (N3, chuẩn v2)

- **Nguồn và pháp lý**: dựa trên truyền thuyết dân gian về 牛若丸 (Minamoto no Yoshitsune) và 武蔵坊弁慶, nguồn 義経記 (Gikeiki, thời Muromachi, khuyết danh, thuộc phạm vi công cộng). Bản kể do Claude tự viết bằng tiếng Nhật phân cấp, không chép bản dịch hiện đại, phim, manga hay game có bản quyền; không trích lời bài hát.
- **Bản thảo**: `content/sources/mukashi/mukashi-ushiwaka-1/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/mukashi/mukashi-ushiwaka-1`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1602 ký tự, 55 câu, câu TB 29.1 ký tự,
  từ vượt cấp 7.1%, từ đạt cấp 30.7%.
- **Từ vựng**: 47 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/mukashi-ushiwaka-1/chapter.mp3`, 5.8 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 36 |
| T | mẹ Tokiwa | `ja-JP-Neural2-B` rate=0.92 pitch=-2 | 2 |
| U | Ushiwaka | `ja-JP-Neural2-C` rate=1.08 pitch=6 | 5 |
| S | sư trụ trì chùa Kurama | `ja-JP-Neural2-C` rate=0.85 pitch=-6 | 2 |
| G | thiên cẩu Sōjōbō | `ja-JP-Neural2-C` rate=0.8 pitch=-13 | 4 |
| B | Benkei | `ja-JP-Neural2-C` rate=0.9 pitch=-9 | 5 |
| X | võ sĩ qua cầu | `ja-JP-Neural2-C` rate=1.15 pitch=2 | 1 |

- **Bài học**: 4 điểm ngữ pháp (〜ている場合ではない, 〜の代わりに, 〜さえ, 〜てみたらどうですか), 4 câu hỏi hiểu bài. Kệ: `folktale-jp`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
