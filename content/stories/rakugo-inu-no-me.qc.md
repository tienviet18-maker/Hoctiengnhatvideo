# QC — rakugo-inu-no-me (N3, chuẩn v2)

- **Nguồn và pháp lý**: tiết mục rakugo cổ điển thời Edo, không rõ tác giả, đã hết bản quyền. Kịch bản do Claude tự viết lại bằng tiếng Nhật phân cấp, không chép bản ghi âm, sách hay kịch bản của nghệ sĩ nào.
- **Bản thảo**: `content/sources/rakugo/rakugo-inu-no-me/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/rakugo/rakugo-inu-no-me`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1662 ký tự, 62 câu, câu TB 26.8 ký tự,
  từ vượt cấp 6.1%, từ đạt cấp 14.8%.
- **Từ vựng**: 30 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/rakugo-inu-no-me/chapter.mp3`, 5.8 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 23 |
| G | bác thợ mộc Gen | `ja-JP-Neural2-C` rate=1.04 pitch=-2 | 13 |
| D | ông thầy thuốc lập dị | `ja-JP-Neural2-C` rate=0.9 pitch=-7 | 21 |
| S | cậu học trò của thầy thuốc | `ja-JP-Neural2-C` rate=1.12 pitch=6 | 5 |

- **Bài học**: 4 điểm ngữ pháp (〜ついでに, 〜わけにはいかない, 〜ようがない, 〜たとたん), 4 câu hỏi hiểu bài. Kệ: `rakugo`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
