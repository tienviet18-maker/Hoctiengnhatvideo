# QC — furusato-vn-sontinh-1

- Nguồn: Truyện cổ tích dân gian Việt Nam (truyền khẩu, không thuộc bản quyền), Claude tự kể lại bằng tiếng Nhật theo cốt truyện truyền thống, không chép tuyển tập hiện đại nào.
- Chuẩn v2, cấp N3: 1400 ký tự, 51 câu, câu TB 27.5 ký tự, harder 6.9%, atLevel 23.6%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, フン王=ふん おう, 百個=ひゃっこ, 九本=きゅうほん, 牙=きば, 一メートル=いちメートル, 十メートル=じゅうメートル, 何か月=なんかげつ, 山幸彦=やまさちひこ, 海幸彦=うみさちひこ, 潮=しお, 水害=すいがい, 力ずく=ちからずく, お嫁さん=およめさん, 雷=かみなり, 田んぼ=たんぼ, 頂上=ちょうじょう, 山の神=やま の かみ, 風の神=かぜ の かみ, 水の神=みず の かみ, 雨の神=あめ の かみ, 北の方=きた の ほう, おくり物=おくりもの, もち米=もちごめ, けづめ=けづめ, 行ってしまった=いってしまった. Đã đọc lại toàn bộ.
- Từ vựng: 22 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-sontinh-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (43 câu)
  - 王様: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -2 (5 câu)
  - ソンティン: `ja-JP-Neural2-C`, tốc độ 0.92, cao độ -5 (1 câu)
  - トゥイティン: `ja-JP-Neural2-C`, tốc độ 1.02, cao độ 3 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Zen Antique.
