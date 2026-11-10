"use client";

import { motion } from "framer-motion";
import { TextReveal } from "./TextReveal";
import { ArrowUpRight, Globe, Palette, Box, Share2, Camera, Layers } from "lucide-react";
import Link from "next/link";

const SERVICES_CARDS = [
  {
    id: "web",
    category: "DIGITAL & APPS",
    title: "UI/UX & Desarrollo Web",
    description: "Sistemas de diseño, prototipado interactivo en Figma, diseño web enfocado a conversión y plataformas modernas en Next.js y WordPress.",
    tags: "Figma · HTML5 · Web",
    icon: Globe,
    theme: {
      badgeBg: "bg-cyan-accent/15",
      badgeBorder: "border-cyan-accent/30",
      badgeText: "text-cyan-accent",
      borderHover: "hover:border-cyan-400/60",
      glow: "hover:shadow-[0_15px_35px_rgba(0,240,255,0.18)]",
      footerText: "text-cyan-accent"
    }
  },
  {
    id: "branding",
    category: "IDENTIDAD",
    title: "Branding & Diseño Editorial",
    description: "Construcción integral de marcas: diseño de logotipo, manuales normativos, empaques, catálogos comerciales y supervisión de imprenta.",
    tags: "InDesign · Illustrator",
    icon: Palette,
    theme: {
      badgeBg: "bg-purple-500/15",
      badgeBorder: "border-purple-500/30",
      badgeText: "text-purple-400",
      borderHover: "hover:border-purple-400/60",
      glow: "hover:shadow-[0_15px_35px_rgba(168,85,247,0.18)]",
      footerText: "text-purple-400"
    }
  },
  {
    id: "3d",
    category: "AUDIOVISUAL",
    title: "Modelado 3D & Motion",
    description: "Animaciones técnicas 3D, simulaciones industriales, renders fotorrealistas y video corporativo en After Effects y Cinema 4D.",
    tags: "Cinema 4D · KeyShot",
    icon: Box,
    theme: {
      badgeBg: "bg-emerald-500/15",
      badgeBorder: "border-emerald-500/30",
      badgeText: "text-emerald-400",
      borderHover: "hover:border-emerald-400/60",
      glow: "hover:shadow-[0_15px_35px_rgba(16,185,129,0.18)]",
      footerText: "text-emerald-400"
    }
  },
  {
    id: "social",
    category: "SOCIAL MEDIA",
    title: "Redes Sociales & Paid Ads",
    description: "Parrillas visuales de alto impacto, formatos verticales para TikTok y Reels, diseño de pautas publicitarias pagadas y motion graphics.",
    tags: "After Effects · Reels · Ads",
    icon: Share2,
    theme: {
      badgeBg: "bg-rose-500/15",
      badgeBorder: "border-rose-500/30",
      badgeText: "text-rose-400",
      borderHover: "hover:border-rose-400/60",
      glow: "hover:shadow-[0_15px_35px_rgba(244,63,94,0.18)]",
      footerText: "text-rose-400"
    }
  },
  {
    id: "foto-video",
    category: "PRODUCCIÓN",
    title: "Fotografía & Video Comercial",
    description: "Fotografía de producto en alta resolución, cobertura de eventos y producción de video comercial con dirección de arte cinematográfica.",
    tags: "Foto Pro · 4K Video · Grading",
    icon: Camera,
    theme: {
      badgeBg: "bg-amber-500/15",
      badgeBorder: "border-amber-500/30",
      badgeText: "text-amber-400",
      borderHover: "hover:border-amber-400/60",
      glow: "hover:shadow-[0_15px_35px_rgba(245,158,11,0.18)]",
      footerText: "text-amber-400"
    }
  },
  {
    id: "print",
    category: "EDITORIAL & PRINT",
    title: "Diseño Print & Packaging",
    description: "Diseño y producción de empaques, papelería corporativa de lujo, gran formato y material POP con acabados especiales de imprenta.",
    tags: "Packaging · Print · Gran Formato",
    icon: Layers,
    theme: {
      badgeBg: "bg-sky-500/15",
      badgeBorder: "border-sky-500/30",
      badgeText: "text-sky-400",
      borderHover: "hover:border-sky-400/60",
      glow: "hover:shadow-[0_15px_35px_rgba(14,165,233,0.18)]",
      footerText: "text-sky-400"
    }
  }
];

export function ServicesSection() {
  return (
    <section id="servicios" className="py-20 md:py-36 bg-bg-dark relative border-t border-bg-border/60">
      <div className="max-w-7xl mx-auto px-5 md:px-12">
        {/* Section Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-accent/30 bg-cyan-dim text-cyan-accent text-xs font-semibold uppercase tracking-wider mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-accent" />
          Servicios Especializados
        </motion.div>

        {/* Title */}
        <div className="mb-12 md:mb-16 max-w-3xl">
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            <TextReveal
              text="Soluciones integrales de diseño para hacer destacar tu negocio."
              highlightWords={["integrales", "diseño", "destacar"]}
              align="left"
            />
          </h2>
        </div>

        {/* Services Colorful Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_CARDS.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className={`group relative bg-[#071126]/90 border border-slate-800/90 ${service.theme.borderHover} rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl ${service.theme.glow}`}
              >
                <div>
                  {/* Icon Container in rounded squircle */}
                  <div
                    className={`w-12 h-12 rounded-2xl ${service.theme.badgeBg} border ${service.theme.badgeBorder} flex items-center justify-center ${service.theme.badgeText} mb-6 group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Category Uppercase Label */}
                  <span className={`text-[11px] font-bold uppercase tracking-widest ${service.theme.badgeText} block mb-2`}>
                    {service.category}
                  </span>

                  {/* Service Title */}
                  <h3 className="font-display text-xl sm:text-2xl font-black text-white mb-3 tracking-tight group-hover:text-white transition-colors">
                    {service.title}
                  </h3>

                  {/* Brief Effective Description */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                {/* Footer with Software / Tech Tags and Arrow */}
                <div
                  className={`mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold ${service.theme.footerText}`}
                >
                  <span>{service.tags}</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA bar */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-xs sm:text-sm text-center sm:text-left">
            ¿Tienes un requerimiento específico o necesitas un proyecto a la medida?
          </p>
          <a
            href="mailto:hola@alternika.com.mx"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-cyan-accent hover:bg-cyan-hover text-slate-950 font-extrabold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] active:scale-95 shrink-0"
          >
            <span>Cotizar un Proyecto</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
