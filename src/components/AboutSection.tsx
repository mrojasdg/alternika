"use client";

import { motion } from "framer-motion";
import { TextReveal } from "./TextReveal";
import { Sparkles, Target, Zap, Award } from "lucide-react";

export function AboutSection() {
  const stats = [
    { label: "Proyectos Entregados", value: "+120" },
    { label: "Satisfacción de Clientes", value: "99.4%" },
    { label: "Años de Experiencia", value: "8+" },
    { label: "Países Alcanzados", value: "14" },
  ];

  const values = [
    {
      icon: Sparkles,
      title: "Diseño con Propósito",
      description: "No solo creamos interfaces bonitas. Diseñamos experiencias visuales estratégicas orientadas a maximizar la conversión y el valor percibido de tu marca."
    },
    {
      icon: Target,
      title: "Enfoque Multicanal",
      description: "Desde sitios web ultra modernos en Next.js hasta papelería print de lujo y campañas para redes sociales, unificamos tu narrativa en todos los puntos de contacto."
    },
    {
      icon: Zap,
      title: "Innovación Tecnológica",
      description: "Adoptamos las últimas tecnologías frontend, 3D, animación e inteligencia artificial para mantener a nuestros clientes por delante de su competencia."
    },
    {
      icon: Award,
      title: "Obsesión por los Detalles",
      description: "Cada píxel, tipografía, margen y microinteracción se cuida con precisión artesanal para entregar un producto final extraordinario."
    }
  ];

  return (
    <section id="quienes-somos" className="py-24 md:py-36 bg-bg-dark relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-accent/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-accent/30 bg-cyan-dim text-cyan-accent text-xs font-semibold uppercase tracking-wider mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-accent animate-ping" />
          Quiénes Somos
        </motion.div>

        {/* Cuberto Narrative Title */}
        <div className="mb-12 md:mb-16 max-w-4xl">
          <h2 className="font-display text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
            <TextReveal
              text="Somos una agencia de diseño digital y estrategia de marca apasionada por crear lo extraordinario."
              highlightWords={["agencia", "diseño", "extraordinario"]}
            />
          </h2>
        </div>

        {/* Narrative Paragraphs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-slate-300 text-lg md:text-xl leading-relaxed"
          >
            <p>
              En <strong className="text-white font-semibold">Alternika</strong> combinamos creatividad sin límites con rigor técnico. Nos especializamos en acompañar a empresas, startups y marcas vanguardistas en su evolución visual y tecnológica.
            </p>
            <p>
              Entendemos que hoy una marca no vive únicamente en un sitio web ni en un folleto impreso; vive en un ecosistema vivo donde la coherencia estética en <span className="text-cyan-accent">web, print y redes sociales</span> es la clave del éxito.
            </p>
          </motion.div>

          {/* Quick Metrics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 bg-bg-card p-8 rounded-3xl border border-bg-border shadow-2xl relative overflow-hidden group hover:border-cyan-accent/40 transition-colors"
          >
            <div className="grid grid-cols-2 gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="font-display text-3xl md:text-4xl font-extrabold text-cyan-accent tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-slate-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Values & Philosophy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-bg-card/60 p-8 rounded-2xl border border-bg-border hover:border-cyan-accent/40 hover:bg-bg-card transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-dim border border-cyan-accent/30 flex items-center justify-center text-cyan-accent mb-6 group-hover:scale-110 group-hover:bg-cyan-accent group-hover:text-slate-950 transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-accent transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
