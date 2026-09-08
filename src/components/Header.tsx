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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Proyectos", href: "/proyectos" },
    { name: "Servicios", href: "/#servicios" },
    { name: "Quiénes Somos", href: "/#quienes-somos" },
    { name: "Contacto", href: "mailto:hola@alternika.com.mx" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-bg-dark/85 backdrop-blur-xl border-b border-bg-border/80 py-3.5"
          : "bg-transparent py-5 md:py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-12 flex items-center justify-between">
        {/* Official SVG Logo */}
        <Link href="/" className="group flex items-center gap-3 focus:outline-none">
          <div className="relative h-8 md:h-10 w-auto flex items-center">
            <Image
              src="/img/Alternika_logo.svg"
              alt="Alternika Logo"
              width={160}
              height={50}
              className="h-8 md:h-10 w-auto object-contain transition-transform group-hover:scale-105"
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

        {/* CTA Button (Top Right - Activates Custom Cursor trigger) */}
        <div className="hidden md:flex items-center">
          <Link
            href="mailto:hola@alternika.com.mx"
            className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-cyan-accent/50 bg-cyan-dim text-white text-xs md:text-sm font-semibold overflow-hidden transition-all duration-300 hover:border-cyan-accent hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
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
            className="md:hidden fixed inset-x-0 top-[65px] bg-bg-card/95 backdrop-blur-2xl border-b border-bg-border p-6 shadow-2xl flex flex-col gap-5 z-50"
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
    </header>
  );
}
