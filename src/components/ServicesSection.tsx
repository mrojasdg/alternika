"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "@/data/projects";
import { TextReveal } from "./TextReveal";
import { CheckCircle2, ChevronDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function ServicesSection() {
  // First service open by default, user can toggle or scroll expand
  const [openServiceId, setOpenServiceId] = useState<string | null>("web");

  const toggleService = (id: string) => {
    setOpenServiceId(openServiceId === id ? null : id);
  };

  return (
    <section id="servicios" className="py-24 md:py-36 bg-bg-dark relative border-t border-bg-border/60">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Badge */}
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

        {/* Services Accordion List (Inspired by Reference Images 1 & 2) */}
        <div className="space-y-4">
          {SERVICES.map((service, index) => {
            const isOpen = openServiceId === service.id;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                layout
                className={`rounded-3xl border transition-all duration-500 overflow-hidden ${
                  isOpen
                    ? "bg-gradient-to-br from-bg-card via-[#0a1532] to-bg-dark border-cyan-accent/50 shadow-[0_0_35px_rgba(0,240,255,0.15)]"
                    : "bg-bg-card/70 border-bg-border/80 hover:border-slate-700 hover:bg-bg-card"
                }`}
              >
                {/* Accordion Header Bar (State Reference Image 1) */}
                <button
                  onClick={() => toggleService(service.id)}
                  className="w-full p-8 md:p-10 flex items-center justify-between text-left focus:outline-none group"
                >
                  <div className="flex items-center gap-6 md:gap-10">
                    <span
                      className={`font-display text-3xl md:text-4xl font-extrabold transition-colors ${
                        isOpen ? "text-cyan-accent" : "text-slate-500 group-hover:text-slate-300"
                      }`}
                    >
                      {service.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-6">
                    <span className="font-display text-xl md:text-2xl font-bold text-slate-500">
                      {service.number}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border transition-colors ${
                        isOpen
                          ? "bg-cyan-accent text-slate-950 border-cyan-accent"
                          : "bg-bg-dark text-slate-400 border-bg-border group-hover:border-slate-600"
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.div>
                  </div>
                </button>

                {/* Accordion Body Content (State Reference Image 2) */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-10 md:px-10 md:pb-12 pt-2 border-t border-bg-border/40 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        {/* Description Paragraph */}
                        <div className="lg:col-span-6 space-y-6">
                          <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
                            {service.description}
                          </p>
                          <div>
                            <Link
                              href="/#contacto"
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-accent text-slate-950 font-bold text-sm hover:bg-cyan-hover transition-colors"
                            >
                              <span>Cotizar este servicio</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>

                        {/* Deliverables List */}
                        <div className="lg:col-span-6 bg-bg-dark/80 p-6 md:p-8 rounded-2xl border border-bg-border">
                          <h4 className="text-xs font-semibold text-cyan-accent uppercase tracking-widest mb-4">
                            Entregables & Alcance:
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {service.items.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-2.5">
                                <CheckCircle2 className="w-4 h-4 text-cyan-accent shrink-0 mt-1" />
                                <span className="text-sm text-slate-200 font-medium">
                                  {item}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
