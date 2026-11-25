# QC — rakugo-hatsu-tenjin (N4, chuẩn v2)

- **Nguồn và pháp lý**: tiết mục rakugo cổ điển thời Edo (dân gian, không rõ tác giả, không thuộc bản quyền của ai). Kịch bản do Claude tự viết lại bằng tiếng Nhật phân cấp, không chép bản ghi âm, sách hay kịch bản của nghệ sĩ nào.
- **Bản thảo**: `content/sources/rakugo/rakugo-hatsu-tenjin/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/rakugo/rakugo-hatsu-tenjin`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1538 ký tự, 60 câu, câu TB 25.6 ký tự,
  từ vượt cấp 13.7%, từ đạt cấp 32.9%.
- **Từ vựng**: 49 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/rakugo-hatsu-tenjin/chapter.mp3`, 5.1 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 22 |
| F | bố Kuma-san | `ja-JP-Neural2-C` rate=0.95 pitch=-2 | 18 |
| K | con trai Kinbō | `ja-JP-Neural2-B` rate=1.05 pitch=6 | 14 |
| M | mẹ | `ja-JP-Neural2-B` rate=0.92 pitch=-2 | 1 |
| A | người bán kẹo | `ja-JP-Neural2-C` rate=1.05 pitch=4 | 2 |
| D | người bán dango | `ja-JP-Neural2-C` rate=0.88 pitch=-6 | 2 |
| T | người bán diều | `ja-JP-Neural2-B` rate=1.0 pitch=2 | 1 |

- **Bài học**: 4 điểm ngữ pháp (〜(よ)うとする, 〜すぎる, 〜ないでください, 〜んじゃなかった), 4 câu hỏi hiểu bài. Kệ: `rakugo`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
