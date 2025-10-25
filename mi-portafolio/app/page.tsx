import Link from "next/link";
export default function Home() {
  return (
    // Usamos <main> como el contenedor general
    <main className="flex-col"> {/* Quitamos centrado y padding por defecto */}

      {/* --- SECCIÓN 1: HERO VISUAL (Inspirado en Arkhe) --- */}
      {/* Este div ocupa toda la altura de la pantalla (min-h-screen).
        Usaremos un color oscuro de fondo por ahora. 
        ¡Más adelante reemplazaremos esto con una imagen de fondo!
      */}
      <section className="min-h-screen w-full bg-gray-900 flex flex-col justify-center items-center text-white p-8 pt-20">
        
        {/* Contenido del Hero */}
        <div className="text-center">
          <h1 className="text-6xl font-extrabold mb-4">
            CONSTRUTECH ISL
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl">
            La Esencia de tu Proyecto: Herramientas, Capacitación y Expertos.
          </p>
          <p> ----------

          </p>
          
          {/* --- 3. CAMBIO DE BOTÓN A LINK --- */}
          <Link 
            href="/quienes-somos" // Enlaza a la nueva página
            className="mt-20 px-40 py-2 bg-blue-600 text-white font-bold rounded-lg text-lg hover:bg-blue-700 transition-colors"
          >
            Conócenos {/* Texto cambiado */}
          </Link>
        </div>
      </section>

      {/* --- SECCIÓN 2: SERVICIOS DESTACADOS (Inspirado en Arkhe) --- */}
      {/* Esta sección tiene un fondo gris claro para contrastar 
        con la sección Hero oscura.
      */}
      <section className="w-full bg-gray-50 p-12 md:p-24">
        
        {/* Título de la sección */}
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
          Nuestros Servicios Principales
        </h2>

        {/* Aquí usamos la cuadrícula de tarjetas que ya tenías, 
          ¡porque funciona perfecto para esta sección!
        */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* --- Tarjeta 1: Alquiler de Herramientas --- */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-3xl font-bold text-blue-700 mb-4">
              Alquiler de Herramientas
            </h3>
            <p className="text-gray-700 text-lg">
              Accede a un inventario profesional sin el costo de compra. 
              Alquila por días, horas o por proyecto.
            </p>
          </div>

          {/* --- Tarjeta 2: Personal Calificado --- */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-3xl font-bold text-blue-700 mb-4">
              Personal Calificado
            </h3>
            <p className="text-gray-700 text-lg">
              Te conectamos con los mejores maestros y técnicos certificados 
              para garantizar un trabajo de calidad.
            </p>
          </div>

          {/* --- Tarjeta 3: Certificaciones --- */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-3xl font-bold text-blue-700 mb-4">
              Lugares de Certificación
            </h3>
            <p className="text-gray-700 text-lg">
              Aprende un oficio con uno de nuestros aliados que ofrecen cursos prácticos de 
              soldadura, carpintería, electricidad y mucho más.
            </p>
          </div>

          {/* --- Tarjeta 4: Asesoría Personalizada --- */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h3 className="text-3xl font-bold text-blue-700 mb-4">
              Asesoría Personalizada
            </h3>
            <p className="text-gray-700 text-lg">
              ¿No sabes por dónde empezar? Nuestro equipo te guía paso a paso 
              en la selección de materiales y procesos.
            </p>
          </div>
        </div>
      </section>
      {/* --- SECCIÓN 3: CTA MOTIVACIONAL (NUEVA SECCIÓN) --- */}
{/* Aquí usaremos un fondo oscuro. 
  Más adelante, te enseñaré a cambiar 'bg-gray-900' por una imagen de fondo.
*/}
<section className="w-full bg-gray-900 py-24 px-8 text-white text-center">
  <h2 className="text-4xl font-bold mb-6 max-w-3xl mx-auto">
    ¿Listo para llevar tu proyecto al siguiente nivel?
  </h2>
  <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
    Motivando a los clientes a obtener nuestros servicios.
  </p>
  <Link 
    href="/#contactanos" // Este 'id' lo crearemos en el Footer
    className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg text-lg hover:bg-blue-700 transition-colors"
  >
    Contáctanos
  </Link>
</section>

    </main>
  );
}