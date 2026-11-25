# Chuẩn kỹ thuật (Engineering Standard)

Tài liệu này là "luật" của dự án: mọi đợt làm việc đều theo đây. Mục tiêu: chất lượng
như một công ty phần mềm — kiểm chứng bằng máy, lặp lại được, không dựa vào nhớ tay.

## 1. Cổng chất lượng duy nhất

```bash
npm run verify   # qc nội dung -> typecheck -> lint -> build
```

- Cả 4 lớp phải xanh mới được báo "xong". Lỗi ở bất kỳ lớp nào = chưa xong.
- `qc-content.mjs` kiểm 100% catalog: furigana ghép khớp câu gốc, mọi kanji có cách đọc,
  bản dịch vi/en không rỗng, từ vựng xuất hiện trong câu gắn kèm, audio tồn tại,
  thời gian dòng video đơn điệu/không chồng lấn và không vượt thời lượng video.
- Lịch sử cổng này đã bắt được lỗi thật: thiếu chữ trong câu, furigana rơi kana nhỏ
  (っ, わ), lẫn chữ Hán lạ trong nghĩa tiếng Việt, lệch kanji/kana giữa câu gốc và furigana.

## 2. Hiệu năng

- **Trang danh sách chỉ được nạp metadata.** `src/lib/catalog.generated.ts` do
  `scripts/gen-catalog.mjs` sinh từ chính các file JSON nội dung, theo đúng thứ tự
  đăng ký trong `content.ts`. Sinh tự động qua `prebuild`/`predev` — cấm sửa tay,
  cấm import toàn bộ `content.ts` vào client component của trang danh sách.
- Nội dung đầy đủ của một gói chỉ đi vào trang chi tiết của gói đó (server component).
- Ngân sách: không chunk client nào của trang danh sách vượt 300KB (kiểm tra sau build:
  `find .next/static -name "*.js" -exec du -h {} + | sort -rh | head`).
- Ảnh bìa video dùng thumbnail YouTube; ảnh bìa truyện sinh riêng, nén trước khi đưa vào `public/`.

## 3. Nội dung là dữ liệu có kiểm chứng

- Mỗi gói = 1 file JSON theo `content-schema.ts` + 1 file `.qc.md` ghi: nguồn, độ tin cậy,
  lựa chọn biên tập (điểm giản lược, điểm cố ý bỏ), và những gì đã kiểm.
- Rào chắn pháp lý: chỉ dùng (a) tác phẩm hết bản quyền tại Nhật (Aozora Bunko),
  (b) truyện dân gian/truyền miệng, (c) truyện tự sáng tác, (d) video từ kênh whitelist
  có phụ đề do kênh cung cấp (theo `skills/vimai-video-sub`). Tuyệt đối không dùng
  sách của NPO 多言語多読 (CC BY-NC-ND — cấm thương mại, cấm dịch, cấm audio).
- Tác giả qua đời chưa đủ 70 năm = chưa hết bản quyền tại Nhật: không biên soạn.
- Mọi khẳng định thực tế có thể thay đổi theo địa phương/thời gian (phí, quy định, lịch)
  phải được "hạ mềm" trong ghi chú của câu (ví dụ: "ở nhiều nơi", "thường là") hoặc bỏ hẳn.
- **Chống ghi đè (bắt buộc, thêm 25/11/2026 sau hai sự cố rashomon và ant-and-the-grasshopper):**
  script ghi truyện/video phải tự kiểm tra `test -f` cho từng ID ngay trong cùng lệnh ghi và
  TỰ HỦY nếu file đã tồn tại — không dựa vào bước kiểm tra riêng ở lệnh trước (kết quả kiểm tra
  in ra nhưng lệnh ghi vẫn chạy là đúng cơ chế gây ra cả hai sự cố). Nếu lỡ ghi đè: khôi phục từ
  payload trang đã build (`.next/server/app/read/<id>.html`), đối chiếu chéo với `.qc.md` và số
  file audio còn trên đĩa trước khi tiếp tục.

## 4. Kỷ luật thay đổi

- Một đợt nội dung = JSON + `.qc.md` + đăng ký + audio (với truyện) + `npm run verify` xanh.
- Sửa code phải giữ nguyên hành vi ngoài phạm vi yêu cầu; refactor hiệu năng phải
  đo trước/sau (kích thước chunk, số gói, kết quả QC) và ghi vào báo cáo đợt.
- File sinh tự động không sửa tay; muốn đổi thì sửa script sinh rồi chạy lại.

## 5. Triển khai (G6)

- Cloudflare Pages qua git integration hoặc adapter OpenNext — quyết ở phiên triển khai.
- Giới hạn Pages: 20.000 file/triển khai, 25MB/file. Hiện ~4.800 file (audio ~2.300).
  **Ngưỡng hành động: audio đạt 10.000 file -> chuyển sang R2** (bucket công khai,
  đổi tiền tố `/audio/` thành miền R2 trong dữ liệu + một lần di trú có kiểm chứng).
- Sau triển khai: mở bản xem trước và tự kiểm theo checklist trang thật (tiêu đề/OG/canonical
  từng trang, mọi ảnh/link/audio mở được) trước khi báo người dùng — không chuyển nguyên
  báo cáo của máy thành lời hứa.

## 6. Bảo mật & dữ liệu người dùng (MVP)

- MVP không có tài khoản máy chủ: hồ sơ, tiến độ, SRS lưu ở localStorage của thiết bị.
- Không thu thập dữ liệu cá nhân; không nhúng tracker của bên thứ ba ngoài YouTube embed.
- Thanh toán VIP chưa nối ở MVP (nút nâng cấp tắt); khi nối phải qua cổng thanh toán
  chính thức, không tự lưu thông tin thẻ.
