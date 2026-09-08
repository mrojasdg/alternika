"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hover targets with data attributes
      const target = e.target as HTMLElement | null;
      const hoverEl = target?.closest("[data-cursor]") as HTMLElement | null;

      if (hoverEl) {
        setIsHovered(true);
        setCursorText(hoverEl.getAttribute("data-cursor") || "");
      } else if (target?.closest("a, button")) {
        setIsHovered(true);
        setCursorText("");
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Outer Glow / Follower Circle */}
      <motion.div
        className={`flex items-center justify-center rounded-full transition-colors duration-300 ${
          cursorText
            ? "bg-cyan-accent text-slate-950 font-bold text-xs tracking-wider"
            : isHovered
            ? "border-2 border-cyan-accent bg-cyan-accent/10"
            : "border border-cyan-accent/40 bg-transparent"
        }`}
        animate={{
          x: mousePosition.x - (cursorText ? 40 : isHovered ? 25 : 16),
          y: mousePosition.y - (cursorText ? 40 : isHovered ? 25 : 16),
          width: cursorText ? 80 : isHovered ? 50 : 32,
          height: cursorText ? 80 : isHovered ? 50 : 32,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 250,
          mass: 0.5,
        }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="uppercase"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Center Dot */}
      {!cursorText && (
        <motion.div
          className="fixed rounded-full bg-cyan-accent"
          animate={{
            x: mousePosition.x - 3,
            y: mousePosition.y - 3,
            width: 6,
            height: 6,
            opacity: isHovered ? 0 : 1,
          }}
          transition={{
            type: "spring",
            damping: 35,
            stiffness: 400,
          }}
        />
      )}
    </div>
  );
}
