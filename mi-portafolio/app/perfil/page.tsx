import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { BuildingStorefrontIcon } from '@heroicons/react/24/solid';
import { cancelReservation } from '@/app/servicios/alquiler/actions';

// (Tu tipo 'EmbeddedTool' y 'Reservation' van aquí...)
type EmbeddedTool = {
  name: string;
  image_url: string;
};

type Reservation = {
  id: string; 
  start_date: string; 
  end_date: string;
  total_price: number;
  tool_id: string; 
  tools: EmbeddedTool | null; 
};

export default async function PerfilPage() {
  
  // --- 1. ASEGÚRATE DE QUE 'await' ESTÉ AQUÍ ---
  const supabase = await createClient(); 

  // --- Protección de la Ruta ---
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login?message=Debes iniciar sesión para ver tu perfil.');
  }

  // --- 2. Busca el perfil para obtener el apodo ---
  const { data: profile } = await supabase
    .from('profiles')
    .select('nickname, full_name') 
    .eq('id', user.id)
    .single(); 

  const greetingName = profile?.nickname || profile?.full_name || user.email;

  // --- 3. Tu consulta de reservaciones ---
  const { data: reservations, error } = await supabase
    .from('reservations')
    .select('id, start_date, end_date, total_price, tool_id, tools(name, image_url)')
    .eq('user_id', user.id) 
    .order('start_date', { ascending: false }) 
    .returns<Reservation[]>(); 

  if (error) {
    console.error("Error al cargar reservaciones:", error);
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-12 md:p-24 pt-28 bg-gray-50">
      <div className="w-full max-w-4xl">
        
        {/* Saludo actualizado */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Hola, <span className="text-blue-700">{greetingName}</span>
        </h1>
        <p className="text-xl text-gray-700 mb-12">
          Bienvenido a tu perfil. Aquí puedes ver tu historial de reservas.
        </p>

        <div className="bg-white rounded-lg shadow-xl border border-gray-200">
          
          <div className="p-6 border-b">
            <h2 className="text-2xl font-semibold text-gray-900">Mi Historial de Reservas</h2>
          </div>
          
          {/* Caso A: El usuario no tiene reservas */}
          {(!reservations || reservations.length === 0) && (
            <div className="p-12 text-center">
              <BuildingStorefrontIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800">No tienes reservas</h3>
              <p className="text-gray-500 mt-2 mb-6">
                Cuando alquiles una herramienta, aparecerá aquí.
              </p>
              <a 
                href="/servicios/alquiler" 
                className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg text-sm hover:bg-blue-700 transition-colors"
              >
                Ver Catálogo
              </a>
            </div>
          )}

          {/* Caso B: El usuario SÍ tiene reservas */}
          {reservations && reservations.length > 0 && (
            <ul className="divide-y divide-gray-200">
              {reservations.map((res) => (
                <li key={res.id} className="p-4 flex items-center space-x-4">
                  
                  <Image
                    src={res.tools?.image_url || '/herramientas/placeholder.jpg'}
                    alt={res.tools?.name || 'Herramienta'}
                    width={80}
                    height={80}
                    className="w-20 h-20 rounded-lg object-cover border"
                  />
                  
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-blue-700">
                      {res.tools?.name || 'Herramienta no encontrada'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Reservado para: {new Date(res.start_date).toLocaleDateString('es-CO', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  
                  {/* --- 🚀 CAMBIO DE PRECIO (PERFIL) --- */}
                  <div className="text-right">
                    <span className="text-lg font-bold text-gray-900">
                      ${res.total_price.toLocaleString('es-CO')}
                      <span className="text-sm font-normal text-gray-700 ml-1">COP</span>
                    </span>
                    <p className="text-sm text-gray-500">Precio final</p>
                  </div>
                  {/* --- FIN DEL CAMBIO --- */}

                  {/* --- 4. EL FORMULARIO DE CANCELACIÓN --- */}
                  <div className="ml-4">
                    {/* La acción es la función sin 'bind' */}
                    <form action={cancelReservation}>
                      {/* Pasamos los IDs como 'inputs' ocultos */}
                      <input type="hidden" name="reservationId" value={res.id} />
                      <input type="hidden" name="toolId" value={res.tool_id} />
                      
                      <button 
                        type="submit"
                        className="px-3 py-1 bg-red-100 text-red-700 
                                   font-semibold rounded-md text-sm 
                                   hover:bg-red-200 transition-colors"
                      >
                        Cancelar
                      </button>
                    </form>
                  </div>
                  
                </li>
              ))}
            </ul>
          )}
          
        </div>
      </div>
    </main>
  );
}