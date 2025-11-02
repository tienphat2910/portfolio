"use client";
import React from "react";

interface FancyButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

const FancyButton: React.FC<FancyButtonProps> = ({
  children,
  onClick,
  href
}) => {
  const buttonContent = (
    <button
      onClick={onClick}
      className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-medium text-[17px] px-5 pr-14 py-[0.35em] rounded-[10em] border-none tracking-[0.05em] flex items-center overflow-hidden relative h-[2.8em] cursor-pointer uppercase group shadow-[0_0_1.6em_rgba(183,33,255,0.3),0_0_1.6em_rgba(33,212,253,0.3)] transition-all duration-600 ease-[cubic-bezier(0.23,1,0.320,1)] hover:shadow-[0_0_2em_rgba(183,33,255,0.4),0_0_2em_rgba(33,212,253,0.4)] active:scale-90"
    >
      <span className="z-10">{children}</span>

      <div className="absolute right-[0.3em] bg-white flex items-center justify-center h-[2.2em] w-[2.2em] rounded-[10em] transition-all duration-600 ease-[cubic-bezier(0.23,1,0.320,1)] group-hover:w-[calc(100%-0.6em)] active:scale-95">
        <svg
          className="w-[1.1em] text-purple-500 transition-transform duration-300 group-hover:translate-x-[0.1em] active:scale-90"
          height={24}
          width={24}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
            fill="currentColor"
          />
        </svg>
      </div>
    </button>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
};

export default FancyButton;
