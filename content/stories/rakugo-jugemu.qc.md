# QC — rakugo-jugemu (N3, chuẩn v2)

- **Nguồn và pháp lý**: tiết mục rakugo cổ điển thời Edo (dân gian, không rõ tác giả, không thuộc bản quyền của ai). Kịch bản do Claude tự viết lại bằng tiếng Nhật phân cấp, không chép bản ghi âm, sách hay kịch bản của nghệ sĩ nào. Cái tên dài là phần truyền thống của tiết mục.
- **Bản thảo**: `content/sources/rakugo/rakugo-jugemu/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/rakugo/rakugo-jugemu`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1894 ký tự, 55 câu, câu TB 34.4 ký tự,
  từ vượt cấp 8.0%, từ đạt cấp 21.3%.
- **Từ vựng**: 32 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/rakugo-jugemu/chapter.mp3`, 5.7 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 22 |
| P | bố Kumagorō (thợ mộc) | `ja-JP-Neural2-C` rate=0.95 pitch=-1 | 11 |
| M | mẹ | `ja-JP-Neural2-B` rate=0.95 pitch=0 | 6 |
| O | hoà thượng | `ja-JP-Neural2-C` rate=0.82 pitch=-6 | 12 |
| K | bé Kin-chan hàng xóm | `ja-JP-Neural2-B` rate=1.0 pitch=5 | 4 |

- **Bài học**: 4 điểm ngữ pháp (〜てたまらない, 〜ければ〜ほど, 〜ているうちに, 〜てほしい), 4 câu hỏi hiểu bài. Kệ: `rakugo`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
