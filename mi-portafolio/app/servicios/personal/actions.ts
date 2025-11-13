"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// --- 1. DEFINIMOS EL TIPO DE DATO 'Review' ---
// Esto le dice a TypeScript cómo se ven los datos que devolvemos
type Review = {
  id: string;
  created_at: string;
  rating: number;
  comment: string;
  profiles: {
    nickname: string | null;
    full_name: string | null;
  } | null;
};

// --- 2. ACCIÓN PARA CREAR UNA NUEVA RESEÑA ---
export async function submitReview(formData: FormData) {
  const supabase = await createClient(); // Usamos 'await'

  // 1. Validar Usuario
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: "Debes iniciar sesión para dejar una reseña." };
  }

  // 2. Obtener datos del formulario
  const staffId = formData.get('staff_id') as string;
  const rating = Number(formData.get('rating'));
  const comment = formData.get('comment') as string;

  if (!staffId || !rating || !comment) {
    return { success: false, error: "Faltan datos (calificación o comentario)." };
  }

  // 3. Insertar en la base de datos 'reviews'
  const { error } = await supabase.from('reviews').insert({
    staff_id: staffId,
    user_id: user.id,
    rating: rating,
    comment: comment,
  });

  if (error) {
    console.error("Error al guardar reseña:", error);
    return { success: false, error: "No se pudo guardar la reseña." };
  }

  // 4. Refrescar la página principal (para que se actualice el promedio de estrellas)
  revalidatePath("/servicios/personal");
  return { success: true, error: null };
}


// --- 3. ACCIÓN PARA OBTENER LAS RESEÑAS (CON TIPO DE RETORNO) ---
export async function getReviews(staffId: string): Promise<Review[]> { // ⬅️ CAMBIO AQUÍ
  const supabase = await createClient(); // Usamos 'await'

  // Consultamos 'reviews' y unimos 'profiles' para obtener el nombre
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      id,
      created_at,
      rating,
      comment,
      profiles ( nickname, full_name )
    `)
    .eq('staff_id', staffId)
    .order('created_at', { ascending: false }) // Mostrar las más nuevas primero
    .returns<Review[]>(); // ⬅️ CAMBIO AQUÍ (Le decimos a Supabase qué esperar)

  if (error) {
    console.error("Error al cargar reseñas:", error);
    return [];
  }

  return data;
}