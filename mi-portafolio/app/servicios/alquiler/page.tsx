import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';
// No necesitamos 'redirect' porque el 'ToolGrid' lo maneja
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import ToolGrid from '@/components/ToolGrid'; 

// (Tu tipo 'Tool' va aquí...)
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

export default async function AlquilerPage() {
 
  // --- 1. AQUÍ ESTÁ LA CORRECCIÓN ---
  // La función createClient() lleva 'await'
  const supabase = await createClient();
  // ---------------------------------

  // 2. Obtenemos el usuario (si existe), pero NO redirigimos
  const { data: { user } } = await supabase.auth.getUser();

  let greetingName = "Bienvenido al Catálogo"; // Saludo por defecto para invitados

  if (user) {
    // Si hay un usuario, buscamos su apodo/nombre en 'profiles'
    const { data: profile } = await supabase
      .from('profiles')
      .select('nickname, full_name') 
      .eq('id', user.id)
      .single();
    
    greetingName = profile?.nickname || profile?.full_name || user.email;
  }
  
  // 3. La consulta de herramientas es pública
  // --- 1. CONSULTA MEJORADA ---
  const { data, error } = await supabase
    .from('tools')
    .select('*')
    .order('name', { ascending: true }); // ⬅️ ORDENAR ALFABÉTICAMENTE

  const tools = data as Tool[] | null;

  // 4. Manejo de Errores y Estado Vacío
  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24 pt-28 bg-white">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error al Cargar Herramientas</h1>
          <p className="text-gray-600">No pudimos conectarnos a la base de datos.</p>
        </div>
      </main>
    );
  }

  if (!tools || tools.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center p-12 md:p-24 pt-28 bg-white">
        <div className="w-full max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hola, <span className="text-blue-700">{greetingName}</span>
          </h1>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-12">
            <h2 className="text-2xl font-semibold text-gray-800">No hay herramientas disponibles</h2>
          </div>
        </div>
      </main>
    );
  }

  // --- 2. EXTRAER CATEGORÍAS ÚNICAS ---
  // Esto crea una lista automática: ["Todas", "Eléctrica", "Manual", ...]
  // Basada en lo que realmente hay en la base de datos.
  const categories = ["Todas", ...Array.from(new Set(tools.map(tool => tool.category)))];

  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-12 pt-28 bg-gray-50">
      <div className="w-full max-w-7xl">
        
        <div className="text-center mb-12">
          <h1 className="text-7xl md:text-5xl font-bold text-gray-900 mb-4 pt-20">
            Hola, <span className="text-blue-700">{greetingName}</span>
          </h1>
          <p className="text-xl text-gray-600">
            {user ? "Encuentra la herramienta perfecta para tu proyecto." : "Explora nuestro catálogo profesional."}
          </p>
        </div>

        {/* 3. PASAMOS LAS HERRAMIENTAS Y LAS CATEGORÍAS AL CLIENTE */}
        <ToolGrid tools={tools} user={user} categories={categories} />

      </div>
    </main>
  );
}