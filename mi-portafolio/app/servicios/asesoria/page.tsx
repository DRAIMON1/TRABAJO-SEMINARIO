import AnimatedSection from '@/components/AnimatedSection';
import { CheckCircleIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/solid';

export default function AsesoriaPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12 md:p-24 pt-28 bg-white">
      
      <div className="w-full max-w-7xl mx-auto">
        
        <AnimatedSection>
          <h1 className="text-5xl font-bold text-gray-900 text-center mb-6">
            De la Idea al Proyecto, Paso a Paso
          </h1>
          <p className="text-xl text-gray-700 text-center mb-16 max-w-3xl mx-auto">
            ¿No sabes qué materiales necesitas, qué herramientas usar o 
            cuánto costará? Nuestro servicio de asesoría personalizada 
            está diseñado para resolver todas tus dudas.
          </p>
        </AnimatedSection>

        {/* --- Contenedor Principal (2 Columnas) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* --- COLUMNA IZQUIERDA: QUÉ INCLUYE --- */}
          <AnimatedSection delay={0.2}>
            <div className="h-full flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Tu proyecto, sin sorpresas.
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Nuestro equipo de expertos analizará tu idea y te 
                entregará un plan claro.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-lg text-gray-800">
                    <strong>Planificación de Proyecto:</strong> Te ayudamos 
                    a definir el alcance y los pasos a seguir.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-lg text-gray-800">
                    <strong>Lista de Materiales y Herramientas:</strong> Te 
                    decimos exactamente qué comprar y qué puedes 
                    alquilar con nosotros.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-lg text-gray-800">
                    <strong>Presupuesto Detallado:</strong> Un estimado 
                    claro de costos, sin cargos ocultos.
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-7 w-7 text-green-600 mr-3 flex-shrink-0" />
                  <span className="text-lg text-gray-800">
                    <strong>Recomendación "DIY vs. Profesional":</strong> 
                    Te asesoramos con honestidad si es un proyecto 
                    que puedes hacer tú mismo (DIY) o si es mejor 
                    contratar a uno de nuestros profesionales.
                  </span>
                </li>
              </ul>
            </div>
          </AnimatedSection>

          {/* --- COLUMNA DERECHA: FORMULARIO DE CONTACTO --- */}
          <AnimatedSection delay={0.4}>
            <div className="bg-gray-50 rounded-lg shadow-xl p-8 border border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Agenda tu Asesoría
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Completa el formulario y un experto te contactará 
                en menos de 24 horas.
              </p>
              
              {/* Este es un formulario de ejemplo. 
                  En un proyecto real, necesitaría 'react-hook-form' 
                  o un servicio como 'EmailJS' para funcionar.
              */}
              <form action="#" method="POST" className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 text-green-700"
                    placeholder="Tu nombre"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 text-green-700"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="celular" className="block text-sm font-medium text-gray-700">
                    Celular
                  </label>
                  <input
                    type="celular"
                    name="celular"
                    id="celular"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 text-green-700"
                    placeholder="tu celular"
                  />
                </div>
                
                <div>
                  <label htmlFor="project" className="block text-sm font-medium text-gray-700">
                    Describe tu proyecto
                  </label>
                  <textarea
                    name="project"
                    id="project"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 text-green-700"
                    placeholder="Ej: Quiero remodelar mi baño, construir una estantería, etc."
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent 
                               rounded-lg shadow-sm text-lg font-bold text-white 
                               bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    Solicitar Asesoría
                  </button>
                </div>
              </form>
            </div>
          </AnimatedSection>

        </div>
      </div>
    </main>
  );
}