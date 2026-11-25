# QC — furusato-vn-traucau-1

- Nguồn: Truyền thuyết dân gian Việt Nam (truyền khẩu; có trong 嶺南摭怪, public domain), Claude tự kể lại bằng tiếng Nhật theo cốt truyện truyền thống, không chép tuyển tập hiện đại nào. Phần so sánh: vở Nô 「高砂」 của 世阿弥 (public domain).
- Chuẩn v2, cấp N3: 1699 ký tự, 56 câu, câu TB 30.3 ký tự, harder 3.8%, atLevel 19.3%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 二本の松=にほん の まつ, 一ぜん=いちぜん, 何日も何日も=なんにち も なんにち も, 何年も=なんねん も, 三人=さんにん, フン王=ふん おう, キンマ=きんま, ビンロウ=びんろう, 高砂=たかさご, 相生の松=あいおい の まつ, 高砂や=たかさご や, 兄さん=にいさん. Đã đọc lại toàn bộ.
- Từ vựng: 25 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-traucau-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (45 câu)
  - タン: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -1 (1 câu)
  - ラン: `ja-JP-Neural2-C`, tốc độ 1, cao độ 2 (4 câu)
  - 娘: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ 2 (2 câu)
  - 妻: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ 2 (2 câu)
  - 王: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -4 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Zen Kurenaido.
