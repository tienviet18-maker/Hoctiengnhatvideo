# QC — furusato-cn-liangzhu-1

- Nguồn: Truyền thuyết dân gian Trung Quốc 'Lương Sơn Bá – Chúc Anh Đài' (một trong Tứ đại dân gian truyền thuyết; phạm vi công cộng): Anh Đài giả trai đi học ở Hàng Châu, kết nghĩa với Sơn Bá, ba năm học chung, cảnh 'mười tám dặm tiễn đưa' (đôi ngỗng, bóng dưới giếng), lời hứa gả 'em gái', Sơn Bá đến muộn, Anh Đài bị hứa gả cho nhà họ Mã, Sơn Bá chết, mộ nứt, hai người hóa bướm. Claude tự kể lại bằng tiếng Nhật N3.
- Chuẩn v2, cấp N3: 1608 ký tự, 45 câu, câu TB 35.7 ký tự, harder 9.2%, atLevel 29.3%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 四大民間伝説=よんだいみんかんでんせつ, 梁山伯=りょうさんぱく, 祝英台=しゅくえいだい, 二羽=にわ, 四つ=よっつ, 一つ=ひとつ, 学問=がくもん, 姿=すがた, 杭州=こうしゅう, 青年=せいねん, 兄弟=きょうだい, 三年間=さんねんかん, 三年後=さんねんご, 別れ=わかれ, 見送る=みおくる, 雄=おす, 雌=めす, 男同士=おとこどうし, 井戸=いど, 一人ずつ=ひとりずつ, 何か月=なんかげつ, 金持ち=かねもち, 埋めて=うめて, 花嫁=はなよめ, 行列=ぎょうれつ, 墓=はか, 真っ暗=まっくら, 一歩=いっぽ, 花嫁衣装=はなよめいしょう, 雷=かみなり, 二つ=ふたつ, 虹=にじ, 色あざやか=いろあざやか, 生まれ変わった=うまれかわった, 二十世紀=にじっせいき, 梁祝=りょうしゅく, 協奏曲=きょうそうきょく, 世界中=せかいじゅう, 二度と=にどと, この世=このよ, 自身=じしん, シャンボー=シャンボー, インタイ=インタイ, がちょう=がちょう, ちかい=ちかい, 寄りそって=よりそって. Đã đọc lại toàn bộ.
- Từ vựng: 24 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-cn-liangzhu-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.88 (36 câu)
  - インタイ: `ja-JP-Neural2-B`, tốc độ 1, cao độ 2 (6 câu)
  - シャンボー: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -1 (3 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Hina Mincho.
