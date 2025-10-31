"use client"; // ⬅️ PASO 1: IMPORTANTE para la interactividad

import { useState } from "react"; // ⬅️ PASO 2: Importar el hook 'useState'
import AnimatedSection from '@/components/AnimatedSection';
import { XMarkIcon } from '@heroicons/react/24/solid'; // ⬅️ (Extra) Icono para cerrar

export default function CertificacionPage() {
  
  // ⬅️ PASO 2: Crear la variable de "estado"
  // Guarda 'socios', 'amateur', o 'null' (para ninguno)
  const [activeMap, setActiveMap] = useState<string | null>(null);

  // Guardamos tus links de mapas aquí para que sea más ordenado
  const mapLinks = {
    socios: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4791.645342698793!2d-76.49387332425597!3d3.431136796543372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a71a83f469d3%3A0xeb602ca40963938!2sSena%20Pondaje!5e1!3m2!1ses-419!2sco!4v1761942460065!5m2!1ses-419!2sco",
    amateur: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4791.651035822423!2d-76.52443672425603!3d3.430001196544508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30a6ec426661ab%3A0xae0d132a80f0028f!2sCra.%2028%20%231947%2C%20Las%20Acacias%2C%20Cali%2C%20Valle%20del%20Cauca!5e1!3m2!1ses-419!2sco!4v1761943166601!5m2!1ses-419!2sco" // ⬅️ Deberás cambiar este por tu link del mapa amateur
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-12 md:p-24 pt-28 bg-white">
      
      <div className="w-full max-w-6xl mx-auto">
        
        <h1 className="text-5xl font-bold text-gray-900 text-center mb-6">
          Aprende un Oficio con Nosotros
        </h1>
        <p className="text-xl text-gray-700 text-center mb-16 max-w-3xl mx-auto">
          Selecciona una de nuestras dos modalidades de aprendizaje para 
          ver las ubicaciones disponibles.
        </p>
        
        {/* --- 3. SECCIONES DE TEXTO (AHORA SON BOTONES) --- */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Columna A: Certificaciones Profesionales (Botón) */}
          <AnimatedSection>
            <button
              onClick={() => setActiveMap('socios')}
              className={`text-left w-full p-8 rounded-lg shadow-md border h-full transition-all duration-300
                          ${activeMap === 'socios' 
                            ? 'border-blue-600 ring-4 ring-blue-100' // ⬅️ Estilo "seleccionado"
                            : 'bg-gray-50 border-gray-200 hover:shadow-lg' // ⬅️ Estilo normal
                          }`}
            >
              <h2 className="text-3xl font-bold text-blue-700 mb-5">
                Certificación Profesional (Socios)
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nos hemos asociado con las mejores instituciones para 
                ofrecerte certificaciones oficiales.
              </p>
              <span className="inline-block mt-4 text-blue-700 font-bold">
                Ver ubicaciones &rarr;
              </span>
            </button>
          </AnimatedSection>

          {/* Columna B: Talleres Amateur (Botón) */}
          <AnimatedSection delay={0.4}>
            <button
              onClick={() => setActiveMap('amateur')}
              className={`text-left w-full p-8 rounded-lg shadow-md border h-full transition-all duration-300
                          ${activeMap === 'amateur' 
                            ? 'border-blue-600 ring-4 ring-blue-100' // ⬅️ Estilo "seleccionado"
                            : 'bg-white border-gray-200 hover:shadow-lg' // ⬅️ Estilo normal
                          }`}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-5">
                Talleres Libres y Clases Amateur
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                ¿No buscas un certificado? Nuestros talleres amateur son 
                para ti. Aprende en nuestras instalaciones.
              </p>
              <span className="inline-block mt-4 text-gray-900 font-bold">
                Ver nuestra ubicación &rarr;
              </span>
            </button>
          </AnimatedSection>

        </div>

        {/* --- 4. SECCIÓN DEL MAPA (AHORA ES CONDICIONAL) --- */}
        <AnimatedSection>
          {/* Este div es el "marco" del mapa */}
          <div className="relative w-full h-[500px] bg-gray-200 rounded-lg shadow-lg overflow-hidden border border-gray-300
                          flex items-center justify-center text-gray-500 font-semibold text-2xl p-8 text-center">

            {/* A. ESTADO INICIAL (SIN MAPA SELECCIONADO) */}
            {activeMap === null && (
              <span>Por favor, haz clic en una categoría para ver el mapa.</span>
            )}

            {/* B. MAPA DE SOCIOS (SI activeMap === 'socios') */}
            {activeMap === 'socios' && (
              <iframe 
                src={mapLinks.socios}
                width="100%" height="100%" style={{ border: 0 }}
                allowFullScreen={true} loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            )}
            
            {/* C. MAPA AMATEUR (SI activeMap === 'amateur') */}
            {activeMap === 'amateur' && (
              <iframe 
                src={mapLinks.amateur}
                width="100%" height="100%" style={{ border: 0 }}
                allowFullScreen={true} loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            )}

            {/* (EXTRA) BOTÓN PARA CERRAR EL MAPA */}
            {activeMap !== null && (
              <button 
                onClick={() => setActiveMap(null)}
                className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
                aria-label="Cerrar mapa"
              >
                <XMarkIcon className="h-6 w-6 text-gray-800" />
              </button>
            )}

          </div>
        </AnimatedSection>
      </div>
    </main>
  );
}