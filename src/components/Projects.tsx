"use client";

import { useTranslations } from "next-intl";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const t = useTranslations();
  const projectsRef = useRef<HTMLElement>(null);
  const projectCardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  const projects = [
    {
      name: "Tianlongshop",
      image: "/images/tianlong.png",
      url: "https://botuoituyetdoi.tianlong.vn/"
    },
    {
      name: "Explore Vietnam",
      image: "/images/explore-vietnam.png",
      url: "https://explorevietnam.vercel.app/en"
    }
  ];

  useEffect(() => {
    if (!projectsRef.current) return;

    // Animate project cards on scroll
    projectCardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 100,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.2
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={projectsRef}
      id="projects"
      className="py-16 sm:py-20 lg:py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            {t("projects.title")}
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--foreground-muted, --foreground)" }}
          >
            {t("projects.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <a
              key={index}
              ref={(el) => {
                projectCardsRef.current[index] = el;
              }}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
