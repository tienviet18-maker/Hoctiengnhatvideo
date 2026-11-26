# QC — rakugo-kinmeichiku (N3, chuẩn v2)

- **Nguồn và pháp lý**: tiết mục rakugo cổ điển thời Edo, không rõ tác giả, đã hết bản quyền; câu haiku 古池や của Matsuo Bashō (thế kỷ 17) thuộc phạm vi công cộng. Kịch bản do Claude tự viết lại bằng tiếng Nhật phân cấp, không chép bản ghi âm, sách hay kịch bản của nghệ sĩ nào.
- **Bản thảo**: `content/sources/rakugo/rakugo-kinmeichiku/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/rakugo/rakugo-kinmeichiku`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1752 ký tự, 63 câu, câu TB 27.8 ký tự,
  từ vượt cấp 6.8%, từ đạt cấp 25.1%.
- **Từ vựng**: 39 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/rakugo-kinmeichiku/chapter.mp3`, 5.9 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 19 |
| Y | chàng Yotarō | `ja-JP-Neural2-C` rate=0.94 pitch=4 | 12 |
| M | ông chú chủ tiệm | `ja-JP-Neural2-C` rate=0.9 pitch=-6 | 14 |
| O | bà thím | `ja-JP-Neural2-B` rate=0.95 pitch=-2 | 8 |
| A | người khách mượn ô | `ja-JP-Neural2-C` rate=1.05 pitch=0 | 1 |
| B | bà hàng xóm | `ja-JP-Neural2-B` rate=1.06 pitch=3 | 3 |
| K | người đưa tin từ Osaka | `ja-JP-Neural2-C` rate=1.3 pitch=2 | 6 |

- **Bài học**: 4 điểm ngữ pháp (〜てくれない（かしら）, 〜方, 〜と言えば, 〜わけだ), 4 câu hỏi hiểu bài. Kệ: `rakugo`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
