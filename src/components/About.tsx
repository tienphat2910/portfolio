"use client";

import { useLanguage } from "../contexts/LanguageContext";
import { useGSAPAnimations } from "../hooks/useGSAPAnimations";

const About: React.FC = () => {
  const { t } = useLanguage();
  const { aboutRef } = useGSAPAnimations();

  const skills = [
    { name: "React/Next.js", icon: "⚛️" },
    { name: "TypeScript", icon: "📘" },
    { name: "Three.js", icon: "🎨" },
    { name: "Tailwind CSS", icon: "🎨" },
    { name: "Node.js", icon: "🟢" },
    { name: "Git", icon: "📚" }
  ];

  return (
    <section ref={aboutRef} id="about" className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            {t("about.title")}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p
              className="text-lg sm:text-xl leading-relaxed"
              style={{ color: "var(--foreground)" }}
            >
              {t("about.content")}
            </p>
            <p
              className="text-base sm:text-lg leading-relaxed"
              style={{ color: "var(--foreground)" }}
            >
              Passionate about creating beautiful, functional, and user-centered
              digital experiences. I love combining creativity with technology
              to solve complex problems.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Skills & Technologies
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 skills-grid">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 bg-white dark:bg-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 group skill-item"
                >
                  <span className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
                    {skill.icon}
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
