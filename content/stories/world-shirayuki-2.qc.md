# QC — world-shirayuki-2

- Nguồn: Truyện 'Sneewittchen' trong tuyển tập Grimm (bản 1857), thuộc phạm vi công cộng. Claude tự kể lại bằng tiếng Nhật N4, giữ chi tiết của Grimm (ba giọt máu, người thợ săn, bảy chú lùn). Tập 2: ba lần hoàng hậu cải trang (dây buộc, lược độc, táo độc), quan tài thủy tinh, hoàng tử. Kết của Grimm (đôi giày sắt nung đỏ) được làm nhẹ đi: hoàng hậu bỏ trốn và không ai gặp lại.
- Chuẩn v2, cấp N4: 1369 ký tự, 56 câu, câu TB 24.4 ký tự, harder 13.7%, atLevel 29.5%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 三てき=さんてき, 白雪姫=しらゆきひめ, 一年後=いちねんご, 七歳=ななさい, 千倍=せんばい, 二度と=にどと, 七つ=ななつ, 七つ目=ななつめ, 七人=しちにん, 小人=こびと, 姫様=ひめさま, 今度こそ=こんどこそ, 山の向こう=やま の むこう, 一番=いちばん, 名づけ=なづけ, 手伝って=てつだって, 妃様=きさきさま, 妃=きさき, 王様=おうさま, 物売り=ものうり, 七つの山=ななつ の やま, 一口=ひとくち, 大声=おおごえ, 半分=はんぶん, 赤いほう=あかい ほう, 白いほう=しろい ほう, 交代=こうたい, 花嫁=はなよめ, その後=そのご, 木の根=き の ね, 戸=と. Đã đọc lại toàn bộ.
- Từ vựng: 24 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/world/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/world-shirayuki-2/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.85 (37 câu)
  - 妃: `ja-JP-Neural2-B`, tốc độ 0.88 (0 câu)
  - 女王: `ja-JP-Neural2-B`, tốc độ 0.9, cao độ -6 (7 câu)
  - 鏡: `ja-JP-Neural2-C`, tốc độ 0.8, cao độ -8 (2 câu)
  - 猟師: `ja-JP-Neural2-C`, tốc độ 0.92, cao độ -3 (0 câu)
  - 小人: `ja-JP-Neural2-C`, tốc độ 1.1, cao độ 6 (4 câu)
  - 白雪姫: `ja-JP-Neural2-B`, tốc độ 1, cao độ 4 (4 câu)
  - 王子: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ 1 (2 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Shippori Mincho B1.
