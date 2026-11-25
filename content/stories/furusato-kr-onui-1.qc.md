# QC — furusato-kr-onui-1

- Nguồn: Truyện dân gian Hàn Quốc 해와 달이 된 오누이 (truyền khẩu, public domain), Claude tự kể lại bằng tiếng Nhật theo cốt truyện truyền thống, không chép tuyển tập hiện đại nào. Phần so sánh: 天道さん金の鎖 (truyện dân gian Nhật, public domain).
- Chuẩn v2, cấp N3: 1830 ký tự, 58 câu, câu TB 31.6 ký tự, harder 7.6%, atLevel 25.5%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 三人=さんにん, 毛が=け が, 毛だらけ=けだらけ, 何度も=なんども, 一つ目=ひとつめ, 二つ目=ふたつめ, 三つ目=みっつめ, 終わり方=おわりかた, 山んば=やまんば, 天道さん=てんとうさん, お兄ちゃん=おにいちゃん, 金の鎖=きん の くさり, 韓国=かんこく, 神さま=かみさま, 天の=てん の. Đã đọc lại toàn bộ.
- Từ vựng: 27 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-kr-onui-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (39 câu)
  - 母: `ja-JP-Neural2-B`, tốc độ 0.9, cao độ -2 (1 câu)
  - 虎: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -9 (10 câu)
  - 兄: `ja-JP-Neural2-C`, tốc độ 1, cao độ 4 (5 câu)
  - 妹: `ja-JP-Neural2-B`, tốc độ 1, cao độ 5 (3 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Yusei Magic.
