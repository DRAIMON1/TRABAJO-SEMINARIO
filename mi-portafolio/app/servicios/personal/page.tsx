import { createClient } from '@/utils/supabase/server';
import AnimatedSection from '@/components/AnimatedSection';
import StaffGrid from '@/components/StaffGrid'; // ⬅️ Importa el nuevo componente
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

// 1. Definimos el tipo de datos que esperamos de la RPC
type StaffMember = {
  id: string;
  name: string;
  title: string;
  experience: string;
  education: string;
  quote: string;
  image_url: string;
  average_rating: number | null;
};

export default async function PersonalPage() {
  
  const supabase = await createClient();

  // 2. Verificamos si hay un usuario (para el Lazy Login)
  const { data: { user } } = await supabase.auth.getUser();

  // 3. Llamamos a la FUNCIÓN de base de datos que creamos
  const { data: staff, error } = await supabase
    .rpc('get_staff_with_ratings') // ⬅️ La magia está aquí
    .returns<StaffMember[]>();

  // 4. Manejo de Errores
  if (error || !Array.isArray(staff)) {
    console.error("Error al cargar el personal:", error);
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 pt-28 bg-white">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error al Cargar al Personal</h1>
          <p className="text-gray-600">No pudimos conectarnos a la base de datos.</p>
        </div>
      </main>
    );
  }

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

        {/* --- 5. Renderizamos el Componente de Cliente --- */}
        {/* Pasamos los datos del servidor (staff) y el usuario (user) */}
        <StaffGrid staff={staff} user={user} />
        
      </div>
    </main>
  );
}