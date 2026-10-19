"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Lock,
  QrCode,
  Plus,
  Download,
  ExternalLink,
  Copy,
  Check,
  Edit2,
  Trash2,
  Eye,
  RefreshCw,
  Search,
  Sparkles,
  Database,
  ArrowRight,
  LogOut,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { DynamicQR } from "@/lib/supabase";
import { downloadQRJpg } from "@/lib/qr-image";
import QRCode from "qrcode";

const AUTH_KEY = "alternika_qr_auth_session";
const PASS_EXPECTED = "Imbera2026$";

export default function QRStudioPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>("");
  const [authError, setAuthError] = useState<string>("");

  const [qrs, setQrs] = useState<DynamicQR[]>([]);
  const [nextCode, setNextCode] = useState<string>("2026A1");
  const [stats, setStats] = useState({ totalQRs: 0, totalScans: 0, mostScanned: null as DynamicQR | null });
  const [isSupabase, setIsSupabase] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Modals
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState<boolean>(false);

  // Form states
  const [formBusiness, setFormBusiness] = useState<string>("");
  const [formUrl, setFormUrl] = useState<string>("");
  const [formCode, setFormCode] = useState<string>("");
  const [editingQR, setEditingQR] = useState<DynamicQR | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  // Feedback states
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Previews
  const [previewDataUrl, setPreviewDataUrl] = useState<string>("");

  const originUrl = typeof window !== "undefined" ? window.location.origin : "https://alternika.com.mx";

  // Check auth session
  useEffect(() => {
    const saved = sessionStorage.getItem(AUTH_KEY);
    if (saved === PASS_EXPECTED) {
      setIsAuthenticated(true);
      fetchQRs(saved);
    } else {
      setLoading(false);
    }
  }, []);

  // Update live preview when creating
  useEffect(() => {
    if (!isCreateOpen) return;
    const targetCode = formCode || nextCode;
    const previewUrl = `${originUrl}/r/${targetCode}`;
    QRCode.toDataURL(previewUrl, { width: 300, margin: 2 })
      .then((url) => setPreviewDataUrl(url))
      .catch(() => {});
  }, [formCode, nextCode, isCreateOpen, originUrl]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === PASS_EXPECTED) {
      sessionStorage.setItem(AUTH_KEY, passwordInput);
      setIsAuthenticated(true);
      setAuthError("");
      fetchQRs(passwordInput);
    } else {
      setAuthError("Contraseña incorrecta. Acceso restringido.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
    setPasswordInput("");
  };

  const fetchQRs = async (pass: string = PASS_EXPECTED) => {
    setLoading(true);
    try {
      const res = await fetch("/api/qr", {
        headers: { "x-qr-auth": pass },
      });
      if (res.ok) {
        const data = await res.json();
        setQrs(data.qrs || []);
        setNextCode(data.nextCode || "2026A1");
        setStats(data.stats || { totalQRs: 0, totalScans: 0, mostScanned: null });
        setIsSupabase(data.isSupabase || false);
      } else {
        if (res.status === 401) {
          handleLogout();
        }
      }
    } catch (err) {
      console.error("Error fetching QRs:", err);
    } finally {
      setLoading(false);
    }
  };

  const openCreateModal = () => {
    setFormBusiness("");
    setFormUrl("");
    setFormCode(nextCode);
    setIsCreateOpen(true);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formBusiness || !formUrl) return;

    setSaving(true);
    try {
      const res = await fetch("/api/qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-qr-auth": PASS_EXPECTED,
        },
        body: JSON.stringify({
          business_name: formBusiness,
          destination_url: formUrl,
          code: formCode || nextCode,
        }),
      });

      if (res.ok) {
        setIsCreateOpen(false);
        fetchQRs();
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Error al crear el QR");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión al crear el QR.");
    } finally {
      setSaving(false);
    }
  };

  const openEditModal = (qr: DynamicQR) => {
    setEditingQR(qr);
    setFormBusiness(qr.business_name);
    setFormUrl(qr.destination_url);
    setFormCode(qr.code);
    setIsEditOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQR || !formBusiness || !formUrl) return;

    setSaving(true);
    try {
      const res = await fetch("/api/qr", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-qr-auth": PASS_EXPECTED,
        },
        body: JSON.stringify({
          id: editingQR.id,
          business_name: formBusiness,
          destination_url: formUrl,
          code: formCode,
          is_active: editingQR.is_active,
        }),
      });

      if (res.ok) {
        setIsEditOpen(false);
        setEditingQR(null);
        fetchQRs();
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Error al actualizar el QR");
      }
    } catch (err) {
      console.error(err);
      alert("Error al actualizar.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (qr: DynamicQR) => {
    try {
      const res = await fetch("/api/qr", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-qr-auth": PASS_EXPECTED,
        },
        body: JSON.stringify({
          id: qr.id,
          is_active: !qr.is_active,
        }),
      });
      if (res.ok) fetchQRs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string, code: string) => {
    if (!confirm(`¿Estás seguro de eliminar permanentemente el código QR ${code}?`)) {
      return;
    }
    try {
      const res = await fetch(`/api/qr?id=${id}`, {
        method: "DELETE",
        headers: { "x-qr-auth": PASS_EXPECTED },
      });
      if (res.ok) fetchQRs();
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadJpg = async (qr: DynamicQR) => {
    setDownloadingId(qr.id);
    try {
      const redirectUrl = `${originUrl}/r/${qr.code}`;
      await downloadQRJpg(redirectUrl, qr.code, qr.business_name);
    } catch (err) {
      console.error(err);
      alert("Error al generar la imagen JPG");
    } finally {
      setDownloadingId(null);
    }
  };

  // Filter QRs
  const filteredQrs = qrs.filter((q) => {
    const qLower = searchQuery.toLowerCase();
    return (
      q.code.toLowerCase().includes(qLower) ||
      q.business_name.toLowerCase().includes(qLower) ||
      q.destination_url.toLowerCase().includes(qLower)
    );
  });

  // 1. Password Gated Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#040814] flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-accent/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md bg-[#081226]/90 border border-[#142a59] rounded-3xl p-8 md:p-10 shadow-2xl backdrop-blur-2xl relative z-10">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-cyan-accent/10 border border-cyan-accent/30 flex items-center justify-center mb-5 text-cyan-accent shadow-[0_0_30px_rgba(0,240,255,0.2)]">
              <Lock className="w-8 h-8" />
            </div>
            <Image
              src="/img/Alternika_logo.svg"
              alt="Alternika Logo"
              width={160}
              height={50}
              className="h-10 w-auto mb-3"
            />
            <h1 className="text-xl font-bold text-white tracking-wide">
              Alternika QR Studio
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Acceso privado para administración de QRs Dinámicos.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Contraseña Maestra
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Introduce tu contraseña..."
                  autoFocus
                  className="w-full bg-[#050c1c] border border-slate-700/80 rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-accent focus:ring-1 focus:ring-cyan-accent transition-all"
                />
              </div>
              {authError && (
                <div className="flex items-center gap-2 text-rose-400 text-xs mt-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-cyan-accent hover:bg-cyan-hover text-slate-950 font-bold text-sm transition-all duration-200 shadow-[0_0_25px_rgba(0,240,255,0.35)] flex items-center justify-center gap-2"
            >
              <span>Acceder al Panel</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-8 text-center border-t border-slate-800/80 pt-4">
            <Link
              href="/"
              className="text-xs text-slate-500 hover:text-cyan-accent transition-colors"
            >
              ← Volver al sitio principal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Dashboard
  return (
    <div className="min-h-screen bg-[#040814] text-slate-100 p-4 md:p-8 lg:p-12 relative overflow-hidden">
      {/* Background glow flares */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-cyan-accent/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* Top Navbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div className="flex items-center gap-4">
            <Link href="/" className="shrink-0">
              <Image
                src="/img/Alternika_logo.svg"
                alt="Alternika"
                width={140}
                height={45}
                className="h-9 w-auto"
              />
            </Link>
            <div className="h-6 w-px bg-slate-800" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-cyan-accent" />
                  QR Studio Dinámico
                </h1>
                <span className="text-[10px] font-bold bg-cyan-accent/15 text-cyan-accent px-2 py-0.5 rounded-full border border-cyan-accent/30">
                  PRIVADO
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Plataforma de redirección, tracking y generación de imágenes JPG.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Supabase status badge */}
            <button
              onClick={() => setIsSupabaseModalOpen(true)}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                isSupabase
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                  : "bg-amber-500/10 border-amber-500/30 text-amber-300 hover:bg-amber-500/20"
              }`}
              title="Click para ver estado y configuración de base de datos"
            >
              <Database className="w-3.5 h-3.5" />
              <span>{isSupabase ? "Supabase Conectado" : "Modo Local (Configurar Supabase)"}</span>
            </button>

            <button
              onClick={() => fetchQRs()}
              disabled={loading}
              className="p-2 rounded-xl bg-[#0b1836] border border-slate-800 text-slate-300 hover:text-cyan-accent hover:border-cyan-accent/40 transition-colors"
              title="Recargar datos"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 text-xs font-medium transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Salir</span>
            </button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#081226]/80 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Total QRs Creados
            </div>
            <div className="text-3xl font-black text-white font-display">
              {stats.totalQRs}
            </div>
            <div className="text-[11px] text-cyan-accent mt-2 flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5" /> Siguiente sugerido: {nextCode}
            </div>
          </div>

          <div className="bg-[#081226]/80 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Escaneos Totales
            </div>
            <div className="text-3xl font-black text-cyan-accent font-display">
              {stats.totalScans}
            </div>
            <div className="text-[11px] text-slate-400 mt-2">
              Redirecciones dinámicas ejecutadas
            </div>
          </div>

          <div className="bg-[#081226]/80 border border-slate-800/80 rounded-2xl p-5 relative overflow-hidden">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              QR Más Popular
            </div>
            <div className="text-lg font-bold text-white truncate font-display">
              {stats.mostScanned ? stats.mostScanned.business_name : "Sin registros"}
            </div>
            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
              {stats.mostScanned && (
                <>
                  <span className="font-mono text-cyan-accent font-bold">
                    {stats.mostScanned.code}
                  </span>
                  <span>·</span>
                  <span>{stats.mostScanned.scan_count} visitas</span>
                </>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-950/40 via-[#081226]/80 to-[#040814] border border-cyan-500/30 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-cyan-300 uppercase tracking-wider mb-1">
                Acción Rápida
              </div>
              <p className="text-xs text-slate-300">
                Genera un nuevo QR con código consecutivo automático.
              </p>
            </div>
            <button
              onClick={openCreateModal}
              className="mt-3 w-full py-2.5 px-4 rounded-xl bg-cyan-accent hover:bg-cyan-hover text-slate-950 font-bold text-xs transition-all shadow-[0_0_20px_rgba(0,240,255,0.35)] flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Crear Nuevo QR</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#081226]/60 border border-slate-800/80 rounded-2xl p-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por código, negocio o link..."
              className="w-full bg-[#050c1c] border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-accent"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-slate-400">
              Mostrando <strong className="text-white">{filteredQrs.length}</strong> de{" "}
              {qrs.length} códigos
            </span>
          </div>
        </div>

        {/* List of Dynamic QRs */}
        {loading ? (
          <div className="py-24 text-center">
            <RefreshCw className="w-8 h-8 text-cyan-accent animate-spin mx-auto mb-3" />
            <p className="text-sm text-slate-400">Cargando catálogo de códigos QR...</p>
          </div>
        ) : filteredQrs.length === 0 ? (
          <div className="py-20 text-center bg-[#081226]/40 border border-slate-800/80 rounded-3xl p-8">
            <QrCode className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">No hay códigos QR encontrados</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mb-6">
              {searchQuery
                ? "No se encontraron coincidencias con tu búsqueda."
                : "Aún no has creado ningún código QR dinámico. Comienza creando el primero."}
            </p>
            <button
              onClick={openCreateModal}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-cyan-accent text-slate-950 font-bold text-xs hover:bg-cyan-hover transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Crear mi primer QR</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredQrs.map((qr) => {
              const redirectUrl = `${originUrl}/r/${qr.code}`;

              return (
                <div
                  key={qr.id}
                  className={`bg-[#081226]/90 border rounded-3xl p-6 flex flex-col justify-between transition-all hover:border-cyan-accent/40 shadow-xl ${
                    qr.is_active ? "border-slate-800/90" : "border-rose-900/30 opacity-75"
                  }`}
                >
                  <div>
                    {/* Card Header: Code & Active badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-black bg-cyan-accent/15 border border-cyan-accent/30 text-cyan-accent px-3 py-1 rounded-lg tracking-wider">
                          {qr.code}
                        </span>
                        <button
                          onClick={() => handleToggleActive(qr)}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase transition-colors ${
                            qr.is_active
                              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                              : "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                          }`}
                          title="Click para pausar o activar este QR"
                        >
                          {qr.is_active ? "Activo" : "Pausado"}
                        </button>
                      </div>

                      {/* Scans Pill */}
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300 bg-[#050c1c] border border-slate-800 px-2.5 py-1 rounded-full">
                        <Eye className="w-3.5 h-3.5 text-cyan-accent" />
                        <span>{qr.scan_count} {qr.scan_count === 1 ? "scan" : "scans"}</span>
                      </div>
                    </div>

                    {/* Business Name */}
                    <h3 className="text-base font-bold text-white mb-2 line-clamp-1 font-display">
                      {qr.business_name}
                    </h3>

                    {/* Internal Redirect Link Box */}
                    <div className="mb-3 bg-[#050c1c] border border-slate-800/80 rounded-xl p-2.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                        <span className="font-semibold uppercase tracking-wider text-[10px] text-cyan-accent">
                          Link Dinámico (En el QR)
                        </span>
                        <button
                          onClick={() => copyToClipboard(redirectUrl, qr.id)}
                          className="hover:text-white transition-colors flex items-center gap-1 text-[10px]"
                        >
                          {copiedId === qr.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copiado</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      </div>
                      <div className="text-xs font-mono text-slate-200 truncate select-all">
                        {redirectUrl}
                      </div>
                    </div>

                    {/* Final Destination Link */}
                    <div className="text-xs text-slate-400 mb-5">
                      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-0.5">
                        Destino Final:
                      </div>
                      <a
                        href={qr.destination_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-300 hover:text-cyan-accent transition-colors flex items-center gap-1 truncate"
                        title={qr.destination_url}
                      >
                        <span className="truncate">{qr.destination_url}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleDownloadJpg(qr)}
                      disabled={downloadingId === qr.id}
                      className="flex-1 py-2 px-3 rounded-xl bg-cyan-accent/15 border border-cyan-accent/40 text-cyan-accent hover:bg-cyan-accent hover:text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
                      title="Descarga la imagen JPG del QR con el código 2026A... incrustado abajo"
                    >
                      <Download className={`w-3.5 h-3.5 ${downloadingId === qr.id ? "animate-bounce" : ""}`} />
                      <span>{downloadingId === qr.id ? "Generando..." : "Descargar JPG"}</span>
                    </button>

                    <button
                      onClick={() => openEditModal(qr)}
                      className="p-2 rounded-xl bg-[#0b1836] border border-slate-800 text-slate-300 hover:text-cyan-accent hover:border-cyan-accent/40 transition-colors"
                      title="Editar nombre o destino"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <a
                      href={redirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-[#0b1836] border border-slate-800 text-slate-300 hover:text-cyan-accent hover:border-cyan-accent/40 transition-colors"
                      title="Probar redirección (abre en nueva pestaña y cuenta un scan)"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => handleDelete(qr.id, qr.code)}
                      className="p-2 rounded-xl bg-[#0b1836] border border-slate-800 text-slate-400 hover:text-rose-400 hover:border-rose-500/40 transition-colors"
                      title="Eliminar QR"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* MODAL: Crear Nuevo QR */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#081226] border border-[#142a59] rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-accent/15 border border-cyan-accent/30 flex items-center justify-center text-cyan-accent">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white font-display">
                    Crear Código QR Dinámico
                  </h2>
                  <p className="text-xs text-slate-400">
                    Se generará el link interno y la imagen JPG descargable.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-slate-500 hover:text-white transition-colors text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Nombre del Negocio o Campaña *
                  </label>
                  <input
                    type="text"
                    required
                    value={formBusiness}
                    onChange={(e) => setFormBusiness(e.target.value)}
                    placeholder="Ej. Menú Terraza, Tarjeta Mauro, Hot Sale..."
                    className="w-full bg-[#050c1c] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-accent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                    Código de ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    placeholder="Ej. 2026A1"
                    className="w-full bg-[#050c1c] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-cyan-accent font-mono font-bold focus:outline-none focus:border-cyan-accent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Link de Destino Final (Hacia donde apunta) *
                </label>
                <input
                  type="text"
                  required
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                  placeholder="https://instagram.com/..., https://misitio.com/menu"
                  className="w-full bg-[#050c1c] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-accent"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Podrás editar este enlace en cualquier momento sin que cambie el QR impreso.
                </p>
              </div>

              {/* Live Preview Box with embedded code */}
              <div className="bg-[#050c1c] border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4">
                {previewDataUrl ? (
                  <div className="bg-white p-2.5 rounded-xl border border-slate-300 shrink-0 text-center shadow-md">
                    <img
                      src={previewDataUrl}
                      alt="Preview QR"
                      className="w-24 h-24 object-contain mx-auto"
                    />
                    <div className="mt-1 pt-1 border-t border-slate-200">
                      <div className="text-[10px] font-black text-slate-900 font-mono tracking-wider">
                        {(formCode || nextCode).toUpperCase()}
                      </div>
                      <div className="text-[7px] text-slate-500 uppercase tracking-tight">
                        ALTERLNK DYNAMIC
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-24 h-28 bg-slate-900 rounded-xl flex items-center justify-center text-slate-600">
                    <QrCode className="w-8 h-8" />
                  </div>
                )}
                <div className="text-xs text-slate-400 space-y-1">
                  <div className="font-semibold text-white">
                    Vista previa de la imagen JPG generada
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    La imagen se descargará en resolución media con fondo blanco, el QR de alta definición y el código <strong className="text-cyan-accent font-mono">{(formCode || nextCode).toUpperCase()}</strong> impreso en la parte inferior.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-cyan-accent hover:bg-cyan-hover text-slate-950 text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                >
                  {saving ? "Guardando..." : "Guardar y Crear QR"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Editar QR */}
      {isEditOpen && editingQR && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#081226] border border-[#142a59] rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-accent/15 border border-cyan-accent/30 flex items-center justify-center text-cyan-accent">
                  <Edit2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white font-display">
                    Editar QR Dinámico ({editingQR.code})
                  </h2>
                  <p className="text-xs text-slate-400">
                    Actualiza el destino final sin alterar el código físico.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsEditOpen(false)}
                className="text-slate-500 hover:text-white transition-colors text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Nombre del Negocio o Campaña
                </label>
                <input
                  type="text"
                  required
                  value={formBusiness}
                  onChange={(e) => setFormBusiness(e.target.value)}
                  className="w-full bg-[#050c1c] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Link de Destino Final
                </label>
                <input
                  type="text"
                  required
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                  className="w-full bg-[#050c1c] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-accent"
                />
                <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Al actualizar este enlace, cualquier persona que escanee el QR será dirigida a esta nueva URL de inmediato.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-white text-xs font-semibold transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-cyan-accent hover:bg-cyan-hover text-slate-950 text-xs font-bold transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                >
                  {saving ? "Actualizando..." : "Guardar Cambios"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Guía de Conexión Supabase */}
      {isSupabaseModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#081226] border border-[#142a59] rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white font-display">
                    Conexión con Supabase
                  </h2>
                  <p className="text-xs text-slate-400">
                    Estado: {isSupabase ? "✅ Conectado y sincronizado" : "🟡 Modo Local activo"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsSupabaseModalOpen(false)}
                className="text-slate-500 hover:text-white transition-colors text-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-300">
              <p>
                La plataforma ya está completamente preparada para conectarse a Supabase. Para que tus datos se guarden de forma permanente en la nube de Supabase, solo sigue estos 3 pasos:
              </p>

              <div className="bg-[#050c1c] border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-accent text-slate-950 flex items-center justify-center text-[10px]">1</span>
                  Crea tu proyecto gratuito en Supabase
                </div>
                <p className="text-slate-400 pl-7">
                  Entra a <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-cyan-accent underline">supabase.com</a> y crea un proyecto nuevo (por ejemplo: "alternika-db").
                </p>
              </div>

              <div className="bg-[#050c1c] border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-accent text-slate-950 flex items-center justify-center text-[10px]">2</span>
                  Ejecuta este código en el SQL Editor de Supabase
                </div>
                <pre className="bg-[#030712] p-3 rounded-lg text-[11px] text-slate-300 overflow-x-auto font-mono border border-slate-800 select-all">
{`CREATE TABLE IF NOT EXISTS dynamic_qrs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(50) UNIQUE NOT NULL,
  business_name TEXT NOT NULL,
  destination_url TEXT NOT NULL,
  scan_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar permisos de lectura y escritura
ALTER TABLE dynamic_qrs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read dynamic_qrs" ON dynamic_qrs FOR SELECT USING (true);
CREATE POLICY "Public update scans dynamic_qrs" ON dynamic_qrs FOR UPDATE USING (true);
CREATE POLICY "Public insert dynamic_qrs" ON dynamic_qrs FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete dynamic_qrs" ON dynamic_qrs FOR DELETE USING (true);`}
                </pre>
              </div>

              <div className="bg-[#050c1c] border border-slate-800 rounded-xl p-4 space-y-2">
                <div className="font-bold text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-accent text-slate-950 flex items-center justify-center text-[10px]">3</span>
                  Agrega tus Variables de Entorno en Vercel o en tu archivo .env
                </div>
                <pre className="bg-[#030712] p-3 rounded-lg text-[11px] text-cyan-accent font-mono border border-slate-800 select-all">
{`NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anon_publica`}
                </pre>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsSupabaseModalOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-cyan-accent text-slate-950 font-bold text-xs"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
