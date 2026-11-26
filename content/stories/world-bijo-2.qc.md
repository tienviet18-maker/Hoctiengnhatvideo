# QC — world-bijo-2

- Nguồn: Truyện 'La Belle et la Bête' của bà Jeanne-Marie Leprince de Beaumont (1756), thuộc phạm vi công cộng. Claude tự kể lại bằng tiếng Nhật N3, theo bản gốc (không theo phim hoạt hình): bông hồng, chiếc gương thần, chiếc nhẫn đưa về nhà, hai người chị bị hóa đá.
- Chuẩn v2, cấp N3: 1265 ký tự, 49 câu, câu TB 25.8 ký tự, harder 2.0%, atLevel 19.3%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 野獣=やじゅう, お城=おしろ, 一家=いっか, 一本=いっぽん, 三か月後=さんかげつご, 決心=けっしん, 足音=あしおと, 楽器=がっき, 女王=じょおう, 様子=ようす, 生き物=いきもの, 正直=しょうじき, 九時=くじ, 一週間=いっしゅうかん, 十日目=とおかめ, 一度=いちど, 指輪=ゆびわ, 魔女=まじょ, 魔法=まほう, 花火=はなび, 見た目=みため, 相手=あいて, 妻=つま, 姉=あね, 像=ぞう, 門=もん, 池=いけ, 港=みなと, 荷物=にもつ, 明かり=あかり, 宝石=ほうせき, 商人=しょうにん, 王子=おうじ, 毎晩=まいばん, 最後=さいご, 一年後=いちねんご, 心から=こころから, 入れかえる=いれかえる. Đã đọc lại toàn bộ.
- Từ vựng: 3 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/world/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/world-bijo-2/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.85 (28 câu)
  - ベル: `ja-JP-Neural2-B`, tốc độ 1, cao độ 4 (9 câu)
  - 姉: `ja-JP-Neural2-B`, tốc độ 1.05, cao độ 1 (3 câu)
  - 野獣: `ja-JP-Neural2-C`, tốc độ 0.8, cao độ -12 (6 câu)
  - 王子: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ 2 (3 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Shippori Mincho B1.
