import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CustomCursor } from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alternika | Agencia de Diseño Web, Print, Redes Sociales & Branding",
  description:
    "Agencia de diseño experta en sitios web de alto rendimiento en Next.js, medios impresos de lujo, estrategias para redes sociales e identidad de marca.",
  keywords: [
    "Diseño Web",
    "Agencia Digital",
    "Next.js",
    "Diseño Print",
    "Redes Sociales",
    "Branding",
    "Alternika",
    "UI/UX",
  ],
  authors: [{ name: "Alternika Team" }],
  openGraph: {
    title: "Alternika | Agencia de Diseño Digital & Marca",
    description:
      "Diseñamos experiencias digitales memorables, sitios web futuristas, productos impresos e identidad de marca.",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${syne.variable} scroll-smooth`}>
      <body className="bg-bg-dark text-slate-100 antialiased font-sans flex flex-col min-h-screen selection:bg-cyan-accent selection:text-slate-950">
        <CustomCursor />
        <Header />
        <main className="flex-grow pt-[80px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
