# QC — world-pinocchio-2

- Nguồn: Tiểu thuyết 'Le avventure di Pinocchio' của Carlo Collodi (1883), thuộc phạm vi công cộng. Claude tự kể lại bằng tiếng Nhật N3 theo nguyên tác (không theo phim hoạt hình): khúc gỗ biết nói, Dế mèn, ông bầu múa rối, Cáo và Mèo, nàng tiên tóc xanh, Xứ Đồ Chơi, cá mập khổng lồ.
- Chuẩn v2, cấp N3: 1493 ký tự, 47 câu, câu TB 31.8 ký tự, harder 6.5%, atLevel 21.4%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 貧しい=まずしい, 一本=いっぽん, 作り続けました=つくりつづけました, 戸=と, 通り=とおり, 一ぴき=いっぴき, 親=おや, 後悔=こうかい, 足=あし, 一枚=いちまい, 教科書=きょうかしょ, 途中=とちゅう, 芝居小屋=しばいごや, 芝居=しばい, 舞台=ぶたい, 兄弟=きょうだい, 座長=ざちょう, 金貨=きんか, 五まい=ごまい, 畑=はたけ, 二人組=ふたりぐみ, 必死=ひっし, 奥=おく, 仙女=せんにょ, 一まい=いちまい, 大声=おおごえ, 本当=ほんとう, 人間=にんげん, 一年じゅう=いちねんじゅう, 夜中=よなか, 約束=やくそく, 晩=ばん, 五か月=ごかげつ, 本物=ほんもの, 芸=げい, 役に立たない=やくにたたない, 主人=しゅじん, 皮=かわ, ひと息=ひといき, 明かり=あかり, 何度も=なんども, 背中=せなか, 歯=は, 岸=きし, 小屋=こや, 農家=のうか, 井戸=いど, 夢=ゆめ, 体=からだ, 今日=きょう, 海=うみ, 魚=さかな, かべ=かべ, 髪=かみ, むち=むち. Đã đọc lại toàn bộ.
- Từ vựng: 8 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/world/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/world-pinocchio-2/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.85 (36 câu)
  - キツネ: `ja-JP-Neural2-C`, tốc độ 1, cao độ -1 (1 câu)
  - オウム: `ja-JP-Neural2-B`, tốc độ 1.15, cao độ 5 (1 câu)
  - 仙女: `ja-JP-Neural2-B`, tốc độ 0.9, cao độ 1 (2 câu)
  - ピノッキオ: `ja-JP-Neural2-C`, tốc độ 1.1, cao độ 7 (5 câu)
  - ロメオ: `ja-JP-Neural2-C`, tốc độ 1.15, cao độ 3 (1 câu)
  - ジェペット: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -5 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Potta One.
