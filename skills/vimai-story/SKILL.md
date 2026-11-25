# Skill: vimai-story — Viết truyện phân cấp học tiếng Nhật

## Đầu vào
- Mức (N5–N1), chủ đề, độ dài (số câu, mặc định 8–12 câu cho N5).

## Nguồn nội dung — chiến lược "giếng mở" (chốt 24/11/2026 theo ý Việt)

App Tadoku có hàng trăm sách không phải vì nó tự viết: nó múc từ các nguồn mở rồi đóng gói lại (『夢十夜』của Sōseki, truyện phân cấp miễn phí, podcast). Mình làm y hệt về cách lấy nguồn — và hơn nó ở khâu trình bày (giọng đọc từng câu, furigana rà tay, dịch Việt, nhãn cấp độ thật). Ba giếng, theo thứ tự ưu tiên:

1. **Aozora Bunko (giếng chính)** — văn học hết bản quyền (Sōseki, Akutagawa, Miyazawa Kenji, truyện cổ tích…), tải văn bản gốc về lưu ở `content/sources/aozora/`, biên soạn hạ cấp độ, ghi `source: "aozora-adapted"` và ghi mức thật thà (không gắn N5 cho văn gốc khó). Miền công cộng = được dịch, được thêm audio, được bán.
2. **Truyện cổ tích / dân gian Nhật** （桃太郎, 浦島太郎, かぐや姫…) — truyền thống dân gian hết bản quyền, lấy bản kể từ Aozora, hạ xuống N5–N4.
3. **Truyện tự viết (dòng flagship nhỏ)** — chủ đề đời sống ở Nhật mà nguồn mở không có: đi làm thêm, bệnh viện, tàu điện, thuê nhà, công xưởng, siêu thị, thi JLPT... Đây là điểm hơn Tadoku (truyện của nó chung chung, không gắn với đời sống người nước ngoài ở Nhật).

**HÀNG RÀO PHÁP LÝ — không được phạm**: bộ truyện phân cấp miễn phí của NPO 多言語多読 (tadoku.org) mang giấy phép **CC BY-NC-ND 4.0** — cấm thương mại (NC) và cấm sửa/thêm (ND: cấm thêm bản dịch, cấm làm audio đọc, cấm bán lại). TUYỆT ĐỐI không lấy bộ đó vào app thu tiền, dù app Tadoku có dùng bìa tương tự. Chỉ múc từ miền công cộng (Aozora, dân gian) và tự viết.

## Quy trình
1. **Viết bản Nhật** đúng trần của mức: N5 chỉ dùng mẫu câu cơ bản (です/ます, て, た, ない, から, が), từ vựng trong danh sách N5; mỗi câu ngắn, một ý.
2. **Furigana + romaji** theo cùng quy tắc với skill vimai-video-sub: tách theo từng từ, cách đọc khớp ngữ cảnh.
3. **Dịch 11 ngôn ngữ** trong `translations{}` cùng một lượt; tiếng Việt là chuẩn cao nhất.
4. **Từ vựng**: 5–8 từ chính/câu chuyện kèm mức JLPT.
5. **Giải thích**: mỗi truyện chọn 2–4 câu có điểm ngữ pháp đáng học, viết `grammarNote` ngắn gọn (tiếng Việt trước, các ngôn ngữ khác cùng lượt).
6. **Giọng đọc**: sinh file đọc từng câu bằng TTS tiếng Nhật vào `public/audio/<storyId>/001.mp3`... đánh số theo thứ tự câu; ghi đường dẫn vào `sentences[].audio`.
7. **Ảnh bìa**: viết mô tả bìa vào `cover` (phong cách minh hoạ anime sáng, không chữ trong ảnh) để bước sinh ảnh dùng sau.
8. **Xuất bản**: ghi `content/stories/<id>.json` đúng schema `StoryContent` + tóm tắt QC (mức tự đánh giá, từ vựng vượt mức nếu có).

## Chuẩn cứng
- Không dùng từ vựng/ngữ pháp vượt mức đã gắn nhãn mà không ghi chú.
- Tiếng Nhật tự nhiên như người Nhật viết cho người học — tránh văn dịch máy từng chữ.
