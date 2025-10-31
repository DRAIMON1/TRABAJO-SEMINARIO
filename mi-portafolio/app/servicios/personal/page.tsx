import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';
import { AcademicCapIcon, BriefcaseIcon } from '@heroicons/react/24/solid'; // ⬅️ Iconos para estudios y experiencia

export default function PersonalPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12 md:p-24 pt-28 bg-gray-50">
      
      <div className="w-full max-w-6xl mx-auto">
        
        <AnimatedSection>
          <h1 className="text-5xl font-bold text-gray-900 text-center mb-6">
            Conoce a Nuestro Equipo Calificado
          </h1>
          <p className="text-xl text-gray-700 text-center mb-16 max-w-3xl mx-auto">
            No solo te conectamos con un profesional; te conectamos con 
            la persona correcta. Conoce a los expertos que harán tu 
            proyecto una realidad.
          </p>
        </AnimatedSection>

        {/* --- Contenedor de la Rejilla de Perfiles --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* --- Tarjeta de Perfil 1 --- */}
          <AnimatedSection delay={0.2}>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 h-full flex flex-col">
              {/* Imagen (Asegúrate de que la ruta sea correcta) */}
              <Image
                src="/equipo/carlos-mendoza.jpg" // ⬅️ CAMBIA ESTO por tu foto
                alt="Foto de Carlos Mendoza"
                width={500}
                height={500}
                className="w-full h-64 object-cover object-center" // 'object-cover' recorta la imagen
              />
              {/* Contenido de texto */}
              <div className="p-6 flex-grow">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Carlos Mendoza
                </h2>
                <p className="text-md font-semibold text-blue-700 mb-4">
                  Maestro Carpintero y Ebanista
                </p>

                {/* --- Estudios y Experiencia --- */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <BriefcaseIcon className="h-5 w-5 mr-2 text-gray-500" />
                    <strong>Experiencia:</strong>&nbsp;15+ años en el sector
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <AcademicCapIcon className="h-5 w-5 mr-2 text-gray-500" />
                    <strong>Estudios:</strong>&nbsp;Técnico en Ebanistería
                  </div>
                </div>
                
                {/* --- El toque de "Empatía" --- */}
                <p className="text-gray-600 text-sm italic border-t pt-4">
                  "La madera tiene su propio lenguaje. Mi trabajo es 
                  traducirlo en un mueble que dure para toda la vida."
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* --- Tarjeta de Perfil 2 (Ejemplo con placeholder) --- */}
          <AnimatedSection delay={0.4}>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 h-full flex flex-col">
              {/* Placeholder si no tienes imagen */}
              <Image
                src="/equipo/ana-silva.jpg" // ⬅️ CAMBIA ESTO por tu foto
                alt="Foto de ana silva"
                width={500}
                height={500}
                className="w-full h-64 object-cover object-center" // 'object-cover' recorta la imagen
              />
              
              <div className="p-6 flex-grow">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Ana Silva
                </h2>
                <p className="text-md font-semibold text-blue-700 mb-4">
                  Electricista Certificada
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <BriefcaseIcon className="h-5 w-5 mr-2 text-gray-500" />
                    <strong>Experiencia:</strong>&nbsp;8 años en residencial
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <AcademicCapIcon className="h-5 w-5 mr-2 text-gray-500" />
                    <strong>Estudios:</strong>&nbsp;Téc. en Instalaciones Eléctricas
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic border-t pt-4">
                  "La seguridad no es negociable. Me aseguro de que 
                  cada conexión sea perfecta y segura para tu familia."
                </p>
              </div>
            </div>
          </AnimatedSection>
          
          {/* --- Tarjeta de Perfil 3 (Ejemplo con placeholder) --- */}
          <AnimatedSection delay={0.6}>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 h-full flex flex-col">
              <Image
                src="/equipo/luis-torres.jpg" // ⬅️ CAMBIA ESTO por tu foto
                alt="Foto de luis torres"
                width={500}
                height={500}
                className="w-full h-64 object-cover object-center" // 'object-cover' recorta la imagen
              />
              
              <div className="p-6 flex-grow">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Luis Torres
                </h2>
                <p className="text-md font-semibold text-blue-700 mb-4">
                  Plomero y Albañil
                </p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-sm text-gray-700">
                    <BriefcaseIcon className="h-5 w-5 mr-2 text-gray-500" />
                    <strong>Experiencia:</strong>&nbsp;20 años
                  </div>
                  <div className="flex items-center text-sm text-gray-700">
                    <AcademicCapIcon className="h-5 w-5 mr-2 text-gray-500" />
                    <strong>Estudios:</strong>&nbsp;Maestro de Obra
                  </div>
                </div>
                <p className="text-gray-600 text-sm italic border-t pt-4">
                  "No hay problema pequeño. Desde una fuga hasta 
                  levantar un muro, lo hago bien a la primera."
                </p>
              </div>
            </div>
          </AnimatedSection>
          
          {/* (Puedes añadir más tarjetas aquí) */}
          
        </div>
      </div>
    </main>
  );
}