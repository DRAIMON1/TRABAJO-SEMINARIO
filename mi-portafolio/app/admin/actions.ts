"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// --- 1. FUNCIÓN 'createTool' (YA ESTÁ CORRECTA) ---
export async function createTool(formData: FormData) {
  const supabase = await createClient();

  const imageFile = formData.get('image_file') as File;
  if (!imageFile || imageFile.size === 0) {
    return { success: false, error: "No se seleccionó ningún archivo de imagen." };
  }

  const fileExt = imageFile.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('imagenes')
    .upload(fileName, imageFile);

  if (uploadError) {
    console.error("Error al subir imagen:", uploadError);
    return { success: false, error: "Error al subir imagen: " + uploadError.message };
  }

  const { data: { publicUrl } } = supabase.storage
    .from('imagenes')
    .getPublicUrl(fileName);

  const toolData = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    image_url: publicUrl,
    stock_available: Number(formData.get('stock_available')),
    category: formData.get('category') as string,
    price_per_day: Number(formData.get('price_per_day')),
  };

  const { error: insertError } = await supabase.from('tools').insert(toolData);

  if (insertError) {
    console.error("Error al crear herramienta:", insertError);
    return { success: false, error: "Error al guardar en BD: " + insertError.message };
  }

  revalidatePath("/servicios/alquiler");
  return { success: true, error: null };
}

// --- 2. FUNCIÓN 'createStaff' (YA ESTÁ CORRECTA) ---
export async function createStaff(formData: FormData) {
  const supabase = await createClient();

  const imageFile = formData.get('image_file') as File;
  if (!imageFile || imageFile.size === 0) {
    return { success: false, error: "No se seleccionó ningún archivo de imagen." };
  }

  const fileExt = imageFile.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('imagenes')
    .upload(fileName, imageFile);

  if (uploadError) {
    console.error("Error al subir imagen de personal:", uploadError);
    return { success: false, error: "Error al subir imagen: " + uploadError.message };
  }

  const { data: { publicUrl } } = supabase.storage
    .from('imagenes')
    .getPublicUrl(fileName);

  const staffData = {
    name: formData.get('name') as string,
    title: formData.get('title') as string,
    experience: formData.get('experience') as string,
    education: formData.get('education') as string,
    quote: formData.get('quote') as string,
    image_url: publicUrl,
  };

  const { error: insertError } = await supabase.from('staff').insert(staffData);

  if (insertError) {
    console.error("Error al crear personal:", insertError);
    return { success: false, error: "Error al guardar en BD: " + insertError.message };
  }

  revalidatePath("/servicios/personal");
  return { success: true, error: null };
}

// --- 3. FUNCIÓN 'createProject' (LA QUE HAY QUE ARREGLAR) ---
export async function createProject(formData: FormData) {
  const supabase = await createClient(); 

  // 1. Obtener el archivo de imagen
  const imageFile = formData.get('image_file') as File;
  if (!imageFile || imageFile.size === 0) {
    return { success: false, error: "No se seleccionó ningún archivo de imagen." };
  }

  // 2. Crear nombre único
  const fileExt = imageFile.name.split('.').pop();
  const fileName = `${Date.now()}.${fileExt}`;

  // 3. Subir al Bucket 'imagenes'
  const { error: uploadError } = await supabase.storage
    .from('imagenes') // ⬅️ ¡Nombre de tu Bucket!
    .upload(fileName, imageFile);

  if (uploadError) {
    console.error("Error al subir imagen de proyecto:", uploadError);
    return { success: false, error: "Error al subir imagen: " + uploadError.message };
  }

  // 4. Obtener URL pública
  const { data: { publicUrl } } = supabase.storage
    .from('imagenes') // ⬅️ ¡Nombre de tu Bucket!
    .getPublicUrl(fileName);

  // 5. Obtener otros datos del formulario
  const projectData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
    image_url: publicUrl, // ⬅️ ¡Guardamos la URL pública!
    staff_id: formData.get('staff_id') as string, 
  };

  // 6. Insertar en la tabla 'projects'
  const { error: insertError } = await supabase.from('projects').insert(projectData);

  if (insertError) {
    console.error("Error al crear proyecto:", insertError);
    return { success: false, error: insertError.message };
  }

  revalidatePath("/proyectos");
  return { success: true, error: null };
}

// --- 4. FUNCIÓN 'getAllReservations' (YA ESTÁ CORRECTA) ---
export async function getAllReservations() {
  const supabase = await createClient();

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
    .order('start_date', { ascending: false }); 

  if (error) {
    console.error("Error admin reservas:", error);
    return [];
  }

  return data;
}