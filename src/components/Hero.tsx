"use client";

import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { useGSAPAnimations } from "../hooks/useGSAPAnimations";
import TypingAnimation from "./TypingAnimation";
import FloatingIcons from "./FloatingIcons";
import FancyButton from "./FancyButton";
import ResumeButton from "./ResumeButton";
import { Github, Facebook, Instagram, Linkedin } from "lucide-react";

const Hero: React.FC = () => {
  const { t, tArray } = useLanguage();
  const { theme } = useTheme();
  const { heroRef } = useGSAPAnimations();

  const techStack = [
    { name: "React", icon: "bx bxl-react", color: "#61dbfb" },
    {
      name: "Next.js",
      icon: "devicon-nextjs-plain",
      colorLight: "#000000",
      color: "#ffffff"
    },
    { name: "JavaScript", icon: "bx bxl-javascript", color: "#f0db4f" },
    { name: "TypeScript", icon: "bx bxl-typescript", color: "#3178c6" },
    { name: "Tailwind CSS", icon: "bx bxl-tailwind-css", color: "#06b6d4" },
    { name: "Node.js", icon: "bx bxl-nodejs", color: "#68a063" }
  ];

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Greeting */}
            <div className="space-y-2">
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                {t("hero.greeting")}
              </h1>
              <div className="text-lg sm:text-xl lg:text-2xl">
                <TypingAnimation
                  texts={tArray("hero.typingTexts")}
                  typeSpeed={150}
                  deleteSpeed={100}
                  delayBetweenTexts={2000}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p
                className="text-base sm:text-lg leading-relaxed max-w-2xl"
                style={{ color: "var(--foreground)" }}
              >
                {t("hero.description1")}
              </p>
            </div>

            {/* Tech Stack */}
            <div className="pt-2">
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {techStack.map((tech, index) => (
                  <div
                    key={tech.name}
                    className="group relative flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg"
                    style={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--foreground)",
                      animationDelay: `${index * 0.1}s`,
                      opacity: 0.9
                    }}
                  >
                    <i
                      className={`${tech.icon} text-lg`}
                      style={{
                        color:
                          tech.name === "Next.js"
                            ? theme === "light"
                              ? tech.colorLight
                              : tech.color
                            : tech.color
                      }}
                    ></i>
                    <span
                      className="text-sm font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                      style={{ color: "var(--foreground)" }}
                    >
                      {tech.name}
                    </span>
                    <div
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap"
                      style={{
                        backgroundColor: "var(--foreground)",
                        color: "var(--background)"
                      }}
                    >
                      {tech.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row gap-4 justify-center lg:justify-start">
              <FancyButton href="#projects">{t("hero.hireMe")}</FancyButton>
              <ResumeButton href="/cv.pdf">{t("hero.resume")}</ResumeButton>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-4">
              <span
                className="text-sm mr-2 self-center"
                style={{ color: "var(--foreground)" }}
              >
                {t("hero.followMe")}
              </span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                style={{ color: "var(--foreground)" }}
              >
                <Github size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-blue-600 transition-colors duration-200"
                style={{ color: "var(--foreground)" }}
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-pink-600 transition-colors duration-200"
                style={{ color: "var(--foreground)" }}
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:text-blue-700 transition-colors duration-200"
                style={{ color: "var(--foreground)" }}
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Right Side - Avatar */}
          <div className="relative flex justify-center items-center">
            <div className="relative z-10">
              <img
                src="/images/avt.jpg"
                alt="Nguyễn Tiến Phát - Frontend Developer"
                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-full shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300"
                style={{ border: `8px solid var(--background)` }}
                onError={(e) => {
                  // Fallback if image doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.src =
                    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSI0MCIgZmlsbD0iIzlDQTNBRiIvPgo8cGF0aCBkPSJNNTAgMTQwSDE1MFYxNThDMTUwIDE2OCAxMzggMTgwIDEwMCAxODBDNjIgMTgwIDUwIDE2OCA1MCAxNThWMTQwWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4K";
                }}
              />
            </div>

            {/* Floating Icons */}
            <FloatingIcons />

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-yellow-400 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 -left-8 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6"
          style={{ color: "var(--foreground)" }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
