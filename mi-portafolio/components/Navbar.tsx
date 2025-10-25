import Link from 'next/link';
// Importamos el ícono de lupa para el botón de búsqueda
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
  return (
    // 'fixed': Fija el navbar en la parte superior
    // 'z-50': Asegura que esté por encima de otro contenido
    // 'shadow-md': Añade una sombra sutil
    <nav className="fixed top-0 left-0 w-full bg-white text-gray-900 shadow-md p-4 z-50 flex justify-between items-center">
      
      {/* Lado Izquierdo: Logo y Nombre */}
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center space-x-2">
          
          {/* --- TU LOGO AQUÍ --- */}
          {/* Por ahora, es un cuadro azul. Reemplázalo con tu <Image> de Next.js */}
          <div className="w-10 h-10 bg-blue-600 rounded-lg">
            {/* <Image src="/tu-logo.png" width={40} height={40} alt="Logo" /> */}
          </div>
          
          <span className="text-2xl font-bold text-gray-900">
            Construtech ISL
          </span>
        </Link>
      </div>

      {/* Lado Derecho: Links y Búsqueda */}
      <div className="flex items-center space-x-8">
        
        {/* Links de Navegación (se ocultan en móviles) */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Inicio
          </Link>
          <Link href="/#servicios" className="hover:text-blue-600 transition-colors">
            Acerca de
          </Link>
          <Link href="/#proyectos" className="hover:text-blue-600 transition-colors">
            Proyectos
          </Link>
          <Link href="/quienes-somos" className="hover:text-blue-600 transition-colors">
            Quiénes somos
          </Link>
          <Link href="/#contactanos" className="hover:text-blue-600 transition-colors">
            Contáctanos
          </Link>
        </div>
        
        {/* Botón de Búsqueda */}
        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />
        </button>
      </div>
    </nav>
  );
}