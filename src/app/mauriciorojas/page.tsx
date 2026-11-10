"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  UserPlus,
  MessageCircle,
  Mail,
  Download,
  Sparkles,
  GraduationCap,
  Award,
  Layers,
  Palette,
  Box,
  Compass,
  CheckCircle2,
  Phone,
  MapPin,
  ArrowUpRight,
  Share2,
  Check,
  Clock,
  Building2
} from "lucide-react";
import { PortfolioGallery } from "@/components/PortfolioGallery";


// Experiencia laboral cronológica
const WORK_EXPERIENCE = [
  {
    company: "Imbera Global",
    role: "Coordinador de Marketing & Diseñador Gráfico Sr.",
    period: "Nov 2022 – Presente",
    highlight: "Dirección estratégica de comunicación visual y marketing digital para todas las marcas del grupo a nivel global.",
    achievements: [
      "Optimización integral del ecosistema digital corporativo y sincronización con plataformas CRM.",
      "Ejecución y supervisión de campañas masivas multicanal asegurando coherencia visual global.",
      "Integración de flujos creativos potenciados con Inteligencia Artificial generativa."
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
    highlight: "Dirección creativa de campañas de publicidad BTL, sitios web interactivos y papelería corporativa."
  }
];

// Paquetería y competencias
const SKILLS_CATEGORIES = [
  {
    title: "UI/UX & Desarrollo Web",
    icon: Compass,
    skills: ["Figma", "Sketch", "Adobe XD", "Framer", "HTML5 & CSS3", "WordPress", "Design Systems"]
  },
  {
    title: "Diseño 3D & Multimedia",
    icon: Box,
    skills: ["Cinema 4D", "KeyShot", "After Effects CC", "Premiere Pro CC", "Final Cut", "Render Fotorrealista"]
  },
  {
    title: "Diseño Gráfico & Editorial",
    icon: Palette,
    skills: ["Photoshop CC", "Illustrator CC", "InDesign CC", "Branding & Manuales", "Pre-prensa & Impresión"]
  },
  {
    title: "Estrategia & IA Generativa",
    icon: Sparkles,
    skills: ["IA aplicada a Creatividad", "Marketing Omnicanal", "Estrategia BTL", "Dirección de Arte", "CRM & Funnels"]
  }
];

export default function MauricioRojasLanding() {
  const [copiedLink, setCopiedLink] = useState(false);
  const [showDock, setShowDock] = useState(false);


  // Controlar barra flotante móvil al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 380) {
        setShowDock(true);
      } else {
        setShowDock(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
NOTE:Diseñador Gráfico Senior con más de 16 años de experiencia liderando producción visual, UI/UX, 3D y marketing digital.
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
    <div className="min-h-screen bg-[#040814] text-slate-100 relative selection:bg-cyan-accent selection:text-slate-950 font-sans pb-24 lg:pb-16">
      
      {/* Background Dot Grid Texture */}
      <div className="fixed inset-0 bg-[radial-gradient(#0e2347_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none z-0" />
      
      {/* Subtle Ambient Color Lighting */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(0,240,255,0.12)_0%,transparent_70%)] pointer-events-none z-0 blur-3xl" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_bottom,rgba(16,185,129,0.08)_0%,transparent_70%)] pointer-events-none z-0 blur-3xl" />

      {/* Top Floating Mini-Nav */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2">
        <div className="flex items-center justify-between py-2 border-b border-slate-800/80">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-cyan-accent transition-colors group"
          >
            <span className="text-cyan-accent font-mono text-sm">←</span>
            <span>Volver a Altérnika Studio</span>
          </Link>
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
                <span>Compartir</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Page Layout (Two Columns on Desktop: Sticky Sidebar + Main Content) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_minmax(0,1fr)] xl:grid-cols-[400px_minmax(0,1fr)] gap-8 lg:gap-12 items-start">
          
          {/* ======================================================== */}
          {/* COLUMNA IZQUIERDA: PERFIL CARD ELEGANTE (STICKY EN DESKTOP) */}
          {/* ======================================================== */}
          <aside className="lg:sticky lg:top-8 w-full">
            <div className="bg-[#081226]/95 border border-[#142a59] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
              
              {/* Cover Banner con Branding Altérnika */}
              <div className="relative h-32 sm:h-36 bg-gradient-to-r from-[#030919] via-[#0b1f47] to-[#011438] overflow-hidden">
                {/* Decorative mesh rays */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.25)_0%,transparent_60%)]" />
                <div className="absolute top-4 left-5 flex items-center gap-2">
                  <Image
                    src="/img/Alternika_logo.svg"
                    alt="Altérnika"
                    width={100}
                    height={30}
                    className="h-6 w-auto opacity-90"
                  />
                </div>
                <div className="absolute bottom-3 right-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-accent/80 bg-cyan-accent/10 border border-cyan-accent/20 px-2 py-0.5 rounded-full">
                    Official ID
                  </span>
                </div>
              </div>

              {/* Profile Card Body */}
              <div className="px-6 pb-6 pt-0 flex flex-col items-center text-center">
                
                {/* Avatar Circular Sobrepuesto */}
                <div className="relative -mt-16 sm:-mt-18 mb-4">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-[#081226] ring-2 ring-cyan-accent shadow-[0_0_25px_rgba(0,240,255,0.35)] bg-slate-900">
                    <Image
                      src="/img/maurojas.jpg"
                      alt="Mauricio Rojas"
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </div>
                  {/* Dot status activo */}
                  <span
                    className="absolute bottom-1 right-2 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#081226] shadow-sm"
                    title="Disponible para proyectos"
                  />
                </div>

                {/* Nombre y Cargo */}
                <h1 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Mauricio Rojas
                </h1>
                <p className="text-cyan-accent font-semibold text-xs sm:text-sm mt-1 leading-snug">
                  Diseñador Gráfico Senior<br className="hidden sm:inline" /> & Coordinador de Marketing Digital
                </p>

                {/* Tags / Pills de Perfil */}
                <ul className="flex flex-wrap items-center justify-center gap-1.5 mt-3.5">
                  <li className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050c1c] border border-slate-800 text-[11px] text-slate-300">
                    <MapPin className="w-3 h-3 text-cyan-accent shrink-0" />
                    <span>San Juan del Río, Qro.</span>
                  </li>
                  <li className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#050c1c] border border-slate-800 text-[11px] text-slate-300">
                    <GraduationCap className="w-3 h-3 text-cyan-accent shrink-0" />
                    <span>UNITEC Diseño Gráfico</span>
                  </li>
                </ul>

                {/* CTAs Principales */}
                <div className="w-full space-y-2.5 mt-6">
                  {/* 1. Guardar Mi Contacto (vCard) */}
                  <button
                    onClick={handleDownloadVCard}
                    className="w-full py-3.5 px-5 rounded-2xl bg-cyan-accent hover:bg-cyan-hover text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-200 shadow-[0_0_25px_rgba(0,240,255,0.3)] active:scale-98 group"
                  >
                    <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Guardar mi contacto</span>
                  </button>

                  {/* 2. Enviar WhatsApp */}
                  <a
                    href="https://wa.me/525522965764?text=Hola%20Mauricio,%20vi%20tu%20landing%20profesional%20y%20me%20gustar%C3%ADa%20conectar%20contigo."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-5 rounded-2xl bg-[#0e271a] border border-emerald-500/50 hover:bg-[#133523] text-emerald-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-200 shadow-sm group"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <span>Enviarme un WhatsApp</span>
                  </a>

                  {/* 3. Descargar Curriculum (PDF) */}
                  <a
                    href="/Mauricio_Rojas_CV.pdf"
                    download="Mauricio_Rojas_CV.pdf"
                    className="w-full py-3.5 px-5 rounded-2xl bg-[#0a1630] border border-[#193669] hover:border-cyan-accent/60 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-200 hover:bg-[#122852] group"
                  >
                    <Download className="w-4 h-4 text-cyan-accent group-hover:-translate-y-0.5 transition-transform" />
                    <span>Descargar Curriculum (PDF)</span>
                  </a>
                </div>

                {/* Quick Icon Row (Llamar, Correo, Portafolio, Compartir) */}
                <div className="grid grid-cols-4 gap-2 w-full mt-5 pt-5 border-t border-slate-800/80">
                  <a
                    href="tel:+525522965764"
                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors group"
                    title="Llamar al (+52) 55 2296 5764"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#050c1c] border border-slate-800 flex items-center justify-center text-cyan-accent group-hover:bg-cyan-accent group-hover:text-slate-950 transition-all">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-semibold">Llamar</span>
                  </a>

                  <a
                    href="mailto:mauriciorojasdiseno@gmail.com?subject=Contacto%20Mauricio%20Rojas"
                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors group"
                    title="Enviar correo electrónico"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#050c1c] border border-slate-800 flex items-center justify-center text-cyan-accent group-hover:bg-cyan-accent group-hover:text-slate-950 transition-all">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-semibold">Correo</span>
                  </a>

                  <a
                    href="https://wa.me/525522965764?text=Hola%20Mauricio,%20vi%20tu%20landing%20profesional%20y%20me%20gustar%C3%ADa%20conectar%20contigo."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors group"
                    title="Enviar mensaje por WhatsApp"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#050c1c] border border-slate-800 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                      <MessageCircle className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-semibold">WhatsApp</span>
                  </a>

                  <button
                    onClick={handleCopyLink}
                    className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors group"
                    title="Copiar enlace"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#050c1c] border border-slate-800 flex items-center justify-center text-cyan-accent group-hover:bg-cyan-accent group-hover:text-slate-950 transition-all">
                      <Share2 className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-semibold">Compartir</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* ======================================================== */}
          {/* COLUMNA DERECHA: CONTENIDO ESTRUCTURADO EN CARDS */}
          {/* ======================================================== */}
          <main className="w-full space-y-10 sm:space-y-12">
            
            {/* SECCIÓN 1: INTRODUCCIÓN + CARDS DE DATOS DESTACADOS */}
            <section className="space-y-5">
              
              {/* Card de Titular y Manifiesto Profesional */}
              <div className="bg-[#081226]/80 border border-slate-800/90 rounded-3xl p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-accent uppercase tracking-wider mb-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-accent" />
                  <span>Perfil Profesional</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-display tracking-tight leading-tight">
                  Diseño marcas memorables y desarrollo <span className="text-cyan-accent">experiencias visuales</span> que impulsan negocios.
                </h2>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mt-4">
                  Especialista en <strong className="text-white">UI/UX, modelado 3D técnico, branding y desarrollo web</strong>. Optimizando flujos creativos con Inteligencia Artificial.
                </p>
              </div>

              {/* GRID DE CARDS CON DATOS RELEVANTES (16+ AÑOS, EMPRESAS, ALCANCE, FORMACIÓN) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                
                {/* Card 1: 16+ Años de Experiencia */}
                <div className="bg-gradient-to-br from-[#0c2447] via-[#08162f] to-[#040c1c] border border-cyan-500/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between shadow-[0_0_20px_rgba(0,240,255,0.15)] relative overflow-hidden group hover:border-cyan-400 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-cyan-accent/20 flex items-center justify-center text-cyan-accent mb-3">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-cyan-accent font-display tracking-tight">
                      16+
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-300 font-semibold mt-0.5">
                      Años de Trayectoria
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Más de 16 años de experiencia
                    </div>
                  </div>
                </div>

                {/* Card 2: Liderazgo Global & Marcas */}
                <div className="bg-[#081226]/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-slate-700 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400 mb-3">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-display tracking-tight">
                      5+
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-300 font-semibold mt-0.5">
                      Empresas Clave
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Imbera, Walworth, Ferbel...
                    </div>
                  </div>
                </div>

                {/* Card 3: Disciplinas Integradas */}
                <div className="bg-[#081226]/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-slate-700 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center text-purple-400 mb-3">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-display tracking-tight">
                      360°
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-300 font-semibold mt-0.5">
                      Visión Creativa
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      UI/UX, 3D, Branding & Print
                    </div>
                  </div>
                </div>

                {/* Card 4: IA & Productividad */}
                <div className="bg-[#081226]/80 border border-slate-800 rounded-2xl p-4 sm:p-5 flex flex-col justify-between hover:border-slate-700 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center text-amber-400 mb-3">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-300 font-display tracking-tight">
                      IA
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-300 font-semibold mt-0.5">
                      Innovación & Flujos
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Certificado por Google
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* SECCIÓN 2: TRES FORMAS DE TRABAJAR / DISCIPLINAS (ESTILO RUVA VENTURES) */}
            <section className="space-y-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-accent uppercase tracking-wider mb-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-accent" />
                  <span>Servicios & Soluciones</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                  Especialidades Creativas
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                {/* Especialidad 1: UI/UX & Web */}
                <div className="bg-[#081226]/80 border border-slate-800/90 rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-cyan-accent/50 transition-all group">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-cyan-accent/15 border border-cyan-accent/30 flex items-center justify-center text-cyan-accent mb-4 group-hover:scale-105 transition-transform">
                      <Compass className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-accent">
                      Digital & Apps
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1 mb-2 font-display">
                      UI/UX & Desarrollo Web
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Sistemas de diseño, prototipado en Figma y desarrollo moderno en Next.js y WordPress.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-cyan-accent font-semibold">
                    <span>Figma · HTML5 · Web</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Especialidad 2: Branding & Print */}
                <div className="bg-[#081226]/80 border border-slate-800/90 rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-cyan-accent/50 transition-all group">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-105 transition-transform">
                      <Palette className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                      Identidad
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1 mb-2 font-display">
                      Branding & Diseño Editorial
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Diseño de logotipos, manuales normativos de identidad, empaques y catálogos.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-purple-400 font-semibold">
                    <span>InDesign · Illustrator</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Especialidad 3: 3D & Multimedia */}
                <div className="bg-[#081226]/80 border border-slate-800/90 rounded-2xl p-5 sm:p-6 flex flex-col justify-between hover:border-cyan-accent/50 transition-all group">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-105 transition-transform">
                      <Box className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      Audiovisual
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1 mb-2 font-display">
                      Modelado 3D & Motion
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Animaciones técnicas 3D, renders industriales fotorrealistas y motion graphics.
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                    <span>Cinema 4D · KeyShot</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

              </div>
            </section>

            {/* SECCIÓN 3: GALERÍA DE PORTAFOLIO INMEDIATO (MASONRY & LIGHTBOX) */}
            <PortfolioGallery
              title="Galería de Proyectos"
              badge="Portafolio Gráfico"
              showSectionHeader={true}
            />

            {/* SECCIÓN 4: EXPERIENCIA LABORAL EN CARDS INDEPENDIENTES */}
            <section className="space-y-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-accent uppercase tracking-wider mb-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-accent" />
                  <span>Trayectoria Laboral</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                  Experiencia Profesional
                </h3>
              </div>

              <div className="space-y-3.5">
                {WORK_EXPERIENCE.map((exp, idx) => (
                  <div
                    key={exp.company}
                    className="bg-[#081226]/75 border border-slate-800/80 rounded-2xl p-5 sm:p-6 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base sm:text-lg font-bold text-white font-display">
                            {exp.company}
                          </h4>
                          {idx === 0 && (
                            <span className="text-[10px] font-black uppercase tracking-wider bg-cyan-accent/15 text-cyan-accent border border-cyan-accent/30 px-2 py-0.5 rounded-full">
                              Actual
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-semibold text-cyan-accent mt-0.5">
                          {exp.role}
                        </div>
                      </div>
                      <span className="text-xs font-mono text-slate-400 bg-[#050c1c] border border-slate-800 px-3 py-1 rounded-full self-start sm:self-auto">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 mb-2.5 leading-relaxed">
                      {exp.highlight}
                    </p>

                    {exp.achievements && (
                      <ul className="space-y-1 pt-1">
                        {exp.achievements.map((ach, aIdx) => (
                          <li key={aIdx} className="text-xs text-slate-400 flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-accent shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* SECCIÓN 5: COMPETENCIAS & PAQUETERÍA (CARDS DINÁMICAS) */}
            <section className="space-y-4">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-accent uppercase tracking-wider mb-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-accent" />
                  <span>Stack de Software</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                  Competencias Técnicas y Paquetería
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SKILLS_CATEGORIES.map((cat) => {
                  const IconComp = cat.icon;
                  return (
                    <div
                      key={cat.title}
                      className="bg-[#081226]/80 border border-slate-800/80 rounded-2xl p-5 hover:border-cyan-accent/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2.5 mb-3">
                          <div className="w-8 h-8 rounded-lg bg-cyan-accent/15 border border-cyan-accent/30 flex items-center justify-center text-cyan-accent">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <h4 className="text-sm font-bold text-white font-display">
                            {cat.title}
                          </h4>
                        </div>
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

            {/* SECCIÓN 6: EDUCACIÓN & CURSOS (2 CARDS) */}
            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Card Educación */}
              <div className="bg-[#081226]/80 border border-slate-800/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-cyan-accent/15 border border-cyan-accent/30 flex items-center justify-center text-cyan-accent">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white font-display">Educación Universitaria</h4>
                      <p className="text-[11px] text-slate-400">Título Profesional</p>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white">
                      Licenciatura en Diseño Gráfico
                    </div>
                    <div className="text-xs text-cyan-accent font-medium">
                      Universidad Tecnológica de México (UNITEC)
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono pt-1">
                      Campus Atizapán | 2005 – 2009
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Cursos & Certificaciones */}
              <div className="bg-[#081226]/80 border border-slate-800/80 rounded-2xl p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white font-display">Cursos & Certificaciones</h4>
                      <p className="text-[11px] text-slate-400">Actualización Permanente</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span><strong>IA y Productividad</strong> — Google</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span><strong>Desarrollo Web</strong> — Google & Tidyslice</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span><strong>Diseño de Prototipos</strong> — Platzi</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span><strong>Diplomado After Effects</strong> — EduMac</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* SECCIÓN 7: CIERRE FINAL (ESTILO RUVA FINAL CARD) */}
            <section className="bg-gradient-to-br from-[#0c2447] via-[#08162f] to-[#040814] border-2 border-cyan-500/30 rounded-3xl p-8 sm:p-10 text-center relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.18)]">
              <div className="max-w-xl mx-auto space-y-4 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-cyan-accent/15 border border-cyan-accent/40 flex items-center justify-center mx-auto text-cyan-accent shadow-[0_0_25px_rgba(0,240,255,0.3)]">
                  <Mail className="w-7 h-7" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
                  ¿Hablamos de tu próximo proyecto?
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Guarda mi contacto directo o escríbeme. Disponible para consultoría de diseño, dirección de marca, proyectos UI/UX y oportunidades estratégicas.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                  <a
                    href="mailto:mauriciorojasdiseno@gmail.com?subject=Contacto%20desde%20Portafolio%20Mauricio%20Rojas"
                    className="w-full sm:w-auto py-3 px-6 rounded-full bg-cyan-accent hover:bg-cyan-hover text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(0,240,255,0.3)] active:scale-95"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Mandarme un Correo</span>
                  </a>
                  <a
                    href="https://wa.me/525522965764?text=Hola%20Mauricio,%20vi%20tu%20landing%20y%20me%20gustar%C3%ADa%20ponerme%20en%20contacto%20contigo."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-3 px-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 hover:bg-emerald-500/30 text-emerald-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Mandar WhatsApp</span>
                  </a>
                </div>

                <div className="pt-2">
                  <a
                    href="mailto:mauriciorojasdiseno@gmail.com"
                    className="text-xs text-slate-400 hover:text-cyan-accent underline underline-offset-4"
                  >
                    mauriciorojasdiseno@gmail.com
                  </a>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500 space-y-1">
              <p>© {new Date().getFullYear()} Mauricio Rojas · Diseñador Gráfico Senior & Consultor Visual</p>
              <p className="text-[11px]">
                Diseño & Tecnología por{" "}
                <Link href="/" className="text-cyan-accent hover:underline font-semibold">
                  Altérnika Studio
                </Link>{" "}
                · San Juan del Río, Qro. México
              </p>
            </footer>

          </main>
        </div>
      </div>

      {/* ======================================================== */}
      {/* BARRA FIJA INFERIOR EN DISPOSITIVOS MÓVILES (DOCK FLOTANTE) */}
      {/* Aparece cuando el usuario hace scroll hacia abajo en celular */}
      {/* ======================================================== */}
      <AnimatePresence>
        {showDock && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed bottom-3 left-3 right-3 z-50 flex items-center gap-2 max-w-md mx-auto"
          >
            <button
              onClick={handleDownloadVCard}
              className="flex-1 py-3.5 px-4 rounded-2xl bg-cyan-accent text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(0,240,255,0.4)] active:scale-98"
            >
              <UserPlus className="w-4 h-4" />
              <span>Guardar Contacto</span>
            </button>
            <a
              href="https://wa.me/525522965764?text=Hola%20Mauricio,%20vi%20tu%20landing%20y%20me%20gustar%C3%ADa%20conectar%20contigo."
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-2xl bg-[#0f331f] border border-emerald-500/60 flex items-center justify-center text-emerald-400 shadow-[0_10px_30px_rgba(0,0,0,0.5)] active:scale-95 shrink-0"
              title="Mandar WhatsApp"
            >
              <MessageCircle className="w-6 h-6" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
