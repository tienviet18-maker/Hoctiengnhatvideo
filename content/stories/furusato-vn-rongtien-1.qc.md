# QC — furusato-vn-rongtien-1

- Nguồn: Truyền thuyết dân gian Việt Nam (truyền khẩu, không thuộc bản quyền), Claude tự kể lại bằng tiếng Nhật theo cốt truyện truyền thống, không chép tuyển tập hiện đại nào. Phần so sánh: 山幸彦と豊玉姫 (Kojiki, public domain).
- Chuẩn v2, cấp N3: 1717 ký tự, 56 câu, câu TB 30.7 ký tự, harder 3.1%, atLevel 21.3%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 米の=こめ の, しばらくの間=しばらく の あいだ, 七日後=なのかご, 五十人=ごじゅうにん, 百人=ひゃくにん, 百個=ひゃっこ, 山幸彦=やまさちひこ, 豊玉姫=とよたまひめ, 三月十日=さんがつ とおか, ラック・ロン・クアン=らっく ろん くあん, アウ・コー=あう こー, フン王=ふん おう, ヴァンラン=ゔぁんらん, 仙女=せんにょ, 神さま=かみさま, 人々=ひとびと, 九本=きゅうほん, 同胞=どうほう, 旧暦=きゅうれき. Đã đọc lại toàn bộ.
- Từ vựng: 29 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-rongtien-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (42 câu)
  - ラック・ロン・クアン: `ja-JP-Neural2-C`, tốc độ 0.92, cao độ -1 (8 câu)
  - アウ・コー: `ja-JP-Neural2-B`, tốc độ 0.92, cao độ 1 (6 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Hina Mincho.
