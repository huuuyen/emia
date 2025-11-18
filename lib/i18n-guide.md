# Hướng dẫn sử dụng hệ thống đa ngôn ngữ

## File chứa text dịch

Tất cả các text đa ngôn ngữ được lưu trong file: **`lib/translations.js`**

## Cấu trúc file translations.js

```javascript
export const translations = {
  // Key: { vi: "Tiếng Việt", en: "English" }
  menu: {
    home: {
      vi: "Trang chủ",
      en: "Home"
    }
  }
}
```

## Cách thêm text mới

### Bước 1: Thêm vào file `lib/translations.js`

Thêm key mới vào object `translations`:

```javascript
export const translations = {
  // ... existing translations
  
  // Thêm key mới
  myNewKey: {
    vi: "Văn bản tiếng Việt",
    en: "English text"
  },
  
  // Hoặc nested object
  section: {
    title: {
      vi: "Tiêu đề",
      en: "Title"
    },
    description: {
      vi: "Mô tả",
      en: "Description"
    }
  }
}
```

### Bước 2: Sử dụng trong component

```javascript
"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const MyComponent = () => {
  const { t } = useLanguage();
  
  return (
    <div>
      {/* Sử dụng key đơn giản */}
      <h1>{t("myNewKey")}</h1>
      
      {/* Sử dụng nested key với dấu chấm */}
      <h2>{t("section.title")}</h2>
      <p>{t("section.description")}</p>
    </div>
  );
};
```

## Ví dụ

### Trong Header.js:
```javascript
const { t } = useLanguage();
const menuText = t("menu.home"); // "Trang chủ" hoặc "Home"
```

### Trong Footer.js:
```javascript
const { t } = useLanguage();
const addressLabel = t("footer.address"); // "Địa chỉ:" hoặc "Address:"
```

## Lưu ý

1. **Key format**: Sử dụng dấu chấm (.) để truy cập nested objects
   - `t("menu.home")` ✅
   - `t("menu")` ❌ (sẽ trả về object)

2. **Default value**: Nếu key không tồn tại, hàm `t()` sẽ trả về chính key đó

3. **Language**: Ngôn ngữ được lưu trong localStorage và tự động phát hiện từ browser

## Danh sách các key đã có sẵn

Xem file `lib/translations.js` để xem tất cả các key đã được định nghĩa:
- `menu.*` - Menu items
- `navButton` - Nav button label
- `footer.*` - Footer text
- `banner.*` - Banner text
- `cta.*` - CTA section
- `how.*` - How section
- `courses.*` - Courses section
- `partnership.*` - Partnership section
- `contact.*` - Contact form
- `downloadModal.*` - Download modal

