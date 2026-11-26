# QC — chumon-2

- Nguồn: Phỏng theo 「注文の多い料理店」 của 宮沢賢治 (Miyazawa Kenji, mất 1933; xuất bản 1924; public domain ở Nhật và Mỹ). Claude viết lại bằng tiếng Nhật cho MiraiGo, giữ cốt truyện, các lời dặn trên cửa và cảnh kết gốc. Thay gói cũ chumon-no-oi-ryoriten.
- Chuẩn v2, cấp N3: 1865 ký tự, 60 câu, câu TB 31.1 ký tự, harder 7.9%, atLevel 21.1%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 二人=ふたり, 二ひき=にひき, 一ぴき=いっぴき, 一けん=いっけん, 大きな=おおきな, 小さな=ちいさな, 二千四百円=にせんよんひゃくえん, 二千八百円=にせんはっぴゃくえん, 山猫軒=やまねこけん, 山猫=やまねこ, 西洋料理店=せいようりょうりてん, 鉄砲=てっぽう, 道案内=みちあんない, ご承知=ごしょうち, 当店=とうてん, 大かんげい=だいかんげい, 水色=みずいろ, 金庫=きんこ, 金もの=かなもの, 金の字=きんのじ, 両方=りょうほう, げんかん=げんかん, ズドン=ずどん, ろうか=ろうか, ぴかぴか=ぴかぴか, すうっと=すうっと, かさかさ=かさかさ, ざわざわ=ざわざわ, くつ下=くつした, 香水=こうすい, 金ぴか=きんぴか, 十五分=じゅうごふん, 瀬戸=せと, 塩つぼ=しおつぼ, 一ミリ=いちミリ, 一まい=いちまい, かぎあな=かぎあな, 目玉=めだま, 菜っ葉=なっぱ, 親分=おやぶん, 紙くず=かみくず, 一ぺん=いっぺん, お湯=おゆ, 上着=うわぎ, 根もと=ねもと, だんなあ=だんなあ, すくさい=すくさい, かんばん=かんばん, 入ろう=はいろう, さいふ=さいふ, つぼ=つぼ, からだ中=からだじゅう, もみこんで=もみこんで, もみこまない=もみこまない, おたがい=おたがい, 二つ=ふたつ, もんであります=もんで あります, あなたがた=あなたがた, にゃあお=にゃあお, くわあ=くわあ, ふうと=ふうと, おだんご=おだんご, ぱちゃぱちゃ=ぱちゃぱちゃ, ごえんりょはいりません=ごえんりょ わ いりません, 木のえだ=き の えだ. Đã đọc lại toàn bộ.
- Từ vựng: 13 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/bungaku/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/chumon-2/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (41 câu)
  - 男A: `ja-JP-Neural2-C`, tốc độ 1, cao độ -2 (6 câu)
  - 男B: `ja-JP-Neural2-C`, tốc độ 1.05, cao độ 3 (7 câu)
  - 山猫: `ja-JP-Neural2-B`, tốc độ 1, cao độ -8 (3 câu)
  - 山猫2: `ja-JP-Neural2-C`, tốc độ 1.1, cao độ 6 (2 câu)
  - 案内人: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -6 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Shippori Mincho B1.
