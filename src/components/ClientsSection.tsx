"use client";

import { motion } from "framer-motion";

export function ClientsSection() {
  const clients = [
    { name: "AURA LUXURY", type: "Tech & Retail" },
    { name: "KROMA GROUP", type: "Arquitectura" },
    { name: "EDITORIAL NÉBULA", type: "Editorial" },
    { name: "VORTEX ENERGY", type: "Bebidas & Lifestyle" },
    { name: "ZENITH GROUP", type: "Real Estate" },
    { name: "LUMINA COFFEE", type: "Gastronomía" },
    { name: "PULSE AUDIO", type: "Electrónica" },
    { name: "STELLAR PAY", type: "Fintech LATAM" },
  ];

  return (
    <section className="py-20 bg-bg-dark border-t border-bg-border/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Marcas y empresas que confían en Alternika
          </span>
        </motion.div>

        {/* Minimalist Logo Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bg-bg-card/50 border border-bg-border hover:border-cyan-accent/40 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center text-center group transition-all duration-300 hover:bg-bg-card"
            >
              <span className="font-display font-black text-lg md:text-xl text-slate-400 group-hover:text-cyan-accent transition-colors tracking-widest uppercase">
                {client.name}
              </span>
              <span className="text-[11px] text-slate-500 mt-1 font-medium">
                {client.type}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
