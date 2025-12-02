"use client";

import { useTranslations } from "next-intl";
import { useGSAPAnimations } from "../hooks/useGSAPAnimations";

const About: React.FC = () => {
  const t = useTranslations();
  const { aboutRef } = useGSAPAnimations();

  const personalInfo = [
    {
      label: t("about.personalInfo.labels.name"),
      value: t("about.personalInfo.name"),
      icon: "bx bx-user"
    },
    {
      label: t("about.personalInfo.labels.dateOfBirth"),
      value: t("about.personalInfo.dateOfBirth"),
      icon: "bx bx-calendar"
    },
    {
      label: t("about.personalInfo.labels.placeOfBirth"),
      value: t("about.personalInfo.placeOfBirth"),
      icon: "bx bx-map"
    },
    {
      label: t("about.personalInfo.labels.phone"),
      value: (
        <a
          href={`tel:${t("about.personalInfo.phone")}`}
          className="hover:underline hover:text-blue-600 transition-colors duration-200 cursor-pointer"
          style={{ color: "var(--foreground)" }}
        >
          {t("about.personalInfo.phone")}
        </a>
      ),
      icon: "bx bx-phone"
    },
    {
      label: t("about.personalInfo.labels.education"),
      value: t("about.personalInfo.education"),
      icon: "bx bx-book"
    },
    {
      label: t("about.personalInfo.labels.workExperience"),
      value: t("about.personalInfo.workExperience"),
      icon: "bx bx-briefcase"
    },
    {
      label: t("about.personalInfo.labels.email"),
      value: (
        <div>
          <div className="text-xs opacity-75 leading-tight">
            <span className="font-bold">
              {t("about.personalInfo.email.labels.personal")}
            </span>
            :{" "}
            <a
              href={`mailto:${t("about.personalInfo.email.personal")}`}
              className="hover:underline hover:text-blue-600 transition-colors duration-200 cursor-pointer"
              style={{ color: "var(--foreground)" }}
            >
              {t("about.personalInfo.email.personal")}
            </a>
          </div>
          <div className="text-xs opacity-75 leading-tight">
            <span className="font-bold">
              {t("about.personalInfo.email.labels.work")}
            </span>
            :{" "}
            <a
              href={`mailto:${t("about.personalInfo.email.work")}`}
              className="hover:underline hover:text-blue-600 transition-colors duration-200 cursor-pointer"
              style={{ color: "var(--foreground)" }}
            >
              {t("about.personalInfo.email.work")}
            </a>
          </div>
        </div>
      ),
      icon: "bx bx-envelope"
    }
  ];

  return (
    <section ref={aboutRef} id="about" className="py-12 sm:py-16 lg:py-22">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3"
            style={{ color: "var(--foreground)" }}
          >
            {t("about.title")}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        </div>

        <div className="space-y-6">
          {/* Who am I and Goals in one row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4">
              <h3
                className="text-xl font-bold mb-3 flex items-center"
                style={{ color: "var(--foreground)" }}
              >
                <i className="bx bx-user-circle text-2xl text-blue-600 mr-3"></i>
                {t("about.sections.whoAmI")}
              </h3>
              <p
                className="leading-relaxed text-base"
                style={{ color: "var(--foreground)" }}
              >
                {t("about.whoAmI")}
              </p>
            </div>

            <div className="p-4">
              <h3
                className="text-xl font-bold mb-3 flex items-center"
                style={{ color: "var(--foreground)" }}
              >
                <i className="bx bx-target-lock text-2xl text-blue-600 mr-3"></i>
                {t("about.sections.goals")}
              </h3>
              <p
                className="leading-relaxed text-base"
                style={{ color: "var(--foreground)" }}
              >
                {t("about.goals")}
              </p>
            </div>
          </div>

          {/* Personal Info */}
          <div className="p-4">
            <h3
              className="text-xl font-bold mb-4 flex items-center"
              style={{ color: "var(--foreground)" }}
            >
              <i className="bx bx-info-circle text-2xl text-blue-600 mr-3"></i>
              {t("about.personalInfo.title")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {personalInfo.map((info, index) => (
                <div key={index} className="flex items-center space-x-3 p-2">
                  <i className={`${info.icon} text-lg text-blue-600`}></i>
                  <div>
                    <p
                      className="text-sm font-bold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {info.label}
                    </p>
                    <div
                      className="font-medium text-sm opacity-90"
                      style={{ color: "var(--foreground)" }}
                    >
                      {info.value}
                    </div>
                  </div>
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
