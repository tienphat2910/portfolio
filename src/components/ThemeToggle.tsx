"use client";

import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="switch relative inline-block w-16 h-8">
      {/* Sun Icon */}
      <span className="sun absolute top-1.5 left-9 z-10 w-6 h-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-full h-full text-yellow-300 animate-spin"
          style={{ animationDuration: "15s" }}
        >
          <g fill="currentColor">
            <circle r={5} cy={12} cx={12} />
            <path d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z" />
          </g>
        </svg>
      </span>

      {/* Moon Icon */}
      <span className="moon absolute top-1 left-1 z-10 w-6 h-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-full h-full text-sky-400 animate-tilt"
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
            fill="currentColor"
          />
        </svg>
      </span>

      {/* Hidden Checkbox */}
      <input
        type="checkbox"
        className="input opacity-0 w-0 h-0"
        onChange={toggleTheme}
      />

      {/* Slider */}
      <span
        className={`slider absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-400 ease-in-out shadow-lg ${
          theme === "dark" ? "bg-slate-800" : "bg-sky-400"
        }`}
      >
        <span
          className={`absolute content-[''] h-7 w-7 bg-gray-100 rounded-full bottom-0.5 z-20 transition-all duration-400 ease-in-out shadow-md ${
            theme === "dark" ? "left-8" : "left-0.5"
          }`}
        ></span>
      </span>
    </label>
  );
};

export default ThemeToggle;
