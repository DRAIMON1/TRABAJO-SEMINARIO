import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
import AnimatedSection from '@/components/AnimatedSection';
import { ExclamationTriangleIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/solid';

// --- 1. Definimos los tipos de datos que esperamos ---

// Un tipo para el profesional anidado
type StaffProfile = {
  name: string;
  title: string;
};

// El tipo principal del Proyecto
type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  staff: StaffProfile | null; // El profesional anidado
};

export default async function ProyectosPage() {
  
  const supabase = await createClient(); // Usamos 'await' como en tu código

  // --- 2. Consulta a la Base de Datos ---
  // Pedimos todos los proyectos Y, gracias a la clave foránea,
  // pedimos el 'name' y 'title' de la tabla 'staff' asociada.
  const { data: projects, error } = await supabase
    .from('projects')
    .select(`
      id,
      title,
      description,
      image_url,
      staff ( name, title )
    `) // Opcional: mostrar más nuevos primero
    .returns<Project[]>(); 

  // --- 3. Manejo de Errores ---
  if (error) {
    console.error("Error al cargar proyectos:", error);
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 pt-28 bg-white">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error al Cargar Proyectos</h1>
          <p className="text-gray-600">No pudimos conectarnos a la base de datos.</p>
        </div>
      </main>
    );
  }

  // --- 4. Manejo de Estado Vacío ---
  if (!projects || projects.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center p-12 md:p-24 pt-28 bg-gray-50">
        <div className="w-full max-w-4xl text-center">
          <WrenchScrewdriverIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Proyectos Recientes
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Aún estamos subiendo nuestros mejores trabajos. ¡Vuelve pronto!
          </p>
        </div>
      </main>
    );
  }

  // --- 5. Renderizado de la Galería ---
  return (
    <main className="flex min-h-screen flex-col items-center p-12 md:p-24 pt-28 bg-gray-50">
      <div className="w-full max-w-6xl mx-auto">
        
        <AnimatedSection>
          <h1 className="text-5xl font-bold text-gray-900 text-center mb-6">
            Proyectos Destacados
          </h1>
          <p className="text-xl text-gray-700 text-center mb-16 max-w-3xl mx-auto">
            Explora el trabajo de alta calidad realizado por nuestros 
            profesionales certificados. Esto es lo que puedes 
            construir con Construtech ISL.
          </p>
        </AnimatedSection>

        {/* --- La Galería de Proyectos --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {projects.map((project, index) => (
            // Animación "Stagger" (escalonada)
            <AnimatedSection key={project.id} delay={index * 0.1}>
              <div 
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 
                           h-full flex flex-col group
                           hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Imagen del Proyecto */}
                <Image
                  src={project.image_url || '/herramientas/placeholder.jpg'}
                  alt={project.title}
                  width={800}
                  height={600}
                  className="w-full h-56 object-cover" // Altura fija para la imagen
                />
                
                {/* Contenido de la Tarjeta */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {project.description}
                  </p>
                  
                  {/* Crédito al Profesional */}
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <p className="text-xs font-semibold text-blue-700 uppercase">
                      Realizado por:
                    </p>
                    <p className="text-lg font-medium text-gray-800">
                      {project.staff?.name || 'Equipo Construtech'}
                    </p>
                    <p className="text-sm text-gray-500">
                      {project.staff?.title || 'Especialista'}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
          
        </div>
      </div>
    </main>
  );
}