# QC — rakugo-tenshiki (N3, chuẩn v2)

- **Nguồn và pháp lý**: tiết mục rakugo cổ điển thời Edo, không rõ tác giả, đã hết bản quyền. Kịch bản do Claude tự viết lại bằng tiếng Nhật phân cấp, không chép bản ghi âm, sách hay kịch bản của nghệ sĩ nào.
- **Bản thảo**: `content/sources/rakugo/rakugo-tenshiki/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/rakugo/rakugo-tenshiki`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1511 ký tự, 62 câu, câu TB 24.4 ký tự,
  từ vượt cấp 8.8%, từ đạt cấp 27.2%.
- **Từ vựng**: 23 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/rakugo-tenshiki/chapter.mp3`, 5.2 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 24 |
| O | hòa thượng | `ja-JP-Neural2-C` rate=0.88 pitch=-6 | 15 |
| C | chú tiểu Chinnen | `ja-JP-Neural2-C` rate=1.1 pitch=8 | 11 |
| D | thầy thuốc | `ja-JP-Neural2-C` rate=0.95 pitch=0 | 8 |
| H | bà bán hoa | `ja-JP-Neural2-B` rate=1.05 pitch=2 | 1 |
| K | ông bán đồ cũ | `ja-JP-Neural2-C` rate=1.0 pitch=-3 | 1 |
| T | ông bán đậu phụ | `ja-JP-Neural2-C` rate=1.12 pitch=3 | 2 |

- **Bài học**: 4 điểm ngữ pháp (〜とは言わない, 〜くせに, 〜こそ, あまり〜ので), 4 câu hỏi hiểu bài. Kệ: `rakugo`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
