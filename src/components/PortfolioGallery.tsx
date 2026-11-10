"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ArrowUpRight
} from "lucide-react";

export interface PortfolioItem {
  id: string;
  src: string;
  title: string;
  category: string;
  tag: string;
  description: string;
}

export const PORTFOLIO_GALLERY: PortfolioItem[] = [
  {
    id: "branding-1",
    src: "/portafolio/branding-1.jpg",
    title: "Identidad Corporativa & Manual de Marca",
    category: "Branding",
    tag: "Manual Normativo",
    description: "Construcción de logotipo, retícula de construcción, paleta de color y lineamientos normativos."
  },
  {
    id: "branding-2",
    src: "/portafolio/Branding-2.jpg",
    title: "Sistema de Identidad & Papelería",
    category: "Branding",
    tag: "Papelería Corporativa",
    description: "Estandarización de aplicaciones de marca, papelería institucional y elementos de presentación."
  },
  {
    id: "branding-3",
    src: "/portafolio/Branding-3.png",
    title: "Arquitectura de Marca & Logotipo",
    category: "Branding",
    tag: "Identidad Visual",
    description: "Conceptualización tipográfica y gráfica para posicionamiento y distinción en el mercado."
  },
  {
    id: "logo-yogurthyfrutas",
    src: "/portafolio/Logo-Yogurthyfrutas.jpg",
    title: "Diseño de Logotipo Yogurt & Frutas",
    category: "Branding",
    tag: "Identidad de Marca",
    description: "Logotipo moderno y fresco diseñado para el sector de alimentos saludables y lácteos."
  },
  {
    id: "diseno-catalogos",
    src: "/portafolio/Diseno-Catalogos.jpg",
    title: "Diseño de Catálogo Industrial",
    category: "Editorial",
    tag: "Diseño Editorial",
    description: "Maquetación y diagramación de catálogo corporativo para línea de productos industriales."
  },
  {
    id: "anuncio-revista",
    src: "/portafolio/Anuncio-Revista.jpg",
    title: "Diseño de Anuncio de Revista",
    category: "Editorial",
    tag: "Publicidad Impresa",
    description: "Pauta publicitaria a página completa para revista especializada con composición tipográfica de impacto."
  },
  {
    id: "diseno-flyer",
    src: "/portafolio/Diseno-Flyer.jpg",
    title: "Diseño de Flyer Promocional",
    category: "Editorial",
    tag: "Diseño Publicitario",
    description: "Material impreso promocional de alto contraste visual para punto de venta y eventos de captación."
  },
  {
    id: "diseno-gafetes",
    src: "/portafolio/Diseno-Gafetes.jpg",
    title: "Diseño de Gafetes y Acreditaciones",
    category: "Editorial",
    tag: "Identidad Institucional",
    description: "Credenciales corporativas con código de seguridad y diseño normativo para personal de eventos."
  },
  {
    id: "diseno-banner-web",
    src: "/portafolio/Diseno-Banner-Web.jpg",
    title: "Diseño de Banner Web Comercial",
    category: "Digital",
    tag: "Diseño Web",
    description: "Creatividades digitales optimizadas para campañas de display, portales web y e-commerce."
  },
  {
    id: "diseno-banner-web1",
    src: "/portafolio/Diseno-Banner-Web1.jpg",
    title: "Banners Promocionales para E-Commerce",
    category: "Digital",
    tag: "Diseño Web",
    description: "Piezas gráficas para cabeceras web orientadas a maximizar la tasa de conversión y clics."
  },
  {
    id: "redes-sociales1",
    src: "/portafolio/redes-sociales1.png",
    title: "Campaña Estratégica en Redes Sociales I",
    category: "Social Media",
    tag: "Social Media",
    description: "Parrilla de contenido visual y creatividades publicitarias para ecosistema de redes sociales."
  },
  {
    id: "redes-sociales2-jpg",
    src: "/portafolio/Redes-sociales2.jpg",
    title: "Campaña Estratégica en Redes Sociales II",
    category: "Social Media",
    tag: "Social Media",
    description: "Post publicitario para pauta digital enfocado en interacción, alcance y posicionamiento de marca."
  },
  {
    id: "redessociales2-alt",
    src: "/portafolio/redessociales2.jpg",
    title: "Campaña Estratégica en Redes Sociales III",
    category: "Social Media",
    tag: "Social Media",
    description: "Estrategia gráfica de publicaciones e historias con alta tasa de interacción y engagement."
  },
  {
    id: "redes-sociales-3",
    src: "/portafolio/redes-sociales-3.png",
    title: "Campaña Estratégica en Redes Sociales IV",
    category: "Social Media",
    tag: "Social Media",
    description: "Diseño de creatividades para anuncios pagados en Instagram y LinkedIn con enfoque comercial."
  },
  {
    id: "diseno-grafico-1",
    src: "/portafolio/Diseno-grafico-1.jpg",
    title: "Diseño Gráfico & Composición Publicitaria",
    category: "Publicidad",
    tag: "Composición Gráfica",
    description: "Composición gráfica con tratamiento fotográfico, armonía cromática y balance tipográfico."
  },
  {
    id: "diseno-stand",
    src: "/portafolio/Diseno-Stand.jpg",
    title: "Diseño de Stand para Expo I",
    category: "Espacios & BTL",
    tag: "Diseño de Stand",
    description: "Propuesta arquitectónica y gráfica de stand para ferias industriales y convenciones comerciales."
  },
  {
    id: "diseno-stand-2",
    src: "/portafolio/Diseno-Stand-2.jpg",
    title: "Diseño de Stand para Expo II",
    category: "Espacios & BTL",
    tag: "Diseño de Stand",
    description: "Gráficos de gran formato, señalética y ambientación corporativa para pabellón de marca."
  },
  {
    id: "diseno-valla",
    src: "/portafolio/Diseno-Valla.jpg",
    title: "Diseño de Valla Publicitaria I",
    category: "Espacios & BTL",
    tag: "Publicidad Exterior (OOH)",
    description: "Cartelera espectacular de gran formato con mensaje comercial conciso y máxima legibilidad."
  },
  {
    id: "diseno-valla-2",
    src: "/portafolio/Diseno-valla-2.jpg",
    title: "Diseño de Valla Publicitaria II",
    category: "Espacios & BTL",
    tag: "Publicidad Exterior (OOH)",
    description: "Valla panorámica de alto contraste con dirección de arte para vialidades de alto tráfico."
  },
  {
    id: "diseno-y-modelado-3d",
    src: "/portafolio/Diseno-y-modelado-3d.jpg",
    title: "Diseño & Modelado 3D de Producto",
    category: "Modelado 3D",
    tag: "Modelado 3D",
    description: "Modelado tridimensional técnico y render fotorrealista para exhibición de catálogo y producto."
  },
  {
    id: "modelado3d-1",
    src: "/portafolio/Modelado3D-1.png",
    title: "Render Industrial & Simulación 3D",
    category: "Modelado 3D",
    tag: "Render Fotorrealista",
    description: "Visualización técnica con simulación de texturas y materiales fotorrealistas de alta fidelidad."
  }
];

