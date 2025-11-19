"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "../../contexts/LanguageContext";
import ImageFallback from "@layouts/components/ImageFallback";

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const flags = {
    vi: { label: "VN", name: "Việt Nam", src: "/images/vn.png", alt: "Vietnam" },
    en: { label: "EN", name: "English", src: "/images/en.png", alt: "English" },
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleLanguageChange = (value) => {
    changeLanguage(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        id="language-select"
        name="language"
        onClick={toggleDropdown}
        className="flex h-9 items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-dark shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
       
        <span className="whitespace-nowrap">
          {flags[language]?.label}
        </span>
        <ImageFallback
          src={flags[language]?.src}
          alt={flags[language]?.alt}
          width={20}
          height={20}
          className=" object-cover"
        />
      </button>

      {isOpen && (
        <ul
          className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-lg border border-gray-200 bg-white py-1 shadow-lg focus:outline-none"
          role="listbox"
          aria-labelledby="language-select"
        >
          {Object.entries(flags).map(([value, { label, name, src, alt }]) => (
            <li key={value}>
              <button
                type="button"
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-gray-100 ${
                  language === value ? "text-primary" : "text-dark"
                }`}
                onClick={() => handleLanguageChange(value)}
                role="option"
                aria-selected={language === value}
              >
                <span>
                  {label}
                </span>
                <ImageFallback
                  src={src}
                  alt={alt}
                  width={20}
                  height={20}
                  className=" object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;

