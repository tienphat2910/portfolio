"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // Load theme from localStorage, default to light
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
      setTheme(savedTheme);
    } else {
      // If no valid theme saved, default to light and save it
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      document.documentElement.classList.remove("dark");
    }
    // Tell browsers (Edge in particular) the preferred color scheme so
    // CSS custom properties are recalculated. This helps Edge pick up
    // changes to --foreground / other vars immediately.
    try {
      (document.documentElement.style as any).colorScheme =
        theme === "dark" ? "dark" : "light";
      // Force a reflow so the UA applies updated custom properties now.
      // Reading offsetHeight is a cheap way to trigger it.
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      document.documentElement.offsetHeight;
    } catch (e) {
      // ignore in environments where document is not available
    }
    // Save to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
