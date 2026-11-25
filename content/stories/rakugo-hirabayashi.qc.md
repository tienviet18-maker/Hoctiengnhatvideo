# QC — rakugo-hirabayashi (N3, chuẩn v2)

- **Nguồn và pháp lý**: tiết mục rakugo cổ điển thời Edo, không rõ tác giả, đã hết bản quyền. Kịch bản do Claude tự viết lại bằng tiếng Nhật phân cấp, không chép bản ghi âm, sách hay kịch bản của nghệ sĩ nào.
- **Bản thảo**: `content/sources/rakugo/rakugo-hirabayashi/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/rakugo/rakugo-hirabayashi`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1591 ký tự, 62 câu, câu TB 25.7 ký tự,
  từ vượt cấp 4.4%, từ đạt cấp 15.0%.
- **Từ vựng**: 15 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/rakugo-hirabayashi/chapter.mp3`, 5.3 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 25 |
| M | ông chủ tiệm | `ja-JP-Neural2-C` rate=0.9 pitch=-4 | 6 |
| S | chú bé học việc Sadakichi | `ja-JP-Neural2-C` rate=1.12 pitch=9 | 19 |
| A | ông cụ cầm sách | `ja-JP-Neural2-C` rate=0.82 pitch=-8 | 4 |
| B | bà bán rau | `ja-JP-Neural2-B` rate=1.05 pitch=1 | 2 |
| K | đứa trẻ trường làng | `ja-JP-Neural2-B` rate=1.15 pitch=10 | 2 |
| R | ông samurai | `ja-JP-Neural2-C` rate=0.85 pitch=-12 | 1 |
| E | người phụ nữ trong phố | `ja-JP-Neural2-B` rate=0.98 pitch=-3 | 1 |
| D | ông Hirabayashi | `ja-JP-Neural2-C` rate=1.0 pitch=-1 | 2 |

- **Bài học**: 4 điểm ngữ pháp (〜っけ, 〜もんか, ますます, 〜ばよかった（のに）), 4 câu hỏi hiểu bài. Kệ: `rakugo`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
