"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/TextReveal";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ClientsSection } from "@/components/ClientsSection";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS } from "@/data/projects";
import { ArrowUpRight, Sparkles, Layers, Palette, Share2, Globe } from "lucide-react";

export default function Home() {
  const featuredProjects = PROJECTS.filter((p) => p.featured);

  return (
    <div className="relative">
      {/* HERO SECTION (CENTERED & CENTURY GOTHIC) */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-16 pb-24 overflow-hidden text-center">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-cyan-accent/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10 w-full flex flex-col items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-accent/40 bg-cyan-dim text-cyan-accent text-xs font-semibold uppercase tracking-wider mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Agencia de Diseño Digital & Marca</span>
          </motion.div>

          {/* Century Gothic Letter-by-Letter Animated Headline */}
          <div className="mb-8 w-full flex justify-center">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.08] tracking-tight">
              <TextReveal
                text="Creamos sitios web espectaculares y marcas inolvidables."
                highlightWords={["sitios", "web", "inolvidables"]}
                delay={0.1}
              />
            </h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-300 text-lg sm:text-xl md:text-2xl max-w-3xl leading-relaxed mb-12 font-normal"
          >
            Especialistas en desarrollo web de alto rendimiento en Next.js, diseño print de lujo, estrategias de contenido para redes sociales e identidad de marca.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-5"
          >
            <Link
              href="/proyectos"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cyan-accent hover:bg-cyan-hover text-slate-950 font-extrabold text-base transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.4)]"
              data-cursor="PORTAFOLIO"
            >
              <span>Ver Portafolio (8 Proyectos)</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>

            <Link
              href="mailto:hola@alternika.com.mx"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-bg-border bg-bg-card hover:bg-bg-hover hover:border-cyan-accent/50 text-white font-semibold text-base transition-all duration-300"
            >
              <span>Contacto Directo</span>
            </Link>
          </motion.div>

          {/* Capability Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-20 pt-8 border-t border-bg-border/60 grid grid-cols-2 sm:grid-cols-4 gap-8 w-full max-w-4xl"
          >
            {[
              { icon: Globe, label: "Sitios & Apps Web" },
              { icon: Layers, label: "Diseño Print Premium" },
              { icon: Share2, label: "Redes Sociales & Reels" },
              { icon: Palette, label: "Branding & Logos" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center justify-center gap-2.5 text-slate-400 text-sm">
                  <Icon className="w-4 h-4 text-cyan-accent shrink-0" />
                  <span className="font-medium text-slate-200">{item.label}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* SERVICIOS EN ACORDEÓN (REFERENCIAS 1 Y 2) */}
      <ServicesSection />

      {/* PORTAFOLIO DESTACADO */}
      <section className="py-24 md:py-36 bg-bg-dark relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-accent/30 bg-cyan-dim text-cyan-accent text-xs font-semibold uppercase tracking-wider mb-4"
              >
                <span className="w-2 h-2 rounded-full bg-cyan-accent" />
                Casos de Éxito
              </motion.div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                <TextReveal text="Proyectos Destacados" highlightWords={["Proyectos"]} />
              </h2>
            </div>

            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 text-sm font-bold text-cyan-accent hover:text-white transition-colors group"
            >
              <span>Ver todos los 8 proyectos</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {featuredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* MARCAS & CLIENTES (LOGOTIPOS) */}
      <ClientsSection />

      {/* QUIÉNES SOMOS & DATOS DUROS (REFERENCIA 3: POR QUÉ ALTERNIKA) */}
      <AboutSection />
    </div>
  );
}
