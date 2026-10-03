"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserPlus, MessageCircle, Mail, Globe, ArrowUpRight, Sparkles } from "lucide-react";

export default function MaurojasDigitalCard() {
  // Function to generate & download vCard (.vcf) for instant contact saving on iOS/Android
  const handleDownloadVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
N:Rojas;Mauricio;;;
FN:Mauricio Rojas
TITLE:Diseñador gráfico / UX-UI
ORG:Altérnika
TEL;TYPE=CELL,VOICE:+525522965764
EMAIL;TYPE=INTERNET,WORK:mau@alternika.com.mx
URL:https://alternika.com.mx
NOTE:Director Creativo en Altérnika. Agencia de Diseño & Tecnología.
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
    <div className="min-h-screen bg-[#040814] flex flex-col items-center justify-center py-16 px-4 relative overflow-hidden text-center selection:bg-cyan-accent selection:text-slate-950">
      
      {/* Dark Textured Dot Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#0e2347_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      
      {/* Background Ambient Mesh Light Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-[radial-gradient(circle_at_center,rgba(0,180,255,0.18)_0%,rgba(4,8,20,0)_70%)] pointer-events-none blur-3xl" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-cyan-accent/10 rounded-full blur-3xl pointer-events-none" />

      {/* Slimmer Centered Card Container (max-w-[340px] sm:max-w-[360px]) */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[340px] sm:max-w-[360px] bg-[#0a1630]/95 backdrop-blur-2xl border border-[#162e5c] rounded-[32px] p-6 sm:p-7 relative shadow-[0_0_50px_rgba(0,240,255,0.18)] flex flex-col items-center mt-12 z-10"
      >
        
        {/* Overhanging Profile Photo with Pure White Ring (No online badge) */}
        <div className="relative -mt-20 sm:-mt-22 mb-5">
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-[#040814] ring-4 ring-white shadow-[0_0_30px_rgba(255,255,255,0.35)] bg-slate-900">
            <Image
              src="/img/maurojas.jpg"
              alt="Mauricio Rojas"
              fill
              className="object-cover object-top"
              priority
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-1 mb-7 w-full">
          <h1 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
            Mauricio Rojas
          </h1>
          <p className="text-cyan-accent font-semibold text-xs sm:text-sm font-display tracking-wide">
            Diseñador gráfico / UX-UI
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-dim border border-cyan-accent/30 text-slate-300 text-[11px] font-medium mt-2">
            <Sparkles className="w-3 h-3 text-cyan-accent" />
            <span>Director Creativo @ Altérnika</span>
          </div>
        </div>

        {/* Action Buttons (Pill Buttons with Minimal Icons) */}
        <div className="w-full space-y-3">
          
          {/* 1. Guardar Mi Contacto (vCard Download) */}
          <button
            onClick={handleDownloadVCard}
            className="w-full py-3.5 px-5 rounded-full bg-cyan-accent hover:bg-cyan-hover text-slate-950 font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.35)] active:scale-98 group"
          >
            <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Guardar mi contacto</span>
          </button>

          {/* 2. Mandar un WhatsApp (5522965764) */}
          <a
            href="https://wa.me/525522965764?text=Hola%20Mauricio,%20vi%20tu%20ID%20Digital%20y%20me%20gustar%C3%ADa%20platicar%20sobre%20un%20proyecto."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-5 rounded-full bg-[#122852] border border-[#1e3f7a] hover:border-cyan-accent/60 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 hover:bg-[#18346b] group"
          >
            <MessageCircle className="w-4 h-4 text-cyan-accent group-hover:scale-110 transition-transform" />
            <span>Mandar un WhatsApp</span>
          </a>

          {/* 3. Mandar un Correo Electrónico (mau@alternika.com.mx) */}
          <a
            href="mailto:mau@alternika.com.mx"
            className="w-full py-3.5 px-5 rounded-full bg-[#122852] border border-[#1e3f7a] hover:border-cyan-accent/60 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-300 hover:bg-[#18346b] group"
          >
            <Mail className="w-4 h-4 text-cyan-accent group-hover:scale-110 transition-transform" />
            <span>Mandar un Correo</span>
          </a>

          {/* 4. Visitar Sitio Web Altérnika */}
          <Link
            href="/"
            className="w-full py-3.5 px-5 rounded-full bg-[#081226] border border-slate-800 hover:border-slate-600 text-slate-300 hover:text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 group"
          >
            <Globe className="w-4 h-4 text-cyan-accent" />
            <span>Sitio Web Altérnika</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="mt-6 text-[11px] text-slate-500 font-medium z-10 flex items-center gap-2">
        <span>ID Digital Oficial</span>
        <span>·</span>
        <Link href="/" className="text-cyan-accent hover:underline font-semibold">
          Altérnika.com.mx
        </Link>
      </div>
    </div>
  );
}
