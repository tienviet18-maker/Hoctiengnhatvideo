# QC — mukashi-kintaro (N3, chuẩn v2)

- **Nguồn và pháp lý**: truyền thuyết dân gian Nhật Bản về 金太郎 (cậu bé núi Ashigara, sau là 坂田金時, gia thần của 源頼光 thời Heian; lưu truyền khuyết danh, phạm vi công cộng). Bản kể do Claude tự viết bằng tiếng Nhật phân cấp, không chép câu chữ của bản in, sách tranh hay lời bài hát nào.
- **Bản thảo**: `content/sources/mukashi/mukashi-kintaro/` (ja.txt + 11 file bản dịch/giải thích). Dựng bằng `node scripts/build-audio-pack.mjs content/sources/mukashi/mukashi-kintaro`.
- **Số đo cấp độ** (kuromoji + danh sách JLPT): 1537 ký tự, 58 câu, câu TB 26.5 ký tự,
  từ vượt cấp 11.0%, từ đạt cấp 23.3%.
- **Từ vựng**: 42 từ, cấp lấy đúng theo danh sách JLPT, chỉ chọn từ đúng cấp bài hoặc khó hơn.
- **Audio**: một file liền `public/audio/mukashi-kintaro/chapter.mp3`, 5.3 phút (mono 64 kbps; nghỉ 0,6 giây giữa câu,
  0,9 giây khi đổi người nói). Google Cloud TTS, tốc độ ghi theo từng vai, chuẩn hoá âm lượng -18 LUFS. Mỗi nhân vật giữ một giọng:

| Mã | Vai | Giọng | Số câu |
| --- | --- | --- | --- |
| N | người kể | `ja-JP-Chirp3-HD-Aoede` rate=0.9 | 32 |
| K | Kintarō | `ja-JP-Neural2-C` rate=1.08 pitch=5 | 9 |
| H | mẹ Kintarō | `ja-JP-Neural2-B` rate=0.9 pitch=-3 | 5 |
| U | thỏ | `ja-JP-Neural2-B` rate=1.1 pitch=8 | 3 |
| S | khỉ | `ja-JP-Neural2-C` rate=1.12 pitch=3 | 3 |
| M | gấu | `ja-JP-Neural2-C` rate=0.82 pitch=-14 | 3 |
| R | võ sĩ tùy tùng | `ja-JP-Neural2-C` rate=0.98 pitch=-6 | 1 |
| Y | Minamoto no Raikō | `ja-JP-Neural2-C` rate=0.88 pitch=-3 | 2 |

- **Bài học**: 4 điểm ngữ pháp (〜ば〜ほど, 〜にとって, 〜わけにはいかない, 〜からこそ), 4 câu hỏi hiểu bài. Kệ: `folktale-jp`.
- **Bản dịch + giải thích 11 ngôn ngữ**: Claude tự dịch từ tiếng Nhật và tự duyệt theo quy tắc của Việt (dịch ngược kiểm nghĩa,
  thuật ngữ đời sống Nhật nhất quán, tên giờ Edo và đơn vị tiền giữ nguyên kèm giải thích).
