# QC — furusato-vn-kieu-1

- Nguồn: Truyện Kiều (Đoạn trường tân thanh) của Nguyễn Du (1766–1820), truyện thơ lục bát 3.254 câu; public domain. Claude tự kể lại bằng văn xuôi tiếng Nhật từ nguyên tác tiếng Việt, không dựa trên bản dịch hiện đại nào. Tập 1 theo các đoạn: giới thiệu chị em Thúy Kiều–Thúy Vân, tiết Thanh minh và mộ Đạm Tiên, gặp Kim Trọng, nhặt thoa, thề nguyền, khúc Bạc mệnh, Kim Trọng về hộ tang chú.
- Chuẩn v2, cấp N2: 1697 ký tự, 57 câu, câu TB 29.8 ký tự, harder 3.9%, atLevel 8.1%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 明=みん, 三千二百五十四行=さんぜんにひゃくごじゅうよんぎょう, 一節=いっせつ, 十九世紀=じゅうきゅうせいき, 上を行く=うえをいく, 薄命=はくめい, 調べ=しらべ, 清明節=せいめいせつ, 晴れ着=はれぎ, 帰り道=かえりみち, 一本=いっぽん, 大勢=おおぜい, 一生=いっしょう, 墓の主=はかのぬし, 一瞬=いっしゅん, 学友=がくゆう, 塀ごし=へいごし, 誕生祝い=たんじょういわい, 一通=いっつう, 故郷=こきょう, 叔父=おじ, 十五年=じゅうごねん, 何年=なんねん, 腕輪=うでわ, 交わす=かわす, 参らない=まいらない, お姉さま=おねえさま, 三人=さんにん, ダム・ティエン=だむ・てぃえん, キム・チョン=きむ・ちょん, グエン・ズー=ぐえん・ずー, 五百年前=ごひゃくねん まえ, 春の山=はる の やま, 琴=こと, 宝物=たからもの, 月の下=つき の した. Đã đọc lại toàn bộ.
- Từ vựng: 12 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-kieu-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (46 câu)
  - キエウ: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ 1 (4 câu)
  - ヴァン: `ja-JP-Neural2-B`, tốc độ 1.05, cao độ 5 (1 câu)
  - クアン: `ja-JP-Neural2-C`, tốc độ 1.05, cao độ 4 (2 câu)
  - キム: `ja-JP-Neural2-C`, tốc độ 0.95 (4 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Kaisei HarunoUmi.
