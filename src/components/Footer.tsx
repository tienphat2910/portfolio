"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "../contexts/ThemeContext";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Facebook,
  Heart,
  ArrowUp
} from "lucide-react";

const Footer: React.FC = () => {
  const t = useTranslations();
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/tienphat2910",
      color: "hover:text-[#333] dark:hover:text-white"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/tienphat2910/",
      color: "hover:text-[#0077b5]"
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: "https://www.facebook.com/tien.phat29/",
      color: "hover:text-[#1877f2]"
    }
  ];

  const quickLinks = [
    { name: t("nav.home"), section: "home" },
    { name: t("nav.about"), section: "about" },
    { name: t("nav.services"), section: "services" },
    { name: t("nav.projects"), section: "projects" },
    { name: t("nav.contact"), section: "contact" }
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: "tienphat.work29@gmail.com",
      href: "mailto:tienphat.work29@gmail.com"
    },
    {
      icon: Phone,
      text: "+84 376 549 230",
      href: "tel:+84376549230"
    },
    {
      icon: MapPin,
      text: "Ho Chi Minh City, Vietnam",
      href: "#"
    }
  ];

  return (
    <footer className="relative bg-linear-to-br from-background via-background to-muted border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-8 md:py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
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
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {t("footer.description")}
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2.5 rounded-lg bg-muted/50 hover:bg-muted transition-all duration-300 ${social.color} transform hover:scale-110 hover:-translate-y-1`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.section)}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300 mr-0 group-hover:mr-2"></span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.services")}
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li
                onClick={() => scrollToSection("services")}
                className="hover:text-foreground transition-colors duration-300 cursor-pointer"
              >
                {t("services.webDevelopment.title")}
              </li>
              <li
                onClick={() => scrollToSection("services")}
                className="hover:text-foreground transition-colors duration-300 cursor-pointer"
              >
                {t("services.ecommerce.title")}
              </li>
              <li
                onClick={() => scrollToSection("services")}
                className="hover:text-foreground transition-colors duration-300 cursor-pointer"
              >
                {t("services.mobileDevelopment.title")}
              </li>
              <li
                onClick={() => scrollToSection("services")}
                className="hover:text-foreground transition-colors duration-300 cursor-pointer"
              >
                {t("services.apiDevelopment.title")}
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.contactInfo")}
            </h4>
            <ul className="space-y-4">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <li key={index}>
                    <a
                      href={info.href}
                      className="flex items-start gap-3 text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                    >
                      <Icon className="w-5 h-5 mt-0.5 shrink-0 group-hover:text-primary transition-colors" />
                      <span className="text-sm">{info.text}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/40"></div>

        {/* Bottom Footer */}
        <div className="py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            {t("footer.copyright", { year: new Date().getFullYear() })}{" "}
            <span className="inline-flex items-center gap-1">
              {t("footer.madeWith")}{" "}
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />{" "}
              {t("footer.by")}{" "}
              <a
                href="https://phatnguyen.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-foreground hover:text-emerald-600 dark:hover:text-teal-400 transition-colors duration-300 hover:underline"
              >
                Phat Nguyen
              </a>
            </span>
          </p>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
    </footer>
  );
};

export default Footer;
