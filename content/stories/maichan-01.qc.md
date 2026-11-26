# QC — maichan-01

- Nguồn: Sáng tác gốc của Claude cho MiraiGo (series Mai-chan bản mới, nhân vật theo content/mai-chan-series-bible.md). Thay cho các tập cũ 8 câu mai-chan-ep01-hello và mai-chan-ep02-homework.
- Chuẩn v2, cấp N5: 760 ký tự, 42 câu, câu TB 18.1 ký tự, harder 12.4%, atLevel 100.0%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 九さい=きゅうさい, 五さい=ごさい, 四人=よにん, 七時半=しちじはん, ヘアピン=へあぴん. Đã đọc lại toàn bộ.
- Từ vựng: 34 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/maichan/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/maichan-01/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.85 (26 câu)
  - マイ: `ja-JP-Neural2-B`, tốc độ 1, cao độ 6 (7 câu)
  - ビン: `ja-JP-Neural2-B`, tốc độ 1.05, cao độ 10 (3 câu)
  - お母さん: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ -1 (1 câu)
  - お父さん: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -2 (0 câu)
  - ゆき: `ja-JP-Neural2-B`, tốc độ 1.05, cao độ 3 (2 câu)
  - 先生: `ja-JP-Neural2-B`, tốc độ 0.9, cao độ -3 (3 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông M PLUS Rounded 1c.
