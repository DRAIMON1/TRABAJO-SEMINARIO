"use server"; // 1. Indica que esto se ejecuta en el servidor

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// 2. Definimos la forma de los datos que esperamos del formulario
export async function createTool(formData: FormData) {
  const supabase = await createClient(); // Usamos 'await'

  // 3. Obtenemos los datos del formulario
  const toolData = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    image_url: formData.get('image_url') as string,
    stock_available: Number(formData.get('stock_available')),
    category: formData.get('category') as string,
    price_per_day: Number(formData.get('price_per_day')),
  };

  // 4. Insertamos los datos en la tabla 'tools'
  const { error } = await supabase.from('tools').insert(toolData);

  if (error) {
    console.error("Error al crear herramienta:", error);
    // En el futuro, podemos devolver un mensaje de error
    return { success: false, error: error.message };
  }

  // 5. Refrescamos la página de alquiler (para que la nueva herramienta aparezca)
  revalidatePath("/servicios/alquiler");
  return { success: true, error: null };
}
// --- NUEVA FUNCIÓN: CREAR PERSONAL ---
export async function createStaff(formData: FormData) {
  const supabase = await createClient();

  // 1. Obtenemos los datos
  const staffData = {
    name: formData.get('name') as string,
    title: formData.get('title') as string,
    experience: formData.get('experience') as string,
    education: formData.get('education') as string,
    quote: formData.get('quote') as string,
    image_url: formData.get('image_url') as string,
  };

  // 2. Insertamos en la tabla 'staff'
  const { error } = await supabase.from('staff').insert(staffData);

  if (error) {
    console.error("Error al crear personal:", error);
    return { success: false, error: error.message };
  }

  // 3. Refrescamos la página pública de personal
  revalidatePath("/servicios/personal");
  return { success: true, error: null };
}
// ... (imports y createTool arriba) ...

// --- NUEVA FUNCIÓN: OBTENER TODAS LAS RESERVAS (ADMIN) ---
export async function getAllReservations() {
  const supabase = await createClient();

  // Consultamos reservas uniendo 'tools' y 'profiles'
  const { data, error } = await supabase
    .from('reservations')
    .select(`
      id,
      start_date,
      end_date,
      total_price,
      rental_type,
      tools ( name, image_url ),
      profiles ( full_name, nickname, phone_number )
    `)
    .order('start_date', { ascending: false }); // Las más recientes primero

  if (error) {
    console.error("Error admin reservas:", error);
    return [];
  }

  return data;
}
// ... (Tus funciones createTool y createStaff están arriba) ...

// --- NUEVA FUNCIÓN: CREAR PROYECTO ---
export async function createProject(formData: FormData) {
  const supabase = await createClient();

  // 1. Obtenemos los datos
  const projectData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    image_url: formData.get('image_url') as string,
    staff_id: formData.get('staff_id') as string, // El ID del profesional
  };

  // 2. Insertamos en la tabla 'projects'
  const { error } = await supabase.from('projects').insert(projectData);

  if (error) {
    console.error("Error al crear proyecto:", error);
    return { success: false, error: error.message };
  }

  // 3. Refrescamos la futura página pública de proyectos
  revalidatePath("/proyectos");
  return { success: true, error: null };
}