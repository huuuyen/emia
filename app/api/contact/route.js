import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, message, subject } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ thông tin bắt buộc' },
        { status: 400 }
      );
    }

    // Get Google Sheets Web App URL from environment variable
    const GOOGLE_SHEETS_WEB_APP_URL = process.env.GOOGLE_SHEETS_WEB_APP_URL;

    if (!GOOGLE_SHEETS_WEB_APP_URL) {
      // If no Google Sheets URL, you can use Google Sheets API directly
      // For now, we'll return an error asking to configure the URL
      console.error('GOOGLE_SHEETS_WEB_APP_URL is not configured');
      
      // Alternative: Use Google Sheets API directly if you have credentials
      // For now, we'll just log the data and return success
      console.log('Form submission:', {
        firstName,
        lastName,
        email,
        phone,
        message,
        subject,
        timestamp: new Date().toISOString(),
      });

      return NextResponse.json(
        { 
          success: true, 
          message: 'Form đã được gửi thành công. Vui lòng cấu hình GOOGLE_SHEETS_WEB_APP_URL để lưu vào Google Sheets.' 
        },
        { status: 200 }
      );
    }

    // Prepare data for Google Sheets
    const sheetData = {
      firstName,
      lastName,
      email,
      phone,
      message: message || '',
      subject: subject || '',
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

    // Send data to Google Sheets via Web App
    let response;
    try {
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout
      
      response = await fetch(GOOGLE_SHEETS_WEB_APP_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sheetData),
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
    } catch (fetchError) {
      console.error('Fetch error:', fetchError);
      if (fetchError.name === 'AbortError') {
        throw new Error('Request timeout. Google Sheets Web App không phản hồi trong 30 giây.');
      }
      throw new Error(`Không thể kết nối đến Google Sheets: ${fetchError.message}`);
    }

    // Get response text first
    const responseText = await response.text();
    console.log('Google Sheets response status:', response.status);
    console.log('Google Sheets response text:', responseText);

    // Try to parse as JSON (same logic as test script)
    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      // If not JSON, check if response is OK
      // Google Apps Script sometimes returns plain text or HTML
      if (response.ok) {
        result = { success: true };
      } else {
        throw new Error(`Google Sheets trả về lỗi: ${responseText}`);
      }
    }

    // Check result (same logic as test script)
    if (result.success) {
      // Success - data was saved
      return NextResponse.json(
        { 
          success: true, 
          message: 'Cảm ơn bạn! Thông tin của bạn đã được gửi thành công.' 
        },
        { status: 200 }
      );
    } else {
      // Error from Google Sheets
      throw new Error(result.error || 'Google Sheets trả về lỗi');
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Cảm ơn bạn! Thông tin của bạn đã được gửi thành công.' 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error submitting form:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
    });
    
    // Return more detailed error message
    const errorMessage = error.message || 'Có lỗi xảy ra khi gửi form. Vui lòng thử lại sau.';
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

