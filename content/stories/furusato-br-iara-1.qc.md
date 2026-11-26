# QC — furusato-br-iara-1

- Nguồn: Truyền thuyết Brazil (gốc Tupi, vùng Amazon) về Iara: cô gái giỏi nhất làng, con của tù trưởng; các anh ghen tị định hại, cô tự vệ khiến hai anh chết; cha ném cô xuống sông, cá cứu và cô hóa thành tiên cá, hát ru trai làng xuống nước. Truyền khẩu, public domain. Đoạn chàng đánh cá Pedro bịt tai thoát nạn là Claude tự sáng tác. Phần so sánh: 人魚 Nhật và truyền thuyết 八百比丘尼 (Fukui, dân gian, public domain).
- Chuẩn v2, cấp N4: 1556 ký tự, 60 câu, câu TB 25.9 ký tự, harder 11.1%, atLevel 26.3%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 世界=せかい, 川=かわ, 歌声=うたごえ, 女の人=おんなのひと, 女王=じょおう, 意味=いみ, 上=うえ, 人間=にんげん, 下=した, 魚=さかな, 昔=むかし, 森=もり, 村=むら, 女の子=おんなのこ, 長=おさ, 目=め, 緑色=みどりいろ, 弓=ゆみ, 上手=じょうず, 父=ちち, 兄=あに, 夜=よる, 自分=じぶん, 月=つき, 光=ひかり, 足=あし, 生きて=いきて, 夕方=ゆうがた, 石=いし, 男の人=おとこのひと, 二度と=にどと, 母=はは, 船=ふね, 声=こえ, 気持ち=きもち, 手=て, 方=ほう, 言葉=ことば, 両手=りょうて, 耳=みみ, 力いっぱい=ちからいっぱい, 人魚=にんぎょ, 顔=かお, 体=からだ, 生き物=いきもの, 福井県=ふくいけん, 八百比丘尼=やおびくに, 肉=にく, 年=とし, 八百年=はっぴゃくねん, 先=さき, 伝説=でんせつ, 集まって=あつまって, むすめ=むすめ, 大人=おとな, 日本中=にほんじゅう, 旅=たび, 花=はな, 白い=しろい, 最後=さいご, 今=いま. Đã đọc lại toàn bộ.
- Từ vựng: 9 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-br-iara-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.86 (49 câu)
  - イアラ: `ja-JP-Neural2-B`, tốc độ 0.92, cao độ 3 (3 câu)
  - 父: `ja-JP-Neural2-C`, tốc độ 0.88, cao độ -7 (3 câu)
  - 兄: `ja-JP-Neural2-C`, tốc độ 1, cao độ -1 (1 câu)
  - ペドロ: `ja-JP-Neural2-C`, tốc độ 0.98, cao độ 3 (2 câu)
  - 母: `ja-JP-Neural2-B`, tốc độ 0.9, cao độ -4 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Noto Sans JP.
