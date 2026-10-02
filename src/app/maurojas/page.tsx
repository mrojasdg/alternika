"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserPlus, MessageCircle, Mail, Globe, Linkedin, Instagram, Facebook, ArrowUpRight, Sparkles } from "lucide-react";

export default function MaurojasDigitalCard() {
  // Function to generate & download vCard (.vcf) for instant contact saving on iOS/Android
  const handleDownloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
N:Rojas;Mauricio;;;
FN:Mauricio Rojas
TITLE:Diseñador gráfico / UX-UI
ORG:Alternika
EMAIL;TYPE=INTERNET,HOME:hola@alternika.com.mx
URL:https://alternika.com.mx
NOTE:Director Creativo en Alternika. Agencia de Diseño & Tecnología.
END:VCARD`;

    const blob = new Blob([vCardData], { type: "text/vcard;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Mauricio_Rojas_Alternika.vcf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#040814] flex flex-col items-center justify-center py-20 px-4 relative overflow-hidden text-center selection:bg-cyan-accent selection:text-slate-950">
      
      {/* Dark Textured Dot Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#0e2347_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      
      {/* Background Ambient Mesh Light Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[450px] bg-[radial-gradient(circle_at_center,rgba(0,180,255,0.18)_0%,rgba(4,8,20,0)_70%)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-cyan-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Centered Floating Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm sm:max-w-md bg-[#0a1630]/90 backdrop-blur-2xl border border-[#162e5c] rounded-[32px] p-6 sm:p-8 relative shadow-[0_0_50px_rgba(0,240,255,0.15)] flex flex-col items-center mt-12 z-10"
      >
        
        {/* Overhanging Profile Photo (Desbordada arriba) */}
        <div className="relative -mt-24 mb-6">
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-[#040814] ring-4 ring-cyan-accent/60 shadow-[0_0_30px_rgba(0,240,255,0.4)] bg-slate-900">
            <Image
              src="/img/maurojas.jpg"
              alt="Mauricio Rojas"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
          {/* Subtle Online Badge */}
          <div className="absolute bottom-2 right-2 w-5 h-5 bg-cyan-accent rounded-full border-2 border-[#040814] flex items-center justify-center shadow-lg">
            <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-1.5 mb-8 w-full">
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Mauricio Rojas
          </h1>
          <p className="text-cyan-accent font-semibold text-sm sm:text-base font-display">
            Diseñador gráfico / UX-UI
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-dim border border-cyan-accent/30 text-slate-300 text-xs font-medium mt-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-accent" />
            <span>Director Creativo @ Alternika</span>
          </div>
        </div>

        {/* Action Buttons (Pill Buttons with Minimal Icons) */}
        <div className="w-full space-y-3.5 mb-8">
          
          {/* 1. Guardar Mi Contacto (vCard Download) */}
          <button
            onClick={handleDownloadVCard}
            className="w-full py-4 px-6 rounded-full bg-cyan-accent hover:bg-cyan-hover text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.35)] active:scale-98 group"
          >
            <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Guardar mi contacto</span>
          </button>

          {/* 2. Mandar un WhatsApp */}
          <a
            href="https://wa.me/523312345678?text=Hola%20Mauricio,%20vi%20tu%20ID%20Digital%20y%20me%20gustar%C3%ADa%20platicar%20sobre%20un%20proyecto."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-6 rounded-full bg-[#122852] border border-[#1e3f7a] hover:border-cyan-accent/60 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-300 hover:bg-[#18346b] group"
          >
            <MessageCircle className="w-4 h-4 text-cyan-accent group-hover:scale-110 transition-transform" />
            <span>Mandar un WhatsApp</span>
          </a>

          {/* 3. Mandar un Correo Electrónico */}
          <a
            href="mailto:hola@alternika.com.mx"
            className="w-full py-3.5 px-6 rounded-full bg-[#122852] border border-[#1e3f7a] hover:border-cyan-accent/60 text-white font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-300 hover:bg-[#18346b] group"
          >
            <Mail className="w-4 h-4 text-cyan-accent group-hover:scale-110 transition-transform" />
            <span>Mandar un Correo</span>
          </a>

          {/* 4. Visitar Sitio Web Alternika */}
          <Link
            href="/"
            className="w-full py-3.5 px-6 rounded-full bg-[#081226] border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 group"
          >
            <Globe className="w-4 h-4 text-cyan-accent" />
            <span>Sitio Web Alternika</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Minimalist Social Links Bar */}
        <div className="pt-6 border-t border-[#142954]/60 w-full flex items-center justify-center gap-4">
          {[
            { name: "LinkedIn", icon: Linkedin, href: "#" },
            { name: "Instagram", icon: Instagram, href: "#" },
            { name: "Facebook", icon: Facebook, href: "#" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[#081226] border border-[#162e5c] text-slate-300 hover:text-cyan-accent hover:border-cyan-accent flex items-center justify-center transition-all duration-300 group"
                aria-label={item.name}
              >
                <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            );
          })}
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="mt-8 text-xs text-slate-500 font-medium z-10 flex items-center gap-2">
        <span>ID Digital Oficial</span>
        <span>·</span>
        <Link href="/" className="text-cyan-accent hover:underline font-semibold">
          Alternika.com.mx
        </Link>
      </div>
    </div>
  );
}
