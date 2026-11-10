"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/TextReveal";
import { AboutSection } from "@/components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ClientsSection } from "@/components/ClientsSection";
import { ProjectCard } from "@/components/ProjectCard";
import { PROJECTS } from "@/data/projects";
import { ArrowUpRight, ChevronDown } from "lucide-react";

export default function Home() {
  const featuredProjects = PROJECTS.filter((p) => p.featured);

  return (
    <div className="relative">
      {/* HERO SECTION */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-between pt-8 sm:pt-12 md:pt-16 pb-8 sm:pb-10 overflow-hidden text-center bg-[#040814]">
        
        {/* Dark Textured Dot Grid Pattern Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#0e2347_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
        
        {/* Gradient Mesh Layer */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#061026] via-[#091a38] to-[#040814] opacity-95 pointer-events-none" />

        {/* Left & Right Glowing Ray Flares */}
        <div className="absolute top-1/4 -left-20 sm:-left-32 w-[320px] sm:w-[500px] h-[300px] sm:h-[400px] bg-cyan-accent/15 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none rotate-45" />
        <div className="absolute top-1/4 -right-20 sm:-right-32 w-[320px] sm:w-[500px] h-[300px] sm:h-[400px] bg-cyan-accent/15 rounded-full blur-[90px] sm:blur-[120px] pointer-events-none -rotate-45" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[340px] sm:w-[800px] h-[340px] sm:h-[500px] bg-[radial-gradient(circle_at_center,rgba(0,180,255,0.18)_0%,rgba(4,8,20,0)_70%)] pointer-events-none blur-2xl" />

        {/* Top Logo - Much bigger on mobile */}
        <div className="relative z-10 w-full flex justify-center pt-2 sm:pt-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center p-2"
          >
            <Image
              src="/img/Alternika_logo.svg"
              alt="Alternika Logo"
              width={420}
              height={140}
              className="h-28 sm:h-24 md:h-28 lg:h-32 w-auto max-w-[88vw] object-contain drop-shadow-[0_0_35px_rgba(0,240,255,0.35)]"
              priority
            />
          </motion.div>
        </div>

        {/* Main Hero Center Content Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full flex flex-col items-center justify-center my-auto py-6">
          
          {/* Centered Headline */}
          <div className="mb-6 w-full flex flex-col items-center justify-center text-center">
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.08] tracking-tight space-y-1">
              <div className="w-full flex justify-center">
                <TextReveal
                  text="Construimos marcas."
                  highlightWords={["marcas."]}
                  delay={0.05}
                  align="center"
                />
              </div>
              <div className="w-full flex justify-center">
                <TextReveal
                  text="Creamos experiencias."
                  highlightWords={["experiencias."]}
                  delay={0.2}
                  align="center"
                />
              </div>
            </h1>
          </div>

          {/* Descriptive Copy */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed mb-8 font-normal text-center px-2"
          >
            Tu aliado creativo y tecnológico. Fusionamos diseño web, estrategia digital, foto, video y 3D para que tu proyecto destaque en cualquier plataforma, física o digital.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto max-w-xs sm:max-w-none px-4 sm:px-0"
          >
            <Link
              href="/proyectos"
              className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-cyan-accent hover:bg-cyan-hover text-slate-950 font-extrabold text-xs sm:text-sm md:text-base transition-all duration-300 shadow-[0_0_35px_rgba(0,240,255,0.45)] active:scale-95"
              data-cursor="PORTAFOLIO"
            >
              <span>Ver proyectos</span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <a
              href="mailto:hola@alternika.com.mx"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full border border-slate-700/90 bg-[#09152e]/80 hover:bg-[#0e2045] hover:border-cyan-accent/50 text-white font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 active:scale-95"
            >
              <span>Contacto Directo</span>
            </a>
          </motion.div>
        </div>

        {/* Animated Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{ opacity: { delay: 0.8 }, y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }}
          className="relative z-10 flex flex-col items-center gap-1 text-slate-500 text-[10px] sm:text-[11px] uppercase tracking-widest pt-1 pointer-events-none"
        >
          <span>Scroll para explorar</span>
          <ChevronDown className="w-3.5 h-3.5 text-cyan-accent" />
        </motion.div>
      </section>

      {/* QUIÉNES SOMOS & DATOS DUROS */}
      <AboutSection />

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
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-16">
            {featuredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>

          {/* Bottom Button "Ver más proyectos" */}
          <div className="flex justify-center pt-4">
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-cyan-dim border border-cyan-accent/50 text-cyan-accent hover:bg-cyan-accent hover:text-slate-950 font-extrabold text-base transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.25)] group"
              data-cursor="PORTAFOLIO"
            >
              <span>Ver más proyectos</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* MARCAS & CLIENTES (LOGOTIPOS) */}
      <ClientsSection />
    </div>
  );
}
