export default function AlquilerPage() {
  return (
    // 'pt-28' es importante para dejar espacio para tu Navbar fijo
    <main className="flex min-h-screen flex-col items-center p-12 md:p-24 pt-28 bg-white">
      
      <div className="w-full max-w-6xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Alquiler de Herramientas
        </h1>
        <p className="text-xl text-gray-700 mb-12">
          Contamos con un amplio catálogo de herramientas profesionales 
          para tu proyecto.
        </p>

        {/* --- Aquí irá tu galería de imágenes --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Ejemplo de una tarjeta de herramienta */}
          <div className="border rounded-lg shadow-md overflow-hidden">
            {/* <img src="/ruta/a/tu/imagen/taladro.jpg" alt="Taladro" /> */}
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
              (Imagen de Taladro)
            </div>
            <h3 className="text-2xl font-semibold p-4">Taladros y Rotomartillos</h3>
          </div>

          {/* Ejemplo de una tarjeta de herramienta */}
          <div className="border rounded-lg shadow-md overflow-hidden">
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
              (Imagen de Sierra)
            </div>
            <h3 className="text-2xl font-semibold p-4">Sierras Circulares</h3>
          </div>

          {/* Ejemplo de una tarjeta de herramienta */}
          <div className="border rounded-lg shadow-md overflow-hidden">
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
              (Imagen de Llaves)
            </div>
            <h3 className="text-2xl font-semibold p-4">Juegos de Llaves</h3>
          </div>
          
          {/* Añade más tarjetas aquí... */}

        </div>
      </div>
    </main>
  );
}