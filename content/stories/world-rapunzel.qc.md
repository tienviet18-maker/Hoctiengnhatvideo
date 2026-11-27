# QC — world-rapunzel

- Nguồn: Truyện 'Rapunzel' trong tuyển tập Grimm (bản 1857), thuộc phạm vi công cộng. Claude tự kể lại bằng tiếng Nhật N3, theo bản Grimm: rau rapunzel trong vườn phù thủy, tòa tháp không cửa, 'thả tóc xuống', hoàng tử bị gai đâm mù, nước mắt chữa lành đôi mắt.
- Chuẩn v2, cấp N3: 1369 ký tự, 50 câu, câu TB 27.4 ký tự, harder 3.3%, atLevel 26.1%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 二回目=にかいめ, 目の前=め の まえ, 度胸=どきょう, 十二歳=じゅうにさい, 一番=いちばん, 一つ=ひとつ, 一本=いっぽん, 二度と=にどと, 二つ=ふたつ, 何年=なんねん, 金色=きんいろ, 歌声=うたごえ, 絹=きぬ, 荒れ地=あれち, 追い出して=おいだして, 塔=とう, 髪=かみ, 人々=ひとびと, 祝われて=いわわれて, 悲しさ=かなしさ, 涙=なみだ, 夫婦=ふうふ, 首=くび. Đã đọc lại toàn bộ.
- Từ vựng: 11 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/world/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/world-rapunzel/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.85 (36 câu)
  - 妻: `ja-JP-Neural2-B`, tốc độ 0.95 (1 câu)
  - 夫: `ja-JP-Neural2-C`, tốc độ 0.92, cao độ -3 (1 câu)
  - 魔女: `ja-JP-Neural2-B`, tốc độ 0.82, cao độ -8 (5 câu)
  - 王子: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ 1 (4 câu)
  - ラプンツェル: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ 5 (3 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Shippori Mincho B1.
