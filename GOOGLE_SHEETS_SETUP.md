# Hướng dẫn thiết lập Google Sheets để lưu form Contact

Có 2 cách để lưu dữ liệu form vào Google Sheets:

## Cách 1: Sử dụng Google Apps Script Web App (Đơn giản - Khuyến nghị)

### Bước 1: Tạo Google Sheet mới
1. Truy cập [Google Sheets](https://sheets.google.com)
2. Tạo một Google Sheet mới
3. Đặt tên sheet (ví dụ: "Contact Form Submissions")
4. Tạo header row với các cột:
   - A1: First Name
   - B1: Last Name
   - C1: Email
   - D1: Phone
   - E1: Message
   - F1: Subject
   - G1: Timestamp

### Bước 2: Tạo Google Apps Script
1. Trong Google Sheet, chọn **Extensions** > **Apps Script**
2. Xóa code mặc định và dán code sau:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Thêm dữ liệu vào sheet
    sheet.appendRow([
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.phone || '',
      data.message || '',
      data.subject || '',
      data.timestamp || new Date()
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Lưu script (Ctrl+S hoặc Cmd+S)
4. Đặt tên cho script (ví dụ: "Contact Form Handler")

### Bước 3: Deploy Web App
1. Click vào **Deploy** > **New deployment**
2. Click vào biểu tượng bánh răng ⚙️ bên cạnh "Select type" và chọn **Web app**
3. Điền thông tin:
   - **Description**: Contact Form Handler
   - **Execute as**: Me
   - **Who has access**: Anyone (hoặc Anyone with Google account nếu muốn bảo mật hơn)
4. Click **Deploy**
5. Copy **Web app URL** (sẽ có dạng: `https://script.google.com/macros/s/.../exec`)

### Bước 4: Cấu hình trong Next.js
1. Tạo file `.env.local` trong thư mục gốc của project (nếu chưa có)
2. Thêm dòng sau:
```
GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```
3. Thay `YOUR_SCRIPT_ID` bằng URL bạn đã copy ở bước 3

### Bước 5: Test
1. Khởi động lại Next.js server
2. Điền form và submit
3. Kiểm tra Google Sheet để xem dữ liệu đã được lưu chưa

---

## Cách 2: Sử dụng Google Sheets API trực tiếp (Nâng cao)

Nếu bạn muốn sử dụng Google Sheets API trực tiếp, bạn cần:

1. Tạo Service Account trong Google Cloud Console
2. Tạo credentials (JSON file)
3. Chia sẻ Google Sheet với email của Service Account
4. Cài đặt `googleapis` package:
```bash
npm install googleapis
```

Sau đó cập nhật file `app/api/contact/route.js` để sử dụng Google Sheets API.

---

## Lưu ý

- **Bảo mật**: Nếu sử dụng Google Apps Script Web App với "Anyone" access, URL sẽ công khai. Hãy cân nhắc sử dụng "Anyone with Google account" hoặc thêm authentication.
- **Rate Limiting**: Google Apps Script có giới hạn về số lượng requests. Nếu có nhiều submissions, hãy cân nhắc sử dụng Google Sheets API.
- **Error Handling**: Code đã được thiết kế để xử lý lỗi. Nếu có vấn đề, kiểm tra console logs.

---

## Troubleshooting

### Lỗi "Failed to save to Google Sheets"

Nếu bạn gặp lỗi này, hãy làm theo các bước sau:

#### 1. Kiểm tra biến môi trường
- Đảm bảo file `.env.local` tồn tại trong thư mục gốc của project
- Kiểm tra `GOOGLE_SHEETS_WEB_APP_URL` đã được set đúng chưa
- URL phải có dạng: `https://script.google.com/macros/s/.../exec` (không phải `/dev`)
- **Quan trọng**: Khởi động lại Next.js server sau khi thêm/sửa biến môi trường

#### 2. Kiểm tra Google Apps Script Web App
- Mở Google Apps Script editor
- Kiểm tra code đã được lưu chưa
- **Deploy lại Web App**:
  1. Click **Deploy** > **Manage deployments**
  2. Click biểu tượng bút chì ✏️ để edit
  3. Click **Deploy** để deploy lại
  4. Copy URL mới (nếu có)

#### 3. Kiểm tra Permissions
- Web App phải được deploy với quyền **"Anyone"** hoặc **"Anyone with Google account"**
- Nếu chọn "Only myself", sẽ không hoạt động từ external requests

#### 4. Test Google Apps Script trực tiếp
Mở URL Web App trong browser (GET request):
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```
Nếu thấy JSON response `{"success":true,"message":"Google Apps Script is working!"}` thì script hoạt động.

#### 5. Kiểm tra Console Logs
- **Browser Console**: Mở DevTools (F12) > Console tab khi submit form
- **Server Console**: Xem terminal nơi chạy Next.js server
- Tìm các log messages:
  - `Google Sheets response status: ...`
  - `Google Sheets response text: ...`
  - `Error submitting form: ...`

#### 6. Kiểm tra Google Sheet
- Đảm bảo Google Sheet không bị khóa hoặc restricted
- Kiểm tra header row có đúng format không:
  - A1: First Name
  - B1: Last Name
  - C1: Email
  - D1: Phone
  - E1: Message
  - F1: Subject
  - G1: Timestamp

#### 7. Common Issues

**Issue**: "Request timeout"
- **Giải pháp**: Google Apps Script có thể bị slow. Thử deploy lại hoặc kiểm tra internet connection

**Issue**: "HTTP 401" hoặc "HTTP 403"
- **Giải pháp**: Deploy lại Web App với quyền "Anyone"

**Issue**: "Invalid JSON data"
- **Giải pháp**: Kiểm tra code Google Apps Script có đúng không, đảm bảo đã copy code mới nhất từ `google-apps-script-code.js`

**Issue**: URL có `/dev` thay vì `/exec`
- **Giải pháp**: URL phải kết thúc bằng `/exec`, không phải `/dev`

### Form không lưu được dữ liệu
1. Kiểm tra biến môi trường `GOOGLE_SHEETS_WEB_APP_URL` đã được set chưa
2. Kiểm tra Google Apps Script đã được deploy chưa
3. Kiểm tra permissions của Google Sheet
4. Kiểm tra console logs trong browser và server

### Lỗi CORS
- Đảm bảo Google Apps Script Web App được deploy với quyền "Anyone" hoặc "Anyone with Google account"
- Google Apps Script tự động xử lý CORS, không cần cấu hình thêm

### Dữ liệu không hiển thị trong Sheet
- Kiểm tra format của header row trong Google Sheet
- Kiểm tra code trong Google Apps Script có đúng không
- Kiểm tra Google Sheet có bị locked không
- Xem Execution log trong Google Apps Script editor để tìm lỗi

