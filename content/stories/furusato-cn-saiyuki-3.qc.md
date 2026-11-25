# QC — furusato-cn-saiyuki-3

- Nguồn: Tiểu thuyết cổ điển Trung Quốc 西游记 (Ngô Thừa Ân, thế kỷ 16, public domain), hồi 59–61 và kết truyện (hồi 98–100) rút gọn. Claude tự kể lại bằng tiếng Nhật theo cốt truyện gốc, không chép bản dịch/tuyển tập hiện đại nào. Phần so sánh: 天狗のうちわ (truyện dân gian Nhật, public domain).
- Chuẩn v2, cấp N3: 1484 ký tự, 43 câu, câu TB 34.5 ký tự, harder 10.5%, atLevel 27.4%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 三蔵法師=さんぞうほうし, 三蔵=さんぞう, 三人=さんにん, 四人=よにん, 悟空=ごくう, 孫悟空=そんごくう, 八戒=はっかい, 火焔山=かえんざん, 一年中=いちねんじゅう, 羅刹女=らせつにょ, 芭蕉扇=ばしょうせん, 一回=いっかい, 二回=にかい, 三回=さんかい, 一晩中=ひとばんじゅう, 牛魔王=ぎゅうまおう, 兄貴=あにき, 四十九回=よんじゅうきゅうかい, 十四年=じゅうよねん, 天竺=てんじく, お経=おきょう, 金の輪=きんのわ, 天狗=てんぐ, 中国=ちゅうごく, 西遊記=さいゆうき, 何日=なんにち, 何度=なんど, 真っ赤=まっか, 本物=ほんもの, 山全体=やまぜんたい, 菩薩さま=ぼさつさま. Đã đọc lại toàn bộ.
- Từ vựng: 16 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-cn-saiyuki-3/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (35 câu)
  - 悟空: `ja-JP-Neural2-C`, tốc độ 1.03, cao độ 3 (3 câu)
  - 三蔵: `ja-JP-Neural2-C`, tốc độ 0.88, cao độ -1 (1 câu)
  - 八戒: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -11 (1 câu)
  - 羅刹女: `ja-JP-Neural2-B`, tốc độ 0.93, cao độ -2 (2 câu)
  - 牛魔王: `ja-JP-Neural2-C`, tốc độ 0.84, cao độ -15 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Reggae One.
