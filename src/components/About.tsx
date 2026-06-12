"use client";

import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Profile, Skill, Experience, Education } from "../lib/supabase/service";

interface AboutProps {
  profile: Profile;
  skills: Skill[];
  experiences: Experience[];
  education: Education[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
} as const;

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
} as const;

const About: React.FC<AboutProps> = ({ profile, skills, experiences, education }) => {
  const t = useTranslations();
  const locale = useLocale();
  const isVi = locale === "vi";

  // Group skills by category
  const categories = Array.from(new Set(skills.map((s) => s.category)));

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(isVi ? "vi-VN" : "en-US", {
        year: "numeric",
        month: "short"
      });
    } catch {
      return dateStr;
    }
  };

  const personalInfo = [
    {
      label: t("about.personalInfo.labels.name"),
      value: profile.name,
      icon: "bx bx-user"
    },
    {
      label: t("about.personalInfo.labels.email"),
      value: (
        <a
          href={`mailto:${profile.email || ""}`}
          className="hover:underline hover:text-blue-600 transition-colors"
          style={{ color: "var(--foreground)" }}
        >
          {profile.email}
        </a>
      ),
      icon: "bx bx-envelope"
    },
    {
      label: t("about.personalInfo.labels.phone"),
      value: (
        <a
          href={`tel:${profile.phone || ""}`}
          className="hover:underline hover:text-blue-600 transition-colors"
          style={{ color: "var(--foreground)" }}
        >
          {profile.phone}
        </a>
      ),
      icon: "bx bx-phone"
    },
    {
      label: t("about.personalInfo.labels.placeOfBirth"),
      value: isVi ? profile.address_vi : profile.address_en,
      icon: "bx bx-map"
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-gray-900 dark:text-white"
            style={{ color: "inherit" }}
          >
            {t("about.title")}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        </motion.div>

        <div className="space-y-16">
          {/* Bio and Personal Details */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Biography */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="flex items-center gap-3">
                <i className="bx bx-user-circle text-3xl text-blue-600"></i>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {t("about.sections.whoAmI")}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {isVi ? profile.bio_vi : profile.bio_en}
              </p>
            </motion.div>

            {/* Personal Info Box */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <i className="bx bx-info-circle text-blue-600"></i>
                {t("about.personalInfo.title")}
              </h3>
              <div className="space-y-4">
                {personalInfo.map((info, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shrink-0">
                      <i className={`${info.icon} text-xl`}></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                        {info.label}
                      </p>
                      <div className="text-sm font-semibold text-gray-900 dark:text-white mt-0.5">
                        {info.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Dynamic Skills Grid */}
          {skills.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              <div className="flex items-center gap-3">
                <i className="bx bx-code-alt text-3xl text-blue-600"></i>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Skills & Expertise
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map((category) => (
                  <motion.div
                    key={category}
                    variants={itemVariants}
                    className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
                  >
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-4 border-b border-gray-100 dark:border-gray-700 pb-2 capitalize">
                      {category}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {skills
                        .filter((s) => s.category === category)
                        .map((skill) => (
                          <div
                            key={skill.id}
                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200/60 dark:border-gray-600/40 text-sm font-medium hover:border-blue-500/50 transition-colors"
                          >
                            {skill.icon_class && (
                              skill.icon_class.startsWith("/") || skill.icon_class.includes(".svg") ? (
                                <img src={skill.icon_class} alt={skill.name} className="w-5 h-5 object-contain" />
                              ) : (
                                <i className={`${skill.icon_class} text-blue-500 text-lg`}></i>
                              )
                            )}
                            <span className="text-gray-700 dark:text-gray-200">
                              {skill.name}
                            </span>
                          </div>
                        ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Timelines: Experience and Education */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Experience timeline */}
            {experiences.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3">
                  <i className="bx bx-briefcase text-3xl text-blue-600"></i>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Work Experience
                  </h3>
                </div>

                <div className="relative border-l border-gray-200 dark:border-gray-700 pl-6 ml-3 space-y-8">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-blue-600 border-4 border-white dark:border-gray-900 shadow-sm" />
                      
                      <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-md">
                        <span className="text-xs text-blue-600 font-semibold">
                          {formatDate(exp.start_date)} - {exp.is_current ? (isVi ? "Hiện tại" : "Present") : exp.end_date ? formatDate(exp.end_date) : ""}
                        </span>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                          {isVi ? exp.role_vi : exp.role_en}
                        </h4>
                        <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                          {exp.company}
                        </h5>
                        {(isVi ? exp.description_vi : exp.description_en) && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 leading-relaxed">
                            {isVi ? exp.description_vi : exp.description_en}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Education timeline */}
            {education.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3">
                  <i className="bx bx-book-bookmark text-3xl text-blue-600"></i>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Education & Credentials
                  </h3>
                </div>

                <div className="relative border-l border-gray-200 dark:border-gray-700 pl-6 ml-3 space-y-8">
                  {education.map((edu) => (
                    <div key={edu.id} className="relative">
                      {/* Timeline dot */}
                      <span className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-blue-600 border-4 border-white dark:border-gray-900 shadow-sm" />
                      
                      <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-md">
                        <span className="text-xs text-blue-600 font-semibold">
                          {formatDate(edu.start_date)} - {edu.is_current ? (isVi ? "Hiện tại" : "Present") : edu.end_date ? formatDate(edu.end_date) : ""}
                        </span>
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mt-1">
                          {isVi ? edu.degree_vi : edu.degree_en}
                        </h4>
                        <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                          {isVi ? edu.school_vi : edu.school_en}
                        </h5>
                        {(isVi ? edu.description_vi : edu.description_en) && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm mt-3 leading-relaxed">
                            {isVi ? edu.description_vi : edu.description_en}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
