# QC — furusato-vn-quynh-1

- Nguồn: Giai thoại dân gian về Trạng Quỳnh (Nguyễn Quỳnh, 1677–1748), truyền miệng, thuộc phạm vi công cộng. Claude tự kể lại bằng tiếng Nhật đơn giản (N4) cho thiếu nhi. Tập 1: Quỳnh lừa thầy đồ ra khỏi phòng; Chúa Trịnh ăn mầm đá (lọ tương 'đại phong').
- Chuẩn v2, cấp N4: 1487 ký tự, 60 câu, câu TB 24.8 ký tự, harder 14.0%, atLevel 30.0%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 殿様=とのさま, 石の芽=いし の め, 大風=たいふう, 一歩=いっぽ, 大物=おおもの, 一番=いちばん, 二つ=ふたつ, 一つ目=ひとつめ, 二つ目=ふたつめ, お越し=おこし, 大人=おとな, 今日=きょう, 夕方=ゆうがた, 何でも=なんでも, 何だ=なんだ, 何だと=なんだと, 大切=たいせつ, 一つ=ひとつ, 力が=ちから が, 出そうと=だそう と, 料理人=りょうりにん, お城=おしろ. Đã đọc lại toàn bộ.
- Từ vựng: 25 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-quynh-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.85 (40 câu)
  - クイン: `ja-JP-Neural2-C`, tốc độ 1.05, cao độ 3 (9 câu)
  - 先生: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -6 (4 câu)
  - 殿様: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -3 (7 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Mochiy Pop P One.
