# QC — furusato-vn-kieu-3

- Nguồn: Truyện Kiều (Đoạn trường tân thanh) của Nguyễn Du (1766–1820), truyện thơ lục bát 3.254 câu; public domain. Claude tự kể lại bằng văn xuôi tiếng Nhật từ nguyên tác tiếng Việt, không dựa trên bản dịch hiện đại nào. Tập 3 theo các đoạn: Thúc Sinh chuộc Kiều, kiện ở quan phủ, Hoạn Thư đánh ghen (bắt cóc, đốt nhà, Hoa Nô, đánh đàn hầu rượu), Quan Âm các, trốn đến chùa Giác Duyên, rơi vào lầu xanh lần hai, gặp Từ Hải, Từ Hải lập nghiệp trở về.
- Chuẩn v2, cấp N2: 1891 ký tự, 57 câu, câu TB 33.2 ký tự, harder 6.6%, atLevel 11.7%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 一節=いっせつ, 薄命=はくめい, 調べ=しらべ, 一生=いっしょう, 誕生祝い=たんじょういわい, 故郷=こきょう, 腕輪=うでわ, お姉さま=おねえさま, ダム・ティエン=だむ・てぃえん, 琴=こと, 月の下=つき の した, 楼=ろう, 手下=てした, トゥー・バー=とぅー・ばー, ソー・カイン=そー・かいん, 大金=たいきん, トゥック・シン=とぅっく・しん, ホアン・トゥー=ほあん・とぅー, ザック・ズエン=ざっく・ずえん, トゥ・ハイ=とぅ・はい, 花奴=はなやっこ, 身受け=みうけ, 一編=いっぺん, 身の上=みのうえ, 焼け跡=やけあと, 身元=みもと, 遺体=いたい, 屋敷=やしき, 召使い=めしつかい, 一曲=いっきょく, お堂=おどう, 物陰=ものかげ, 夜道=よみち, 尼僧=にそう, 大男=おお おとこ, 天下=てんか, 大軍=たいぐん, 一国の主=いっこく の あるじ, 一度に=いちどに, 一人一人=ひとりひとり, 月日=つきひ, 背丈=せたけ, 隠し事=かくしごと, 気がかり=きがかり, 言い残して=いいのこして, 借り=かり, 夜中=よなか, 遊女屋=ゆうじょや. Đã đọc lại toàn bộ.
- Từ vựng: 16 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-kieu-3/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (46 câu)
  - キエウ: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ 1 (3 câu)
  - トゥック: `ja-JP-Neural2-C`, tốc độ 1, cao độ 2 (3 câu)
  - ホアン・トゥー: `ja-JP-Neural2-B`, tốc độ 0.92, cao độ -3 (2 câu)
  - ザック・ズエン: `ja-JP-Neural2-B`, tốc độ 0.88, cao độ -6 (1 câu)
  - トゥ・ハイ: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -5 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Kaisei HarunoUmi.
