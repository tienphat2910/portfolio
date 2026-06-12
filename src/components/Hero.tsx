"use client";

import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "../contexts/ThemeContext";
import { motion } from "framer-motion";
import TypingAnimation from "./TypingAnimation";
import FloatingIcons from "./FloatingIcons";
import FancyButton from "./FancyButton";
import ResumeButton from "./ResumeButton";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaInstagram
} from "react-icons/fa";
import { Profile } from "../lib/supabase/service";

interface HeroProps {
  profile: Profile;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
} as const;

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
} as const;

const avatarVariants = {
  hidden: { scale: 0.8, opacity: 0, rotate: -10 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 80, damping: 15, delay: 0.4 }
  }
} as const;

const Hero: React.FC<HeroProps> = ({ profile }) => {
  const t = useTranslations();
  const locale = useLocale();
  const { theme } = useTheme();

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

  const greeting = locale === "vi"
    ? `Xin chào, tôi là ${profile.name}`
    : `Hi, I'm ${profile.name}`;

  const description = locale === "vi"
    ? profile.bio_vi || profile.bio_en
    : profile.bio_en;

  const position = locale === "vi"
    ? profile.position_vi || profile.position_en
    : profile.position_en;

  const typingTexts = position
    ? [position]
    : [
        t("hero.typingTexts.0"),
        t("hero.typingTexts.1"),
        t("hero.typingTexts.2"),
        t("hero.typingTexts.3")
      ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Left Side - Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Greeting */}
            <motion.div variants={itemVariants} className="space-y-2">
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                {greeting}
              </h1>
              <div className="text-lg sm:text-xl lg:text-2xl typing-animation-container">
                <TypingAnimation
                  texts={typingTexts}
                  typeSpeed={150}
                  deleteSpeed={100}
                  delayBetweenTexts={2000}
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.div variants={itemVariants} className="space-y-4 hero-description">
              <p
                className="text-base sm:text-lg leading-relaxed max-w-2xl"
                style={{ color: "var(--foreground)" }}
              >
                {description}
              </p>
            </motion.div>

            {/* Tech Stack */}
            <motion.div variants={itemVariants} className="pt-2">
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="tech-stack-item group relative flex items-center gap-2 px-4 py-2 border rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg"
                    style={{
                      backgroundColor: "var(--background)",
                      borderColor: "var(--foreground)",
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
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="hero-buttons flex flex-row gap-4 justify-center lg:justify-start"
            >
              <FancyButton href="#projects">{t("hero.hireMe")}</FancyButton>
              <ResumeButton href={profile.resume_url || "/cv.pdf"}>{t("hero.resume")}</ResumeButton>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="hero-social flex justify-center lg:justify-start space-x-4"
            >
              <span
                className="text-sm mr-2 self-center"
                style={{ color: "var(--foreground)" }}
              >
                {t("hero.followMe")}
              </span>
              {profile.social_github && (
                <a
                  href={profile.social_github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  style={{ color: "var(--foreground)" }}
                >
                  <FaGithub size={20} />
                </a>
              )}
              {profile.social_facebook && (
                <a
                  href={profile.social_facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:text-blue-600 transition-colors duration-200"
                  style={{ color: "var(--foreground)" }}
                >
                  <FaFacebook size={20} />
                </a>
              )}
              {profile.social_instagram && (
                <a
                  href={profile.social_instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:text-pink-600 transition-colors duration-200"
                  style={{ color: "var(--foreground)" }}
                >
                  <FaInstagram size={20} />
                </a>
              )}
              {profile.social_linkedin && (
                <a
                  href={profile.social_linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:text-blue-700 transition-colors duration-200"
                  style={{ color: "var(--foreground)" }}
                >
                  <FaLinkedin size={20} />
                </a>
              )}
            </motion.div>
          </div>

          {/* Right Side - Avatar */}
          <motion.div
            variants={avatarVariants}
            className="hero-avatar relative flex justify-center items-center"
          >
            <div className="relative z-10">
              <img
                src="/images/avt.jpg"
                alt="Nguyễn Tiến Phát - Frontend Developer"
                className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 object-cover rounded-full shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-300"
                style={{ border: `8px solid var(--background)` }}
                onError={(e) => {
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
          </motion.div>
        </motion.div>
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
