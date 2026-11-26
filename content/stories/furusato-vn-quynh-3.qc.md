# QC — furusato-vn-quynh-3

- Nguồn: Giai thoại dân gian về Trạng Quỳnh (Nguyễn Quỳnh, 1677–1748), truyền miệng, thuộc phạm vi công cộng. Claude tự kể lại bằng tiếng Nhật đơn giản (N4) cho thiếu nhi. Tập 3: Quỳnh thi vẽ với sứ phương Bắc, nhúng mười ngón tay vào mực vẽ mười con giun ('địa long' 地竜); câu đố gốc/ngọn của khúc gỗ (thả xuống nước, đầu chìm là gốc) là câu đố dân gian cũng được kể về nhiều nhân vật khác.
- Chuẩn v2, cấp N4: 1486 ký tự, 60 câu, câu TB 24.8 ký tự, harder 9.8%, atLevel 23.7%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 殿様=とのさま, 一歩=いっぽ, 大物=おおもの, 一番=いちばん, 二つ=ふたつ, 一つ目=ひとつめ, 二つ目=ふたつめ, 大人=おとな, 今日=きょう, 夕方=ゆうがた, 何でも=なんでも, 何だ=なんだ, 何だと=なんだと, 大切=たいせつ, 一つ=ひとつ, 力が=ちから が, お城=おしろ, 知恵=ちえ, 使者=ししゃ, 着物=きもの, 大好き=だいすき, 三回目=さん かいめ, 竜=りゅう, 地竜=ちりゅう, 十本=じっぽん, 十ぴき=じっぴき, 一ぴき=いっぴき, 両手=りょうて, 一度=いちど, 一日=いちにち, 最後=さいご, 用意=ようい, 国じゅう=くにじゅう, 上手=じょうず, 何も=なにも, 生きて=いきて, 重い=おもい, 池=いけ, 線=せん, 体=からだ, 土の=つち の. Đã đọc lại toàn bộ.
- Từ vựng: 20 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-quynh-3/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.85 (38 câu)
  - クイン: `ja-JP-Neural2-C`, tốc độ 1.05, cao độ 3 (10 câu)
  - 殿様: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -3 (2 câu)
  - 使者: `ja-JP-Neural2-C`, tốc độ 0.92, cao độ -9 (10 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Mochiy Pop P One.
