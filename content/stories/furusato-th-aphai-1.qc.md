# QC — furusato-th-aphai-1

- Nguồn: 「พระอภัยมณี」 (Phra Aphai Mani), trường thi của Sunthorn Phu (1786–1855), sáng tác khoảng 1822–1844, public domain. Claude tự kể lại đoạn đầu (sáo thần, nữ quỷ biển Phisuea Samut, nàng tiên cá, đảo của đạo sĩ) bằng tiếng Nhật, rút gọn, không chép bản kể hiện đại nào. Phần so sánh: 浦島太郎 và tích 牛若丸 gặp 弁慶 ở cầu Gojō (public domain).
- Chuẩn v2, cấp N3: 1659 ký tự, 50 câu, câu TB 33.2 ký tự, harder 4.5%, atLevel 33.1%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 国語=こくご, 教科書=きょうかしょ, 物語=ものがたり, 二百年=にひゃくねん, 詩人=しじん, 主人公=しゅじんこう, 王子=おうじ, 王さま=おうさま, 剣=けん, 笛=ふえ, 城=しろ, 父上=ちちうえ, 海辺=うみべ, 海の底=うみのそこ, 鬼=おに, ほら穴=ほらあな, 何年=なんねん, 陸=りく, 人魚=にんぎょ, 親子=おやこ, 上半身=じょうはんしん, 下半身=かはんしん, 大波=おおなみ, 島=しま, 修行者=しゅぎょうしゃ, 竜=りゅう, 大活躍=だいかつやく, 詩=し, 浦島太郎=うらしまたろう, 竜宮城=りゅうぐうじょう, 乙姫=おとひめ, 玉手箱=たまてばこ, 人生=じんせい, 牛若丸=うしわかまる, 五条=ごじょう, 弁慶=べんけい, 結ばれ=むすばれ. Đã đọc lại toàn bộ.
- Từ vựng: 17 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-th-aphai-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (45 câu)
  - 王さま: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -6 (1 câu)
  - アパイマニー: `ja-JP-Neural2-C`, tốc độ 0.98, cao độ 1 (2 câu)
  - ピースア・サムット: `ja-JP-Neural2-B`, tốc độ 0.88, cao độ -4 (1 câu)
  - 人魚: `ja-JP-Neural2-B`, tốc độ 0.98, cao độ 4 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Kaisei HarunoUmi.
