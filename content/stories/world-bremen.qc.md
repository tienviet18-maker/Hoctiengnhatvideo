# QC — world-bremen

- Nguồn: Truyện 'Die Bremer Stadtmusikanten' trong tuyển tập Grimm (bản 1857), thuộc phạm vi công cộng. Claude tự kể lại bằng tiếng Nhật N5, giữ đủ bốn con vật, tháp chồng lên nhau và màn dọa kẻ trộm.
- Chuẩn v2, cấp N5: 830 ký tự, 42 câu, câu TB 19.8 ký tự, harder 18.8%, atLevel 100.0%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 音楽隊=おんがくたい, 一緒=いっしょ, 四ひき=よんひき, 明かり=あかり, 上手=じょうず, 台所=だいどころ, 明日=あした, 大きな=おおきな, 木の上=き の うえ, 夜おそく=よる おそく, どろぼう=どろぼう, 所=ところ. Đã đọc lại toàn bộ.
- Từ vựng: 45 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/world/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/world-bremen/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.82 (31 câu)
  - ロバ: `ja-JP-Neural2-C`, tốc độ 0.82, cao độ -5 (5 câu)
  - 犬: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ 2 (2 câu)
  - ネコ: `ja-JP-Neural2-B`, tốc độ 0.9, cao độ 3 (1 câu)
  - オンドリ: `ja-JP-Neural2-C`, tốc độ 1.05, cao độ 7 (2 câu)
  - どろぼう: `ja-JP-Neural2-C`, tốc độ 1.1, cao độ -3 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Mochiy Pop P One.
