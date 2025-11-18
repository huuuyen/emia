"use client";

import { useLanguage } from "../../contexts/LanguageContext";
import ImageFallback from "@layouts/components/ImageFallback";

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();

  const handleLanguageChange = (e) => {
    changeLanguage(e.target.value);
  };

  return (
    <div className="language-selector flex items-center">
      <select
        value={language}
        onChange={handleLanguageChange}
        className="language-select h-9 rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-dark focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
        aria-label="Select language"
      >
        <option value="vi">VN <ImageFallback src="/images/vn.png" alt="Vietnam" width={20} height={20} /></option>
        <option value="en">EN <ImageFallback src="/images/en.png" alt="English" width={20} height={20} /></option>
      </select>
    </div>
  );
};

export default LanguageSelector;

