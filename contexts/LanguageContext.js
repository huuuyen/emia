"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getTranslation } from "../lib/translations";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("vi"); // Default: Vietnamese

  useEffect(() => {
    // Load language from localStorage on mount
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language");
      if (savedLanguage) {
        setLanguage(savedLanguage);
        document.documentElement.lang = savedLanguage;
      } else {
        // Try to detect browser language
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith("en")) {
          setLanguage("en");
          document.documentElement.lang = "en";
        }
      }
    }
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("language", lang);
      // Update HTML lang attribute
      document.documentElement.lang = lang;
    }
  };

  // Translation function
  const t = (key) => {
    return getTranslation(key, language);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

