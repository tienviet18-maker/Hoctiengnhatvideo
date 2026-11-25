# MiraiGo: kế hoạch UX v2

Việt duyệt ngày 25/11/2026. Mockup: https://claude.ai/artifact/KEvqFhc8RjdDEtm2btVkQt.
Mỗi màn hình được code thành một PR riêng. Một mục chỉ được đánh dấu xong khi đã có ảnh chụp kiểm tra trên khung iPhone.

## 0. Định vị

App giải trí bằng tiếng Nhật. Slogan: "Xem phim vui, nghe truyện hay. Tiếng Nhật trong tay, giỏi lên mỗi ngày."
Không phải app luyện thi.

## 1. Khung app

- Thanh tab: **Trang chủ · Truyện · Video · Ôn tập · Tôi**. Bỏ tab Tin tức (chưa có nội dung). Lộ trình chuyển vào Trang chủ và Tôi.
- Thanh phát nhỏ nằm trên thanh tab, hiện ở mọi tab khi đang có audio.
- Không làm mục "Cho chuyến đi hôm nay" (Việt bỏ).

## 2. Sáu màn hình (theo mockup)

1. **Trang chủ**: nghe tiếp, ôn N từ đến hạn, truyện mới lên kệ, tiến độ lộ trình.
2. **Truyện**: nút "Nghe liên tục" (tắt màn hình vẫn phát), các kệ có bìa (văn học, trinh thám, truyện ma, rakugo,
   cổ tích Nhật, truyện quê hương, thế giới, series đời sống), lọc theo "Cấp của tôi / Dễ hơn / Khó hơn".
3. **Trang bộ truyện**: bìa, nguồn gốc (ví dụ ベトナムの昔話 · VN), nút Nghe/Đọc, danh sách chương kèm tiến độ,
   ô "Nhật Bản cũng có…".
4. **Đọc và nghe chung một màn**: furigana, bản dịch, romaji, cỡ chữ. Câu đang đọc tô sáng và tự cuộn theo.
   Chạm từ để tra và thêm thẻ ôn. Mỗi câu có Giải thích, Nghe lại, Shadowing. Thanh phát gồm tốc độ, câu trước/sau,
   tải về (VIP).
5. **Thẻ Bài học**: từ vựng của chương, 2–4 mẫu ngữ pháp, 3–5 câu hỏi (dữ liệu `lesson` trong chuẩn v2).
6. **Tôi**: VIP, ngôn ngữ, phần đã tải về, lộ trình, mục ViMai "Sống ở Nhật dễ hơn" (ViCare, ViMai Menkyo,
   ViBJT/ViJPT, mỗi app gắn với truyện liên quan), nút "Đánh giá MiraiGo", dòng bản quyền
   "Một sản phẩm của ViMai · © 2026 ViMai Ecosystem. All rights reserved."

## 3. Nhóm A: bắt buộc trước khi lên App Store

- [ ] A1 Onboarding: chọn ngôn ngữ, chọn sở thích, nghe thử 3 câu để tự xếp cấp, rồi vào ngay một truyện miễn phí
  2 phút. Paywall chỉ hiện sau khi người dùng đã thấy giá trị.
- [ ] A2 Audio nền: mỗi chương một file (chuẩn v2 mục 6b).
  - Media Session có bìa và tên chương. Nút tai nghe chuyển câu.
  - Nhường tiếng khi Maps chỉ đường. Nhớ vị trí đang nghe. Hẹn giờ tắt. Tải sẵn chương sau.
  - Bản iOS bật background audio.
- [ ] A3 Tài khoản và đồng bộ bằng Firebase, có Sign in with Apple (quy định 4.8). Làm sau khi Việt duyệt giai đoạn Firebase.
- [ ] A4 Paywall: ghi rõ phần nào miễn phí. Có Khôi phục giao dịch, Điều khoản, Chính sách. Không dùng thử 7 ngày,
  không giảm giá giả. Tải về nghe offline chỉ dành cho VIP và chỉ lưu trong app.
- [ ] A5 Đánh giá: xem mục 5.
- [ ] A6 Các trạng thái: mất mạng, đang tải (skeleton), lỗi có nút thử lại, danh sách trống có hướng dẫn.
- [ ] A7 Truy cập: chữ co giãn theo cài đặt máy, nhãn VoiceOver, vùng chạm ≥ 44px, tương phản ≥ 4.5:1 ở cả hai chế độ sáng/tối.

## 4. Nhóm B: để vượt Tadoku

- [ ] B8 Hiện "Bạn biết N% từ" trên bìa, tính từ thẻ ôn và từ đã gặp. Gợi ý truyện có độ phủ khoảng 95%.
- [ ] B9 Furigana thông minh: chỉ hiện trên từ khó hơn cấp người dùng (có thể tắt/bật).
- [ ] B10 Sau mỗi chương hỏi "Dễ / Vừa / Khó" để điều chỉnh gợi ý.
- [ ] B11 Thẻ ôn có câu gốc và audio gốc (đoạn `#t=` của chương).
- [ ] B12 Tìm truyện theo từ, kana, romaji.
- [ ] B13 Chia sẻ câu thành ảnh trích dẫn (furigana và bản dịch, kèm link về app).
- [ ] B14 Chuỗi ngày học có ngày được tha, tóm tắt tuần, một thông báo mỗi ngày vào giờ người dùng chọn, nội dung cụ thể.
- [ ] B15 Tab Video dùng cùng bộ điều khiển với màn truyện.
- [ ] B16 Đo hành vi ẩn danh (phễu onboarding → chương đầu → VIP), không gửi dữ liệu cá nhân.

Thứ tự ưu tiên: A cùng với 6 màn hình, rồi đến B8, B9, B11, B13, sau đó các mục còn lại.

## 5. Đánh giá trên App Store

- Chỉ dùng hộp đánh giá gốc `SKStoreReviewController` (quy định 5.6.1 cấm tự làm hộp chấm sao). iOS chỉ hiện tối đa 3 lần
  trong 365 ngày cho mỗi người, đây là giới hạn của hệ điều hành.
- Ba thời điểm hiện hộp: hoàn thành chương đầu tiên; trả lời đúng hết câu hỏi của một chương; đạt chuỗi 7 ngày. Không hiện
  ngay sau paywall, sau lỗi, hoặc khi đang phát audio trên xe.
- Nút "Đánh giá MiraiGo" trong tab Tôi và ở màn hoàn thành bộ truyện, mở `itms-apps://…?action=write-review`. Người dùng
  tự bấm nên không bị giới hạn số lần.
- Không reset điểm đánh giá khi ra phiên bản mới. Trả lời mọi đánh giá.
- Android: dùng Play In-App Review API theo cùng nguyên tắc.
