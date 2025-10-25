import Link from 'next/link';
// Importamos los íconos para las redes sociales
import { FaInstagram, FaFacebook, FaYoutube } from 'react-icons/fa'; 
// (Si no tienes react-icons, instálalo: npm install react-icons)

export default function Footer() {
  return (
    // 'id' para el botón "Contáctanos"
    <footer className="w-full bg-gray-800 text-gray-300 pt-16 pb-8 px-8" id="contactanos">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Columna 1: Logo (Lado izquierdo)  */}
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg">
              {/* Aquí va tu logo */}
            </div>
            <span className="text-2xl font-bold text-white">
              Construtech ISL
            </span>
          </Link>
          <p className="mt-4 text-gray-400">
            La Esencia de tu Proyecto.
          </p>
        </div>

        {/* Columna 2: Trabaja con nosotros  */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Trabaja con nosotros</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/quienes-somos" className="hover:text-white transition-colors">
                Quiénes somos
              </Link>
            </li>
            <li>
              <Link href="/unete" className="hover:text-white transition-colors">
                Únete a nuestro equipo
              </Link>
            </li>
          </ul>
        </div>

        {/* Columna 3: Explora (Inspirado en la imagen)  */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Explora</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/#servicios" className="hover:text-white transition-colors">
                Nuestros servicios
              </Link>
            </li>
            <li>
              <Link href="/privacidad" className="hover:text-white transition-colors">
                Aviso de privacidad
              </Link>
            </li>
          </ul>
        </div>

        {/* Columna 4: Atención al cliente (Inspirado en la imagen)  */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Atención al cliente</h3>
          <ul className="space-y-3">
            <li className="text-gray-400">Línea nacional: +57 300 123 4567</li>
            <li>
              <Link href="/terminos" className="hover:text-white transition-colors">
                Términos y condiciones
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* --- Barra inferior con Copyright y Redes ---  */}
      <div className="max-w-7xl mx-auto border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="text-gray-500 mb-4 md:mb-0">
          © Creado por Construtech ISL. Todos los derechos reservados.
        </p>
        <div className="flex space-x-6">
          <a href="#" className="text-gray-400 hover:text-white">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <FaYoutube size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}