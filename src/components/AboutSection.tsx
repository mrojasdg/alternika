"use client";

import { motion } from "framer-motion";
import { Star, Trophy, Globe, Sparkles } from "lucide-react";

export function AboutSection() {
  const hardDataCards = [
    {
      icon: Star,
      stat: "2012",
      label: "CONSTITUIDOS DESDE 2012",
      description: "Más de 12 años transformando ideas audaces en soluciones digitales y de diseño memorables."
    },
    {
      icon: Trophy,
      stat: "100%",
      label: "RECONOCIMIENTO Y CALIDAD",
      description: "Comprometidos con estándares de diseño internacional en cada entregable."
    },
    {
      icon: Globe,
      stat: "+400",
      label: "PROYECTOS ENTREGADOS",
      description: "Desarrollos web, marcas, impresos y campañas ejecutadas con éxito en LATAM y EE.UU."
    }
  ];

  return (
    <section id="quienes-somos" className="py-24 md:py-36 bg-bg-dark relative overflow-hidden">
      {/* Background Subtle Orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Top Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16 pt-6 border-t border-bg-border/60">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-accent/30 bg-cyan-dim text-cyan-accent text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Por Qué Alternika
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              QUIÉNES SOMOS
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-8 text-slate-300 text-lg sm:text-xl leading-relaxed space-y-6"
          >
            <p>
              Constituidos desde <strong className="text-white">2012</strong>, en <strong className="text-white">Alternika</strong> hemos acompañado a empresas, startups y marcas consolidadas en su evolución visual y tecnológica.
            </p>
            <p>
              Nuestro trabajo abarca desde desarrollo web interactivo en Next.js hasta papelería print de lujo, empaques, producción de foto/video, 3D y estrategias de contenido en redes sociales. Lo que más nos importa es construir alianzas a largo plazo y generar resultados de negocio medibles.
            </p>
          </motion.div>
        </div>

        {/* Hard Data Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hardDataCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-bg-card/70 border border-bg-border/80 p-8 rounded-3xl hover:border-cyan-accent/40 hover:bg-bg-card transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-cyan-dim text-cyan-accent flex items-center justify-center mb-8">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="font-display text-5xl md:text-6xl font-black text-white mb-2 tracking-tight">
                    {card.stat}
                  </div>
                  <div className="text-xs font-extrabold text-cyan-accent uppercase tracking-widest mb-3">
                    {card.label}
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed pt-4 border-t border-bg-border/50">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
