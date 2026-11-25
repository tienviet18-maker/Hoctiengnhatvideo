# QC — rakugo-manju-kowai (N3, chuẩn v2)

- **Nguồn và pháp lý**: tiết mục rakugo cổ điển thời Edo (dân gian, không có tác giả, không thuộc bản quyền của ai). Kịch bản do Claude tự viết lại bằng tiếng Nhật phân cấp, không chép bản ghi âm, sách hay kịch bản của nghệ sĩ nào.
- **Bản thảo**: `content/sources/rakugo/rakugo-manju-kowai/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/rakugo/rakugo-manju-kowai`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1475 ký tự, 52 câu, câu TB 28.4 ký tự,
  từ vượt cấp 5.8%, từ đạt cấp 17.9%.
- **Từ vựng**: 34 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/rakugo-manju-kowai/chapter.mp3`, 5.3 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 19 |
| H | Hachi (người khởi xướng) | `ja-JP-Neural2-C` rate=0.95 pitch=2 | 12 |
| K | Kuma (anh to con) | `ja-JP-Neural2-C` rate=0.9 pitch=-4 | 10 |
| M | Matsu (người 'sợ' bánh manjū) | `ja-JP-Neural2-C` rate=0.88 pitch=0 | 11 |

- **Bài học**: 4 điểm ngữ pháp (〜のに, 〜だけで, 〜てしまう, 〜たくなる), 4 câu hỏi hiểu bài. Kệ: `rakugo`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
