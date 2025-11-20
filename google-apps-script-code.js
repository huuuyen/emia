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
    
    // Lấy spreadsheet
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet;
    
    // Log dữ liệu nhận được để debug
    Logger.log('=== RECEIVED DATA ===');
    Logger.log('Full data: ' + JSON.stringify(data));
    Logger.log('sheetName từ API: ' + (data.sheetName || 'NOT PROVIDED'));
    Logger.log('brochureType: ' + (data.brochureType || 'NOT PROVIDED'));
    Logger.log('email: ' + (data.email || 'NOT PROVIDED'));
    Logger.log('firstName: ' + (data.firstName || 'NOT PROVIDED'));
    Logger.log('lastName: ' + (data.lastName || 'NOT PROVIDED'));
    
    // QUAN TRỌNG: Ưu tiên sheetName từ API trước, không phát hiện tự động
    // Normalize sheetName (trim whitespace và capitalize first letter)
    let requestedSheetName = data.sheetName ? String(data.sheetName).trim() : null;
    
    // Nếu có sheetName từ API, chuẩn hóa (viết hoa chữ cái đầu)
    if (requestedSheetName) {
      requestedSheetName = requestedSheetName.charAt(0).toUpperCase() + requestedSheetName.slice(1).toLowerCase();
      Logger.log('>>> SheetName từ API (sau normalize): ' + requestedSheetName);
    } else {
      Logger.log('>>> KHÔNG có sheetName từ API, sẽ phát hiện tự động');
    }
    
    // Xác định loại form: CHỈ dùng để fallback nếu KHÔNG có sheetName từ API
    const isDownloadForm = (data.brochureType && data.email && !data.firstName);
    const isContactForm = (data.firstName && data.lastName && data.email);
    
    Logger.log('isDownloadForm: ' + isDownloadForm);
    Logger.log('isContactForm: ' + isContactForm);
    
    // CHỈ phát hiện tự động nếu KHÔNG có sheetName từ API
    if (!requestedSheetName) {
      if (isDownloadForm) {
        requestedSheetName = 'Brochure';
        Logger.log('>>> Phát hiện download form, tự động set sheetName = Brochure');
      } else if (isContactForm) {
        requestedSheetName = 'Contact';
        Logger.log('>>> Phát hiện contact form, tự động set sheetName = Contact');
      }
    }
    
    Logger.log('>>> FINAL requestedSheetName: ' + requestedSheetName);
    
    // Kiểm tra nếu có chỉ định sheet name (ví dụ: Sheet2 cho download form)
    if (requestedSheetName) {
      // Đảm bảo luôn sử dụng sheet được chỉ định, không fallback về activeSheet
      sheet = spreadsheet.getSheetByName(requestedSheetName);
      
      // Nếu sheet không tồn tại, tạo mới
      if (!sheet) {
        Logger.log('Sheet "' + requestedSheetName + '" không tồn tại, đang tạo mới...');
        try {
          sheet = spreadsheet.insertSheet(requestedSheetName);
          Logger.log('Đã tạo sheet: ' + requestedSheetName);
        } catch (insertError) {
          Logger.log('Lỗi khi tạo sheet: ' + insertError.toString());
          throw new Error('Không thể tạo sheet "' + requestedSheetName + '": ' + insertError.toString());
        }
        
        // Thêm headers dựa trên loại sheet
        if (requestedSheetName === 'Brochure') {
          sheet.appendRow(['Brochure Type', 'Email', 'Timestamp']);
          Logger.log('Đã thêm headers cho sheet Brochure');
        } else if (requestedSheetName === 'Contact') {
          sheet.appendRow(['First Name', 'Last Name', 'Email', 'Phone', 'Message', 'Subject', 'Timestamp']);
          Logger.log('Đã thêm headers cho sheet Contact');
        }
      } else {
        Logger.log('Sheet "' + requestedSheetName + '" đã tồn tại');
        
        // Kiểm tra và thêm headers nếu sheet trống
        if (sheet.getLastRow() === 0) {
          if (requestedSheetName === 'Brochure') {
            sheet.appendRow(['Brochure Type', 'Email', 'Timestamp']);
            Logger.log('Sheet Brochure trống, đã thêm headers');
          } else if (requestedSheetName === 'Contact') {
            sheet.appendRow(['First Name', 'Last Name', 'Email', 'Phone', 'Message', 'Subject', 'Timestamp']);
            Logger.log('Sheet Contact trống, đã thêm headers');
          }
        }
      }
      
      // Xác nhận sheet đang sử dụng
      Logger.log('Đang sử dụng sheet: ' + sheet.getName());
      
    } else {
      // Lấy sheet hiện tại (cho contact form) - chỉ khi không có sheetName
      sheet = spreadsheet.getActiveSheet();
      Logger.log('Không có sheetName, sử dụng activeSheet: ' + sheet.getName());
    }
    
    // Kiểm tra loại form và thêm dữ liệu tương ứng dựa trên sheetName
    // QUAN TRỌNG: Ưu tiên sheetName được chỉ định từ API
    Logger.log('=== BẮT ĐẦU THÊM DỮ LIỆU ===');
    Logger.log('requestedSheetName: ' + requestedSheetName);
    Logger.log('Sheet hiện tại: ' + (sheet ? sheet.getName() : 'null'));
    
    if (requestedSheetName === 'Brochure') {
      Logger.log('>>> VÀO NHÁNH BROCHURE <<<');
      // Brochure/Download form - thêm vào sheet Brochure
      // Đảm bảo đang sử dụng đúng sheet Brochure
      const targetSheetName = requestedSheetName || 'Brochure';
      if (!sheet || sheet.getName() !== targetSheetName) {
        Logger.log('CẢNH BÁO: Sheet hiện tại không phải ' + targetSheetName + '! Sheet name: ' + (sheet ? sheet.getName() : 'null'));
        // Lấy lại sheet Brochure
        sheet = spreadsheet.getSheetByName(targetSheetName);
        if (!sheet) {
          Logger.log('Sheet ' + targetSheetName + ' không tồn tại, đang tạo mới...');
          sheet = spreadsheet.insertSheet(targetSheetName);
          sheet.appendRow(['Brochure Type', 'Email', 'Timestamp']);
          Logger.log('Đã tạo sheet ' + targetSheetName + ' và thêm headers');
        }
        Logger.log('Đã chuyển sang sheet ' + targetSheetName + ': ' + sheet.getName());
      }
      
      // Brochure Type | Email | Timestamp
      Logger.log('Đang thêm dữ liệu vào sheet Brochure: ' + JSON.stringify({
        brochureType: data.brochureType,
        email: data.email,
        timestamp: data.timestamp
      }));
      
      sheet.appendRow([
        data.brochureType || '',
        data.email || '',
        data.timestamp || new Date()
      ]);
      
      Logger.log('Đã thêm dữ liệu vào sheet Brochure thành công. Sheet name: ' + sheet.getName() + ', Số dòng hiện tại: ' + sheet.getLastRow());
      
    } else if (requestedSheetName === 'Contact') {
      Logger.log('>>> VÀO NHÁNH CONTACT <<<');
      // Contact form - thêm vào sheet Contact
      // Đảm bảo đang sử dụng đúng sheet Contact
      const targetSheetName = requestedSheetName || 'Contact';
      if (!sheet || sheet.getName() !== targetSheetName) {
        Logger.log('CẢNH BÁO: Sheet hiện tại không phải ' + targetSheetName + '! Sheet name: ' + (sheet ? sheet.getName() : 'null'));
        // Lấy lại sheet Contact
        sheet = spreadsheet.getSheetByName(targetSheetName);
        if (!sheet) {
          Logger.log('Sheet ' + targetSheetName + ' không tồn tại, đang tạo mới...');
          sheet = spreadsheet.insertSheet(targetSheetName);
          sheet.appendRow(['First Name', 'Last Name', 'Email', 'Phone', 'Message', 'Subject', 'Timestamp']);
          Logger.log('Đã tạo sheet ' + targetSheetName + ' và thêm headers');
        }
        Logger.log('Đã chuyển sang sheet ' + targetSheetName + ': ' + sheet.getName());
      }
      
      // First Name | Last Name | Email | Phone | Message | Subject | Timestamp
      Logger.log('Đang thêm dữ liệu vào sheet Contact: ' + JSON.stringify({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        message: data.message,
        subject: data.subject,
        timestamp: data.timestamp
      }));
      
      sheet.appendRow([
        data.firstName || '',
        data.lastName || '',
        data.email || '',
        data.phone || '',
        data.message || '',
        data.subject || '',
        data.timestamp || new Date()
      ]);
      
      Logger.log('Đã thêm dữ liệu vào sheet Contact thành công. Sheet name: ' + sheet.getName() + ', Số dòng hiện tại: ' + sheet.getLastRow());
      
    } else {
      Logger.log('>>> VÀO NHÁNH FALLBACK (không phải Brochure hoặc Contact) <<<');
      Logger.log('requestedSheetName: ' + requestedSheetName);
      // Fallback: Nếu không xác định được, thử phát hiện loại form
      if (data.brochureType && data.email && !data.firstName) {
        Logger.log('PHÁT HIỆN: Download form trong phần else, chuyển sang sheet Brochure');
        sheet = spreadsheet.getSheetByName('Brochure');
        if (!sheet) {
          Logger.log('Sheet Brochure không tồn tại, đang tạo mới...');
          sheet = spreadsheet.insertSheet('Brochure');
          sheet.appendRow(['Brochure Type', 'Email', 'Timestamp']);
          Logger.log('Đã tạo sheet Brochure và thêm headers');
        }
        
        sheet.appendRow([
          data.brochureType || '',
          data.email || '',
          data.timestamp || new Date()
        ]);
        
        Logger.log('Đã thêm dữ liệu download form vào sheet Brochure. Sheet name: ' + sheet.getName());
      } else if (data.firstName && data.lastName && data.email) {
        Logger.log('PHÁT HIỆN: Contact form trong phần else, chuyển sang sheet Contact');
        sheet = spreadsheet.getSheetByName('Contact');
        if (!sheet) {
          Logger.log('Sheet Contact không tồn tại, đang tạo mới...');
          sheet = spreadsheet.insertSheet('Contact');
          sheet.appendRow(['First Name', 'Last Name', 'Email', 'Phone', 'Message', 'Subject', 'Timestamp']);
          Logger.log('Đã tạo sheet Contact và thêm headers');
        }
        
        sheet.appendRow([
          data.firstName || '',
          data.lastName || '',
          data.email || '',
          data.phone || '',
          data.message || '',
          data.subject || '',
          data.timestamp || new Date()
        ]);
        
        Logger.log('Đã thêm dữ liệu contact form vào sheet Contact. Sheet name: ' + sheet.getName());
      } else {
        // Fallback cuối cùng: thêm vào activeSheet
        Logger.log('Không xác định được loại form, thêm vào activeSheet: ' + sheet.getName());
        sheet.appendRow([
          data.firstName || '',
          data.lastName || '',
          data.email || '',
          data.phone || '',
          data.message || '',
          data.subject || '',
          data.brochureType || '',
          data.timestamp || new Date()
        ]);
      }
    }
    
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

