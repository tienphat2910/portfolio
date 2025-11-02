"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const useGSAPAnimations = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations
    if (heroRef.current) {
      const heroTl = gsap.timeline();

      heroTl
        .fromTo(
          heroRef.current.querySelector("h1"),
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        )
        .fromTo(
          heroRef.current.querySelector("h2"),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.5"
        )
        .fromTo(
          heroRef.current.querySelector("p"),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          heroRef.current.querySelector("a"),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
          "-=0.2"
        );
    }

    // About section animations
    if (aboutRef.current) {
      gsap.fromTo(
        aboutRef.current.querySelector("h2"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(
        aboutRef.current.querySelectorAll("p"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Skills animation
      const skills = aboutRef.current.querySelectorAll(".skill-item");
      gsap.fromTo(
        skills,
        { scale: 0.8, opacity: 0, y: 20 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: aboutRef.current.querySelector(".skills-grid"),
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Projects animations
    if (projectsRef.current) {
      gsap.fromTo(
        projectsRef.current.querySelector("h2"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      const projectCards =
        projectsRef.current.querySelectorAll(".project-card");
      gsap.fromTo(
        projectCards,
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Hover animations for project cards
      projectCards.forEach((card) => {
        const cardElement = card as HTMLElement;
        const handleMouseEnter = () => {
          gsap.to(cardElement, {
            y: -10,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        const handleMouseLeave = () => {
          gsap.to(cardElement, {
            y: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        };

        cardElement.addEventListener("mouseenter", handleMouseEnter);
        cardElement.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          cardElement.removeEventListener("mouseenter", handleMouseEnter);
          cardElement.removeEventListener("mouseleave", handleMouseLeave);
        };
      });
    }

    // Contact animations
    if (contactRef.current) {
      gsap.fromTo(
        contactRef.current.querySelector("h2"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      const contactItems = contactRef.current.querySelectorAll(".contact-item");
      gsap.fromTo(
        contactItems,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(
        contactRef.current.querySelector(".contact-form"),
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }

    // Parallax effect for gradient background
    const gradientBg = document.querySelector(".fixed.inset-0.-z-10");
    if (gradientBg) {
      gsap.to(gradientBg, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return {
    heroRef,
    aboutRef,
    projectsRef,
    contactRef
  };
};
