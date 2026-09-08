"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  highlightWords?: string[];
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  highlightWords = []
}: TextRevealProps) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: "110%",
      rotateX: 45,
    },
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.28em] gap-y-[0.1em] overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {words.map((word, i) => {
        // Clean word for comparison (remove punctuation)
        const cleanWord = word.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, "").toLowerCase();
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord
        );

        return (
          <span key={i} className="inline-block overflow-hidden py-1">
            <motion.span
              variants={child}
              className={`inline-block origin-bottom ${
                isHighlighted
                  ? "text-cyan-accent font-semibold drop-shadow-[0_0_15px_rgba(0,240,255,0.4)]"
                  : "text-white"
              }`}
            >
              {word}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}
