"use client";

import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../contexts/LanguageContext";

const LanguageDropdown: React.FC = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (lang: "en" | "vi") => {
    if (lang !== language) {
      toggleLanguage();
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-blue-600 dark:hover:text-blue-400"
        style={{ color: "var(--foreground)" }}
      >
        <span>{language.toUpperCase()}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-[100]">
          <div className="py-1">
            <button
              onClick={() => handleLanguageSelect("en")}
              className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                language === "en"
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => handleLanguageSelect("vi")}
              className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                language === "vi"
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              VI
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
