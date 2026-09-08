"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  highlightWords?: string[];
  align?: "center" | "left" | "right";
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  highlightWords = [],
  align = "center"
}: TextRevealProps) {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.025,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: {
      opacity: 0,
      y: "100%",
      rotateX: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 120,
      },
    },
  };

  const justifyClass = align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start";

  return (
    <motion.span
      className={`inline-flex flex-wrap ${justifyClass} text-center gap-x-[0.25em] gap-y-[0.05em] w-full ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {words.map((word, wordIndex) => {
        const cleanWord = word.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, "").toLowerCase();
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord
        );

        return (
          <span
            key={wordIndex}
            className="inline-flex overflow-hidden py-1 whitespace-nowrap"
          >
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={letterVariants}
                className={`inline-block origin-bottom ${
                  isHighlighted
                    ? "text-cyan-accent font-semibold drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                    : "text-white"
                }`}
              >
                {char}
              </motion.span>
            ))}
          </span>
        );
      })}
    </motion.span>
  );
}
