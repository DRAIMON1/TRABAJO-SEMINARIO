import Image from "next/image";
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
          
          {/* --- INICIO DE LA MODIFICACIÓN --- */}
          {/* 1. Añadimos 'relative' al contenedor de la tarjeta */}
                 <div className="relative border rounded-lg shadow-md overflow-hidden">
            
            {/* 2. Este es tu nuevo círculo de disponibilidad */}
            <div 
              className="absolute top-4 right-4 z-10 
                         bg-green-600 text-white text-sm font-bold 
                         w-12 h-12 rounded-full 
                         flex flex-col items-center justify-center 
                         shadow-lg"
            >
              <span>4</span>
              <span>Disp.</span>
            </div>

            <Image
              src="/herramientas/taladro.jpg" 
              alt="Taladro en alquiler"
              width={1000}
              height={1000}
              className="w-full h-auto object-cover" 
            />
            
            <h3 className="text-2xl font-semibold p-4 text-green-700">Taladros y Rotomartillos</h3>
          </div>

  {/* Puedes añadir una segunda tarjeta... */}
  <div className="border rounded-lg shadow-md overflow-hidden">
    {/* Asegúrate de haber guardado 'sierra.jpg' 
      en tu carpeta 'public/herramientas'
    */}
    {/* <Image
      src="/herramientas/sierra.jpg" 
      alt="Sierra circular en alquiler"
      width={800}  // (El tamaño real de tu imagen)
      height={800} // (El tamaño real de tu imagen)
      className="w-full h-auto object-cover" 
    /> */}

    {/* Mientras no tienes la imagen, puedes usar el placeholder: */}
    <div className="w-full h-[250px] bg-gray-200 flex items-center justify-center text-gray-500">
      (Imagen de Sierra)
    </div>

    <h3 className="text-2xl font-semibold p-4 text-blue-700">Sierras Circulares</h3>
  </div>

  {/* Y una tercera... */}
  <div className="border rounded-lg shadow-md overflow-hidden">
    <div className="w-full h-[250px] bg-gray-200 flex items-center justify-center text-gray-500">
      (Imagen de Llaves)
    </div>
    <h3 className="text-2xl font-semibold p-4 text-blue-700">Juegos de Llaves </h3>
  </div>
  
          
       
   <div className="relative border rounded-lg shadow-md overflow-hidden">
            
            {/* 2. Este es tu nuevo círculo de disponibilidad */}
            <div 
              className="absolute top-4 right-4 z-10 
                         bg-green-600 text-white text-sm font-bold 
                         w-12 h-12 rounded-full 
                         flex flex-col items-center justify-center 
                         shadow-lg"
            >
              <span>4</span>
              <span>Disp.</span>
            </div>


    {/* Usamos el componente 'Image' de Next.js.
      - 'src' apunta a la imagen dentro de tu carpeta 'public'
      - 'width' y 'height' son las dimensiones reales de la imagen
      - 'className' hace que la imagen se ajuste a la tarjeta
    */}
    <Image
      src="/herramientas/andamios.jpg" 
      alt="andamios en alquiler"
      width={821}
      height={821}
      className="w-full h-auto object-cover" 
    />
    
    <h3 className="text-2xl font-semibold p-4 text-blue-700">Andamios Plegables</h3>
  </div>

  {/* Puedes añadir una segunda tarjeta... */}
   <div className="relative border rounded-lg shadow-md overflow-hidden">
            
            {/* 2. Este es tu nuevo círculo de disponibilidad */}
            <div 
              className="absolute bottom-4 right-4 z-10 
                         bg-green-600 text-white text-sm font-bold 
                         w-12 h-12 rounded-full 
                         flex flex-col items-center justify-center 
                         shadow-lg"
            >
              <span>4</span>
              <span>Disp.</span>
            </div>

    {/* Asegúrate de haber guardado 'sierra.jpg' 
      en tu carpeta 'public/herramientas'
    */}
    <Image
      src="/herramientas/atornillador de impacto.jpg" 
      alt="Atornillador de impacto en alquiler"
      width={800}  // (El tamaño real de tu imagen)
      height={800} // (El tamaño real de tu imagen)
      className="w-full h-auto object-cover" 
    /> 
    {/* Mientras no tienes la imagen, puedes usar el placeholder: */}
    
    <h3 className="text-2xl font-semibold p-4 text-blue-700">Atornillador de impacto</h3>
  </div>

  {/* Y una tercera... */}
   <div className="relative border rounded-lg shadow-md overflow-hidden">
            
            {/* 2. Este es tu nuevo círculo de disponibilidad */}
            <div 
              className="absolute top-4 right-4 z-10 
                         bg-green-600 text-white text-sm font-bold 
                         w-12 h-12 rounded-full 
                         flex flex-col items-center justify-center 
                         shadow-lg"
            >
              <span>4</span>
              <span>Disp.</span>
            </div>

    <Image
      src="/herramientas/Atornillador para drywall.jpg" 
      alt="Atornillador de impacto en alquiler"
      width={600}  // (El tamaño real de tu imagen)
      height={600} // (El tamaño real de tu imagen)
      className="w-full h-auto object-cover" 
    /> 
    
    <h3 className="text-2xl font-semibold p-4 text-blue-700">Atornillador para drywall</h3>
  </div>
    </div>
        </div>
      
    </main>
  );
}