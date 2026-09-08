"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.15 }}
      className="group block"
    >
      <Link
        href={`/proyectos/${project.slug}`}
        className="block relative rounded-3xl overflow-hidden bg-bg-card border border-bg-border hover:border-cyan-accent/50 transition-all duration-500 shadow-2xl"
        data-cursor="VER PROYECTO"
      >
        {/* Aspect Ratio Container for Image */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out brightness-90 group-hover:brightness-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
            priority={index < 2}
          />
          
          {/* Subtle Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />

          {/* Top Pill Category Tag */}
          <div className="absolute top-6 left-6 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-bg-dark/80 backdrop-blur-md border border-cyan-accent/40 text-cyan-accent">
              {project.category}
            </span>
          </div>

          {/* Hover Arrow Icon Floating Badge */}
          <div className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-cyan-accent/90 text-slate-950 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 translate-x-2 -translate-y-2 transition-all duration-300 shadow-lg">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 md:p-8 bg-bg-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span>{project.client}</span>
              <span>{project.year}</span>
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white group-hover:text-cyan-accent transition-colors mb-2">
              {project.title}
            </h3>
            <p className="text-slate-400 text-sm line-clamp-2 leading-relaxed">
              {project.subtitle}
            </p>
          </div>

          {/* Tech/Services Badges */}
          <div className="mt-6 pt-4 border-t border-bg-border/60 flex flex-wrap gap-2">
            {project.services.slice(0, 3).map((service, i) => (
              <span
                key={i}
                className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-bg-dark border border-bg-border text-slate-300"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
