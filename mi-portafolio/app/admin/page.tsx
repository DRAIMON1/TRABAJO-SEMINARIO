import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import AddToolForm from "@/components/AddToolForm"; 
import AddStaffForm from "@/components/AddStaffForm";
import AddProjectForm from "@/components/AddProjectForm"; 
import AdminReservations from "@/components/AdminReservations"; 
import ToolsManager from "@/components/ToolsManager";
import StaffManager from "@/components/StaffManager";
import ProjectsManager from "@/components/ProjectsManager"; 

// 1. Definimos el tipo para la lista de staff
type StaffListMember = {
  id: string;
  name: string;
  title: string;
  image_url: string;
};

export default async function AdminDashboard() {

  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login?message=Acceso denegado');
  }
  
  const { data: profile } = await supabase
    .from('profiles')
    .select('nickname')
    .eq('id', user.id) 
    .single();

  // --- CARGAR PERSONAL ---
  const { data: staffList, error: staffError } = await supabase
    .from('staff')
    .select('id, name, title, image_url') 
    .order('name', { ascending: true }) 
    .returns<StaffListMember[]>();

  if (staffError) {
    console.error("Error al cargar la lista de personal:", staffError);
  }

  // --- CARGAR HERRAMIENTAS ---
  const { data: toolsList } = await supabase
    .from('tools')
    .select('id, name, image_url, stock_available')
    .order('name', { ascending: true });

  // --- CARGAR PROYECTOS ---
  const { data: rawProjectsList } = await supabase
    .from('projects')
    .select('id, title, image_url, staff(name)')
    .order('created_at', { ascending: false });

  // 🚀 ¡CORRECCIÓN AQUÍ! TRANSFORMAMOS LOS DATOS DE PROYECTOS
  // Convertimos el array de 'staff' en un objeto único para que TypeScript no se queje
  const projectsList = rawProjectsList?.map((project: any) => ({
    ...project,
    staff: Array.isArray(project.staff) ? project.staff[0] : project.staff
  })) || [];

  // --- CARGAR RESERVAS ---
  const { data: reservationsList } = await supabase
    .from('reservations')
    .select(`
      id, start_date, end_date, tool_id, total_price,
      tools ( name, image_url ),
      profiles ( full_name, phone_number )
    `)
    .order('start_date', { ascending: false });

   return (
    // 🚀 CORRECCIÓN DE DISEÑO AQUÍ:
    // 1. 'pt-32' para móviles, 'md:pt-40' para escritorio. Esto asegura espacio suficiente.
    // 2. Quitamos clases de padding innecesarias.
    <main className="flex min-h-screen flex-col items-center bg-gray-900 text-white pt-32 md:pt-40 pb-12 px-4">
      
      <div className="w-full max-w-3xl">
        
        {/* 🚀 Título Responsivo y Limpio */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
          Panel de Administrador
        </h1>
        
        <p className="text-xl text-gray-300 mb-12 text-center">
          Bienvenido, <span className="text-blue-400">{profile?.nickname || 'Admin'}</span>.
        </p>

        <div className="space-y-12">
          
          {/* --- Sección 1: Herramientas --- */}
          <section className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
            <div className="flex items-center mb-6 border-b border-gray-700 pb-4">
              <h2 className="text-3xl font-semibold text-blue-400">
                🛠️ Gestionar Herramientas
              </h2>
            </div>
            <AddToolForm />
            <ToolsManager tools={toolsList || []} />
          </section>

          {/* --- Sección 2: Personal --- */}
          <section className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
            <div className="flex items-center mb-6 border-b border-gray-700 pb-4">
              <h2 className="text-3xl font-semibold text-green-400">
                👷 Gestionar Personal
              </h2>
            </div>
            <AddStaffForm />
            <StaffManager staff={staffList || []} />
          </section>

          {/* --- Sección 3: Proyectos --- */}
          <section className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
            <div className="flex items-center mb-6 border-b border-gray-700 pb-4">
              <h2 className="text-3xl font-semibold text-purple-400">
                🏗️ Gestionar Proyectos
              </h2>
            </div>
            <AddProjectForm staffList={staffList || []} />
            {/* Usamos la lista transformada 'projectsList' */}
            <ProjectsManager projects={projectsList} />
          </section>

          {/* --- Sección 4: Reservas --- */}
          <section className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
            <div className="flex items-center mb-6 border-b border-gray-700 pb-4">
              <h2 className="text-3xl font-semibold text-yellow-400">
                📅 Control de Reservas
              </h2>
            </div>
            <AdminReservations reservations={reservationsList || []} />
          </section>

        </div>
      </div>
    </main>
  );
}