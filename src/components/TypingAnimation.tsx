"use client";

import { useState, useEffect } from "react";

interface TypingAnimationProps {
  texts: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delayBetweenTexts?: number;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  texts,
  typeSpeed = 100,
  deleteSpeed = 50,
  delayBetweenTexts = 2000
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const text = texts[currentTextIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          setCurrentText(text.substring(0, currentText.length + 1));
          if (currentText === text) {
            setTimeout(() => setIsDeleting(true), delayBetweenTexts);
          }
        } else {
          // Deleting
          setCurrentText(text.substring(0, currentText.length - 1));
          if (currentText === "") {
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      },
      isDeleting ? deleteSpeed : typeSpeed
    );

    return () => clearTimeout(timeout);
  }, [
    currentText,
    currentTextIndex,
    isDeleting,
    texts,
    typeSpeed,
    deleteSpeed,
    delayBetweenTexts
  ]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span style={{ color: "var(--primary)" }} className="font-semibold">
      {currentText}
      <span
        className={`inline-block w-0.5 h-6 ml-1 transition-opacity duration-100 ${
          showCursor ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundColor: "var(--primary)" }}
      ></span>
    </span>
  );
};

export default TypingAnimation;
