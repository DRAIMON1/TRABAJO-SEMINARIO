import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // <-- 1. IMPORTA EL NAVBAR

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  // Cambiamos el título para que coincida
  title: "Construtech ISL",
  description: "La Esencia de tu Proyecto: Herramientas, Capacitación y Expertos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <Navbar /> {/* <-- 2. AÑADE EL NAVBAR AQUÍ */}
        {children}
      </body>
    </html>
  );
}
