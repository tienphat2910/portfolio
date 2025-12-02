"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useGSAPAnimations } from "../hooks/useGSAPAnimations";
import { Mail, Phone, MapPin } from "lucide-react";
import toast from "react-hot-toast";

const Contact: React.FC = () => {
  const t = useTranslations();
  const { contactRef } = useGSAPAnimations();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      email: "",
      phone: "",
      service: "",
      message: ""
    };

    // Validate full name
    if (!form.fullName.trim()) {
      newErrors.fullName = t("contact.form.errors.fullNameRequired");
    } else if (
      !/^[A-Za-zÀ-Ỹà-ỹĐđ]+(?:\s+[A-Za-zÀ-Ỹà-ỹĐđ]+)+$/.test(form.fullName.trim())
    ) {
      newErrors.fullName = t("contact.form.errors.fullNameInvalid");
    }

    // Validate email
    if (!form.email.trim()) {
      newErrors.email = t("contact.form.errors.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t("contact.form.errors.emailInvalid");
    }

    // Validate phone
    if (!form.phone.trim()) {
      newErrors.phone = t("contact.form.errors.phoneRequired");
    } else if (!/^(0|\+84)[3|5|7|8|9][0-9]{8}$/.test(form.phone.trim())) {
      newErrors.phone = t("contact.form.errors.phoneInvalid");
    }

    // Validate service
    if (!form.service) {
      newErrors.service = t("contact.form.errors.serviceRequired");
    }

    // Validate message
    if (!form.message.trim()) {
      newErrors.message = t("contact.form.errors.messageRequired");
    } else if (form.message.trim().length < 10) {
      newErrors.message = t("contact.form.errors.messageMinLength");
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send email via API route
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          service: form.service,
          message: form.message
        })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(t("contact.successMessage"));
        setForm({
          fullName: "",
          email: "",
          phone: "",
          service: "",
          message: ""
        });
        setErrors({
          fullName: "",
          email: "",
          phone: "",
          service: "",
          message: ""
        });
      } else {
        toast.error(t("contact.errorMessage"));
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(t("contact.errorMessage"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: t("contact.info.email.label"),
      items: [
        {
          label: t("contact.info.email.personal"),
          value: "tienphat29102003@gmail.com",
          href: "mailto:tienphat29102003@gmail.com"
        },
        {
          label: t("contact.info.email.work"),
          value: "tienphat.work29@gmail.com",
          href: "mailto:tienphat.work29@gmail.com"
        }
      ]
    },
    {
      icon: Phone,
      label: t("contact.info.phone.label"),
      value: "+84 376 549 230",
      href: "tel:+84376549230"
    },
    {
      icon: MapPin,
      label: t("contact.info.location.label"),
      value: "Ho Chi Minh City, Vietnam"
    }
  ];

  return (
    <section ref={contactRef} id="contact" className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            {t("contact.title")}
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--foreground)" }}
          >
            Let's work together! Feel free to reach out if you have any
            questions or opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3
                className="text-2xl font-semibold mb-6"
                style={{ color: "var(--foreground)" }}
              >
                {t("contact.getInTouch")}
              </h3>
              <p className="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">
                {t("contact.description")}
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="flex items-start p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 contact-item border border-gray-100 dark:border-gray-700"
                >
                  <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white mb-1">
                      {info.label}
                    </div>
                    {info.items ? (
                      <div className="space-y-1">
                        {info.items.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.href}
                            className="block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                          >
                            <span className="font-medium">{item.label}:</span>{" "}
                            {item.value}
                          </a>
                        ))}
                      </div>
                    ) : info.href ? (
                      <a
                        href={info.href}
                        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-gray-600 dark:text-gray-400">
                        {info.value}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 contact-form border border-gray-100 dark:border-gray-700">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("contact.form.fullName")}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                    errors.fullName
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder={t("contact.form.fullNamePlaceholder")}
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("contact.form.email")}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                      errors.email
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    placeholder={t("contact.form.emailPlaceholder")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("contact.form.phone")}
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                      errors.phone
                        ? "border-red-500 dark:border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    placeholder={t("contact.form.phonePlaceholder")}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("contact.form.service")}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 ${
                    errors.service
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <option value="">{t("contact.form.selectService")}</option>
                  <option value="webDevelopment">
                    {t("services.webDevelopment.title")}
                  </option>
                  <option value="ecommerce">
                    {t("services.ecommerce.title")}
                  </option>
                  <option value="mobileDevelopment">
                    {t("services.mobileDevelopment.title")}
                  </option>
                  <option value="apiDevelopment">
                    {t("services.apiDevelopment.title")}
                  </option>
                  <option value="recruitment">
                    {t("contact.form.recruitment")}
                  </option>
                </select>
                {errors.service && (
                  <p className="mt-1 text-sm text-red-500">{errors.service}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("contact.form.message")}
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-none ${
                    errors.message
                      ? "border-red-500 dark:border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                  placeholder={t("contact.form.messagePlaceholder")}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:from-emerald-400 disabled:to-teal-400 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg hover:scale-[1.02] cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>{t("contact.form.sending")}</span>
                  </>
                ) : (
                  <span>{t("contact.form.send")}</span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
