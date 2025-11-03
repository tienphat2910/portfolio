"use client";

import { useLanguage } from "../contexts/LanguageContext";
import { motion } from "framer-motion";
import { useRef } from "react";

const Services: React.FC = () => {
  const { t } = useLanguage();
  const servicesRef = useRef<HTMLDivElement>(null);

  const getFeatures = (key: string) => {
    return [
      t(`services.${key}.features.0`),
      t(`services.${key}.features.1`),
      t(`services.${key}.features.2`),
      t(`services.${key}.features.3`)
    ];
  };

  const services = [
    {
      key: "webDevelopment",
      icon: "devicon-react-original",
      color: "from-blue-500 to-cyan-500",
      features: getFeatures("webDevelopment")
    },
    {
      key: "ecommerce",
      icon: "bx bx-shopping-bag",
      color: "from-green-500 to-emerald-500",
      features: getFeatures("ecommerce")
    },
    {
      key: "mobileDevelopment",
      icon: "bx bx-mobile",
      color: "from-purple-500 to-pink-500",
      features: getFeatures("mobileDevelopment")
    },
    {
      key: "apiDevelopment",
      icon: "bx bx-server",
      color: "from-orange-500 to-red-500",
      features: getFeatures("apiDevelopment")
    }
  ];

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={servicesRef}
      id="services"
      className="py-16 sm:py-20 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900 dark:text-white"
            style={{ color: "inherit" }}
          >
            {t("services.title")}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="bg-secondary dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 h-full border border-gray-200 dark:border-gray-700">
                {/* Background gradient on hover */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}
                ></div>

                {/* Icon */}
                <div className="relative z-10 mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br ${service.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <i className={`${service.icon} text-2xl`}></i>
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3
                    className="text-xl sm:text-2xl font-bold mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
                    style={{ color: "inherit" }}
                  >
                    {t(`services.${service.key}.title`)}
                  </h3>

                  <p
                    className="mb-6 leading-relaxed"
                    style={{ color: "inherit" }}
                  >
                    {t(`services.${service.key}.description`)}
                  </p>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4
                      className="font-semibold mb-4"
                      style={{ color: "inherit" }}
                    >
                      {t("services.keyFeatures")}
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.1 + featureIndex * 0.05
                          }}
                          viewport={{ once: true }}
                          className="group/feature relative flex items-center gap-2 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-full hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-md"
                        >
                          <i className="bx bx-check text-green-500 text-sm"></i>
                          <span
                            className="text-sm font-medium group-hover/feature:text-green-600 dark:group-hover/feature:text-gray-400 transition-colors duration-300"
                            style={{ color: "inherit" }}
                          >
                            {feature}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToContact}
                    className={`w-full py-3 px-6 rounded-xl font-semibold text-white bg-linear-to-r ${service.color} hover:shadow-lg transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    {t("services.contactMe")}
                  </motion.button>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <i className={`${service.icon} text-6xl`}></i>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
