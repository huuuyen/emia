# Hướng dẫn cấu hình Countdown

## Các trường trong config.json

```json
{
  "countdown": {
    "enabled": true,              // Bật/tắt countdown (true = bật, false = tắt)
    "launch_date": "2025-11-21T12:00:10",  // Ngày ra mắt
    "force_expired": false,       // Force countdown đã hết (override tất cả)
    "use_config_cache": false,    // Sử dụng config cache thay vì localStorage
    "title": "...",
    "subtitle": "...",
    "description": "..."
  }
}
```

## So sánh giữa localStorage và Config Cache

### 1. **localStorage (mặc định - `use_config_cache: false`)**

**Ưu điểm:**
- ✅ Tự động lưu khi countdown hết
- ✅ Không cần chỉnh sửa file config
- ✅ Hoạt động tốt cho production
- ✅ Mỗi user có cache riêng

**Nhược điểm:**
- ❌ Phải xóa localStorage để reset (hoặc đổi launch_date)
- ❌ Không thể control từ server

**Cách sử dụng:**
```json
{
  "countdown": {
    "enabled": true,
    "use_config_cache": false,  // Dùng localStorage
    "launch_date": "2025-11-21T12:00:10"
  }
}
```

**Cách reset:**
- Xóa localStorage trong browser DevTools
- Hoặc đổi `launch_date` trong config

---

### 2. **Config Cache (`use_config_cache: true`)**

**Ưu điểm:**
- ✅ Control được từ file config
- ✅ Có thể force update bằng cách sửa config
- ✅ Dễ reset (chỉ cần sửa config)

**Nhược điểm:**
- ❌ Phải sửa file config thủ công khi countdown hết
- ❌ Cần rebuild/redeploy để áp dụng
- ❌ Không tự động lưu

**Cách sử dụng:**
```json
{
  "countdown": {
    "enabled": true,
    "use_config_cache": true,  // Dùng config cache
    "launch_date": "2025-11-21T12:00:10"
  }
}
```

**Cách reset:**
- Sửa `launch_date` thành ngày trong tương lai
- Hoặc set `force_expired: false`

---

## Các tùy chọn nâng cao

### Force Expired (`force_expired: true`)

Bỏ qua tất cả logic, luôn hiển thị landing page:

```json
{
  "countdown": {
    "force_expired": true  // Luôn hiển thị landing page
  }
}
```

**Ưu điểm:**
- ✅ Override tất cả (localStorage, date check, etc.)
- ✅ Nhanh nhất để disable countdown

---

### Disable Countdown (`enabled: false`)

Tắt hoàn toàn countdown:

```json
{
  "countdown": {
    "enabled": false  // Tắt countdown, luôn hiển thị landing page
  }
}
```

---

## Thứ tự ưu tiên kiểm tra

1. **`force_expired: true`** → Luôn expired (cao nhất)
2. **`enabled: false`** → Luôn expired
3. **Cache check:**
   - Nếu `use_config_cache: false` → Check localStorage
   - Nếu `use_config_cache: true` → Bỏ qua localStorage
4. **Date check** → So sánh với `launch_date`

---

## Kịch bản sử dụng

### Kịch bản 1: Production (khuyến nghị)
```json
{
  "countdown": {
    "enabled": true,
    "use_config_cache": false,  // Dùng localStorage
    "launch_date": "2025-11-21T12:00:10"
  }
}
```
→ Tự động lưu khi hết, không cần can thiệp

### Kịch bản 2: Development/Testing
```json
{
  "countdown": {
    "enabled": true,
    "use_config_cache": true,  // Dùng config cache
    "launch_date": "2025-11-21T12:00:10"
  }
}
```
→ Dễ reset bằng cách sửa config

### Kịch bản 3: Tắt countdown tạm thời
```json
{
  "countdown": {
    "force_expired": true  // Override tất cả
  }
}
```
→ Nhanh nhất để disable

### Kịch bản 4: Tắt vĩnh viễn
```json
{
  "countdown": {
    "enabled": false  // Tắt countdown
  }
}
```

---

## Lưu ý

- Khi đổi `launch_date`, localStorage cũ sẽ không còn hiệu lực (vì key thay đổi)
- `force_expired` có độ ưu tiên cao nhất, sẽ override mọi thứ
- `use_config_cache: true` chỉ hữu ích khi bạn muốn control từ config file

