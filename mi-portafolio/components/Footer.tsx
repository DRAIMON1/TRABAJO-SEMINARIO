import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaFacebook, FaYoutube, FaTiktok } from 'react-icons/fa'; 

export default function Footer() {
  return (
    // Contenedor principal del footer
    <footer className="w-full bg-gray-950 text-gray-300" id="contactanos">
      
      {/* --- 🚀 SECCIÓN SUPERIOR: LLAMADA A LA ACCIÓN (NUEVA ESTRUCTURA) --- */}
      {/* Usamos un color de fondo diferente para esta sección: un azul oscuro */}
      <div className="bg-blue-900 py-20 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-6">
            ¿Listo para llevar tu proyecto al siguiente nivel?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Desde la idea hasta la ejecución, nuestro equipo de expertos y nuestro inventario están a tu servicio.
          </p>
          <a 
            href="https://wa.me/573132441090" // ⬅️ ¡CAMBIA ESTE NÚMERO!
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-blue-500 text-white text-xl font-bold rounded-lg 
                       hover:bg-blue-600 transition-colors shadow-lg"
          >
            Contáctanos
          </a>
        </div>
      </div>
      {/* --- FIN SECCIÓN SUPERIOR --- */}

      {/* --- SECCIÓN PRINCIPAL DEL FOOTER: Columnas de Navegación --- */}
      {/* Fondo más oscuro para esta sección */}
      <div className="bg-gray-900 pt-16 pb-8 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Columna 1: Logo */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/construtech.png"
                alt="Construtech ISL Logo"
                width={90}
                height={60}
                className="rounded-lg"
              />
              <span className="text-2xl font-bold text-white">
                Construtech ISL
              </span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm">
              La Esencia de tu Proyecto.
            </p>
          </div>

          {/* Columna 2: Trabaja con nosotros */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Trabaja con nosotros</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/quienes-somos" className="text-gray-400 hover:text-white transition-colors">
                  Quiénes somos
                </Link>
              </li>
              <li>
                <Link href="/unete" className="text-gray-400 hover:text-white transition-colors">
                  Únete a nuestro equipo
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Explora */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Explora</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/#servicios" className="text-gray-400 hover:text-white transition-colors">
                  Nuestros servicios
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="text-gray-400 hover:text-white transition-colors">
                  Aviso de privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Atención al cliente */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Atención al cliente</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@construtech.com" className="text-gray-400 hover:text-white transition-colors">
                  info@construtech.com
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/573132441090" // ⬅️ ¡CAMBIA ESTE NÚMERO!
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  +57 3132441090 (WhatsApp)
                </a>
              </li>
              <li>
                <Link href="/terminos" className="text-gray-400 hover:text-white transition-colors">
                  Términos y condiciones
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Barra inferior con Copyright y Redes --- */}
        <div className="max-w-7xl mx-auto border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-500 mb-4 md:mb-0">
            © Creado por Construtech ISL. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white" aria-label="TikTok">
              <FaTiktok size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white" aria-label="Facebook">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white" aria-label="YouTube">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}