# QC — furusato-vn-kieu-2

- Nguồn: Truyện Kiều (Đoạn trường tân thanh) của Nguyễn Du (1766–1820), truyện thơ lục bát 3.254 câu; public domain. Claude tự kể lại bằng văn xuôi tiếng Nhật từ nguyên tác tiếng Việt, không dựa trên bản dịch hiện đại nào. Tập 2 theo các đoạn: gia biến vì thằng bán tơ, bán mình chuộc cha, Mã Giám Sinh, trao duyên cho Thúy Vân, lầu xanh Tú Bà, lầu Ngưng Bích, Sở Khanh lừa trốn, Kiều phải tiếp khách.
- Chuẩn v2, cấp N2: 1817 ký tự, 57 câu, câu TB 31.9 ký tự, harder 4.2%, atLevel 9.8%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 一節=いっせつ, 薄命=はくめい, 調べ=しらべ, 一生=いっしょう, 誕生祝い=たんじょういわい, 故郷=こきょう, 腕輪=うでわ, お姉さま=おねえさま, ダム・ティエン=だむ・てぃえん, 琴=こと, 月の下=つき の した, 牢=ろう, 金四百両=きん よんひゃくりょう, 国子監=こくしかん, 楼=ろう, 追っ手=おって, 手下=てした, 灯り=あかり, 小刀=こがたな, 夜ごと=よごと, マー・ザム・シン=まー・ざむ・しん, トゥー・バー=とぅー・ばー, ソー・カイン=そー・かいん, ングン・ビック=んぐん・びっく, 身を売る=みをうる, 大金=たいきん, 逃げ道=にげみち, 姉さん=ねえさん, 四十=よんじゅう, 遊女屋=ゆうじょや, 女主人=おんなしゅじん, 夜明け前=よあけまえ, 清明=せいめい, 品のよい=ひん の よい. Đã đọc lại toàn bộ.
- Từ vựng: 15 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-kieu-2/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (46 câu)
  - キエウ: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ 1 (6 câu)
  - ヴァン: `ja-JP-Neural2-B`, tốc độ 1.05, cao độ 5 (1 câu)
  - トゥー・バー: `ja-JP-Neural2-B`, tốc độ 1, cao độ -5 (3 câu)
  - ソー・カイン: `ja-JP-Neural2-C`, tốc độ 1.05, cao độ 2 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Kaisei HarunoUmi.
