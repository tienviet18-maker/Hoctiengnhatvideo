# QC — mikan-1

- Nguồn: Phỏng theo 「蜜柑」 của 芥川龍之介 (Akutagawa Ryūnosuke, mất 1927; xuất bản 1919; public domain ở Nhật và Mỹ). Claude viết lại bằng tiếng Nhật cho MiraiGo, giữ ngôi kể thứ nhất, toa hạng hai, đường hầm, ô cửa sổ và cảnh những quả quýt rơi xuống ba cậu bé ở đường ngang. Thay gói cũ mikan.
- Chuẩn v2, cấp N3: 2138 ký tự, 61 câu, câu TB 35.0 ký tự, harder 8.6%, atLevel 30.7%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 横須賀=よこすか, 二等車=にとうしゃ, 二等=にとう, 三等=さんとう, 一人=ひとり, 一ぴき=いっぴき, 小犬=こいぬ, 雪曇り=ゆきぐもり, 曇り空=くもりぞら, 改札口=かいさつぐち, 下駄=げた, 車掌=しゃしょう, 小娘=こむすめ, 十三か四=じゅうさん か し, 油気=あぶらけ, ひっつめ=ひっつめ, 両方=りょうほう, 黄緑色=きみどりいろ, 毛糸=けいと, えりまき=えりまき, ふろしき包み=ふろしきづつみ, しもやけ=しもやけ, 夕刊=ゆうかん, 何分か=なんぷん か, 見回しました=みまわしました, 入り口=いりぐち, 真っ黒=まっくろ, 四角な=しかくな, 頭ごなし=あたまごなし, 町はずれ=まちはずれ, わら屋根=わらやね, かわら屋根=かわらやね, 踏切=ふみきり, 目白押し=めじろおし, 三人=さんにん, 歓声=かんせい, 奉公=ほうこう, 夕暮れ=ゆうぐれ, 小鳥=ことり, 晴れ晴れ=はればれ, 別人=べつじん, 相変わらず=あいかわらず, いっせいに=いっせい に, うつらうつら=うつらうつら, ごちゃごちゃ=ごちゃごちゃ, ばらばら=ばらばら, ばたばた=ばたばた, ちらりと=ちらりと, だらりと=だらりと, するりと=するりと, ばたりと=ばたりと, ぱっと=ぱっと, 大きな=おおきな, 小さく=ちいさく, いっしょに=いっしょ に, 大事=だいじ, 人生=じんせい, 蜜柑=みかん, 踏切の柵=ふみきり の さく, うしろで=うしろ で, 顔だち=かおだち, 日の光=ひ の ひかり, 五つ=いつつ, 六つ=むっつ, 一度=いちど. Đã đọc lại toàn bộ.
- Từ vựng: 32 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/bungaku/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/mikan-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.88 (61 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Zen Old Mincho.
