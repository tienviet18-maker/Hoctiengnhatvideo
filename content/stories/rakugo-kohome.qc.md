# QC — rakugo-kohome (N4, chuẩn v2)

- **Nguồn và pháp lý**: tiết mục rakugo cổ điển thời Edo (dân gian, không rõ tác giả, không thuộc bản quyền của ai). Kịch bản do Claude tự viết lại bằng tiếng Nhật phân cấp, không chép bản ghi âm, sách hay kịch bản của nghệ sĩ nào.
- **Bản thảo**: `content/sources/rakugo/rakugo-kohome/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/rakugo/rakugo-kohome`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1520 ký tự, 60 câu, câu TB 25.3 ký tự,
  từ vượt cấp 12.1%, từ đạt cấp 35.3%.
- **Từ vựng**: 30 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/rakugo-kohome/chapter.mp3`, 5.1 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 19 |
| H | Hachigorō | `ja-JP-Neural2-C` rate=1.08 pitch=3 | 22 |
| G | cụ Goinkyo (người già thông thái) | `ja-JP-Neural2-C` rate=0.82 pitch=-7 | 8 |
| B | ông quản lý cửa hàng (bantō) | `ja-JP-Neural2-C` rate=0.92 pitch=0 | 3 |
| T | anh Take (bạn, có con mới sinh) | `ja-JP-Neural2-C` rate=0.98 pitch=-3 | 8 |

- **Bài học**: 4 điểm ngữ pháp (〜そうですね, 〜ばいい, 〜たばかり, 〜にしては), 4 câu hỏi hiểu bài. Kệ: `rakugo`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
