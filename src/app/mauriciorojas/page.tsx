"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  MessageCircle,
  Mail,
  Download,
  ExternalLink,
  Sparkles,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  Palette,
  Box,
  Compass,
  CheckCircle2,
  Phone,
  MapPin,
  Send,
  ChevronRight,
  ArrowUpRight,
  Globe,
  FileText,
  Share2,
  Copy,
  Check
} from "lucide-react";

// Proyectos selectos del portafolio gráfico y digital
const FEATURED_PORTFOLIO = [
  {
    id: "aura",
    title: "Aura Digital Luxury",
    category: "UI/UX & E-Commerce 3D",
    role: "Lead UI/UX & Creative Direction",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    link: "/proyectos/aura-digital",
    description: "Plataforma de comercio electrónico de lujo con integración de modelos 3D interactivos, microinteracciones y arquitectura visual de vanguardia.",
    tags: ["UI/UX", "Next.js", "3D Renders", "Figma"]
  },
  {
    id: "kroma",
    title: "Kroma Studio",
    category: "Identidad Visual & Branding",
    role: "Brand Architecture & Typography",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=1200&auto=format&fit=crop",
    link: "/proyectos/kroma-studio",
    description: "Sistema global de identidad de marca para firma de arquitectura de interiores: logotipo adaptable, manual de identidad y papelería física.",
    tags: ["Branding", "Tipografía", "Manual de Marca", "Illustrator"]
  },
  {
    id: "nebula",
    title: "Nébula Magazine",
    category: "Diseño Editorial & Print",
    role: "Editorial Layout & Art Direction",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=1200&auto=format&fit=crop",
    link: "/proyectos/nebula-magazine",
    description: "Diseño y maquetación de revista cultural y tecnológica con acabados táctiles, esquemas reticulares contemporáneos y control de prensa.",
    tags: ["Editorial", "InDesign", "Print Premium", "Dirección de Arte"]
  },
  {
    id: "vortex",
    title: "Vortex Motion & Social",
    category: "Motion Graphics & Redes",
    role: "Motion Design & Social Strategy",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop",
    link: "/proyectos/vortex-social",
    description: "Campaña multicanal y piezas audiovisuales dinámicas (2D/3D) para marcas globales, optimizando retención y alcance publicitario.",
    tags: ["After Effects", "Cinema 4D", "Social Media", "Video"]
  }
];

// Experiencia laboral cronológica
const WORK_EXPERIENCE = [
  {
    company: "Imbera Global",
    role: "Coordinador de Marketing & Diseñador Gráfico Sr.",
    period: "Nov 2022 – Presente",
    highlight: "Dirección estratégica de comunicación visual y marketing digital para todas las marcas del grupo a nivel global.",
    achievements: [
      "Optimización del ecosistema digital corporativo y sincronización con plataformas CRM.",
      "Ejecución y dirección de campañas masivas multicanal asegurando coherencia visual global.",
      "Integración de flujos de trabajo potenciados con Inteligencia Artificial generativa."
    ]
  },
  {
    company: "Ferbel - Adamed",
    role: "Coordinador de Marketing y Diseño",
    period: "Ene 2019 – Nov 2022",
    highlight: "Lideró el rediseño y desarrollo de la totalidad de las páginas web corporativas y catálogos digitales de ventas.",
    achievements: [
      "Producción de contenido audiovisual comercial (fotografía y video de alta producción).",
      "Pautas publicitarias y editoriales en revistas especializadas del sector automotriz y digital."
    ]
  },
  {
    company: "Walworth Válvulas",
    role: "Especialista en Diseño y Desarrollo Visual",
    period: "Nov 2017 – Dic 2018",
    highlight: "Animaciones 3D técnicas avanzadas y simulaciones de fluidos para productos de ingeniería industrial.",
    achievements: [
      "Modelado 3D, render fotorrealista y fotografía técnica industrial de gran escala.",
      "Producción multimedia y edición de video corporativo internacional."
    ]
  },
  {
    company: "Altérnika",
    role: "Diseñador Gráfico Freelance & Consultor Visual",
    period: "Sep 2012 – Presente",
    highlight: "Conceptualización y desarrollo UI/UX para aplicaciones web y móviles de alto impacto.",
    achievements: [
      "Creación de piezas de Motion Graphics y modelado 3D (Cinema 4D / KeyShot).",
      "Consultoría integral de branding, diseño digital y estrategias de captación."
    ]
  },
  {
    company: "Big Bang Creativo S.A. de C.V.",
    role: "Director de Arte y Multimedia",
    period: "Ago 2008 – Sep 2012",
    highlight: "Dirección creativa de campañas de publicidad BTL, sitios web interactivos y branding corporativo."
  }
];

