# QC — gongitsune-1

- Nguồn: Phỏng theo 「ごんぎつね」 của 新美南吉 (Niimi Nankichi, mất 1943; public domain ở Nhật và Mỹ). Claude viết lại bằng tiếng Nhật N4 cho MiraiGo, giữ cốt truyện và câu kết gốc. Thay gói cũ 13 câu gongitsune.
- Chuẩn v2, cấp N4: 1212 ký tự, 54 câu, câu TB 22.4 ký tự, harder 11.9%, atLevel 27.0%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 二人=ふたり, 一つ=ひとつ, 十日=とおか, 二、三日=に、さんにち, 一ぴき=いっぴき, 五、六ぴき=ご ろっぴき, 土間=どま, 大きな=おおきな, 小さな=ちいさな, 後ろから=うしろ から, ぬすっと=ぬすっと, ごん=ごん, ごんぎつね=ごんぎつね, 火なわじゅう=ひなわじゅう, けむり=けむり, ひとりぼっち=ひとりぼっち, かげ=かげ, ぴょいと=ぴょいと, とび出し=とびだし, とび上がり=とびあがり, いっしょうけんめい=いっしょうけんめい, おそうしき=おそうしき, どろぼう=どろぼう, うわあ=うわあ, うら=うら, なわ=なわ, たなの上=たな の うえ. Đã đọc lại toàn bộ.
- Từ vựng: 21 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/bungaku/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/gongitsune-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (43 câu)
  - ごん: `ja-JP-Neural2-C`, tốc độ 1.05, cao độ 4 (10 câu)
  - ヒョウジュウ: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -3 (1 câu)
  - カスケ: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -7 (0 câu)
  - いわし屋: `ja-JP-Neural2-C`, tốc độ 1.1, cao độ 1 (0 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Shippori Mincho B1.
