# QC — kumonoito-1

- Nguồn: Phỏng theo 「蜘蛛の糸」 của 芥川龍之介 (Akutagawa Ryūnosuke, mất 1927; xuất bản 1918; public domain ở Nhật và Mỹ). Claude viết lại bằng tiếng Nhật N4 cho MiraiGo, giữ cốt truyện và cảnh kết gốc. Thay gói cũ kumo-no-ito.
- Chuẩn v2, cấp N3: 1608 ký tự, 59 câu, câu TB 27.3 ký tự, harder 5.5%, atLevel 23.2%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一つ=ひとつ, 一ぴき=いっぴき, 一本=いっぽん, 一休み=ひとやすみ, 大きな=おおきな, 小さな=ちいさな, 真っ暗=まっくら, 両手=りょうて, 銀色=ぎんいろ, いっしょうけんめい=いっしょうけんめい, 何万キロ=なんまんキロ, 何気なく=なにげなく, 血の池=ちのいけ, おしゃかさま=おしゃかさま, しめた=しめた, ふみつぶそう=ふみつぶそう, すきとおった=すきとおった, まっさかさま=まっさかさま, ぷつりと=ぷつりと, すうっと=すうっと, かんたん=かんたん, とちゅう=とちゅう. Đã đọc lại toàn bộ.
- Từ vựng: 21 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/bungaku/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/kumonoito-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.88 (49 câu)
  - カンダタ: `ja-JP-Neural2-C`, tốc độ 1, cao độ -5 (10 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Shippori Mincho B1.