/**
 * Hàm test để kiểm tra tạo sheet Brochure và thêm dữ liệu download form
 * Chạy hàm này từ Apps Script editor để test sheet Brochure
 */
function testBrochureCreation() {
  const testDownloadData = {
    brochureType: 'individual, organization',
    email: 'test@example.com',
    sheetName: 'Brochure',
    timestamp: new Date().toLocaleString('vi-VN', { 
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testDownloadData)
    }
  };
  
  Logger.log('Testing Brochure sheet creation with data: ' + JSON.stringify(testDownloadData));
  const result = doPost(mockEvent);
  Logger.log('Result: ' + result.getContent());
  
  // Kiểm tra sheet Brochure đã được tạo chưa
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const brochureSheet = spreadsheet.getSheetByName('Brochure');
  if (brochureSheet) {
    Logger.log('Sheet Brochure tồn tại. Số dòng: ' + brochureSheet.getLastRow());
    Logger.log('Dữ liệu trong sheet Brochure:');
    const dataRange = brochureSheet.getDataRange();
    const values = dataRange.getValues();
    for (let i = 0; i < values.length; i++) {
      Logger.log('Dòng ' + (i + 1) + ': ' + values[i].join(' | '));
    }
  } else {
    Logger.log('LỖI: Sheet Brochure không tồn tại sau khi test!');
  }
}

