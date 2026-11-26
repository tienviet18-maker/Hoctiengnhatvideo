# QC — torokko-1

- Nguồn: Phỏng theo 「トロッコ」 của 芥川龍之介 (Akutagawa Ryūnosuke, mất 1927; xuất bản 1922; public domain ở Nhật và Mỹ). Claude viết lại bằng tiếng Nhật cho MiraiGo, giữ cốt truyện, lời thoại tiếng địa phương của hai người thợ, đoạn chạy về một mình và đoạn kết hồi tưởng năm 26 tuổi. Thay gói cũ torokko.
- Chuẩn v2, cấp N3: 1969 ký tự, 70 câu, câu TB 28.1 ký tự, harder 8.0%, atLevel 20.6%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 小田原=おだわら, 熱海=あたみ, 良平=りょうへい, 八つ=やっつ, 村はずれ=むらはずれ, 土工=どこう, 一番はし=いちばん はし, 一目散=いちもくさん, しるし半てん=しるしばんてん, 十日=とおか, 茶店=ちゃみせ, 二度目=にどめ, 門口=かどぐち, 二十六=にじゅうろく, 妻子=さいし, 雑誌社=ざっししゃ, 二階=にかい, 校正=こうせい, 帰んな=かえんな, 押してくよう=おして くよう, いっしょうけんめい=いっしょうけんめい, 一瞬=いっしゅん, 二つ下=ふたつ した, 二人=ふたり, 一人=ひとり, 三人=さんにん, 一度=いちど, 竹やぶ=たけやぶ, 足のうら=あし の うら, 道ばた=みちばた, 小石=こいし, 夕焼け=ゆうやけ, 大声=おおごえ, 心細さ=こころぼそさ, 材木=ざいもく, 力いっぱい=ちからいっぱい, 新聞紙=しんぶんし, 石油=せきゆ, 何度も=なんども, 大きな=おおきな, 小さな=ちいさな, ごろごろ=ごろごろ, ごろり=ごろり, わあわあ=わあわあ, ぺこりと=ぺこりと, ぽかんと=ぽかんと, ひょいと=ひょいと, ひらひら=ひらひら, いっしょに=いっしょ に, どこにも=どこ に も, 熱海の間=あたみ の あいだ, 二人の間=ふたり の あいだ, みかん畑の間=みかんばたけ の あいだ, 土を運ぶ=つち を はこぶ, 土を積んだ=つち を つんだ, 工事場=こうじば, とちゅう=とちゅう, いろいろ声を=いろいろ こえ を. Đã đọc lại toàn bộ.
- Từ vựng: 27 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/bungaku/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/torokko-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.88 (59 câu)
  - 良平: `ja-JP-Neural2-B`, tốc độ 1.05, cao độ 8 (4 câu)
  - 土工: `ja-JP-Neural2-C`, tốc độ 1.05, cao độ -6 (1 câu)
  - 若い男: `ja-JP-Neural2-C`, tốc độ 1, cao độ 1 (5 câu)
  - 母: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ -2 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Zen Kaku Gothic Antique.
