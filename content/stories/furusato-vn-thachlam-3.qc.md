# QC — furusato-vn-thachlam-3

- Nguồn: Dưới bóng hoàng lan (tập Gió lạnh đầu mùa, 1937) của Thạch Lam (1910–1942); public domain. Claude tự kể lại bằng tiếng Nhật (N1) từ nguyên tác, giữ tinh thần và các chi tiết chính: Thanh làm việc ở tỉnh về thăm bà, ngôi nhà mát và hương hoàng lan, Nga cô hàng xóm chăm sóc bà, giấc ngủ trưa trong hương hoa, buổi tối dưới cây hoàng lan, Nga hái hoa cho Thanh, Thanh ra đi và ấp ủ một nơi để trở về. Lời thoại và một số chi tiết (cái tàu, gói quà của bà) do Claude thêm để kể liền mạch.
- Chuẩn v2, cấp N1: 2078 ký tự, 61 câu, câu TB 34.1 ký tự, harder 0.0%, atLevel 5.4%.
- Furigana + romaji sinh bằng kuromoji qua `scripts/story-src/build.mjs`, cách đọc sửa tay: 一人=ひとり, 二人=ふたり, お米=おこめ, 大喜び=おおよろこび, 一匹=いっぴき, 仏様=ほとけさま, 継母=ままはは, 一日中=いちにちじゅう, つぼ=つぼ, お姉さん=おねえさん, 水の上=みず の うえ, でいっぱい=で いっぱい, 家中=いえじゅう, 国中=くにじゅう, 今日中=きょうじゅう, 一粒=ひとつぶ, 一足=いっそく, 片方=かたほう, 家来=けらい, 都=みやこ, お妃=おきさき, 小魚=こざかな, 一つかみ=ひとつかみ, 白いひげ=しろい ひげ, 日本=にほん, 一回り=ひとまわり, ひと回り=ひとまわり, 手桶=ておけ, 井戸=いど, 寝台=しんだい, 昼寝=ひるね, 枕元=まくらもと, 木陰=こかげ, 横顔=よこがお, 竹やぶ=たけやぶ, 背伸び=せのび, 霧=きり, 包み=つつみ, 強がり=つよがり, 真昼=まひる, 明日=あした, 一瞬=いっしゅん, 取るに足りない=とる に たりない, 手のひら=てのひら, 根元=ねもと, 見慣れた=みなれた, 木の下=き の した, 葉の間=は の あいだ, 角を=かど を, ガーはね=ガー わ ね, タンさん=タン さん, 枝いっぱい=えだ いっぱい, 包みこんだ=つつみこんだ, じんわりと=じんわり と, もう少し=もう すこし. Đã đọc lại toàn bộ.
- Từ vựng: 14 từ, cấp lấy từ `data/jlpt` (chỉ từ đúng cấp hoặc khó hơn, không lặp trong tập). Nghĩa 11 ngôn ngữ ở `content/sources/furusato/glossary.json`.
- Dịch + giải thích: 10 ngôn ngữ dịch thẳng từ tiếng Nhật; zh-Hant chuyển từ zh-Hans bằng OpenCC (s2twp). Claude tự kiểm theo quy tắc của Việt: dịch ngược kiểm nghĩa, thuật ngữ nhất quán trong bộ.
- Audio: Google Cloud TTS, ghép thành một file liền public/audio/furusato-vn-thachlam-3/chapter.mp3 (mono 64 kbps, nghỉ 0,6 giây giữa câu, 0,9 giây khi đổi người nói), mốc từng câu đo theo mẫu PCM (`scripts/story-src/tts.mjs`). Giọng:
  - Người kể: `ja-JP-Chirp3-HD-Aoede`, tốc độ 0.9 (50 câu)
  - タン: `ja-JP-Neural2-C`, tốc độ 0.98 (2 câu)
  - ガー: `ja-JP-Neural2-B`, tốc độ 0.98, cao độ 2 (5 câu)
  - 祖母: `ja-JP-Neural2-B`, tốc độ 0.85, cao độ -5 (4 câu)
- Bìa: hệ bìa MiraiGo 文庫, phông Kaisei Decol.
