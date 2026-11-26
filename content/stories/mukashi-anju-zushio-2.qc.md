# QC — mukashi-anju-zushio-2 (N3, chuẩn v2)

- **Nguồn và pháp lý**: truyền thuyết Nhật Bản 安寿と厨子王, theo cốt truyện của bài kể 説経節「さんせう太夫」 (thời Trung cổ, không rõ tác giả, phạm vi công cộng) và truyện ngắn 山椒大夫 của Mori Ōgai (1915; tác giả mất năm 1922, đã thuộc phạm vi công cộng). Bản kể do Claude tự viết bằng tiếng Nhật phân cấp, lược bỏ các chi tiết tàn bạo, không chép câu chữ của bản nào. Câu hát 「安寿恋しや、ほうやれほ」 là câu dân gian trong truyền thuyết (phạm vi công cộng).
- **Bản thảo**: `content/sources/mukashi/mukashi-anju-zushio-2/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/mukashi/mukashi-anju-zushio-2`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1682 ký tự, 62 câu, câu TB 27.1 ký tự,
  từ vượt cấp 11.6%, từ đạt cấp 26.6%.
- **Từ vựng**: 54 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/mukashi-anju-zushio-2/chapter.mp3`, 5.7 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 39 |
| H | người mẹ (về sau bị mù) | `ja-JP-Neural2-B` rate=0.85 pitch=-5 | 3 |
| A | Anju (chị) | `ja-JP-Neural2-B` rate=1.0 pitch=4 | 7 |
| Z | Zushiō (em) | `ja-JP-Neural2-C` rate=1.05 pitch=6 | 6 |
| S | Sanshō Dayū | `ja-JP-Neural2-C` rate=0.82 pitch=-12 | 0 |
| R | Saburō | `ja-JP-Neural2-C` rate=1.02 pitch=-6 | 1 |
| J | Jirō | `ja-JP-Neural2-C` rate=0.95 pitch=0 | 0 |
| M | nhà sư | `ja-JP-Neural2-C` rate=0.85 pitch=-9 | 3 |
| K | vị đại thần ở kinh đô | `ja-JP-Neural2-C` rate=0.88 pitch=-3 | 3 |

- **Bài học**: 4 điểm ngữ pháp (〜くらいなら, 〜ざるをえない, 〜とともに, 〜の末に), 4 câu hỏi hiểu bài. Kệ: `folktale-jp`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
