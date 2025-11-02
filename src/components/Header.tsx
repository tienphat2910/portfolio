"use client";

import { useState } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className="fixed top-0 w-full backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800 z-30"
      style={{
        backgroundColor: "var(--background)",
        opacity: 0.9
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <h1
              className="text-xl font-bold mr-8"
              style={{ color: "var(--foreground)" }}
            >
              Portfolio
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#home"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
              style={{ color: "var(--foreground)" }}
            >
              {t("nav.home")}
            </a>
            <a
              href="#about"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
              style={{ color: "var(--foreground)" }}
            >
              {t("nav.about")}
            </a>
            <a
              href="#projects"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
              style={{ color: "var(--foreground)" }}
            >
              {t("nav.projects")}
            </a>
            <a
              href="#contact"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
              style={{ color: "var(--foreground)" }}
            >
              {t("nav.contact")}
            </a>
          </nav>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
            <button
              onClick={toggleLanguage}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
            >
              {language === "en" ? "VI" : "EN"}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
            <nav className="flex flex-col space-y-4 pt-4">
              <a
                href="#home"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
                style={{ color: "var(--foreground)" }}
              >
                {t("nav.home")}
              </a>
              <a
                href="#about"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
                style={{ color: "var(--foreground)" }}
              >
                {t("nav.about")}
              </a>
              <a
                href="#projects"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
                style={{ color: "var(--foreground)" }}
              >
                {t("nav.projects")}
              </a>
              <a
                href="#contact"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
                style={{ color: "var(--foreground)" }}
              >
                {t("nav.contact")}
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
