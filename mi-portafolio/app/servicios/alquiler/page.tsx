import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import ToolGrid from '@/components/ToolGrid'; // ⬅️ 1. IMPORTA EL NUEVO COMPONENTE

// Tu tipo 'Tool'
type Tool = {
  id: string;
  created_at: string;
  name: string;
  image_url: string;
  stock_available: number;
  description: string;
  category: string;
  price_per_day: number;
};

// La página sigue siendo un Componente de Servidor 'async'
export default async function AlquilerPage() {
  
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?message=Debes iniciar sesión para ver el catálogo de alquiler.');
  }

  const { data, error } = await supabase
    .from('tools')
    .select('*');

  const tools = data as Tool[] | null;

  // ... (Tu código de manejo de errores y estado vacío no cambia) ...
  if (error) {
    return (
      <main className="flex ...">
        {/* ... Error ... */}
      </main>
    );
  }
  if (!tools || tools.length === 0) {
    return (
      <main className="flex ...">
        {/* ... Estado Vacío ... */}
      </main>
    );
  }

  // --- TU CÓDIGO NORMAL (AHORA USA EL NUEVO COMPONENTE) ---
  return (
    <main className="flex min-h-screen flex-col items-center p-12 md:p-24 pt-28 bg-white">
      <div className="w-full max-w-6xl">
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Hola, <span className="text-blue-700">{user.email}</span>
        </h1>
        <p className="text-xl text-gray-700 mb-12">
          Bienvenido a nuestro catálogo de alquiler.
        </p>

        {/* 2. REEMPLAZA EL '.map()' CON EL COMPONENTE 'ToolGrid' */}
        <ToolGrid tools={tools} />

      </div>
    </main>
  );
}