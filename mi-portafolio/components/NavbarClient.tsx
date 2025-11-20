"use client"; // ⬅️ Este componente maneja la interactividad

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  MagnifyingGlassIcon, 
  ChevronDownIcon, 
  Bars3Icon, 
  XMarkIcon 
} from "@heroicons/react/24/outline";
import { signOut } from "@/app/auth/actions";
import { User } from "@supabase/supabase-js";

type NavbarClientProps = {
  user: User | null;
};

export default function NavbarClient({ user }: NavbarClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Función para cerrar el menú móvil al hacer clic en un enlace
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-gray-900 shadow-md p-4 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        
        {/* --- LOGO (Visible siempre) --- */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
            <Image
              src="/construtech.png"
              alt="Construtech ISL Logo"
              width={88}
              height={50}
              className="rounded-lg"
            />
            <span className="text-xl md:text-2xl font-bold text-gray-900 truncate max-w-[200px] md:max-w-none">
              Construtech ISL
            </span>
          </Link>
        </div>

        {/* --- MENÚ DESKTOP (Oculto en móviles) --- */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="hover:text-blue-600 transition-colors">Inicio</Link>
          
          {/* Dropdown "Acerca de" Desktop */}
          <div className="relative group">
            <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
              <span>Acerca de</span>
              <ChevronDownIcon className="h-4 w-4" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 z-30 hidden group-hover:block pt-2">
              <div className="w-64 bg-white rounded-lg shadow-xl p-2 border border-gray-100">
                <Link href="/servicios/alquiler" className="block px-4 py-2 hover:bg-gray-500 rounded-md">Alquiler de Herramientas</Link>
                <Link href="/servicios/personal" className="block px-4 py-2 hover:bg-gray-500 rounded-md">Personal Calificado</Link>
                <Link href="/servicios/certificacion" className="block px-4 py-2 hover:bg-gray-500 rounded-md">Lugares de Certificación</Link>
                <Link href="/servicios/asesoria" className="block px-4 py-2 hover:bg-gray-500 rounded-md">Asesoría Personalizada</Link>
              </div>
            </div>
          </div>

          <Link href="/proyectos" className="hover:text-blue-600 transition-colors">Proyectos</Link>
          <Link href="/quienes-somos" className="hover:text-blue-600 transition-colors">Quiénes somos</Link>
          {/* Enlace a WhatsApp */}
          <a 
            href="https://wa.me/573132441090" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            Contáctanos
          </a>

          {/* Perfil / Login Desktop */}
          {user ? (
            <div className="relative group">
              <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                <span>Perfil</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              <div className="absolute top-full right-0 z-30 hidden group-hover:block pt-2">
                <div className="w-64 bg-white rounded-lg shadow-xl p-2 border border-gray-100">
                  <span className="block px-4 py-2 text-gray-500 text-sm truncate">{user.email}</span>
                  <Link href="/perfil" className="block px-4 py-2 hover:bg-gray-500 rounded-md">Mi Perfil</Link>
                  <form action={signOut}>
                    <button type="submit" className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 rounded-md">Cerrar Sesión</button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/login" className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg text-sm hover:bg-blue-700 transition-colors">
              Iniciar Sesión
            </Link>
          )}
          
          {/* Buscador Desktop (Funcionalidad visual) */}
          <div className="relative">
            {isSearchOpen ? (
               <input 
                type="text" 
                placeholder="Buscar..." 
                className="border border-gray-300 rounded-full px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-40"
                onBlur={() => setIsSearchOpen(false)} // Cierra al perder foco
                autoFocus
               />
            ) : (
              <button onClick={() => setIsSearchOpen(true)} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />
              </button>
            )}
          </div>
        </div>

        {/* --- BOTÓN HAMBURGUESA (Visible solo en móviles) --- */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="h-8 w-8" />
            ) : (
              <Bars3Icon className="h-8 w-8" />
            )}
          </button>
        </div>

      </div>

      {/* --- MENÚ MÓVIL DESPLEGABLE CORREGIDO --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl flex flex-col p-4 space-y-2 max-h-[85vh] overflow-y-auto z-50">
          
          <Link 
            href="/" 
            className="block px-4 py-3 rounded-lg hover:bg-gray-100 font-medium text-gray-800 transition-colors" 
            onClick={closeMobileMenu}
          >
            Inicio
          </Link>
          
          {/* Sección Servicios (Indentada) */}
          <div className="bg-gray-50 rounded-lg p-3 space-y-2">
            <p className="text-xs font-bold text-gray-400 uppercase px-2">Servicios</p>
            <Link href="/servicios/alquiler" className="block px-4 py-2 rounded-md hover:bg-white text-gray-700 text-sm" onClick={closeMobileMenu}>Alquiler de Herramientas</Link>
            <Link href="/servicios/personal" className="block px-4 py-2 rounded-md hover:bg-white text-gray-700 text-sm" onClick={closeMobileMenu}>Personal Calificado</Link>
            <Link href="/servicios/certificacion" className="block px-4 py-2 rounded-md hover:bg-white text-gray-700 text-sm" onClick={closeMobileMenu}>Certificaciones</Link>
            <Link href="/servicios/asesoria" className="block px-4 py-2 rounded-md hover:bg-white text-gray-700 text-sm" onClick={closeMobileMenu}>Asesoría</Link>
          </div>

          <Link href="/proyectos" className="block px-4 py-3 rounded-lg hover:bg-gray-100 font-medium text-gray-800" onClick={closeMobileMenu}>Proyectos</Link>
          <Link href="/quienes-somos" className="block px-4 py-3 rounded-lg hover:bg-gray-100 font-medium text-gray-800" onClick={closeMobileMenu}>Quiénes somos</Link>
          
          <a href="https://wa.me/573132441090" target="_blank" className="block px-4 py-3 rounded-lg bg-green-50 text-green-700 font-medium border border-green-200 text-center mt-2" onClick={closeMobileMenu}>
            Contáctanos (WhatsApp)
          </a>

          <div className="border-t border-gray-200 pt-4 mt-2">
            {user ? (
              <div className="space-y-3 text-center">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-600 truncate max-w-[150px]">{user.email}</span>
                </div>
                <Link href="/perfil" className="block w-full py-3 bg-gray-100 rounded-lg font-medium text-gray-800" onClick={closeMobileMenu}>
                  Mi Perfil
                </Link>
                <form action={signOut}>
                  <button type="submit" className="block w-full py-3 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100">
                    Cerrar Sesión
                  </button>
                </form>
              </div>
            ) : (
              <Link href="/login" className="block w-full py-3 bg-blue-600 text-white text-center rounded-lg font-bold shadow-md hover:bg-blue-700" onClick={closeMobileMenu}>
                Iniciar Sesión
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}