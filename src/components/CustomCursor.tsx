"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState("");
  const [isActiveTarget, setIsActiveTarget] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check if target or parent has data-cursor attribute
      const target = e.target as HTMLElement | null;
      const hoverEl = target?.closest("[data-cursor]") as HTMLElement | null;

      if (hoverEl) {
        setIsActiveTarget(true);
        setCursorText(hoverEl.getAttribute("data-cursor") || "");
      } else {
        setIsActiveTarget(false);
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <AnimatePresence>
      {isActiveTarget && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="flex items-center justify-center rounded-full bg-cyan-accent text-slate-950 font-bold text-xs tracking-wider shadow-[0_0_25px_rgba(0,240,255,0.6)]"
            style={{
              left: mousePosition.x - 40,
              top: mousePosition.y - 40,
              position: "fixed",
              width: 80,
              height: 80,
            }}
            transition={{
              type: "spring",
              damping: 22,
              stiffness: 280,
              mass: 0.4,
            }}
          >
            <span className="uppercase text-center px-1 text-[11px] font-extrabold leading-tight">
              {cursorText}
            </span>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
