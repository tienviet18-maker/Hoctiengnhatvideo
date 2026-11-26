# QC — mukashi-anju-zushio-1 (N3, chuẩn v2)

- **Nguồn và pháp lý**: truyền thuyết Nhật Bản 安寿と厨子王, theo cốt truyện của bài kể 説経節「さんせう太夫」 (thời Trung cổ, không rõ tác giả, phạm vi công cộng) và truyện ngắn 山椒大夫 của Mori Ōgai (1915; tác giả mất năm 1922, đã thuộc phạm vi công cộng). Bản kể do Claude tự viết bằng tiếng Nhật phân cấp, lược bỏ các chi tiết tàn bạo, không chép câu chữ của bản nào.
- **Bản thảo**: `content/sources/mukashi/mukashi-anju-zushio-1/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/mukashi/mukashi-anju-zushio-1`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1942 ký tự, 62 câu, câu TB 31.3 ký tự,
  từ vượt cấp 11.7%, từ đạt cấp 29.2%.
- **Từ vựng**: 57 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/mukashi-anju-zushio-1/chapter.mp3`, 6.7 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 41 |
| H | người mẹ | `ja-JP-Neural2-B` rate=0.88 pitch=-3 | 5 |
| A | Anju (chị) | `ja-JP-Neural2-B` rate=1.0 pitch=4 | 2 |
| Z | Zushiō (em) | `ja-JP-Neural2-C` rate=1.05 pitch=6 | 2 |
| U | vú Ubatake | `ja-JP-Neural2-B` rate=0.9 pitch=-7 | 1 |
| V | người dân | `ja-JP-Neural2-C` rate=1.0 pitch=-1 | 1 |
| Y | Yamaoka Dayū (kẻ buôn người) | `ja-JP-Neural2-C` rate=0.95 pitch=-4 | 4 |
| S | Sanshō Dayū | `ja-JP-Neural2-C` rate=0.82 pitch=-12 | 3 |
| R | Saburō | `ja-JP-Neural2-C` rate=1.02 pitch=-6 | 2 |
| J | Jirō | `ja-JP-Neural2-C` rate=0.95 pitch=0 | 1 |

- **Bài học**: 4 điểm ngữ pháp (〜ものだから, 〜ばかりに, 〜はもちろん, 〜てしかたがない), 4 câu hỏi hiểu bài. Kệ: `folktale-jp`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
