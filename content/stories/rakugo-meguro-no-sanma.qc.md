# QC — rakugo-meguro-no-sanma (N3, chuẩn v2)

- **Nguồn và pháp lý**: tiết mục rakugo cổ điển thời Edo (dân gian, không có tác giả, không thuộc bản quyền của ai). Kịch bản do Claude tự viết lại bằng tiếng Nhật phân cấp, không chép bản ghi âm, sách hay kịch bản của nghệ sĩ nào. Thông tin lễ hội 目黒のさんま祭り là sự kiện công khai hằng năm ở Meguro.
- **Bản thảo**: `content/sources/rakugo/rakugo-meguro-no-sanma/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/rakugo/rakugo-meguro-no-sanma`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1450 ký tự, 48 câu, câu TB 30.2 ký tự,
  từ vượt cấp 9.1%, từ đạt cấp 27.7%.
- **Từ vựng**: 34 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/rakugo-meguro-no-sanma/chapter.mp3`, 5.2 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 29 |
| T | lãnh chúa (o-tonosama) | `ja-JP-Neural2-C` rate=0.82 pitch=-4 | 12 |
| K | gia thần | `ja-JP-Neural2-C` rate=0.95 pitch=2 | 5 |
| B | bà lão nông dân | `ja-JP-Neural2-B` rate=0.85 pitch=-3 | 2 |

- **Bài học**: 4 điểm ngữ pháp (〜うちに, 〜ほど, 〜に限る, 〜たばかり), 4 câu hỏi hiểu bài. Kệ: `rakugo`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
