# QC — mukashi-yuki-onna-2 (N3, chuẩn v2)

- **Nguồn và pháp lý**: truyện dân gian Nhật Bản về 雪女 (người tuyết nữ), theo cốt truyện 雪女 trong tập Kwaidan (1904) của Lafcadio Hearn (Koizumi Yakumo, mất năm 1904; tác phẩm thuộc phạm vi công cộng). Bản kể do Claude tự viết bằng tiếng Nhật phân cấp, không chép bản dịch hay phim nào.
- **Bản thảo**: `content/sources/mukashi/mukashi-yuki-onna-2/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/mukashi/mukashi-yuki-onna-2`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1811 ký tự, 62 câu, câu TB 29.2 ký tự,
  từ vượt cấp 2.4%, từ đạt cấp 22.2%.
- **Từ vựng**: 56 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/mukashi-yuki-onna-2/chapter.mp3`, 6.6 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.88 | 35 |
| M | Minokichi | `ja-JP-Neural2-C` rate=1.0 pitch=1 | 9 |
| Y | người phụ nữ tuyết / Oyuki | `ja-JP-Neural2-B` rate=0.84 pitch=-1 | 11 |
| H | mẹ Minokichi | `ja-JP-Neural2-B` rate=0.85 pitch=-6 | 2 |
| V | dân làng | `ja-JP-Neural2-C` rate=1.0 pitch=-1 | 3 |
| C | đứa trẻ | `ja-JP-Neural2-B` rate=1.15 pitch=8 | 2 |

- **Bài học**: 4 điểm ngữ pháp (〜ばかりか, 〜わけではない, 〜ほかない, 〜ものなら), 4 câu hỏi hiểu bài. Kệ: `folktale-jp`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
