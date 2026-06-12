"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import LanguageDropdown from "./LanguageDropdown";

const Header: React.FC = () => {
  const pathname = usePathname();
  const { theme } = useTheme();
  const t = useTranslations();
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  const isHome = pathname === `/${locale}` || pathname === `/${locale}/` || pathname === "/";
  const isAdmin = pathname?.includes("/admin");

  if (isAdmin) {
    return null;
  }

  // Monitor scroll for styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Track active section
      const sections = [
        { id: "home", index: 0 },
        { id: "about", index: 1 },
        { id: "projects", index: 2 },
        { id: "contact", index: 3 }
      ];

      const scrollPosition = window.scrollY + 120; // offset

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setCurrentSection(sections[i].index);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { key: "nav.home", id: "home" },
    { key: "nav.about", id: "about" },
    { key: "nav.projects", id: "projects" },
    { key: "nav.contact", id: "contact" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 shadow-md bg-background/80 backdrop-blur-md border-b border-border/10"
          : "py-4 bg-transparent"
      }`}
      style={{
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href={`/${locale}`}
              className={`cursor-pointer transition-all duration-300 ${
                isScrolled ? "scale-90" : "scale-100"
              }`}
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  scrollToSection("home");
                }
              }}
            >
              <img
                src={
                  theme === "dark"
                    ? "/images/dark-logo.png"
                    : "/images/light-logo.png"
                }
                alt="Phat Nguyen Logo"
                className="h-10 w-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
              <span className="font-bold text-xl tracking-wider text-primary select-none flex items-center">
                PHAT NGUYEN
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-2 relative items-center">
            {navItems.map((item, index) => (
              <a
                key={item.key}
                href={isHome ? `#${item.id}` : `/${locale}#${item.id}`}
                className={`relative px-4 py-2 font-semibold text-sm rounded-lg transition-colors duration-300 z-10`}
                style={{
                  color:
                    isHome && currentSection === index
                      ? "var(--primary)"
                      : "var(--foreground)"
                }}
                onClick={(e) => {
                  if (isHome) {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }
                }}
              >
                {t(item.key)}
                {isHome && currentSection === index && (
                  <motion.div
                    layoutId="activeHeaderNav"
                    className="absolute inset-0 bg-emerald-500/10 dark:bg-teal-500/10 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <LanguageDropdown />

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg transition-all duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-5 h-5 transform transition-transform duration-300 ${
                  isMenuOpen ? "rotate-90" : "rotate-0"
                }`}
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
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <nav className="flex flex-col space-y-2 py-4 border-t border-border/10 mt-3">
                {navItems.map((item) => (
                  <a
                    key={item.key}
                    href={isHome ? `#${item.id}` : `/${locale}#${item.id}`}
                    className="px-4 py-3 font-semibold text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                    style={{ color: "var(--foreground)" }}
                    onClick={(e) => {
                      if (isHome) {
                        e.preventDefault();
                        scrollToSection(item.id);
                      } else {
                        setIsMenuOpen(false);
                      }
                    }}
                  >
                    {t(item.key)}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
