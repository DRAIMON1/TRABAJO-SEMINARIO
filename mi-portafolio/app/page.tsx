import Link from "next/link";
import Image from "next/image";
import AnimatedSection from '@/components/AnimatedSection';
export default function Home() {
  return (
    <main className="flex-col">

      {/* --- SECCIÓN 1: HERO VISUAL (CON IMAGEN DE FONDO) --- */}
      
      {/* 1. Contenedor principal 'relative' para posicionar la imagen */}
      <section className="relative min-h-screen w-full flex flex-col justify-center items-center text-white p-8 pt-20">
        
        {/* 2. IMAGEN DE FONDO */}
        {/* Ocupa todo el 'section', está en el fondo (z-0) */}
        <Image
            src="/hero-background.jpg"
             alt="Fondo de Construtech ISL"
              fill // ⬅️ Nueva propiedad
             className="z-0 object-cover" // ⬅️ 'object-cover' ahora es una clase
             priority
           />
        
        {/* 3. CAPA OSCURA (Para que el texto se lea bien) */}
        {/* Se pone encima de la imagen (z-10) pero debajo del texto (z-20) */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* 4. Contenido del Hero (Tu texto y botón) */}
        {/* 'z-20' lo pone encima de todo */}
        <div className="relative z-20 text-center flex flex-col items-center">
          
          {/* 5. TEXTO RESPONSIVO */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4">
            CONSTRUTECH ISL
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl">
            La Esencia de tu Proyecto: Herramientas, Capacitación y Expertos.
          </p>
          
          {/* 6. BOTÓN RESPONSIVO */}
          <Link 
            href="/quienes-somos"
            className="mt-12 md:mt-16 px-12 py-3 md:px-20 
                       bg-blue-600 text-white font-bold rounded-lg 
                       text-lg hover:bg-blue-700 transition-all duration-300"
          >
            Conócenos
          </Link>
        </div>
      </section>
      {/* --- SECCIÓN 2: SERVICIOS DESTACADOS (Inspirado en Arkhe) --- */}
      {/* Esta sección tiene un fondo gris claro para contrastar 
        con la sección Hero oscura.
      */}<AnimatedSection>
      <section className="w-full bg-gray-50 p-12 md:p-24" id="servicios">
        
        {/* Título de la sección */}
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
          Nuestros Servicios Principales
        </h2>

        {/* Aquí usamos la cuadrícula de tarjetas que ya tenías, 
          ¡porque funciona perfecto para esta sección!
        */}
        {/* --- INICIO DE LA MODIFICACIÓN --- */}
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* --- Tarjeta 1: Alquiler de Herramientas (AHORA ES UN LINK) --- */}
          <Link 
            href="/servicios/alquiler" 
            className="block bg-white p-8 rounded-xl shadow-lg border border-gray-200 
                       hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <h3 className="text-3xl font-bold text-blue-700 mb-4">
              Alquiler de Herramientas
            </h3>
            <p className="text-gray-700 text-lg">
              Accede a un inventario profesional sin el costo de compra. 
              Alquila por días, horas o por proyecto.
            </p>
          </Link>

          {/* --- Tarjeta 2: Personal Calificado (AHORA ES UN LINK) --- */}
          <Link 
            href="/servicios/personal" 
            className="block bg-white p-8 rounded-xl shadow-lg border border-gray-200
                       hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <h3 className="text-3xl font-bold text-blue-700 mb-4">
              Personal Calificado
            </h3>
            <p className="text-gray-700 text-lg">
              Te conectamos con los mejores maestros y técnicos certificados 
              para garantizar un trabajo de calidad.
            </p>
          </Link>

          {/* --- Tarjeta 3: Certificaciones (AHORA ES UN LINK) --- */}
          <Link 
            href="/servicios/certificacion" 
            className="block bg-white p-8 rounded-xl shadow-lg border border-gray-200
                       hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <h3 className="text-3xl font-bold text-blue-700 mb-4">
              Lugares de Certificación
            </h3>
            <p className="text-gray-700 text-lg">
              Aprende un oficio con nosotros. Ofrecemos cursos prácticos de 
              soldadura, carpintería, electricidad y más.
            </p>
          </Link>

          {/* --- Tarjeta 4: Asesoría Personalizada (AHORA ES UN LINK) --- */}
          <Link 
            href="/servicios/asesoria" 
            className="block bg-white p-8 rounded-xl shadow-lg border border-gray-200
                       hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <h3 className="text-3xl font-bold text-blue-700 mb-4">
              Asesoría Personalizada
            </h3>
            <p className="text-gray-700 text-lg">
              ¿No sabes por dónde empezar? Nuestro equipo te guía paso a paso 
              en la selección de materiales y procesos.
            </p>
          </Link>
        </div>
        {/* --- FIN DE LA MODIFICACIÓN --- */}
      </section>
      </AnimatedSection>
      {/* --- SECCIÓN 3: CTA MOTIVACIONAL (NUEVA SECCIÓN) --- */}
{/* Aquí usaremos un fondo oscuro. 
  Más adelante, te enseñaré a cambiar 'bg-gray-900' por una imagen de fondo.
*/}
<AnimatedSection>
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
</AnimatedSection>
    </main>
  );
}