/**
 * Hàm test để kiểm tra tạo sheet Contact và thêm dữ liệu contact form
 * Chạy hàm này từ Apps Script editor để test sheet Contact
 */
function testContactCreation() {
  const testContactData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '0123456789',
    message: 'This is a test message',
    subject: 'Test Subject',
    sheetName: 'Contact',
    timestamp: new Date().toLocaleString('vi-VN', { 
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testContactData)
    }
  };
  
  Logger.log('Testing Contact sheet creation with data: ' + JSON.stringify(testContactData));
  const result = doPost(mockEvent);
  Logger.log('Result: ' + result.getContent());
  
  // Kiểm tra sheet Contact đã được tạo chưa
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const contactSheet = spreadsheet.getSheetByName('Contact');
  if (contactSheet) {
    Logger.log('Sheet Contact tồn tại. Số dòng: ' + contactSheet.getLastRow());
    Logger.log('Dữ liệu trong sheet Contact:');
    const dataRange = contactSheet.getDataRange();
    const values = dataRange.getValues();
    for (let i = 0; i < values.length; i++) {
      Logger.log('Dòng ' + (i + 1) + ': ' + values[i].join(' | '));
    }
  } else {
    Logger.log('LỖI: Sheet Contact không tồn tại sau khi test!');
  }
}

