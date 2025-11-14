"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// --- FUNCIÓN 'createTool' ACTUALIZADA ---
export async function createTool(formData: FormData) {
  const supabase = await createClient(); // Usamos 'await'

  // 1. Obtener el archivo de imagen del formulario
  const imageFile = formData.get('image_file') as File;
  
  if (!imageFile || imageFile.size === 0) {
    return { success: false, error: "No se seleccionó ningún archivo de imagen." };
  }

  // 2. Crear un nombre de archivo único (para evitar colisiones)
  // ej: 17181345.jpg
  const fileExt = imageFile.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;

  // 3. Subir el archivo al Bucket 'images' (o 'imagenes' si lo llamaste así)
  const { error: uploadError } = await supabase.storage
    .from('imagenes') // ⬅️ ¡Asegúrate de que este sea el nombre de tu Bucket!
    .upload(fileName, imageFile);

  if (uploadError) {
    console.error("Error al subir imagen:", uploadError);
    return { success: false, error: "Error al subir imagen: " + uploadError.message };
  }

  // 4. Obtener la URL pública de la imagen que acabamos de subir
  const { data: { publicUrl } } = supabase.storage
    .from('imagenes') // ⬅️ ¡Nombre de tu Bucket!
    .getPublicUrl(fileName);

  // 5. Obtener los otros datos del formulario
  const toolData = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    image_url: publicUrl, // ⬅️ ¡Guardamos la URL pública!
    stock_available: Number(formData.get('stock_available')),
    category: formData.get('category') as string,
    price_per_day: Number(formData.get('price_per_day')),
  };

  // 6. Insertar los datos (con la nueva URL) en la tabla 'tools'
  const { error: insertError } = await supabase.from('tools').insert(toolData);

  if (insertError) {
    console.error("Error al crear herramienta:", insertError);
    return { success: false, error: "Error al guardar en BD: " + insertError.message };
  }

  // 7. Refrescar la página de alquiler
  revalidatePath("/servicios/alquiler");
  return { success: true, error: null };
}

// ... (El resto de tus acciones, 'createStaff', 'createProject', etc., van aquí) ...
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

// --- AÑADE ESTA NUEVA FUNCIÓN AL FINAL ---
export async function createProject(formData: FormData) {
  const supabase = await createClient(); // Usamos 'await' (como en tu código)

  // 1. Obtenemos los datos del formulario
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
