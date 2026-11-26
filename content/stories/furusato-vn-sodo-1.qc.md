# QC — furusato-vn-sodo-1

- Nguồn: Tiểu thuyết 『Số đỏ』 của Vũ Trọng Phụng (1912–1939), in năm 1936; tác giả mất năm 1939 nên tác phẩm là public domain. Claude tự kể lại bằng tiếng Nhật từ cốt truyện nguyên tác (Xuân Tóc Đỏ nhặt bóng ở sân quần vợt, nhìn trộm bị bắt, bà Phó Đoan bảo lãnh, tiệm may Âu Hóa của vợ chồng Văn Minh, họa sĩ TYPN, 'đốc tờ Xuân', cụ cố Hồng với câu 'Biết rồi! Khổ lắm! Nói mãi!', cả nhà chờ cụ cố tổ chết để chia gia tài), rút gọn và không dịch từng câu; không dùng bản dịch hiện đại nào.
- Chuẩn v2, cấp N2: 2257 ký tự, 61 câu, câu TB 37.0 ký tự, harder 6.8%, atLevel 11.8%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 一九三〇年代=せんきゅうひゃくさんじゅうねんだい, 一九三六年=せんきゅうひゃくさんじゅうろくねん, 赤毛=あかげ, 欧化=おうか, 洋装店=ようそうてん, 大旦那=おおだんな, 煙管=きせる, 一服=いっぷく, 一字一句=いちじいっく, 一晩=ひとばん, 指折り=ゆびおり, 名家=めいか, 寝台=しんだい, 未亡人=みぼうじん, 貞節=ていせつ, 上流=じょうりゅう, 良家=りょうけ, 親類=しんるい, 筆名=ひつめい, 合言葉=あいことば, 留置場=りゅうちじょう, 二度=にど, 十年=じゅうねん, お召し=おめし, 大当たり=おおあたり. Đã đọc lại toàn bộ.
- Từ vựng: 26 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-sodo-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (41 câu)
  - スアン: `ja-JP-Neural2-C`, tốc độ 1, cao độ 2 (6 câu)
  - 女性: `ja-JP-Neural2-B`, tốc độ 1.05, cao độ 3 (1 câu)
  - フォー・ドアン夫人: `ja-JP-Neural2-B`, tốc độ 0.92, cao độ -2 (3 câu)
  - ヴァンミン: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -2 (8 câu)
  - ヴァンミン夫人: `ja-JP-Neural2-B`, tốc độ 0.98, cao độ 1 (1 câu)
  - ホン老人: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -8 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông BIZ UDGothic.
