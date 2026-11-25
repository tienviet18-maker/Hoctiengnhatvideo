# QC — rakugo-doguya (N3, chuẩn v2)

- **Nguồn và pháp lý**: tiết mục rakugo cổ điển thời Edo, không rõ tác giả, đã hết bản quyền. Kịch bản do Claude tự viết lại bằng tiếng Nhật phân cấp, không chép bản ghi âm, sách hay kịch bản của nghệ sĩ nào.
- **Bản thảo**: `content/sources/rakugo/rakugo-doguya/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/rakugo/rakugo-doguya`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1579 ký tự, 62 câu, câu TB 25.5 ký tự,
  từ vượt cấp 10.1%, từ đạt cấp 30.4%.
- **Từ vựng**: 41 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/rakugo-doguya/chapter.mp3`, 5.6 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 20 |
| U | người chú | `ja-JP-Neural2-C` rate=0.92 pitch=-6 | 9 |
| Y | chàng Yotarō | `ja-JP-Neural2-C` rate=0.94 pitch=4 | 19 |
| A | bác thợ mộc | `ja-JP-Neural2-C` rate=1.08 pitch=-2 | 3 |
| B | bà cụ sang trọng | `ja-JP-Neural2-B` rate=0.92 pitch=-2 | 2 |
| R | ông samurai | `ja-JP-Neural2-C` rate=0.85 pitch=-11 | 4 |
| F | ông khách say rượu | `ja-JP-Neural2-C` rate=1.05 pitch=5 | 5 |

- **Bài học**: 4 điểm ngữ pháp (〜ても構わない, 〜っぱなし, 〜に決まっている, 〜おかげで), 4 câu hỏi hiểu bài. Kệ: `rakugo`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
