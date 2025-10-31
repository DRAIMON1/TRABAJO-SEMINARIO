import Link from 'next/link';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-gray-900 shadow-md p-4 z-50 flex justify-between items-center">
      
      {/* Lado Izquierdo: Logo y Nombre */}
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center space-x-2">
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
        
        {/* Links de Navegación */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link href="/" className="hover:text-blue-600 transition-colors">
            Inicio
          </Link>
          
          {/* --- INICIO DE LA MODIFICACIÓN --- */}
          <div className="relative group">
            <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
              <span>Acerca de</span>
              <ChevronDownIcon className="h-4 w-4" />
            </button>
            
            {/* ESTE ES EL CAMBIO:
              Ahora hay un 'div' contenedor invisible con 'pt-2' (padding-top).
              Este 'div' es el "puente" que tu mouse puede cruzar 
              sin que el menú desaparezca.
            */}
            <div 
              className="absolute top-full left-1/2 -translate-x-1/2 z-30 
                         hidden group-hover:block
                         pt-2" // <-- Este es el puente invisible
            >
              {/* Este 'div' es el menú visible que ya tenías */}
              <div 
                className="w-64 bg-white rounded-lg shadow-xl p-2"
              >
                <Link 
                  href="/servicios/alquiler" 
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                >
                  Alquiler de Herramientas
                </Link>
                <Link 
                  href="/servicios/personal" 
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                >
                  Personal Calificado
                </Link>
                <Link 
                  href="/servicios/certificacion" 
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                >
                  Lugares de Certificación
                </Link>
                <Link 
                  href="/servicios/asesoria" 
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                >
                  Asesoría Personalizada
                </Link>
              </div>
            </div>
          </div>
          {/* --- FIN DE LA MODIFICACIÓN --- */}

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