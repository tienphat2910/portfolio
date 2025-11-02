"use client";

import { useEffect, useState } from "react";

const FloatingIcons: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const floatingIcons = [
    { icon: "bx bxl-html5", color: "#e34c26", label: "HTML5" },
    { icon: "bx bxl-css3", color: "#264de4", label: "CSS3" },
    { icon: "bx bxl-javascript", color: "#f0db4f", label: "JavaScript" },
    { icon: "bx bxl-react", color: "#61dbfb", label: "React" }
  ];

  const positions = [
    "top-0 left-16 sm:left-20",
    "top-0 right-0",
    "bottom-0 left-8 sm:left-10",
    "bottom-8 sm:bottom-10 right-10 sm:right-12"
  ];

  if (!mounted) return null;

  return (
    <>
      {floatingIcons.map((tech, index) => (
        <div
          key={index}
          title={tech.label}
          className={`absolute ${positions[index % positions.length]}
            w-12 h-12 sm:w-16 sm:h-16
            rounded-full drop-shadow-2xl shadow-lg flex items-center justify-center
            hover:scale-110 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-float cursor-pointer`}
          style={{
            backgroundColor: "var(--foreground)",
            color: "var(--background)",
            boxShadow:
              "var(--foreground) 0px 10px 15px -3px, var(--foreground) 0px 4px 6px -2px",
            animationDelay: `${index * 0.5}s`
          }}
        >
          <i
            className={`${tech.icon} text-xl sm:text-2xl`}
            style={{ color: tech.color }}
          ></i>
        </div>
      ))}

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default FloatingIcons;
