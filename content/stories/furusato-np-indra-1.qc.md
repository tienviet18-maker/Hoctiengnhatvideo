# QC — furusato-np-indra-1

- Nguồn: Truyền thuyết Newar về nguồn gốc lễ hội Indra Jatra ở Kathmandu: thần Indra xuống trần hái trộm hoa pārijāt cho mẹ (Dagini/Basundhara), bị dân bắt trói; mẹ đến tìm và hứa ban sương mù cho mùa đông và đưa linh hồn người mất trong năm lên trời (truyền khẩu, public domain; đã đối chiếu các bài của Kathmandu Post, Nepali Times, Onlinekhabar). Claude tự kể lại bằng tiếng Nhật. Phần so sánh: 羽衣伝説 và お盆.
- Chuẩn v2, cấp N4: 1518 ký tự, 60 câu, câu TB 25.3 ký tự, harder 11.1%, atLevel 26.1%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 毎年=まいとし, 秋=あき, お祭り=おまつり, 町=まち, 神さま=かみさま, 人形=にんぎょう, 空=そら, 母=はは, 地上=ちじょう, 庭=にわ, 一方=いっぽう, 何日=なんにち, 心配=しんぱい, 自分=じぶん, 冬=ふゆ, 畑=はたけ, 野菜=やさい, 一年=いちねん, 行列=ぎょうれつ, 女神=めがみ, 山車=だし, 羽衣=はごろも, 天女=てんにょ, 水あび=みずあび, お盆=おぼん, 家族=かぞく, 行事=ぎょうじ, 千年=せんねん, 以上=いじょう, 花一つ=はなひとつ, 二つ=ふたつ, 一つ=ひとつ, 大切=たいせつ, 男=おとこ, 海=うみ, 女=おんな, 手=て, 意外=いがい, 世界=せかい, 八日間=ようかかん, 下の町=したのまち, 人間=にんげん. Đã đọc lại toàn bộ.
- Từ vựng: 11 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-np-indra-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (47 câu)
  - インドラ: `ja-JP-Neural2-C`, tốc độ 0.98, cao độ 1 (4 câu)
  - 母: `ja-JP-Neural2-B`, tốc độ 0.88, cao độ -3 (6 câu)
  - 町の人: `ja-JP-Neural2-C`, tốc độ 1, cao độ -6 (3 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông New Tegomin.
