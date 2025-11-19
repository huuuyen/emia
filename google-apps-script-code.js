/**
 * Google Apps Script Code để lưu dữ liệu form vào Google Sheets
 * 
 * Hướng dẫn sử dụng:
 * 1. Mở Google Sheet của bạn
 * 2. Chọn Extensions > Apps Script
 * 3. Xóa code mặc định và dán code này vào
 * 4. Lưu và deploy như Web App
 * 5. Copy Web App URL và thêm vào file .env.local
 */

function doPost(e) {
  try {
    // Lấy sheet hiện tại
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse dữ liệu từ request
    let data;
    try {
      if (e.postData && e.postData.contents) {
        data = JSON.parse(e.postData.contents);
      } else {
        throw new Error('No data received');
      }
    } catch (parseError) {
      Logger.log('Parse error: ' + parseError.toString());
      return ContentService
        .createTextOutput(JSON.stringify({ 
          success: false, 
          error: 'Invalid JSON data: ' + parseError.toString() 
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Thêm dữ liệu vào sheet theo thứ tự:
    // First Name | Last Name | Email | Phone | Message | Subject | Timestamp
    sheet.appendRow([
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.phone || '',
      data.message || '',
      data.subject || '',
      data.timestamp || new Date()
    ]);
    
    // Trả về response thành công với CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true,
        message: 'Data saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Xử lý lỗi
    Logger.log('Error: ' + error.toString());
    Logger.log('Stack: ' + error.stack);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Hàm doGet để test (optional)
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      success: true,
      message: 'Google Apps Script is working!',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Hàm test để kiểm tra script hoạt động
 * Chạy hàm này từ Apps Script editor để test
 */
function testDoPost() {
  const testData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '0123456789',
    message: 'This is a test message',
    subject: 'Test Subject',
    timestamp: new Date().toLocaleString('vi-VN')
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

