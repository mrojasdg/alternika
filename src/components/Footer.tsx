"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Linkedin, Dribbble, Github, Mail, Globe } from "lucide-react";

export function Footer() {
  const navCol1 = [
    { name: "Servicios", href: "/#servicios" },
    { name: "Proyectos", href: "/proyectos" },
    { name: "Quiénes Somos", href: "/#quienes-somos" },
  ];

  const navCol2 = [
    { name: "Diseño Web", href: "/#servicios" },
    { name: "Diseño Print", href: "/#servicios" },
    { name: "Redes Sociales", href: "/#servicios" },
  ];

  const socialLinks = [
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Dribbble", icon: Dribbble, href: "#" },
    { name: "GitHub", icon: Github, href: "https://github.com/mrojasdg/alternika.git" },
  ];

  return (
    <footer id="contacto" className="bg-bg-dark border-t border-bg-border/80 pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Main Footer Row (Reference Image 4) */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-16">
          
          {/* Left: Email Pill Button & Location */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="mailto:hola@alternika.com.mx"
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-slate-700 bg-bg-card hover:border-cyan-accent hover:text-cyan-accent text-white font-semibold text-base md:text-lg transition-all duration-300 shadow-md group"
              >
                <Mail className="w-5 h-5 text-cyan-accent group-hover:scale-110 transition-transform" />
                <span>hola@alternika.com.mx</span>
              </a>

              <div className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-slate-800 bg-bg-card/50 text-slate-300 text-sm font-medium">
                <Globe className="w-4 h-4 text-cyan-accent" />
                <span>México & Remoto Global</span>
              </div>
            </div>

            <div className="text-xs text-slate-500 space-y-1">
              <div className="font-semibold uppercase tracking-wider text-slate-400">AGENCIA DE DISEÑO DIGITAL</div>
              <div>Especialistas en Sitios Web, Print, Redes Sociales & Branding</div>
            </div>
          </div>

          {/* Right: Quick Links */}
          <div className="grid grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-3">
              {navCol1.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    className="text-base md:text-lg font-medium text-slate-300 hover:text-cyan-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {navCol2.map((link) => (
                <div key={link.name}>
                  <Link
                    href={link.href}
                    className="text-base md:text-lg font-medium text-slate-300 hover:text-cyan-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar (Reference Image 4: Privacy, Year, Social Icons) */}
        <div className="pt-8 border-t border-bg-border/60 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <Link href="#" className="hover:text-slate-300 transition-colors">
              Aviso de Privacidad
            </Link>
            <span>{new Date().getFullYear()}, Alternika</span>
          </div>

          {/* Circular Social Buttons (Reference Image 4) */}
          <div className="flex items-center gap-3">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-slate-900 border border-slate-800 hover:border-cyan-accent text-slate-300 hover:text-cyan-accent flex items-center justify-center transition-all duration-300 group"
                  aria-label={item.name}
                >
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
