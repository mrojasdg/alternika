"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/TextReveal";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ClientsSection } from "@/components/ClientsSection";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS } from "@/data/projects";
import { ArrowUpRight, Layers, Palette, Share2, Globe, Camera, Box } from "lucide-react";

export default function Home() {
  const featuredProjects = PROJECTS.filter((p) => p.featured);

  return (
    <div className="relative">
      {/* HERO SECTION (DARK BLUE MESH GRADIENT & PERFECT 3-LINE HEADLINE) */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-16 md:pt-24 pb-20 md:pb-28 overflow-hidden text-center bg-[#050b18]">
        
        {/* Grainy Mesh Gradient Background Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07132b] via-[#091b3a] to-[#050b18] opacity-90 pointer-events-none" />
        
        {/* Deep Blue Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-[radial-gradient(circle_at_center,rgba(0,180,255,0.18)_0%,rgba(5,15,40,0)_70%)] pointer-events-none blur-2xl" />
        <div className="absolute top-10 left-1/4 w-[450px] h-[450px] bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.12)_0%,rgba(5,15,40,0)_70%)] pointer-events-none blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(10,35,80,0.4)_0%,rgba(5,15,40,0)_70%)] pointer-events-none blur-3xl" />

        {/* Content Container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full flex flex-col items-center justify-center">
          
          {/* Centered Century Gothic Animated Title (Strict 3 Lines) */}
          <div className="mb-6 w-full flex flex-col items-center justify-center text-center">
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.12] tracking-tight space-y-1">
              <div className="w-full flex justify-center">
                <TextReveal
                  text="Una buena idea."
                  highlightWords={["idea."]}
                  delay={0.05}
                  align="center"
                />
              </div>
              <div className="w-full flex justify-center">
                <TextReveal
                  text="Infinitas formas de crearla."
                  highlightWords={["crearla."]}
                  delay={0.2}
                  align="center"
                />
              </div>
              <div className="w-full flex justify-center">
                <TextReveal
                  text="Experiencias que no se olvidan."
                  highlightWords={["olvidan."]}
                  delay={0.35}
                  align="center"
                />
              </div>
            </h1>
          </div>

          {/* Concise Subtitle Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-slate-300 text-xs sm:text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8 md:mb-10 font-normal text-center px-2"
          >
            Agencia de diseño y tecnología especializada en desarrollo web, productos impresos de lujo, redes sociales, foto/video, 3D e identidad de marca.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3.5"
          >
            <Link
              href="/proyectos"
              className="group relative inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-cyan-accent hover:bg-cyan-hover text-slate-950 font-extrabold text-xs sm:text-sm md:text-base transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.4)]"
              data-cursor="PORTAFOLIO"
            >
              <span>Ver proyectos</span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>

            <a
              href="mailto:hola@alternika.com.mx"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-slate-700 bg-bg-card/80 hover:bg-bg-hover hover:border-cyan-accent/50 text-white font-semibold text-xs sm:text-sm md:text-base transition-all duration-300"
            >
              <span>Contacto Directo</span>
            </a>
          </motion.div>

          {/* Mobile Responsive Capability Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-12 md:mt-16 pt-6 border-t border-slate-800/80 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 w-full max-w-5xl"
          >
            {[
              { icon: Globe, label: "Web & Apps" },
              { icon: Layers, label: "Diseño Print" },
              { icon: Share2, label: "Redes Sociales" },
              { icon: Palette, label: "Branding" },
              { icon: Camera, label: "Foto & Video" },
              { icon: Box, label: "Modelado 3D" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center justify-center gap-1.5 sm:gap-2 text-slate-400 text-[11px] sm:text-xs">
                  <Icon className="w-3.5 h-3.5 text-cyan-accent shrink-0" />
                  <span className="font-medium text-slate-200">{item.label}</span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* SERVICIOS EN ACORDEÓN */}
      <ServicesSection />

      {/* PORTAFOLIO DESTACADO */}
      <section className="py-20 md:py-36 bg-bg-dark relative">
        <div className="max-w-7xl mx-auto px-5 md:px-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
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
              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-white">
                <TextReveal text="Proyectos Destacados" highlightWords={["Proyectos"]} align="left" />
              </h2>
            </div>

            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-cyan-accent hover:text-white transition-colors group"
            >
              <span>Ver todos los proyectos</span>
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

      {/* QUIÉNES SOMOS & DATOS DUROS */}
      <AboutSection />
    </div>
  );
}
