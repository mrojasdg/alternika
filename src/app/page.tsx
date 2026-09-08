"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/TextReveal";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS } from "@/data/projects";
import { ArrowUpRight, Sparkles, Layers, Palette, Share2, Globe } from "lucide-react";

export default function Home() {
  const featuredProjects = PROJECTS.filter((p) => p.featured);

  return (
    <div className="relative">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-12 pb-20 overflow-hidden">
        {/* Glowing Background Light Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-accent/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
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

          {/* Cuberto Main Title Reveal */}
          <div className="max-w-5xl mb-8">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.05] tracking-tight">
              <TextReveal
                text="Creamos sitios web espectaculares y marcas inolvidables."
                highlightWords={["sitios", "web", "inolvidables"]}
                delay={0.1}
              />
            </h1>
          </div>

          {/* Subtitle & Value Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-slate-300 text-lg sm:text-xl md:text-2xl max-w-3xl leading-relaxed mb-12 font-normal"
          >
            Especialistas en desarrollo web de alto rendimiento en Next.js, diseño print de lujo, estrategias de contenido para redes sociales e identidad de marca.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center gap-5"
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
              href="/#contacto"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-bg-border bg-bg-card hover:bg-bg-hover hover:border-cyan-accent/50 text-white font-semibold text-base transition-all duration-300"
              data-cursor="CONTACTO"
            >
              <span>Hablemos de tu idea</span>
            </Link>
          </motion.div>

          {/* Quick Capability Tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-20 pt-8 border-t border-bg-border/60 grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {[
              { icon: Globe, label: "Sitios & Apps Web" },
              { icon: Layers, label: "Diseño Print Premium" },
              { icon: Share2, label: "Redes Sociales & Reels" },
              { icon: Palette, label: "Branding & Logos" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-3 text-slate-400 text-sm">
                  <Icon className="w-5 h-5 text-cyan-accent shrink-0" />
                  <span className="font-medium text-slate-200">{item.label}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ABOUT US SECTION (QUIÉNES SOMOS - CUBERTO STYLE) */}
      <AboutSection />

      {/* FEATURED PORTFOLIO SECTION */}
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

      {/* SERVICES SECTION */}
      <ServicesSection />

      {/* CTA INTERACTIVE BANNER */}
      <section className="py-24 bg-gradient-to-b from-bg-dark to-bg-card border-t border-bg-border/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-cyan-accent/5 pointer-events-none" />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 space-y-8">
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
            ¿Listo para llevar tu marca al siguiente nivel digital?
          </h2>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto">
            Platiquemos sobre tus metas. Diseñamos la estrategia perfecta para tu empresa.
          </p>
          <div className="pt-4">
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-cyan-accent hover:bg-cyan-hover text-slate-950 font-extrabold text-lg transition-all duration-300 shadow-[0_0_40px_rgba(0,240,255,0.5)]"
              data-cursor="EMPEZAR"
            >
              <span>Comenzar Proyecto</span>
              <ArrowUpRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