// Paquetería y competencias
const SKILLS_CATEGORIES = [
  {
    title: "UI/UX & Desarrollo Web",
    icon: Compass,
    skills: ["Figma", "Sketch", "Adobe XD", "Framer", "HTML5 & CSS3", "WordPress", "Next.js Basics", "Design Systems"]
  },
  {
    title: "Diseño 3D & Multimedia",
    icon: Box,
    skills: ["Cinema 4D", "KeyShot", "After Effects CC", "Premiere Pro CC", "Final Cut", "Render Fotorrealista", "Simulaciones"]
  },
  {
    title: "Diseño Gráfico & Editorial",
    icon: Palette,
    skills: ["Photoshop CC", "Illustrator CC", "InDesign CC", "Branding & Manuales", "Pre-prensa & Impresión", "Packaging"]
  },
  {
    title: "Estrategia & IA Generativa",
    icon: Sparkles,
    skills: ["IA para Productividad Creativa", "Marketing Digital Omnicanal", "Estrategia BTL", "Dirección de Arte", "CRM & Funnels"]
  }
];

export default function MauricioRojasLanding() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<"todos" | "uiux" | "branding" | "editorial">("todos");

  // Descarga de vCard
  const handleDownloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
N:Rojas;Mauricio;;;
FN:Mauricio Rojas
TITLE:Diseñador Gráfico Senior & Coordinador de Marketing Digital
ORG:Altérnika / Imbera Global
TEL;TYPE=CELL,VOICE:+525522965764
EMAIL;TYPE=INTERNET,WORK:mauriciorojasdiseno@gmail.com
EMAIL;TYPE=INTERNET,HOME:mau@alternika.com.mx
URL:https://alternika.com.mx/mauriciorojas
URL;TYPE=PORTFOLIO:https://mauriciorojas.myportfolio.com
NOTE:Diseñador Gráfico Senior con más de 15 años de experiencia liderando producción visual, UI/UX, 3D y marketing digital.
ADR;TYPE=WORK:;;San Juan del Río;Querétaro;;;México
END:VCARD`;

    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Mauricio_Rojas_Contacto.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText("https://alternika.com.mx/mauriciorojas");
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#040814] text-slate-100 relative selection:bg-cyan-accent selection:text-slate-950 font-sans">
      
      {/* Background Dot Texture */}
      <div className="fixed inset-0 bg-[radial-gradient(#0e2347_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none z-0" />
      
      {/* Subtle Ambient Color Lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,0.12)_0%,transparent_70%)] pointer-events-none z-0 blur-3xl" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_bottom,rgba(16,185,129,0.08)_0%,transparent_70%)] pointer-events-none z-0 blur-3xl" />

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Top Floating Badge & Navigation Link */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-accent transition-colors group"
          >
            <span className="text-cyan-accent font-mono">←</span>
            <span>Volver a Altérnika Studio</span>
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a1630] border border-slate-800 hover:border-cyan-accent/50 text-[11px] text-slate-300 transition-colors"
              title="Copiar enlace de este perfil"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Enlace Copiado</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-cyan-accent" />
                  <span>Compartir Perfil</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* HERO SECTION: DIGITAL ID & INTRO */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-b from-[#09152e]/90 via-[#071126]/90 to-[#050c1c]/95 border border-[#142c57] rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-xl relative overflow-hidden"
          >
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-accent/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 relative z-10">
              
              {/* Photo & Fast Contact CTA */}
              <div className="flex flex-col items-center shrink-0">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-[#040814] ring-4 ring-cyan-accent/80 shadow-[0_0_35px_rgba(0,240,255,0.35)] bg-slate-900 mb-5">
                  <Image
                    src="/img/maurojas.jpg"
                    alt="Mauricio Rojas - Diseñador Gráfico Senior"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>

                {/* Available for projects pill */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Disponible para proyectos</span>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="flex-1 text-center lg:text-left space-y-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-accent/10 border border-cyan-accent/30 text-cyan-accent text-xs font-semibold mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>15+ Años de Experiencia Creativa</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
                    Mauricio Rojas
                  </h1>
                  <p className="text-cyan-accent font-semibold text-base sm:text-lg">
                    Diseñador Gráfico Senior & Coordinador de Marketing Digital
                  </p>
                </div>

                {/* Quick Info Items */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300 pt-1">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-cyan-accent shrink-0" />
                    <span>San Juan del Río, Qro. México</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-cyan-accent shrink-0" />
                    <a href="tel:+525522965764" className="hover:text-cyan-accent transition-colors">
                      (+52) 55 2296 5764
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-cyan-accent shrink-0" />
                    <a href="mailto:mauriciorojasdiseno@gmail.com" className="hover:text-cyan-accent transition-colors">
                      mauriciorojasdiseno@gmail.com
                    </a>
                  </div>
                </div>

                {/* Professional Profile Description */}
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-2">
                  Líder creativo especializado en conceptualización, producción visual y gestión global de marca para empresas industriales y comerciales. Especialista en la integración de <strong className="text-white">diseño UI/UX, animación 3D, desarrollo web, dirección de arte y marketing omnicanal</strong>, con enfoque en optimizar procesos mediante herramientas de Inteligencia Artificial para maximizar el impacto publicitario.
                </p>

                {/* Primary Action Buttons */}
                <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  
                  {/* Descargar CV Completo PDF */}
                  <a
                    href="/Mauricio_Rojas_CV.pdf"
                    download="Mauricio_Rojas_CV.pdf"
                    className="py-3 px-6 rounded-full bg-cyan-accent hover:bg-cyan-hover text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-300 shadow-[0_0_30px_rgba(0,240,255,0.35)] active:scale-95 group"
                  >
                    <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                    <span>Descargar Curriculum (PDF)</span>
                  </a>

                  {/* WhatsApp Directo */}
                  <a
                    href="https://wa.me/525522965764?text=Hola%20Mauricio,%20vi%20tu%20landing%20profesional%20y%20me%20gustar%C3%ADa%20platicar%20sobre%20una%20oportunidad%20o%20proyecto."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-300 hover:border-emerald-400 group"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span>WhatsApp Directo</span>
                  </a>

                  {/* Guardar Contacto (vCard) */}
                  <button
                    onClick={handleDownloadVCard}
                    className="py-3 px-5 rounded-full bg-[#0a1630] border border-[#193669] hover:border-cyan-accent/60 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-300 hover:bg-[#122852] group"
                  >
                    <UserPlus className="w-4 h-4 text-cyan-accent group-hover:scale-110 transition-transform" />
                    <span>Guardar Contacto</span>
                  </button>

                  {/* Portafolio Externo Oficial */}
                  <a
                    href="https://mauriciorojas.myportfolio.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 rounded-full bg-[#060e21] border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-all duration-300 group"
                  >
                    <Globe className="w-4 h-4 text-cyan-accent" />
                    <span>Portafolio MyPortfolio</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* PORTAFOLIO SELECTO (SHOWCASE VISUAL) */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-mono font-bold text-cyan-accent uppercase tracking-wider mb-1">
                Selección de Trabajos
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
                Portafolio Reducido de Experiencia
              </h2>
            </div>
            <a
              href="https://mauriciorojas.myportfolio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-accent hover:underline"
            >
              <span>Ver portafolio extendido completo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURED_PORTFOLIO.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-[#081226]/80 border border-slate-800/90 hover:border-cyan-accent/50 rounded-3xl p-5 sm:p-6 transition-all duration-300 shadow-xl flex flex-col justify-between overflow-hidden relative"
              >
                <div>
                  {/* Image container with zoom effect */}
                  <div className="relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden bg-slate-900 mb-5">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040814]/80 via-transparent to-transparent" />
                    
                    {/* Category pill */}
                    <div className="absolute top-3 left-3 bg-[#040814]/85 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[11px] font-bold text-cyan-accent">
                      {item.category}
                    </div>
                  </div>

                  {/* Title & Role */}
                  <div className="space-y-1 mb-3">
                    <div className="text-[11px] font-semibold text-slate-400">
                      {item.role}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-accent transition-colors font-display">
                      {item.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono bg-[#050c1c] border border-slate-800 text-slate-400 px-2.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Case study link */}
                <Link
                  href={item.link}
                  className="w-full py-2.5 rounded-xl bg-[#0b1836] border border-[#152e5c] hover:border-cyan-accent/60 text-slate-200 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 group-hover:bg-cyan-accent group-hover:text-slate-950"
                >
                  <span>Explorar Caso de Estudio</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* EXPERIENCIA PROFESIONAL (TIMELINE) */}
        <section className="mb-20">
          <div className="mb-8">
            <div className="text-xs font-mono font-bold text-cyan-accent uppercase tracking-wider mb-1">
              Trayectoria de 15+ Años
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
              Experiencia Profesional
            </h2>
          </div>

          <div className="space-y-6">
            {WORK_EXPERIENCE.map((exp, idx) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="bg-[#081226]/70 border border-slate-800/80 rounded-2xl sm:rounded-3xl p-6 sm:p-7 relative hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                      <span>{exp.company}</span>
                      {idx === 0 && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-cyan-accent/15 text-cyan-accent border border-cyan-accent/30 px-2 py-0.5 rounded-full">
                          Actual
                        </span>
                      )}
                    </h3>
                    <div className="text-xs font-semibold text-cyan-accent">
                      {exp.role}
                    </div>
                  </div>
                  <div className="text-xs font-mono text-slate-400 bg-[#050c1c] border border-slate-800 px-3 py-1 rounded-full self-start sm:self-auto">
                    {exp.period}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mb-3 leading-relaxed">
                  {exp.highlight}
                </p>

                {exp.achievements && exp.achievements.length > 0 && (
                  <ul className="space-y-1.5 pt-1">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="text-xs text-slate-400 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-accent shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* COMPETENCIAS TÉCNICAS Y PAQUETERÍA */}
        <section className="mb-20">
          <div className="mb-8">
            <div className="text-xs font-mono font-bold text-cyan-accent uppercase tracking-wider mb-1">
              Habilidades Clave
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-display">
              Competencias Técnicas y Paquetería
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SKILLS_CATEGORIES.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={cat.title}
                  className="bg-[#081226]/80 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-cyan-accent/40 transition-all"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-cyan-accent/15 border border-cyan-accent/30 flex items-center justify-center text-cyan-accent mb-3">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="text-sm font-bold text-white mb-3 font-display">
                      {cat.title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((s) => (
                        <span
                          key={s}
                          className="text-[11px] bg-[#050c1c] border border-slate-800 text-slate-300 px-2.5 py-1 rounded-lg"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* EDUCACIÓN & CERTIFICACIONES */}
        <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Educación */}
          <div className="bg-[#081226]/70 border border-slate-800/80 rounded-3xl p-6 sm:p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-cyan-accent/15 border border-cyan-accent/30 flex items-center justify-center text-cyan-accent">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">Educación</h3>
                <span className="text-xs text-slate-400">Formación Académica Superior</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-bold text-white">
                Licenciatura en Diseño Gráfico
              </div>
              <div className="text-xs text-cyan-accent font-medium">
                Universidad Tecnológica de México (UNITEC)
              </div>
              <div className="text-xs text-slate-400 font-mono pt-1">
                Campus Atizapán | 2005 – 2009
              </div>
            </div>
          </div>

          {/* Cursos y Certificaciones */}
          <div className="bg-[#081226]/70 border border-slate-800/80 rounded-3xl p-6 sm:p-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-display">Cursos & Certificaciones</h3>
                <span className="text-xs text-slate-400">Actualización Continua</span>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong>Inteligencia Artificial y Productividad</strong> — Google</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong>Desarrollo Web (HTML/CSS)</strong> — Google & Tidyslice</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong>Diseño de Prototipos</strong> — Platzi</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong>Diplomado After Effects</strong> — EduMac</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span><strong>Liderazgo y Negociación</strong> — UNITEC</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA FINAL DE CONTACTO & DESCARGA */}
        <section className="bg-gradient-to-br from-[#0c1e40] via-[#08142a] to-[#040814] border-2 border-cyan-500/30 rounded-3xl sm:rounded-[36px] p-8 sm:p-12 text-center relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.15)]">
          <div className="max-w-2xl mx-auto space-y-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-cyan-accent/15 border border-cyan-accent/40 flex items-center justify-center mx-auto text-cyan-accent shadow-[0_0_30px_rgba(0,240,255,0.25)]">
              <Mail className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-4xl font-black text-white font-display tracking-tight">
                ¿Platicamos sobre tu próximo proyecto?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                Disponible para consultoría creativa, dirección de diseño de marca, proyectos UI/UX y colaboraciones estratégicas.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href="mailto:mauriciorojasdiseno@gmail.com?subject=Contacto%20desde%20Portafolio%20Mauricio%20Rojas"
                className="py-3.5 px-6 rounded-full bg-cyan-accent hover:bg-cyan-hover text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_25px_rgba(0,240,255,0.35)] active:scale-95"
              >
                <Mail className="w-4 h-4" />
                <span>Mandarme un Correo</span>
              </a>

              <a
                href="https://wa.me/525522965764?text=Hola%20Mauricio,%20vi%20tu%20landing%20y%20me%20gustar%C3%ADa%20ponerme%20en%20contacto%20contigo."
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all hover:border-emerald-400"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Mandar WhatsApp</span>
              </a>

              <a
                href="/Mauricio_Rojas_CV.pdf"
                download="Mauricio_Rojas_CV.pdf"
                className="py-3.5 px-6 rounded-full bg-[#050c1c] border border-slate-700 hover:border-slate-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
              >
                <Download className="w-4 h-4 text-cyan-accent" />
                <span>Descargar Curriculum Completo</span>
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 text-center text-xs text-slate-500 space-y-2">
          <p>© {new Date().getFullYear()} Mauricio Rojas Espinosa · Diseñador Gráfico Senior & Consultor Visual</p>
          <p className="text-[11px]">
            Desarrollado sobre{" "}
            <Link href="/" className="text-cyan-accent hover:underline font-semibold">
              Altérnika Studio
            </Link>{" "}
            · San Juan del Río, Qro. México
          </p>
        </footer>
      </div>
    </div>
  );
}
