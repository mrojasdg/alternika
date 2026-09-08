import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Calendar, MapPin, Building, Award } from "lucide-react";
import { TextReveal } from "@/components/TextReveal";

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  // Find next project for navigation
  const currentIndex = PROJECTS.findIndex((p) => p.slug === params.slug);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <div className="py-12 md:py-20 bg-bg-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/proyectos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-cyan-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a todos los proyectos</span>
          </Link>
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-cyan-dim border border-cyan-accent/40 text-cyan-accent mb-4">
            {project.category}
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight mb-6">
            {project.title}
          </h1>

          <p className="text-slate-300 text-lg md:text-2xl max-w-3xl leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* Project Metadata Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 px-8 bg-bg-card border border-bg-border rounded-2xl mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
              <Building className="w-3.5 h-3.5 text-cyan-accent" />
              <span>Cliente</span>
            </div>
            <div className="font-semibold text-white text-sm md:text-base">
              {project.client}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-accent" />
              <span>Año</span>
            </div>
            <div className="font-semibold text-white text-sm md:text-base">
              {project.year}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
              <MapPin className="w-3.5 h-3.5 text-cyan-accent" />
              <span>Ubicación</span>
            </div>
            <div className="font-semibold text-white text-sm md:text-base">
              {project.location}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
              <Award className="w-3.5 h-3.5 text-cyan-accent" />
              <span>Categoría</span>
            </div>
            <div className="font-semibold text-white text-sm md:text-base">
              {project.category}
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-bg-border mb-16 shadow-2xl bg-slate-900">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>

        {/* Overview & Challenge Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          {/* Main Story (Left) */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                Resumen del Proyecto
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                {project.summary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-bg-card p-6 rounded-2xl border border-bg-border">
                <h3 className="font-display text-xl font-bold text-white mb-3 text-cyan-accent">
                  El Reto
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              <div className="bg-bg-card p-6 rounded-2xl border border-bg-border">
                <h3 className="font-display text-xl font-bold text-white mb-3 text-cyan-accent">
                  Nuestra Solución
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Services & Tech (Right) */}
          <div className="lg:col-span-4 bg-bg-card p-8 rounded-3xl border border-bg-border space-y-8">
            <div>
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                Servicios Realizados
              </h3>
              <ul className="space-y-3">
                {project.services.map((service, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-200 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-cyan-accent shrink-0 mt-0.5" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            {project.technologies && project.technologies.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                  Tecnologías & Herramientas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-bg-dark border border-bg-border text-cyan-accent"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Metrics Banner */}
        {project.results && project.results.length > 0 && (
          <div className="bg-gradient-to-r from-bg-card via-bg-hover to-bg-card border border-cyan-accent/30 p-8 md:p-12 rounded-3xl mb-20 shadow-2xl">
            <h3 className="text-xs font-semibold text-cyan-accent uppercase tracking-widest mb-8 text-center">
              Impacto & Resultados Alcanzados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {project.results.map((res, i) => (
                <div key={i} className="space-y-2">
                  <div className="font-display text-4xl md:text-5xl font-black text-white">
                    {res.value}
                  </div>
                  <div className="text-sm text-slate-300 font-medium">
                    {res.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Image Gallery */}
        <div className="space-y-8 mb-24">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
            Galería del Proyecto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-bg-border bg-slate-900">
              <Image
                src={project.secondaryImage}
                alt={`${project.title} detalle`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {project.gallery.map((imgUrl, i) => (
              <div
                key={i}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-bg-border bg-slate-900"
              >
                <Image
                  src={imgUrl}
                  alt={`${project.title} galería ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Next Project Footer Bar */}
        <div className="pt-12 border-t border-bg-border flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 font-medium">Siguiente Proyecto</div>
            <div className="font-display text-2xl font-bold text-white hover:text-cyan-accent transition-colors">
              <Link href={`/proyectos/${nextProject.slug}`}>
                {nextProject.title} ({nextProject.category})
              </Link>
            </div>
          </div>

          <Link
            href={`/proyectos/${nextProject.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-dim border border-cyan-accent/50 text-cyan-accent hover:bg-cyan-accent hover:text-slate-950 font-bold text-sm transition-all duration-300"
          >
            <span>Ver Siguiente</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
