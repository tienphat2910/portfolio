"use client";

import { createContext, useContext, useEffect, useState } from "react";
import en from "../translations/en.json";
import vi from "../translations/vi.json";

type Language = "en" | "vi";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
  tArray: (key: string) => string[];
}

const translations = { en, vi };

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // Load language from localStorage
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "vi" : "en"));
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return value || key;
  };

  const tArray = (key: string): string[] => {
    const keys = key.split(".");
    let value: any = translations[language];
    for (const k of keys) {
      value = value?.[k];
    }
    return Array.isArray(value) ? value : [];
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t, tArray }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
