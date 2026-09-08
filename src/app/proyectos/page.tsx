"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import { ProjectCard } from "@/components/ProjectCard";
import { TextReveal } from "@/components/TextReveal";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Todos");

  const categories = [
    "Todos",
    "Desarrollo Web",
    "Diseño Print",
    "Redes Sociales",
    "Branding",
    "Fotografía & Video",
    "Modelado 3D",
  ];

  const filteredProjects =
    activeCategory === "Todos"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="py-16 md:py-24 bg-bg-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-accent/30 bg-cyan-dim text-cyan-accent text-xs font-semibold uppercase tracking-wider mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-accent" />
            Portafolio Completo
          </motion.div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
            <TextReveal
              text="Nuestros proyectos destacados y casos de éxito."
              highlightWords={["proyectos", "éxito"]}
              align="center"
            />
          </h1>

          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Explora nuestros trabajos en desarrollo web, publicaciones impresas, campañas para redes sociales, fotos/videos e identidad 3D.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12 border-b border-bg-border pb-6">
          {categories.map((category) => {
            const count =
              category === "Todos"
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.category === category).length;

            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-cyan-accent text-slate-950 shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                    : "bg-bg-card border border-bg-border text-slate-300 hover:border-cyan-accent/40 hover:text-white"
                }`}
              >
                {category} ({count})
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