const CATEGORIES = [
  "Todos",
  "Branding",
  "Digital",
  "Social Media",
  "Modelado 3D",
  "Espacios & BTL",
  "Editorial",
  "Publicidad"
];

interface PortfolioGalleryProps {
  title?: string;
  badge?: string;
  showSectionHeader?: boolean;
}

export function PortfolioGallery({
  title = "Galería de Proyectos",
  badge = "Portafolio Gráfico",
  showSectionHeader = true
}: PortfolioGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const filteredGallery = selectedCategory === "Todos"
    ? PORTFOLIO_GALLERY
    : PORTFOLIO_GALLERY.filter((item) => item.category === selectedCategory);

  const handleNextImage = () => {
    if (activeLightboxIndex !== null && filteredGallery.length > 0) {
      setActiveLightboxIndex((prev) => ((prev ?? 0) + 1) % filteredGallery.length);
    }
  };

  const handlePrevImage = () => {
    if (activeLightboxIndex !== null && filteredGallery.length > 0) {
      setActiveLightboxIndex((prev) => ((prev ?? 0) - 1 + filteredGallery.length) % filteredGallery.length);
    }
  };

  const handleCloseLightbox = () => {
    setActiveLightboxIndex(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === "ArrowRight") {
        handleNextImage();
      } else if (e.key === "ArrowLeft") {
        handlePrevImage();
      } else if (e.key === "Escape") {
        handleCloseLightbox();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLightboxIndex, filteredGallery.length]);

  // Lock body scroll during lightbox
  useEffect(() => {
    if (activeLightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeLightboxIndex]);

  // Touch swipe support on mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 50) {
      handleNextImage();
    } else if (diff < -50) {
      handlePrevImage();
    }
    setTouchStartX(null);
  };

  return (
    <section className="space-y-6">
      {/* Optional Title Header */}
      {showSectionHeader && (
        <div>
          {badge && (
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-accent uppercase tracking-wider mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-accent" />
              <span>{badge}</span>
            </div>
          )}
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-display">
            {title}
          </h3>
        </div>
      )}

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-800 -mx-1 px-1">
        {CATEGORIES.map((cat) => {
          const count = cat === "Todos"
            ? PORTFOLIO_GALLERY.length
            : PORTFOLIO_GALLERY.filter((p) => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveLightboxIndex(null);
              }}
              className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-cyan-accent text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.35)]"
                  : "bg-[#081226] text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700"
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Masonry Image Grid: Pure rounded images with hover details */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {filteredGallery.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: Math.min(idx * 0.03, 0.3) }}
            onClick={() => setActiveLightboxIndex(idx)}
            className="break-inside-avoid mb-4 group cursor-pointer relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800/80 hover:border-cyan-accent/60 transition-all duration-300 shadow-lg hover:shadow-[0_10px_35px_rgba(0,240,255,0.2)] block"
          >
            <Image
              src={item.src}
              alt={item.title}
              width={800}
              height={600}
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 block"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Hover Overlay: Category badge on top, title & full-view icon on bottom right */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020612]/90 via-[#020612]/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 pointer-events-none">
              <span className="self-start text-[10px] font-mono font-bold text-cyan-accent bg-cyan-accent/15 border border-cyan-accent/30 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                {item.tag}
              </span>
              <div className="flex items-end justify-between gap-2">
                <div className="min-w-0 pr-2">
                  <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-1 drop-shadow-md">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-300 line-clamp-1 opacity-90">
                    {item.description}
                  </p>
                </div>
                {/* Bottom-right full icon */}
                <div className="w-8 h-8 rounded-full bg-cyan-accent text-slate-950 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.5)] group-hover:scale-110 transition-transform">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ======================================================== */}
      {/* FULLSCREEN LIGHTBOX MODAL (Image occupies full available height) */}
      {/* ======================================================== */}
      <AnimatePresence>
        {activeLightboxIndex !== null && filteredGallery[activeLightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-[#02050f]/95 backdrop-blur-2xl flex flex-col justify-between p-2 sm:p-4 select-none overflow-hidden"
            onClick={handleCloseLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Top Bar */}
            <div
              className="w-full max-w-7xl mx-auto flex items-center justify-between py-1.5 px-2 relative z-30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-cyan-accent bg-cyan-accent/10 border border-cyan-accent/25 px-3 py-1 rounded-full">
                  {activeLightboxIndex + 1} / {filteredGallery.length}
                </span>
                <span className="hidden sm:inline-block text-xs text-slate-400 font-medium">
                  {filteredGallery[activeLightboxIndex].category}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden md:inline-block text-[11px] text-slate-500 font-mono">
                  Usa las flechas ← → del teclado para navegar
                </span>
                <button
                  onClick={handleCloseLightbox}
                  className="w-10 h-10 rounded-full bg-slate-900/90 border border-slate-700 hover:border-cyan-accent/60 text-slate-300 hover:text-white flex items-center justify-center transition-all hover:bg-slate-800 active:scale-95 shadow-lg"
                  title="Cerrar visor (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Stage: Image fills available height (up to ~84vh) */}
            <div
              className="relative w-full max-w-7xl mx-auto flex-1 flex items-center justify-between gap-1 sm:gap-4 my-1 min-h-0"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Prev Button */}
              <button
                onClick={handlePrevImage}
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-slate-950/80 border border-slate-800 hover:border-cyan-accent hover:bg-cyan-accent hover:text-slate-950 text-white flex items-center justify-center transition-all shrink-0 shadow-2xl active:scale-95 group z-20"
                title="Imagen anterior (Flecha izquierda)"
              >
                <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              {/* Image Container: Full height available */}
              <div className="relative flex-1 h-full w-full flex items-center justify-center overflow-hidden px-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={filteredGallery[activeLightboxIndex].id}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.2 }}
                    className="relative h-full w-full flex items-center justify-center"
                  >
                    <Image
                      src={filteredGallery[activeLightboxIndex].src}
                      alt={filteredGallery[activeLightboxIndex].title}
                      width={1600}
                      height={1200}
                      className="max-h-[74vh] sm:max-h-[80vh] md:max-h-[83vh] w-auto max-w-full object-contain rounded-xl sm:rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] border border-slate-800/80"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNextImage}
                className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-slate-950/80 border border-slate-800 hover:border-cyan-accent hover:bg-cyan-accent hover:text-slate-950 text-white flex items-center justify-center transition-all shrink-0 shadow-2xl active:scale-95 group z-20"
                title="Imagen siguiente (Flecha derecha)"
              >
                <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Bottom Caption Bar: Compact & without 'Abrir original' button */}
            <div
              className="w-full max-w-3xl mx-auto bg-[#081226]/95 border border-[#142a59] rounded-2xl p-3 sm:p-4 shadow-2xl backdrop-blur-xl relative z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-accent bg-cyan-accent/10 px-2 py-0.5 rounded-full border border-cyan-accent/20">
                      {filteredGallery[activeLightboxIndex].tag}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      {filteredGallery[activeLightboxIndex].category}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white font-display">
                    {filteredGallery[activeLightboxIndex].title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-2xl line-clamp-1 sm:line-clamp-2">
                    {filteredGallery[activeLightboxIndex].description}
                  </p>
                </div>

                {/* Mobile Next/Prev helpers */}
                <div className="flex sm:hidden items-center gap-2 w-full pt-1">
                  <button
                    onClick={handlePrevImage}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 active:scale-95 flex items-center justify-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" /> Anterior
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-cyan-accent text-slate-950 text-xs font-bold active:scale-95 flex items-center justify-center gap-1 shadow-sm"
                  >
                    Siguiente <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
