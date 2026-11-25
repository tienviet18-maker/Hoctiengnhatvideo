# QC — rakugo-shibahama-1 (N3, chuẩn v2)

- **Nguồn và pháp lý**: tiết mục rakugo nhân tình cổ điển (cuối Edo – đầu Meiji; tương truyền do Sanyūtei Enchō, mất 1900, sáng tác; dù theo thuyết nào cũng đã hết bản quyền). Kịch bản do Claude tự viết lại bằng tiếng Nhật phân cấp, không chép bản ghi âm, sách hay kịch bản của nghệ sĩ nào.
- **Bản thảo**: `content/sources/rakugo/rakugo-shibahama-1/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/rakugo/rakugo-shibahama-1`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1492 ký tự, 58 câu, câu TB 25.7 ký tự,
  từ vượt cấp 6.0%, từ đạt cấp 18.8%.
- **Từ vựng**: 25 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/rakugo-shibahama-1/chapter.mp3`, 5.3 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 29 |
| K | Katsugorō (người bán cá) | `ja-JP-Neural2-C` rate=0.92 pitch=-3 | 17 |
| W | vợ Katsugorō | `ja-JP-Neural2-B` rate=0.92 pitch=-1 | 11 |
| T | bạn nhậu | `ja-JP-Neural2-C` rate=1.0 pitch=3 | 1 |

- **Bài học**: 4 điểm ngữ pháp (〜ことにする, 〜そうになる, 〜どころじゃない, 〜ようになる), 4 câu hỏi hiểu bài. Kệ: `rakugo`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
