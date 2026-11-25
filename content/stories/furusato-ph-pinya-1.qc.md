# QC — furusato-ph-pinya-1

- Nguồn: Truyện dân gian Philippines "Alamat ng Pinya" (truyền khẩu, public domain; nhiều dị bản). Claude tự kể lại bằng tiếng Nhật theo cốt truyện phổ biến (cô bé lười Pina, lời than của người mẹ, cây có nghìn mắt), không chép tuyển tập hiện đại nào. Phần so sánh: khái niệm 言霊 và truyện dân gian あまがえる (public domain).
- Chuẩn v2, cấp N3: 1551 ký tự, 50 câu, câu TB 31.0 ký tự, harder 3.9%, atLevel 18.0%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 一人娘=ひとりむすめ, 口ぐせ=くちぐせ, 台所=だいどころ, 千個=せんこ, 何か月=なんかげつ, 言霊=ことだま, 日本人=にほんじん, 子ガエル=こがえる, 目=め, 実=み, 黄色=きいろ, お母さん=おかあさん, 一つ=ひとつ. Đã đọc lại toàn bộ.
- Từ vựng: 18 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-ph-pinya-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (38 câu)
  - ピニャ: `ja-JP-Neural2-B`, tốc độ 1, cao độ 4 (6 câu)
  - お母さん: `ja-JP-Neural2-B`, tốc độ 0.88, cao độ -3 (6 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Mochiy Pop P One.
