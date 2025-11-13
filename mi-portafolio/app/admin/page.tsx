import { createClient } from "@/utils/supabase/server";
import AddToolForm from "@/components/AddToolForm"; // ⬅️ 1. IMPORTA EL FORMULARIO
import AddStaffForm from "@/components/AddStaffForm" // ⬅️ IMPORTA EL NUEVO FORMULARIO
import AdminReservations from "@/components/AdminReservations"; // ⬅️ 1. Importar
import AddProjectForm from "@/components/AddProjectForm"; // ⬅️ 1. Importar

export default async function AdminDashboard() {

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    // (Tu lógica de 'if (!user)' que ya corregimos)
  }
  const { data: profile } = await supabase
    .from('profiles')
    .select('nickname')
    .eq('id', user!.id)
    .single();

 return (
    <main className="flex min-h-screen flex-col items-center p-10 md:p-12 pt-40 bg-gray-900 text-white">
      {/* Cambié max-w-6xl a max-w-3xl para que los formularios no sean ETERNAMENTE anchos, 
          sino que tengan un ancho de lectura cómodo y centrado */}
      <div className="w-full max-w-3xl">
        
        <h1 className="text-7xl font-bold mb1 text-center p-10 md:p-12 pt-40">
          Panel de Administrador
        </h1>
        <p className="text-2xl text-gray-300 mb-10 text-center">
          Bienvenido, <span className="text-blue-400">{profile?.nickname || 'Admin'}</span>.
        </p>

        {/* --- CAMBIO PRINCIPAL --- */}
        {/* Usamos 'space-y-12' para separar los bloques verticalmente */}
        <div className="space-y-12">
          
          {/* Bloque 1: Herramientas */}
          <section className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
            <div className="flex items-center mb-6 border-b border-gray-700 pb-4">
              <h2 className="text-3xl font-semibold text-blue-400">
                🛠️ Gestionar Herramientas
              </h2>
            </div>
            <AddToolForm />
          </section>

          {/* Bloque 2: Personal */}
          <section className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
            <div className="flex items-center mb-6 border-b border-gray-700 pb-4">
              <h2 className="text-3xl font-semibold text-green-400">
                👷 Gestionar Personal
              </h2>
            </div>
            <AddStaffForm />
          </section>
          {/* --- NUEVA SECCIÓN: CONTROL DE RESERVAS --- */}
          <section className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
            <div className="flex items-center mb-6 border-b border-gray-700 pb-4">
              <h2 className="text-3xl font-semibold text-purple-400">
                📅 Control de Reservas
              </h2>
            </div>
            {/* Aquí renderizamos la tabla */}
            <AdminReservations />
          </section>
          {/* --- 3. AÑADIMOS LA NUEVA SECCIÓN --- */}
          <section className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
            <h2 className="text-3xl font-semibold mb-6 text-purple-400">
              🏗️ Gestionar Proyectos
            </h2>
            <AddProjectForm />
          </section>

        </div>
      </div>
    </main>
  );
}
    