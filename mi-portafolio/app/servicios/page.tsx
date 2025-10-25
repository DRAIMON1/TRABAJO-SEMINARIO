// Importamos un ícono a modo de ejemplo. 
// En el futuro, puedes usar íconos específicos para cada servicio.
import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';

export default function ServiciosPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12 md:p-24 bg-gray-50">
      
      <h1 className="text-5xl font-bold text-center mb-12 text-gray-900">
        La Solución Completa para tu Proyecto
      </h1>

      {/* Contenedor principal de los servicios.
        - grid: Activa el layout de grilla.
        - md:grid-cols-2: En pantallas medianas (tablets) y grandes, muestra 2 columnas.
        - gap-8: Añade un espacio de separación entre las tarjetas.
      */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">

       {/* --- Tarjeta 1: Alquiler de Herramientas --- */}
<div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
  
  {/* AQUÍ ESTÁS USANDO EL ÍCONO:
    En cuanto añadas esta línea, el 'import' de arriba se activará.
  */}
  <WrenchScrewdriverIcon className="h-10 w-10 text-blue-700 mb-4" />

  <h2 className="text-3xl font-bold text-blue-700 mb-4">
    Alquiler de Herramientas
  </h2>
  <p className="text-gray-700 text-lg">
    Accede a un inventario profesional sin el costo de compra. 
    Alquila por días, horas o por proyecto.
  </p>
</div>

        {/* --- Tarjeta 2: Personal Calificado --- */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">
            Personal Calificado
          </h2>
          <p className="text-gray-700 text-lg">
            Te conectamos con los mejores maestros y técnicos certificados 
            para garantizar un trabajo de calidad.
          </p>
        </div>

        {/* --- Tarjeta 3: Certificaciones --- */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">
            Lugares de Certificación
          </h2>
          <p className="text-gray-700 text-lg">
            Aprende un oficio con nosotros. Ofrecemos cursos prácticos de 
            soldadura, carpintería, electricidad y más.
          </p>
        </div>

        {/* --- Tarjeta 4: Asesoría Personalizada --- */}
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">
            Asesoría Personalizada
          </h2>
          <p className="text-gray-700 text-lg">
            ¿No sabes por dónde empezar? Nuestro equipo te guía paso a paso 
            en la selección de materiales y procesos.
          </p>
        </div>

      </div>
    </main>
  );
}