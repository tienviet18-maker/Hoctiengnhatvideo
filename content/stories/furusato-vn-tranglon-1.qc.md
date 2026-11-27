# QC — furusato-vn-tranglon-1

- Nguồn: Truyện cười dân gian Việt Nam 'Trạng Lợn' (phạm vi công cộng, nhiều dị bản): con nhà hàng thịt lợn dốt mà gặp may, giả làm thầy bói tìm trâu nhờ đầy tớ mách, tình cờ khiến kẻ trộm trong cung tự thú, ra đối đáp với sứ phương Bắc bằng cử chỉ (vẽ vòng tròn – chỉ bánh chưng vuông: trời tròn đất vuông; giơ ba ngón – giơ năm ngón: tam cương – ngũ thường). Claude tự kể lại bằng tiếng Nhật N3; tên hai kẻ trộm Hai và Ba (gọi theo thứ tự sinh) là chi tiết Claude chọn để giữ cách chơi chữ của truyện.
- Chuẩn v2, cấp N3: 1720 ký tự, 51 câu, câu TB 33.7 ký tự, harder 9.3%, atLevel 33.1%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 状元=じょうげん, 豚肉屋=ぶたにくや, 大嫌い=だいきらい, 宿=やど, 主人=しゅじん, 水牛=すいぎゅう, 村はずれ=むらはずれ, 竹やぶ=たけやぶ, 重々しく=おもおもしく, 東=ひがし, 名人=めいじん, 金の印=きんのいん, 宮殿=きゅうでん, 首=くび, 真っ青=まっさお, 一晩目=ひとばんめ, 二日目=ふつかめ, 三日目=みっかめ, 番兵=ばんぺい, 仲間=なかま, お見通し=おみとおし, 差し出しました=さしだしました, 何が何だか=なにがなんだか, 大国=たいこく, 使者=ししゃ, 命じられて=めいじられて, 餅=もち, 空中=くうちゅう, 丸=まる, 四角い=しかくい, 皿=さら, 天=てん, 地=ち, 三本=さんぼん, 五本=ごほん, 徳=とく, 学問=がくもん, 三つ=みっつ, 五つ=いつつ, 知ったかぶり=しったかぶり, 実力=じつりょく, 本人=ほんにん, 三日=みっか, 丸い=まるい, とんち=とんち, 丸く=まるく. Đã đọc lại toàn bộ.
- Từ vựng: 29 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-tranglon-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (42 câu)
  - ロン: `ja-JP-Neural2-C`, tốc độ 1.05, cao độ 3 (4 câu)
  - トゥ: `ja-JP-Neural2-C`, tốc độ 1.12, cao độ 7 (1 câu)
  - 王様: `ja-JP-Neural2-C`, tốc độ 0.86, cao độ -7 (1 câu)
  - ハイ: `ja-JP-Neural2-C`, tốc độ 1.18, cao độ -1 (1 câu)
  - 使者: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -4 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Mochiy Pop One.
