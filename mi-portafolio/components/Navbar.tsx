import Link from 'next/link';
// Importamos TODOS los íconos que necesitamos
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
// 1. Importamos el cliente de SERVIDOR
import { createClient } from '@/utils/supabase/server'; 
// 2. Importamos la acción de Cerrar Sesión
import { signOut } from '@/app/auth/actions'; 

// 3. Convertimos el Navbar en un componente 'async'
export default async function Navbar() {

  // 4. Obtenemos el cliente (CON 'await' - esta es la corrección)
  const supabase = await createClient(); 
  
  // 5. Obtenemos el usuario (ESTA línea SÍ usa 'await')
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-gray-900 shadow-md p-4 z-50 flex justify-between items-center">
      
      {/* Lado Izquierdo: Logo y Nombre (Sin cambios) */}
      <div className="flex items-center space-x-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg">
            {/* Logo */}
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
          
          {/* --- FUSIÓN 1: Menú "Acerca de" (Con el "puente" del código 2) --- */}
          <div className="relative group">
            <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
              <span>Acerca de</span>
              <ChevronDownIcon className="h-4 w-4" />
            </button>
            <div 
              className="absolute top-full left-1/2 -translate-x-1/2 z-30 
                         hidden group-hover:block
                         pt-2" // <-- El "puente invisible"
            >
              <div className="w-64 bg-white rounded-lg shadow-xl p-2">
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
          {/* --- FIN DE LA FUSIÓN 1 --- */}

          <Link href="/#proyectos" className="hover:text-blue-600 transition-colors">
            Proyectos
          </Link>
          <Link href="/quienes-somos" className="hover:text-blue-600 transition-colors">
            Quiénes somos
          </Link>
          <Link href="/#contactanos" className="hover:text-blue-600 transition-colors">
            Contáctanos
          </Link>

          {/* --- LÓGICA DE USUARIO CON LA CORRECCIÓN --- */}
          {user ? (
            // SI EL USUARIO EXISTE
            <div className="relative group">
              <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                <span>Perfil</span>
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              
              {/* --- INICIO DE LA CORRECCIÓN --- */}
              {/* Envolvemos el menú en un div contenedor con 'pt-2' */}
              <div 
                className="absolute top-full right-0 z-30 
                           hidden group-hover:block
                           pt-2" // <-- AÑADIDO: El puente invisible
              >
                {/* Este es el menú visible que ya tenías */}
                <div 
                  className="w-64 bg-white rounded-lg shadow-xl p-2"
                >
                  <span className="block w-full text-left px-4 py-2 text-gray-500 text-sm truncate">
                    {user.email}
                  </span>
                  <Link 
                    href="/perfil" 
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md"
                  >
                    Mi Perfil
                  </Link>
                  <form action={signOut} className="w-full">
                    <button 
                      type="submit"
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-md"
                    >
                      Cerrar Sesión
                    </button>
                  </form>
                </div>
              </div>
              {/* --- FIN DE LA CORRECCIÓN --- */}
              
            </div>
          ) : (
            // SI EL USUARIO NO EXISTE
            <Link 
              href="/login" 
              className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              Iniciar Sesión
            </Link>
          )}
          {/* --- FIN DE LA LÓGICA DE USUARIO --- */}

        </div>
        
        {/* Botón de Búsqueda (Sin cambios) */}
        <button className="p-2 rounded-full hover:bg-gray-200 transition-colors">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />
        </button>
      </div>
    </nav>
  );
}