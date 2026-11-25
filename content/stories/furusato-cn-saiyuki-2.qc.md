# QC — furusato-cn-saiyuki-2

- Nguồn: Tiểu thuyết cổ điển Trung Quốc 西游记 (Ngô Thừa Ân, thế kỷ 16, public domain), hồi 8–22 (rút gọn). Claude tự kể lại bằng tiếng Nhật theo cốt truyện gốc, không chép bản dịch/tuyển tập hiện đại nào. Phần so sánh: 桃太郎 (public domain) và cách Nhật Bản quen vẽ 沙悟浄 thành カッパ.
- Chuẩn v2, cấp N3: 1464 ký tự, 46 câu, câu TB 31.8 ký tự, harder 7.1%, atLevel 34.8%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 前回=ぜんかい, 孫悟空=そんごくう, 悟空=ごくう, 五百年=ごひゃくねん, 三蔵法師=さんぞうほうし, 天竺=てんじく, 観音さま=かんのんさま, お経=おきょう, 何か月=なんかげつ, お札=おふだ, お師匠さま=おししょうさま, 山賊=さんぞく, 金の輪=きんのわ, 呪文=じゅもん, 猪八戒=ちょはっかい, 八戒=はっかい, 天の川=あまのがわ, 大将=たいしょう, 女神=めがみ, チャンオー=ちゃんおー, 沙悟浄=さごじょう, 悟浄=ごじょう, 三人=さんにん, 四人=よにん, 中国=ちゅうごく, 桃太郎=ももたろう, 西遊記=さいゆうき, 次回=じかい, 大男=おおおとこ, 食いしんぼう=くいしんぼう, なまけ者=なまけもの, 声の主=こえのぬし, 日本人=にほんじん, お供=おとも, 三蔵=さんぞう. Đã đọc lại toàn bộ.
- Từ vựng: 24 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-cn-saiyuki-2/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (35 câu)
  - 悟空: `ja-JP-Neural2-C`, tốc độ 1.03, cao độ 3 (4 câu)
  - 三蔵: `ja-JP-Neural2-C`, tốc độ 0.88, cao độ -1 (2 câu)
  - 観音: `ja-JP-Neural2-B`, tốc độ 0.88, cao độ -3 (2 câu)
  - 八戒: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -11 (1 câu)
  - 悟浄: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -5 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Reggae One.
