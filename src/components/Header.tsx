"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Proyectos", href: "/proyectos" },
    { name: "Servicios", href: "/#servicios" },
    { name: "Quiénes Somos", href: "/#quienes-somos" },
    { name: "Contacto", href: "/#contacto" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-bg-dark/80 backdrop-blur-lg border-b border-bg-border/60 py-4"
          : "bg-transparent py-6 md:py-8"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2">
          <span className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-white group-hover:text-cyan-accent transition-colors">
            ALTERNIKA<span className="text-cyan-accent inline-block animate-pulse">.</span>
          </span>
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
            href="/#contacto"
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-cyan-accent/50 bg-cyan-dim text-white text-sm font-semibold overflow-hidden transition-all duration-300 hover:border-cyan-accent hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
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
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-x-0 top-[72px] bg-bg-card/95 backdrop-blur-xl border-b border-bg-border p-6 shadow-2xl flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-200 hover:text-cyan-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-cyan-accent text-slate-950 font-bold text-base hover:bg-cyan-hover transition-colors"
            >
              Iniciar Proyecto
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
