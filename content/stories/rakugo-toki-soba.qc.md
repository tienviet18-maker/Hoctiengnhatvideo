# QC — rakugo-toki-soba (N3, chuẩn v2)

- **Nguồn và pháp lý**: tiết mục rakugo cổ điển thời Edo (dân gian, không có tác giả, không thuộc bản quyền của ai). Kịch bản do Claude tự viết lại bằng tiếng Nhật phân cấp, không chép bản ghi âm, sách hay kịch bản của nghệ sĩ nào. Nhân vật Yotarō là nhân vật quen thuộc của rakugo dân gian.
- **Bản thảo**: `content/sources/rakugo/rakugo-toki-soba/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/rakugo/rakugo-toki-soba`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1409 ký tự, 63 câu, câu TB 22.4 ký tự,
  từ vượt cấp 5.5%, từ đạt cấp 21.9%.
- **Từ vựng**: 19 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/rakugo-toki-soba/chapter.mp3`, 5.1 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 21 |
| K | khách sành ăn | `ja-JP-Neural2-C` rate=0.92 pitch=0 | 16 |
| S | ông bán mì sạp thứ nhất | `ja-JP-Neural2-C` rate=0.85 pitch=-5 | 6 |
| Y | Yotarō | `ja-JP-Neural2-C` rate=0.95 pitch=3 | 14 |
| O | bà bán mì sạp thứ hai | `ja-JP-Neural2-B` rate=0.92 pitch=-1 | 6 |

- **Bài học**: 4 điểm ngữ pháp (〜ておく, 〜ながら, 〜すぎる, 〜てしまう), 4 câu hỏi hiểu bài. Kệ: `rakugo`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
