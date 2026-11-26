# QC — toshishun-2

- Nguồn: Phỏng theo 「杜子春」 của 芥川龍之介 (Akutagawa Ryūnosuke, mất 1927; xuất bản 1920; public domain ở Nhật và Mỹ). Claude viết lại bằng tiếng Nhật cho MiraiGo, giữ cốt truyện, ba lần đào vàng, thử thách trên núi 峨眉山 và cảnh kết gốc.
- Chuẩn v2, cấp N3: 1837 ký tự, 62 câu, câu TB 29.6 ký tự, harder 9.7%, atLevel 32.1%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 杜子春=とししゅん, 鉄冠子=てっかんし, 洛陽=らくよう, 峨眉山=がびさん, 仙術=せんじゅつ, 仙人=せんにん, 片目=かため, 一晩=ひとばん, 三度目=さんどめ, 一本=いっぽん, 一人=ひとり, 二人=ふたり, 大きな=おおきな, 小さな=ちいさな, 西王母=せいおうぼ, 北斗七星=ほくとしちせい, 神将=しんしょう, 閻魔大王=えんまだいおう, 泰山=たいざん, 大蛇=だいじゃ, 一言=ひとこと, 二ひき=にひき, 一ぴき=いっぴき, 三つまた=みつまた, 茶わん=ちゃわん, 御殿=ごてん, 強情=ごうじょう, 天上=てんじょう, 針の山=はり の やま, 血の池=ち の いけ, 一けん=いっけん, 大男=おおおとこ, 夕空=ゆうぞら, 大通り=おおどおり, 竹のつえ=たけ の つえ, まい上がりました=まいあがりました, にこにこ=にこにこ, ぜいたく=ぜいたく, じゅもん=じゅもん, いっそ=いっそ, 三年=さんねん, 中国の都=ちゅうごく の みやこ, 通っていきます=とおって いきます, どこにも=どこ に も, とまる所=とまる ところ, ような方=ような かた, 門の下=もん の した, さては=さてわ, いっしょに=いっしょ に, またがりました=またがりました, その間=その あいだ, いなずま=いなずま, たましい=たましい, むちで=むち で, 心配しなくて=しんぱい しなくて. Đã đọc lại toàn bộ.
- Từ vựng: 34 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/bungaku/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/toshishun-2/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.88 (38 câu)
  - 杜子春: `ja-JP-Neural2-C`, tốc độ 1, cao độ 1 (5 câu)
  - 老人: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -7 (11 câu)
  - 声: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -12 (1 câu)
  - 神将: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -9 (2 câu)
  - 閻魔: `ja-JP-Neural2-C`, tốc độ 0.85, cao độ -14 (3 câu)
  - 母: `ja-JP-Neural2-B`, tốc độ 0.9, cao độ -3 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Yuji Boku.
