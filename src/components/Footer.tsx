"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TextReveal } from "./TextReveal";
import { Send, CheckCircle, Mail, MapPin, Phone, Instagram, Linkedin, Dribbble } from "lucide-react";

export function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Desarrollo Web",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate contact submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", service: "Desarrollo Web", message: "" });
    }, 1200);
  };

  return (
    <footer id="contacto" className="bg-bg-dark border-t border-bg-border relative pt-24 pb-12 overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-20">
          
          {/* Left Column: Contact Heading & Details */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-accent/30 bg-cyan-dim text-cyan-accent text-xs font-semibold uppercase tracking-wider"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-accent animate-ping" />
              Contacto
            </motion.div>

            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight">
              <TextReveal
                text="¿Tienes un proyecto en mente? Hablemos hoy."
                highlightWords={["proyecto", "Hablemos"]}
              />
            </h2>

            <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
              Estamos listos para transformar la presencia de tu marca con soluciones en diseño web, medios impresos, identidad y redes sociales.
            </p>

            {/* Direct Contact Info */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-10 h-10 rounded-full bg-bg-card border border-bg-border flex items-center justify-center text-cyan-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Correo Electrónico</div>
                  <a href="mailto:hola@alternika.com" className="text-white hover:text-cyan-accent font-semibold transition-colors">
                    hola@alternika.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-300">
                <div className="w-10 h-10 rounded-full bg-bg-card border border-bg-border flex items-center justify-center text-cyan-accent">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">Ubicación</div>
                  <span className="text-white font-semibold">México & Remoto Global</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-6 border-t border-bg-border/60">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
                Síguenos en redes
              </div>
              <div className="flex items-center gap-4">
                {[
                  { name: "Instagram", icon: Instagram, href: "#" },
                  { name: "LinkedIn", icon: Linkedin, href: "#" },
                  { name: "Dribbble", icon: Dribbble, href: "#" },
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-bg-card border border-bg-border flex items-center justify-center text-slate-300 hover:text-cyan-accent hover:border-cyan-accent transition-all duration-300 group"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6 bg-bg-card border border-bg-border p-8 md:p-10 rounded-3xl shadow-2xl relative">
            <h3 className="font-display text-2xl font-bold text-white mb-6">
              Envíanos un mensaje
            </h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-cyan-dim border border-cyan-accent text-cyan-accent rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bold text-white">¡Mensaje Enviado!</h4>
                <p className="text-slate-300 text-sm max-w-sm mx-auto">
                  Gracias por escribirnos. Nuestro equipo revisará tu solicitud y te contactará en menos de 24 horas.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded-full border border-cyan-accent/50 text-cyan-accent text-xs font-bold hover:bg-cyan-accent hover:text-slate-950 transition-colors"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Tu Nombre *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Sofía Martínez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-bg-dark border border-bg-border rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sofia@empresa.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-bg-dark border border-bg-border rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-accent transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Servicio Principal *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full bg-bg-dark border border-bg-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-accent transition-colors"
                  >
                    <option value="Desarrollo Web">Diseño & Desarrollo Web</option>
                    <option value="Diseño Print">Diseño Print & Editorial</option>
                    <option value="Redes Sociales">Redes Sociales & Contenido</option>
                    <option value="Branding">Branding e Identidad Visual</option>
                    <option value="Proyecto Completo">Proyecto Completo 360°</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Detalles de tu Proyecto *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Cuéntanos un poco sobre tu marca, objetivos y tiempos estimados..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-bg-dark border border-bg-border rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-accent transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-cyan-accent hover:bg-cyan-hover text-slate-950 font-extrabold text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.3)] disabled:opacity-50"
                  data-cursor="ENVIAR"
                >
                  {isSubmitting ? (
                    <span>Enviando...</span>
                  ) : (
                    <>
                      <span>Enviar Solicitud</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 border-t border-bg-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ALTERNIKA. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-6">
            <span>Agencia de Diseño & Tecnología</span>
            <span className="text-cyan-accent font-semibold">Vercel Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
