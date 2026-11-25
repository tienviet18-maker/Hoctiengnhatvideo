# QC — furusato-cn-saiyuki-1

- Nguồn: Tiểu thuyết cổ điển Trung Quốc 西游记 (Ngô Thừa Ân, thế kỷ 16, public domain), hồi 1–7. Claude tự kể lại ngắn gọn bằng tiếng Nhật theo cốt truyện gốc, không chép bản dịch/tuyển tập hiện đại nào. Phần so sánh: さるかに合戦 (truyện dân gian Nhật, public domain).
- Chuẩn v2, cấp N3: 1515 ký tự, 48 câu, câu TB 31.6 ký tự, harder 9.2%, atLevel 30.1%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 西遊記=さいゆうき, 四百年=よんひゃくねん, 三回=さんかい, 花果山=かかざん, 孫悟空=そんごくう, 悟空=ごくう, 七十二=ななじゅうに, 一回=いっかい, 竜王=りゅうおう, 如意棒=にょいぼう, 斉天大聖=せいてんたいせい, 不老不死=ふろうふし, 何万人=なんまんにん, お釈迦さま=おしゃかさま, 五本=ごほん, 中指=なかゆび, 五行山=ごぎょうざん, 五百年=ごひゃくねん, 中国=ちゅうごく, さるかに合戦=さるかにかっせん, 仙人=せんにん, 一番=いちばん. Đã đọc lại toàn bộ.
- Từ vựng: 32 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-cn-saiyuki-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (39 câu)
  - 悟空: `ja-JP-Neural2-C`, tốc độ 1.03, cao độ 3 (6 câu)
  - 仙人: `ja-JP-Neural2-C`, tốc độ 0.84, cao độ -6 (2 câu)
  - 釈迦: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -9 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Reggae One.
