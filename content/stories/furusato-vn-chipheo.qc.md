# QC — furusato-vn-chipheo

- Nguồn: Truyện ngắn 『Chí Phèo』 của Nam Cao (1915–1951), in năm 1941; tác giả mất năm 1951 nên tác phẩm đã thuộc phạm vi công cộng ở Việt Nam và Nhật Bản. Claude tự kể lại bằng tiếng Nhật N2 theo nguyên tác: tiếng chửi mở đầu không ai đáp, đứa bé bị bỏ ở lò gạch cũ, làm canh điền cho Bá Kiến và bị đẩy đi tù vì ghen, trở về rạch mặt ăn vạ rồi thành tay sai, đêm trăng với Thị Nở, buổi sáng tỉnh rượu nghe tiếng đời, bát cháo hành, bà cô ngăn cản, câu 'Ai cho tao lương thiện?', cái chết của Bá Kiến và Chí Phèo, và hình ảnh lò gạch cũ ở cuối truyện.
- Chuẩn v2, cấp N2: 2471 ký tự, 65 câu, câu TB 38.0 ký tự, harder 2.7%, atLevel 10.1%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 一九四一年=せんきゅうひゃくよんじゅういちねん, チ・フェオ=チ・フェオ, バー・キエン=バー・キエン, ティ・ノー=ティ・ノー, ナム・カオ=ナム・カオ, 二十世紀=にじっせいき, 作男=さくおとこ, 第三夫人=だいさんふじん, 丸刈り=まるがり, 入れ墨=いれずみ, 酒瓶=さかびん, 手下=てした, 器量=きりょう, 独り身=ひとりみ, 船板=ふないた, 茶碗=ちゃわん, 寝込んで=ねこんで, 一度=いちど, 一人きり=ひとりきり, 五日=いつか, 包丁=ほうちょう, 屋敷=やしき, 元=もと, 刃=は, 羅生門=らしょうもん, 芥川龍之介=あくたがわりゅうのすけ, 二十歳=はたち, 村一番=むらいちばん, 何年ぶり=なんねんぶり, 久しぶり=ひさしぶり, 四十=よんじゅう, 三十=さんじゅう, 国語=こくご, 寄りつかなく=よりつかなく, 悪人=あくにん, 酔い=よい, ヴーダイ=ヴーダイ, 金=かね, 借金=しゃっきん, 乱暴者=らんぼうもの. Đã đọc lại toàn bộ.
- Từ vựng: 20 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-chipheo/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.88 (53 câu)
  - チ・フェオ: `ja-JP-Neural2-C`, tốc độ 0.92, cao độ -5 (8 câu)
  - バー・キエン: `ja-JP-Neural2-C`, tốc độ 0.84, cao độ -8 (2 câu)
  - ティ・ノー: `ja-JP-Neural2-B`, tốc độ 0.92, cao độ -1 (1 câu)
  - おば: `ja-JP-Neural2-B`, tốc độ 1.08, cao độ 3 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Shippori Mincho.
