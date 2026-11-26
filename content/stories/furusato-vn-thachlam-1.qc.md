# QC — furusato-vn-thachlam-1

- Nguồn: Hai đứa trẻ (1938, tập Nắng trong vườn) của Thạch Lam (1910–1942); public domain. Claude tự kể lại bằng tiếng Nhật (N1) từ nguyên tác, rút gọn và giữ các chi tiết chính: tiếng trống thu không, chợ tàn, trẻ con nhặt rác, chị Tí bán nước chè (ban ngày mò cua bắt tép), bác phở Siêu, bà cụ Thi hơi điên uống rượu một hơi, gia đình bác xẩm, ký ức Hà Nội (Bờ Hồ, cốc nước xanh đỏ), chuyến tàu đêm đi Hà Nội với đồng và kền lấp lánh, Liên đóng cửa hàng.
- Chuẩn v2, cấp N1: 2023 ký tự, 61 câu, câu TB 33.2 ký tự, harder 0.0%, atLevel 8.1%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 市場=いちば, 一杯=いっぱい, 一息=ひといき, 一瞬=いっしゅん, 一本=いっぽん, 一枚=いちまい, 戸板=といた, 杯=さかずき, 甲高く=かんだかく, 轟音=ごうおん, 気のふれた=き の ふれた, 夜更け=よふけ, 行き交う=ゆきかう, 店番=みせばん, 係=かかり, 金具=かなぐ, 竹=たけ, 石嵐=せきらん, 後ろ姿=うしろすがた, 明日=あした, 銅=どう, 来そう=きそう, 担いで=かついで, 昼の間=ひる の あいだ. Đã đọc lại toàn bộ.
- Từ vựng: 9 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-thachlam-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (51 câu)
  - リエン: `ja-JP-Neural2-B`, tốc độ 0.98, cao độ 1 (4 câu)
  - アン: `ja-JP-Neural2-B`, tốc độ 1.05, cao độ 5 (4 câu)
  - ティー: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ -3 (1 câu)
  - ティばあさん: `ja-JP-Neural2-B`, tốc độ 0.85, cao độ -6 (1 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Klee One.
