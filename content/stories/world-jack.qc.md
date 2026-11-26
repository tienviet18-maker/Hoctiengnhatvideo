# QC — world-jack

- Nguồn: Truyện dân gian Anh 'Jack and the Beanstalk' theo bản Joseph Jacobs (English Fairy Tales, 1890), thuộc phạm vi công cộng. Claude tự kể lại bằng tiếng Nhật N3: đổi bò lấy đậu thần, cây đậu lên mây, ba lần lên lâu đài người khổng lồ (túi vàng, gà đẻ trứng vàng, cây đàn hạc biết hát), chặt cây đậu.
- Chuẩn v2, cấp N3: 1253 ký tự, 51 câu, câu TB 24.6 ký tự, harder 3.7%, atLevel 32.6%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 一頭=いっとう, 五つ=いつつ, 一晩=ひとばん, 一度=いちど, 三回目=さんかいめ, 何か月=なんかげつ, 金貨=きんか, 大男=おお おとこ, 大女=おお おんな, 豆の木=まめ の き, 足音=あしおと, 朝ご飯=あさごはん, 気のせい=き の せい, 人食い=ひとくい, 金のたまご=きん の たまご, 金の=きん の, 力いっぱい=ちから いっぱい, 魔法=まほう, ご主人さま=ごしゅじんさま, 受け取って=うけとって, 老人=ろうじん, 雲の上=くも の うえ, 城の前=しろ の まえ, 袋=ふくろ, どろぼう=どろぼう, 本当に=ほんとう に. Đã đọc lại toàn bộ.
- Từ vựng: 14 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/world/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/world-jack/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.85 (34 câu)
  - 母: `ja-JP-Neural2-B`, tốc độ 0.92, cao độ -3 (3 câu)
  - 老人: `ja-JP-Neural2-C`, tốc độ 0.8, cao độ -6 (2 câu)
  - ジャック: `ja-JP-Neural2-C`, tốc độ 1, cao độ 5 (4 câu)
  - 大女: `ja-JP-Neural2-B`, tốc độ 0.9, cao độ -6 (3 câu)
  - 大男: `ja-JP-Neural2-C`, tốc độ 0.78, cao độ -12 (4 câu)
  - たてごと: `ja-JP-Neural2-B`, tốc độ 1.1, cao độ 8 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Kaisei Decol.
