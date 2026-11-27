# QC — world-nagagutsu

- Nguồn: Truyện 'Le Maître chat ou le Chat botté' của Charles Perrault (1697), thuộc phạm vi công cộng. Claude tự kể lại bằng tiếng Nhật N3: chàng út được thừa kế con mèo, mèo xin đôi hia, dâng quà cho vua dưới danh 'hầu tước Carabas', màn giả chết đuối bên sông, lừa yêu tinh biến thành chuột rồi ăn thịt, cưới công chúa.
- Chuẩn v2, cấp N3: 1179 ký tự, 49 câu, câu TB 24.1 ký tự, harder 4.3%, atLevel 25.0%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 粉屋=こなや, 三人=さんにん, 一番上=いちばん うえ, 二番目=にばんめ, 一番下=いちばん した, 一番=いちばん, 一ぴき=いっぴき, 長ぐつ=ながぐつ, 何か月=なんかげつ, 王様=おうさま, お姫様=おひめさま, お城=おしろ, 侯爵=こうしゃく, カラバ侯爵=カラバ こうしゃく, 馬車=ばしゃ, 大男=おお おとこ, お役に立ちます=おやく に たちます, ひと目=ひとめ, 農夫=のうふ, 本当=ほんとう, 貴族=きぞく, おくり物=おくりもの, 家の物=いえ の もの, 侯爵さま=こうしゃくさま, 袋=ふくろ, 娘=むすめ, 簡単=かんたん, どろぼう=どろぼう, あっという間=あっという ま. Đã đọc lại toàn bộ.
- Từ vựng: 9 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/world/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/world-nagagutsu/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.85 (31 câu)
  - 息子: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ 2 (1 câu)
  - ねこ: `ja-JP-Neural2-B`, tốc độ 1.05, cao độ 6 (10 câu)
  - 王様: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -5 (4 câu)
  - 農夫: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -2 (1 câu)
  - 大男: `ja-JP-Neural2-C`, tốc độ 0.78, cao độ -12 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Mochiy Pop P One.
