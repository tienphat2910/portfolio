"use client";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useTranslations, useLocale } from "next-intl";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThemeToggle from "./ThemeToggle";
import LanguageDropdown from "./LanguageDropdown";

gsap.registerPlugin(ScrollTrigger);

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const t = useTranslations();
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hoverIndicatorRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const navItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);

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

  // Track active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "home", index: 0 },
        { id: "about", index: 1 },
        { id: "services", index: 2 },
        { id: "projects", index: 3 },
        { id: "contact", index: 4 }
      ];

      const scrollPosition = window.scrollY + 200; // Offset for header

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

    // Initial check
    handleScroll();

    // Listen to scroll events
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Update indicator position when current section changes
  useEffect(() => {
    const navItem = navItemsRef.current[currentSection];
    const nav = navRef.current;
    const indicator = hoverIndicatorRef.current;

    if (!nav || !indicator || !navItem) return;

    const navRect = nav.getBoundingClientRect();
    const itemRect = navItem.getBoundingClientRect();

    const left = itemRect.left - navRect.left;
    const width = itemRect.width;

    gsap.to(indicator, {
      x: left,
      width: width,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    });
  }, [currentSection]);

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
      const offset = 80; // Header height offset
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMenuOpen(false);
  };

  const handleNavItemHover = (
    index: number,
    event: React.MouseEvent<HTMLAnchorElement>
  ) => {
    const target = event.currentTarget;
    const nav = navRef.current;
    const indicator = hoverIndicatorRef.current;

    if (!nav || !indicator) return;

    const navRect = nav.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const left = targetRect.left - navRect.left;
    const width = targetRect.width;

    gsap.to(indicator, {
      x: left,
      width: width,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out"
    });

    setActiveIndex(index);
  };

  const handleNavLeave = () => {
    // Don't hide indicator, keep it on current section
    if (
      hoverIndicatorRef.current &&
      activeIndex !== null &&
      activeIndex !== currentSection
    ) {
      const navItem = navItemsRef.current[currentSection];
      const nav = navRef.current;
      const indicator = hoverIndicatorRef.current;

      if (!nav || !navItem) return;

      const navRect = nav.getBoundingClientRect();
      const itemRect = navItem.getBoundingClientRect();

      const left = itemRect.left - navRect.left;
      const width = itemRect.width;

      gsap.to(indicator, {
        x: left,
        width: width,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
    setActiveIndex(null);
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
            <div
              ref={logoRef}
              className="cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => scrollToSection("home")}
            >
              <img
                src={
                  theme === "dark"
                    ? "/images/dark-logo.png"
                    : "/images/light-logo.png"
                }
                alt="Phat Nguyen Logo"
                className="h-12 w-auto"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav
            ref={navRef}
            className="hidden md:flex space-x-8 relative"
            onMouseLeave={handleNavLeave}
          >
            {/* Hover Indicator */}
            <div
              ref={hoverIndicatorRef}
              className="absolute top-0 left-0 h-full bg-linear-to-r from-emerald-500/10 to-teal-500/10 rounded-lg pointer-events-none"
              style={{
                opacity: 0,
                width: 0,
                zIndex: -1
              }}
            />

            {[
              { key: "nav.home", id: "home" },
              { key: "nav.about", id: "about" },
              { key: "nav.services", id: "services" },
              { key: "nav.projects", id: "projects" },
              { key: "nav.contact", id: "contact" }
            ].map((item, index) => (
              <a
                key={item.key}
                ref={(el) => {
                  navItemsRef.current[index] = el;
                }}
                href={`#${item.id}`}
                className="relative px-3 py-2 font-medium z-10"
                style={{
                  color:
                    currentSection === index
                      ? "var(--primary)"
                      : "var(--foreground)"
                }}
                onMouseEnter={(e) => handleNavItemHover(index, e)}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
              >
                {t(item.key)}
                <span
                  className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-emerald-500 to-teal-500 transition-all duration-300"
                  style={{
                    width: currentSection === index ? "100%" : "0"
                  }}
                ></span>
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
