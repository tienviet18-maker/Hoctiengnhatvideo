# QC — rakugo-sokotsu-nagaya (N3, chuẩn v2)

- **Nguồn và pháp lý**: tiết mục rakugo cổ điển thời Edo (dân gian, không rõ tác giả, không thuộc bản quyền của ai). Kịch bản do Claude tự viết lại bằng tiếng Nhật phân cấp, không chép bản ghi âm, sách hay kịch bản của nghệ sĩ nào.
- **Bản thảo**: `content/sources/rakugo/rakugo-sokotsu-nagaya/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/rakugo/rakugo-sokotsu-nagaya`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1526 ký tự, 56 câu, câu TB 27.3 ký tự,
  từ vượt cấp 10.0%, từ đạt cấp 23.7%.
- **Từ vựng**: 35 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/rakugo-sokotsu-nagaya/chapter.mp3`, 5.2 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 20 |
| H | Hachigorō | `ja-JP-Neural2-C` rate=1.06 pitch=2 | 17 |
| K | Kumagorō | `ja-JP-Neural2-C` rate=0.93 pitch=-4 | 11 |
| Y | viên quan canh xác | `ja-JP-Neural2-C` rate=0.86 pitch=-1 | 8 |

- **Bài học**: 4 điểm ngữ pháp (〜はずがない, 〜ている場合じゃない, 〜ような気がする, 〜わけがない), 4 câu hỏi hiểu bài. Kệ: `rakugo`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
