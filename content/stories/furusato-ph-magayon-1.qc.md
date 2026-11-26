# QC — furusato-ph-magayon-1

- Nguồn: Truyền thuyết vùng Bicol (Philippines) 「Daragang Magayon」 (nàng Magayon con gái tù trưởng Rawis; Panganoron cứu nàng khi trượt chân xuống sông; Pagtuga bắt cha nàng để ép cưới; Panganoron thắng nhưng Magayon trúng tên lạc, Panganoron bị tay chân Pagtuga giết; mộ hai người cao dần thành núi lửa Mayon, mây trên đỉnh là Panganoron ('mây'), núi phun là cơn giận Pagtuga). Truyền khẩu, có nhiều dị bản, public domain. Claude tự kể lại bằng tiếng Nhật. Phần so sánh: đoạn kết 『竹取物語』 (thuốc trường sinh đốt trên núi Phú Sĩ, 不死→富士), public domain.
- Chuẩn v2, cấp N3: 1599 ký tự, 59 câu, câu TB 27.1 ký tự, harder 8.4%, atLevel 26.8%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 火山=かざん, 雲=くも, 恋=こい, 土地=とち, お姫さま=おひめさま, 地方=ちほう, 言葉=ことば, 意味=いみ, 王さま=おうさま, 宝物=たからもの, 水あび=みずあび, 若者=わかもの, 王子=おうじ, 命の恩人=いのちのおんじん, 結婚=けっこん, 結婚式=けっこんしき, 兵士=へいし, 仲間=なかま, 最後=さいご, 矢=や, 場所=ばしょ, 土=つち, 竹取物語=たけとりものがたり, かぐや姫=かぐやひめ, 帝=みかど, 手紙=てがみ, 薬=くすり, 不死=ふし, 不死の薬=ふしのくすり, 姫=ひめ, 世界=せかい, 世界一=せかいいち, 富士山=ふじさん, 富士=ふじ, 場面=ばめん, 音=おと, 形=かたち, 美しい=うつくしい, 月=つき. Đã đọc lại toàn bộ.
- Từ vựng: 6 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-ph-magayon-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (49 câu)
  - マガヨン: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ 2 (4 câu)
  - パンガノロン: `ja-JP-Neural2-C`, tốc độ 0.98, cao độ 2 (3 câu)
  - パグトゥガ: `ja-JP-Neural2-C`, tốc độ 0.92, cao độ -8 (3 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông M PLUS 2.
