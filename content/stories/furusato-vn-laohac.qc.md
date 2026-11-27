# QC — furusato-vn-laohac

- Nguồn: Truyện ngắn 『Lão Hạc』 của Nam Cao (1915–1951), in năm 1943; tác giả mất năm 1951 nên tác phẩm đã thuộc phạm vi công cộng ở Việt Nam (50 năm sau khi tác giả mất). Claude tự kể lại bằng tiếng Nhật N2 theo nguyên tác: con trai lão bỏ đi đồn điền cao su vì không đủ tiền cưới, cậu Vàng, bán chó và câu 'tôi già bằng này tuổi đầu rồi còn đánh lừa một con chó', gửi ông giáo mảnh vườn và ba mươi đồng làm ma, xin bả chó của Binh Tư, cái chết vật vã, và câu 'cuộc đời chưa hẳn đã đáng buồn, hay vẫn đáng buồn nhưng lại đáng buồn theo một nghĩa khác'.
- Chuẩn v2, cấp N2: 2444 ký tự, 60 câu, câu TB 40.7 ký tự, harder 3.0%, atLevel 7.6%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 一九四三年=せんきゅうひゃくよんじゅうさんねん, 物書き=ものかき, 結納=ゆいのう, 契約書=けいやくしょ, 茶碗=ちゃわん, 寝床=ねどこ, 不作=ふさく, 日に日に=ひにひに, 寝込み=ねこみ, 蓄え=たくわえ, 年寄り=としより, 精一杯=せいいっぱい, 形見=かたみ, 五ドン=ごドン, 三十ドン=さんじゅうドン, 縄=なわ, 改まった=あらたまった, 芋=いも, 飢え=うえ, 見かねた=みかねた, 家計=かけい, 身近=みぢか, こそ泥=こそどろ, 一杯=いっぱい, 二人がかり=ふたりがかり, 泡=あわ, 二時間=にじかん, ひとかけら=ひとかけら, 一度=いちど, 誇り=ほこり, 日本語=にほんご, 結納金=ゆいのうきん, 米=こめ. Đã đọc lại toàn bộ.
- Từ vựng: 20 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-laohac/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.88 (48 câu)
  - ハック: `ja-JP-Neural2-C`, tốc độ 0.84, cao độ -6 (8 câu)
  - わたし: `ja-JP-Neural2-C`, tốc độ 0.95 (1 câu)
  - 妻: `ja-JP-Neural2-B`, tốc độ 1.05, cao độ 1 (1 câu)
  - ビン・トゥー: `ja-JP-Neural2-C`, tốc độ 1.08, cao độ -3 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Hina Mincho.
