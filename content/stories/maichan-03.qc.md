# QC — maichan-03

- Nguồn: Sáng tác gốc của Claude cho MiraiGo (series Mai-chan bản mới). Phong tục ném răng sữa: Nhật (răng dưới lên mái, răng trên xuống gầm nhà) và Việt Nam (ném răng, xin chuột đổi răng). Thay cho tập cũ 8 câu mai-chan-ep06-loose-tooth.
- Chuẩn v2, cấp N5: 737 ký tự, 42 câu, câu TB 17.5 ký tự, harder 18.9%, atLevel 100.0%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 先月=せんげつ, 晩ご飯=ばんごはん, 小さい物=ちいさいもの, 大きな=おおきな, 屋根=やね, 何か=なにか. Đã đọc lại toàn bộ.
- Từ vựng: 31 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/maichan/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/maichan-03/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.85 (23 câu)
  - マイ: `ja-JP-Neural2-B`, tốc độ 1, cao độ 6 (7 câu)
  - ビン: `ja-JP-Neural2-B`, tốc độ 1.05, cao độ 10 (4 câu)
  - お母さん: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ -1 (5 câu)
  - お父さん: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -2 (1 câu)
  - ゆき: `ja-JP-Neural2-B`, tốc độ 1.05, cao độ 3 (2 câu)
  - 先生: `ja-JP-Neural2-B`, tốc độ 0.9, cao độ -3 (0 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông M PLUS Rounded 1c.
