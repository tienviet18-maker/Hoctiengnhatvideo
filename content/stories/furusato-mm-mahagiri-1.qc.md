# QC — furusato-mm-mahagiri-1

- Nguồn: Truyền thuyết Myanmar về Min Mahagiri (Maung Tint De, con nhà thợ rèn ở Tagaung, bị vua Tagaung lừa qua người em gái rồi thiêu trên cây champak; em gái nhảy vào lửa chết theo; cây trôi về Bagan, vua Thinligyaung báo mộng rồi tạc tượng thờ ở núi Popa), truyền khẩu, public domain. Tên em gái theo dị bản Ma Myat Hla. Claude tự kể lại bằng tiếng Nhật. Phần so sánh: 菅原道真 và tín ngưỡng 天神 (lịch sử, public domain).
- Chuẩn v2, cấp N3: 1597 ký tự, 63 câu, câu TB 25.3 ký tự, harder 3.1%, atLevel 20.2%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 家=いえ, 神さま=かみさま, 本当=ほんとう, 国=くに, 鉄=てつ, 刀=かたな, 道具=どうぐ, 息子=むすこ, 妹=いもうと, 王さま=おうさま, 兵=へい, 森=もり, 門=もん, 木=き, 花=はな, 火=ひ, 像=ぞう, 学者=がくしゃ, 受験生=じゅけんせい, 天神=てんじん, 菅原道真=すがわらのみちざね, 九州=きゅうしゅう, 京都=きょうと, 手紙=てがみ, 病気=びょうき, 夢=ゆめ, 意味=いみ, 美しい=うつくしい, 大事=だいじ, 山=やま, 川=かわ, 町=まち, 天満宮=てんまんぐう, 神社=じんじゃ, 有名=ゆうめい, 心配=しんぱい, 兄=あに, 旅=たび. Đã đọc lại toàn bộ.
- Từ vựng: 6 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-mm-mahagiri-1/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (50 câu)
  - ティンデ: `ja-JP-Neural2-C`, tốc độ 0.95, cao độ -2 (3 câu)
  - ミャッフラ: `ja-JP-Neural2-B`, tốc độ 0.95, cao độ 2 (5 câu)
  - 王さま: `ja-JP-Neural2-C`, tốc độ 0.9, cao độ -8 (5 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông BIZ UDPGothic.
