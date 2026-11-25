# QC — rakugo-shibahama-2 (N3, chuẩn v2)

- **Nguồn và pháp lý**: tiết mục rakugo nhân tình cổ điển (cuối Edo – đầu Meiji; tương truyền do Sanyūtei Enchō, mất 1900, sáng tác; dù theo thuyết nào cũng đã hết bản quyền). Kịch bản do Claude tự viết lại bằng tiếng Nhật phân cấp, không chép bản ghi âm, sách hay kịch bản của nghệ sĩ nào.
- **Bản thảo**: `content/sources/rakugo/rakugo-shibahama-2/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/rakugo/rakugo-shibahama-2`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1409 ký tự, 55 câu, câu TB 25.6 ký tự,
  từ vượt cấp 8.3%, từ đạt cấp 27.5%.
- **Từ vựng**: 33 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/rakugo-shibahama-2/chapter.mp3`, 5.1 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 27 |
| K | Katsugorō (người bán cá) | `ja-JP-Neural2-C` rate=0.92 pitch=-3 | 14 |
| W | vợ Katsugorō | `ja-JP-Neural2-B` rate=0.92 pitch=-1 | 14 |
| T | bạn nhậu | `ja-JP-Neural2-C` rate=1.0 pitch=3 | 0 |

- **Bài học**: 4 điểm ngữ pháp (〜ほど, 〜ながらも, 〜ところだった, 〜てくれたから), 4 câu hỏi hiểu bài. Kệ: `rakugo`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
