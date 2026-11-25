# QC — furusato-ph-pagong-1

- Nguồn: Truyện dân gian Philippines "Si Pagong at si Matsing" (truyền khẩu, public domain; bản José Rizal "The Monkey and the Turtle" in năm 1889 cũng đã thuộc public domain). Claude tự kể lại bằng tiếng Nhật theo cốt truyện phổ biến, không chép tuyển tập hiện đại nào. Phần so sánh: さるかに合戦 (truyện dân gian Nhật, public domain).
- Chuẩn v2, cấp N3: 1569 ký tự, 50 câu, câu TB 31.4 ký tự, harder 3.7%, atLevel 28.0%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 千八百八十九年=せんはっぴゃくはちじゅうきゅうねん, 二ひき=にひき, 一本=いっぽん, 上の方=うえのほう, 下の方=したのほう, 何日=なんにち, 何か月=なんかげつ, 半分=はんぶん, 貝がら=かいがら, 根っこ=ねっこ, 葉っぱ=はっぱ, さるかに合戦=さるかにかっせん, 黄色=きいろ, 着地=ちゃくち, 英語=えいご, 英雄=えいゆう, 実=み. Đã đọc lại toàn bộ.
- Từ vựng: 20 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-ph-pagong-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (32 câu)
  - カメ: `ja-JP-Neural2-C`, tốc độ 0.86, cao độ -4 (9 câu)
  - サル: `ja-JP-Neural2-C`, tốc độ 1.05, cao độ 4 (9 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Potta One.
