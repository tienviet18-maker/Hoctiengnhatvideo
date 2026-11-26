# QC — world-ningyo-2

- Nguồn: Truyện 'Den lille Havfrue' của Hans Christian Andersen (1837), thuộc phạm vi công cộng. Claude tự kể lại bằng tiếng Nhật N3, theo đúng bản Andersen (không theo phim hoạt hình). Tập 2: đổi giọng hát lấy đôi chân, nỗi đau như dao cắt, hoàng tử cưới công chúa nước láng giềng, các chị đem dao, nàng không nỡ ra tay và trở thành con gái của không trung.
- Chuẩn v2, cấp N3: 1292 ký tự, 56 câu, câu TB 23.1 ký tự, harder 3.8%, atLevel 23.4%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 人魚=にんぎょ, 人魚姫=にんぎょひめ, 六人=ろくにん, 一番下=いちばん した, 一番=いちばん, 十五歳=じゅうごさい, 十六歳=じゅうろくさい, 三百年=さんびゃくねん, 一晩中=ひとばんじゅう, 一そう=いっそう, 王様=おうさま, 王子様=おうじさま, 姫=ひめ, 花びら=はなびら, 毎晩=まいばん, 何回=なんかい, 人々=ひとびと, 海の底=うみ の そこ, おばあさま=おばあさま, お城=おしろ, 魂=たましい, 夕方=ゆうがた, 祖母=そぼ, 誕生日=たんじょうび, 波の間=なみ の あいだ, 肌=はだ, 値段=ねだん, 夜中=よなか, 結婚式=けっこんしき, 剣=けん, 胸=むね, 仲間=なかま, 階段=かいだん, 東の空=ひがし の そら, 骨=ほね, 娘=むすめ, 花嫁=はなよめ, 涙=なみだ, 雲の間=くも の あいだ. Đã đọc lại toàn bộ.
- Từ vựng: 11 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/world/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/world-ningyo-2/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.85 (38 câu)
  - 姉: `ja-JP-Neural2-B`, tốc độ 0.98, cao độ 2 (2 câu)
  - 人魚姫: `ja-JP-Neural2-B`, tốc độ 0.92, cao độ 5 (2 câu)
  - 王子: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ 1 (7 câu)
  - 魔女: `ja-JP-Neural2-B`, tốc độ 0.82, cao độ -8 (5 câu)
  - 空のむすめ: `ja-JP-Neural2-B`, tốc độ 0.9, cao độ 7 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Zen Old Mincho.
