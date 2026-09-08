"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Menu appears only after scrolling 60px down
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Proyectos", href: "/proyectos" },
    { name: "Servicios", href: "/#servicios" },
    { name: "Quiénes Somos", href: "/#quienes-somos" },
    { name: "Contacto", href: "mailto:hola@alternika.com.mx" },
  ];

  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-50 bg-[#060b17]/90 backdrop-blur-xl border-b border-[#101f3f] py-3 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-5 md:px-12 flex items-center justify-between">
            {/* Official SVG Logo */}
            <Link href="/" className="group flex items-center gap-3 focus:outline-none">
              <div className="relative h-9 md:h-11 w-auto flex items-center">
                <Image
                  src="/img/Alternika_logo.svg"
                  alt="Alternika Logo"
                  width={180}
                  height={60}
                  className="h-9 md:h-11 w-auto object-contain transition-transform group-hover:scale-105"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-slate-300 hover:text-cyan-accent transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-cyan-accent hover:after:w-full after:transition-all"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:flex items-center">
              <Link
                href="mailto:hola@alternika.com.mx"
                className="group relative inline-flex items-center gap-2 px-6 py-2 rounded-full border border-cyan-accent/50 bg-cyan-dim text-white text-xs md:text-sm font-semibold transition-all duration-300 hover:border-cyan-accent hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                data-cursor="HABLEMOS"
              >
                <span className="relative z-10 group-hover:text-cyan-accent transition-colors">
                  Iniciar Proyecto
                </span>
                <ArrowUpRight className="w-4 h-4 relative z-10 text-cyan-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-200 hover:text-cyan-accent focus:outline-none"
              aria-label="Menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu Overlay */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="md:hidden fixed inset-x-0 top-[65px] bg-[#060b17]/95 backdrop-blur-2xl border-b border-[#101f3f] p-6 shadow-2xl flex flex-col gap-4 z-50"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium text-slate-200 hover:text-cyan-accent transition-colors py-1"
                  >
                    {link.name}
                  </Link>
                ))}
                <a
                  href="mailto:hola@alternika.com.mx"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-cyan-accent text-slate-950 font-bold text-sm hover:bg-cyan-hover transition-colors mt-2"
                >
                  Iniciar Proyecto
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
