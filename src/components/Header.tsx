"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThemeToggle from "./ThemeToggle";
import LanguageDropdown from "./LanguageDropdown";

gsap.registerPlugin(ScrollTrigger);

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Header scroll animation
  useEffect(() => {
    if (!headerRef.current) return;

    const header = headerRef.current;

    // Initial entrance animation
    gsap.fromTo(
      header,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Scroll-based header transformation
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => {
        const progress = self.progress;

        gsap.to(header, {
          boxShadow:
            progress > 0.1
              ? "0 8px 32px rgba(0, 0, 0, 0.1)"
              : "0 4px 16px rgba(0, 0, 0, 0.05)",
          duration: 0.3,
          ease: "power2.out"
        });

        // Shrink logo on scroll
        if (logoRef.current) {
          gsap.to(logoRef.current, {
            scale: progress > 0.1 ? 0.9 : 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.4, ease: "power3.out" }
      );

      // Animate menu items
      const menuItems = mobileMenuRef.current.querySelectorAll("a");
      gsap.fromTo(
        menuItems,
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.3,
          stagger: 0.1,
          delay: 0.2,
          ease: "power2.out"
        }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in"
      });
    }
  }, [isMenuOpen]);

  // Button hover animations
  const handleNavHover = (element: HTMLElement, isHover: boolean) => {
    gsap.to(element, {
      scale: isHover ? 1.05 : 1,
      y: isHover ? -2 : 0,
      duration: 0.2,
      ease: "power2.out"
    });
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300"
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(var(--border-rgb), 0.1)"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1
              ref={logoRef}
              className="text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => scrollToSection("home")}
            >
              Portfolio
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav ref={navRef} className="hidden md:flex space-x-8">
            {[
              { key: "nav.home", id: "home" },
              { key: "nav.about", id: "about" },
              { key: "nav.services", id: "services" },
              { key: "nav.projects", id: "projects" },
              { key: "nav.contact", id: "contact" }
            ].map((item, index) => (
              <a
                key={item.key}
                href={`#${item.id}`}
                className="relative px-3 py-2 font-medium transition-all duration-300 group"
                style={{ color: "var(--foreground)" }}
                onMouseEnter={(e) =>
                  handleNavHover(e.currentTarget as HTMLElement, true)
                }
                onMouseLeave={(e) =>
                  handleNavHover(e.currentTarget as HTMLElement, false)
                }
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                {t(item.key)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
            {/* Desktop Controls */}
            <div className="hidden md:flex items-center space-x-3">
              <ThemeToggle />
              <LanguageDropdown />
            </div>

            {/* Mobile Controls - Always visible on mobile */}
            <div className="flex md:hidden items-center space-x-2">
              <ThemeToggle />
              <LanguageDropdown />
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden relative p-3 rounded-xl bg-linear-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 text-gray-700 dark:text-gray-300 hover:shadow-lg transition-all duration-300 group overflow-hidden"
              aria-label="Toggle menu"
            >
              <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <svg
                  className="w-5 h-5 transform transition-transform duration-300"
                  style={{
                    transform: isMenuOpen ? "rotate(180deg)" : "rotate(0deg)"
                  }}
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
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          ref={mobileMenuRef}
          className="md:hidden overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          <nav className="flex flex-col space-y-4 py-6 border-t border-gray-200 dark:border-gray-700">
            {[
              { key: "nav.home", id: "home" },
              { key: "nav.about", id: "about" },
              { key: "nav.services", id: "services" },
              { key: "nav.projects", id: "projects" },
              { key: "nav.contact", id: "contact" }
            ].map((item) => (
              <a
                key={item.key}
                href={`#${item.id}`}
                className="px-4 py-3 font-medium rounded-lg hover:bg-linear-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all duration-300 transform hover:translate-x-2"
                style={{ color: "var(--foreground)" }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                {t(item.key)}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
