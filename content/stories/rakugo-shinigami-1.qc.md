# QC — rakugo-shinigami-1 (N3, chuẩn v2)

- **Nguồn và pháp lý**: tiết mục rakugo cổ điển do Sanyūtei Enchō (mất 1900) phỏng theo truyện cổ phương Tây (Godfather Death, sưu tập Grimm 1812); cả hai đều đã hết bản quyền. Kịch bản do Claude tự viết lại bằng tiếng Nhật phân cấp, không chép bản ghi âm, sách hay kịch bản của nghệ sĩ nào.
- **Bản thảo**: `content/sources/rakugo/rakugo-shinigami-1/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/rakugo/rakugo-shinigami-1`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1567 ký tự, 58 câu, câu TB 27.0 ký tự,
  từ vượt cấp 10.3%, từ đạt cấp 22.8%.
- **Từ vựng**: 38 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/rakugo-shinigami-1/chapter.mp3`, 5.6 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 26 |
| H | Hachigorō | `ja-JP-Neural2-C` rate=1.02 pitch=1 | 14 |
| W | vợ Hachigorō | `ja-JP-Neural2-B` rate=1.0 pitch=1 | 3 |
| S | Thần chết | `ja-JP-Neural2-C` rate=0.82 pitch=-14 | 12 |
| D | người làm của cửa hàng lớn | `ja-JP-Neural2-C` rate=1.08 pitch=4 | 2 |
| O | ông chủ cửa hàng (người bệnh) | `ja-JP-Neural2-C` rate=0.88 pitch=-5 | 1 |

- **Bài học**: 4 điểm ngữ pháp (〜だらけ, 〜なくていい, 〜そうだ（伝聞）, 〜ものではない), 4 câu hỏi hiểu bài. Kệ: `rakugo`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
