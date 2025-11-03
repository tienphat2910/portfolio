import React from "react";

interface ResumeButtonProps {
  href?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const ResumeButton: React.FC<ResumeButtonProps> = ({
  href,
  onClick,
  children = "Resume"
}) => {
  const buttonContent = (
    <button
      onClick={onClick}
      className="cursor-pointer flex justify-between bg-gray-800 px-4 py-[0.35em] rounded-full text-white tracking-wider shadow-xl hover:bg-gray-900 hover:scale-105 duration-500 hover:ring-1 font-sans w-[150px] h-[45px] sm:h-12 lg:h-[46px] items-center text-[18px]"
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 animate-bounce"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
        />
      </svg>
    </button>
  );

  if (href) {
    return (
      <a href={href} download className="inline-block">
        {buttonContent}
      </a>
    );
  }

  return buttonContent;
};

export default ResumeButton;
