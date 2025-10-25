export default function QuienesSomosPage() {
  return (
    // Añadimos 'pt-28' (padding-top) para dejar espacio para el Navbar fijo
    <main className="flex min-h-screen flex-col items-center p-12 md:p-24 pt-28 bg-white">
      
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">
          Conoce a Nuestro Equipo
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12">
          Somos el motor detrás de Construtech ISL. Unimos experiencia, 
          pasión y conocimiento para brindarte la mejor solución integral.
        </p>
      </div>

      {/* --- BANNER / FOTO DE EQUIPO --- */}
      <div className="w-full max-w-6xl h-[500px] bg-gray-300 rounded-lg shadow-xl mb-12">
        {/* TODO: Reemplaza este div con tu foto de equipo */}
        <span className="flex items-center justify-center h-full text-gray-600 text-2xl font-semibold">
          (Aquí va el banner con la foto de todos los integrantes)
        </span>
      </div>

      {/* --- DESCRIPCIÓN "QUIÉNES SOMOS" --- */}
      <div className="max-w-4xl text-left">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Historia</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Aquí va la explicación sobre quiénes son. Construtech ISL nació de la 
          necesidad de crear un espacio que no solo proveyera materiales, 
          sino que también construyera comunidad y fomentara el conocimiento 
          profesional...
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Nuestro equipo está compuesto por ingenieros, maestros de obra, 
          diseñadores y expertos en logística, todos unidos por un 
          mismo objetivo: ver tu proyecto triunfar.
        </p>
      </div>
    </main>
  );
}