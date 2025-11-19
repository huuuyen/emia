/**
 * Script test để kiểm tra kết nối Google Sheets Web App
 * 
 * Cách sử dụng:
 * 1. Đảm bảo file .env.local có GOOGLE_SHEETS_WEB_APP_URL
 * 2. Chạy: node test-google-sheets.js
 * 
 * Hoặc chạy với biến môi trường:
 * GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/.../exec node test-google-sheets.js
 */

const fs = require('fs');
const path = require('path');

// Function to read .env.local file
function loadEnvFile() {
  const envPath = path.join(__dirname, '.env.local');
  
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n');
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      // Skip comments and empty lines
      if (trimmedLine && !trimmedLine.startsWith('#')) {
        const [key, ...valueParts] = trimmedLine.split('=');
        if (key && valueParts.length > 0) {
          const value = valueParts.join('=').trim();
          // Remove quotes if present
          const cleanValue = value.replace(/^["']|["']$/g, '');
          process.env[key.trim()] = cleanValue;
        }
      }
    }
  }
}

// Load .env.local file
loadEnvFile();

const GOOGLE_SHEETS_WEB_APP_URL = process.env.GOOGLE_SHEETS_WEB_APP_URL || 'YOUR_WEB_APP_URL_HERE';

async function testGoogleSheets() {
  console.log('Testing Google Sheets Web App connection...\n');
  console.log('URL:', GOOGLE_SHEETS_WEB_APP_URL);
  console.log('');

  // Test data
  const testData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '0123456789',
    message: 'This is a test message from script',
    subject: 'Test Subject',
    timestamp: new Date().toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }),
  };

  try {
    console.log('Sending test data...');
    console.log('Data:', JSON.stringify(testData, null, 2));
    console.log('');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    console.log('Response Status:', response.status);
    console.log('Response OK:', response.ok);
    console.log('');

    const responseText = await response.text();
    console.log('Response Text:', responseText);
    console.log('');

    let result;
    try {
      result = JSON.parse(responseText);
      console.log('Parsed Response:', JSON.stringify(result, null, 2));
    } catch (parseError) {
      console.log('Response is not JSON, raw text:', responseText);
      result = { success: response.ok };
    }

    if (result.success) {
      console.log('\n✅ SUCCESS! Google Sheets Web App is working correctly.');
      console.log('Check your Google Sheet to see if the test data was added.');
    } else {
      console.log('\n❌ ERROR: Google Sheets returned an error.');
      console.log('Error:', result.error || 'Unknown error');
    }

  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    if (error.name === 'AbortError') {
      console.error('Request timed out after 30 seconds.');
    }
    console.error('\nTroubleshooting:');
    console.error('1. Check if GOOGLE_SHEETS_WEB_APP_URL is set correctly');
    console.error('2. Make sure Google Apps Script is deployed as Web App');
    console.error('3. Check Web App permissions (should be "Anyone")');
    console.error('4. Verify the URL ends with /exec (not /dev)');
  }
}

// Run test
if (GOOGLE_SHEETS_WEB_APP_URL === 'YOUR_WEB_APP_URL_HERE' || !GOOGLE_SHEETS_WEB_APP_URL) {
  console.error('❌ GOOGLE_SHEETS_WEB_APP_URL chưa được cấu hình.\n');
  console.error('Cách 1: Tạo file .env.local trong thư mục gốc với nội dung:');
  console.error('GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec\n');
  console.error('Cách 2: Chạy với biến môi trường:');
  console.error('GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/.../exec node test-google-sheets.js\n');
  console.error('Lưu ý: URL phải kết thúc bằng /exec (không phải /dev)');
  process.exit(1);
}

testGoogleSheets();

