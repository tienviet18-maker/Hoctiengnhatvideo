# QC — maichan-02

- Nguồn: Sáng tác gốc của Claude cho MiraiGo (series Mai-chan bản mới, nhân vật theo content/mai-chan-series-bible.md). Thay cho tập cũ 8 câu mai-chan-ep05-sports-day.
- Chuẩn v2, cấp N5: 688 ký tự, 40 câu, câu TB 17.2 ký tự, harder 18.2%, atLevel 100.0%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 六人=ろくにん, 位置=いち, 調子=ちょうし, 宝物=たからもの, 最後=さいご, 大きな=おおきな, 五十=ごじゅう. Đã đọc lại toàn bộ.
- Từ vựng: 26 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/maichan/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/maichan-02/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.85 (28 câu)
  - マイ: `ja-JP-Neural2-B`, tốc độ 1, cao độ 6 (4 câu)
  - ビン: `ja-JP-Neural2-B`, tốc độ 1.05, cao độ 10 (1 câu)
  - お母さん: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ -1 (0 câu)
  - お父さん: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -2 (4 câu)
  - ゆき: `ja-JP-Neural2-B`, tốc độ 1.05, cao độ 3 (1 câu)
  - 先生: `ja-JP-Neural2-B`, tốc độ 0.9, cao độ -3 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông M PLUS Rounded 1c.
