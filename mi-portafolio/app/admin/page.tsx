import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AddToolForm from "@/components/AddToolForm"; 
import AddStaffForm from "@/components/AddStaffForm";
import AddProjectForm from "@/components/AddProjectForm"; 
import AdminReservations from "@/components/AdminReservations"; 

// 1. Definimos el tipo para la lista de staff
type StaffListMember = {
  id: string;
  name: string;
};

export default async function AdminDashboard() {

  const supabase = await createClient(); // Usamos 'await' (como en tu código funcional)
  
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login?message=Acceso denegado');
  }
  
  // 2. Obtenemos el perfil del admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('nickname')
    .eq('id', user.id) 
    .single();

  // --- 3. ¡LA NUEVA CONSULTA! Obtenemos la lista de todo el personal ---
  const { data: staffList, error: staffError } = await supabase
    .from('staff')
    .select('id, name') // Solo ID y Nombre
    .order('name', { ascending: true }) // Ordenados alfabéticamente
    .returns<StaffListMember[]>();

  if (staffError) {
    console.error("Error al cargar la lista de personal:", staffError);
  }

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

        <div className="space-y-12">
          
          {/* Bloque 1: Herramientas (sin cambios) */}
          <section className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
            <h2 className="text-3xl font-semibold mb-6 text-blue-400">
              🛠️ Gestionar Herramientas
            </h2>
            <AddToolForm />
          </section>

          {/* Bloque 2: Personal (sin cambios) */}
          <section className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
            <h2 className="text-3xl font-semibold mb-6 text-green-400">
              👷 Gestionar Personal
            </h2>
            <AddStaffForm />
          </section>

          {/* Bloque 3: Proyectos (ACTUALIZADO) */}
          <section className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
            <h2 className="text-3xl font-semibold mb-6 text-purple-400">
              🏗️ Gestionar Proyectos
            </h2>
            {/* --- 4. Pasamos la 'staffList' como prop --- */}
            <AddProjectForm staffList={staffList || []} />
          </section>

          {/* Bloque 4: Reservas (sin cambios) */}
          <section className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
            <h2 className="text-3xl font-semibold mb-6 text-purple-400">
              📅 Control de Reservas
            </h2>
            <AdminReservations />
          </section>

        </div>
      </div>
    </main>
  );
}
    