"use client";

import { motion } from "framer-motion";
import { SERVICES } from "@/data/projects";
import { TextReveal } from "./TextReveal";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ServicesSection() {
  return (
    <section id="servicios" className="py-24 md:py-36 bg-bg-card/40 relative border-t border-bg-border/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-accent/30 bg-cyan-dim text-cyan-accent text-xs font-semibold uppercase tracking-wider mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-accent" />
          Servicios Especializados
        </motion.div>

        {/* Title */}
        <div className="mb-16 max-w-3xl">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight">
            <TextReveal
              text="Soluciones integrales de diseño para hacer destacar tu negocio."
              highlightWords={["integrales", "diseño", "destacar"]}
            />
          </h2>
        </div>

        {/* Services List */}
        <div className="space-y-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-bg-dark border border-bg-border p-8 md:p-12 rounded-3xl hover:border-cyan-accent/50 transition-all duration-300 group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Number & Title */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div className="font-display text-2xl font-bold text-cyan-accent mb-4 tracking-widest">
                    {service.number}
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white group-hover:text-cyan-accent transition-colors mb-4">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 text-base leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Service Offerings Checklist */}
                <div className="lg:col-span-7 bg-bg-card/70 p-6 md:p-8 rounded-2xl border border-bg-border/60">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
                    Lo que incluimos:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-cyan-accent shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-slate-200">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="mt-8 pt-6 border-t border-bg-border/60 flex justify-end">
                    <Link
                      href="/#contacto"
                      className="inline-flex items-center gap-2 text-sm font-bold text-cyan-accent hover:text-white transition-colors group/btn"
                    >
                      Cotizar este servicio
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
