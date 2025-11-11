"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// Esta es la estructura de datos que esperamos del formulario
type ReservationData = {
  tool_id: string;
  start_date: Date;
  end_date: Date;
  rental_type: 'hourly' | 'daily' | 'project';
  total_price: number;
};

export async function createReservation(formData: ReservationData) {
  const supabase = await createClient();

  // 1. Asegurarnos de que el usuario esté logueado
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: "Debes iniciar sesión para reservar." };
  }

  // 2. Insertar los datos en la tabla 'reservations'
  const { error } = await supabase.from("reservations").insert({
    tool_id: formData.tool_id,
    user_id: user.id, // El ID del usuario logueado
    start_date: formData.start_date.toISOString(),
    end_date: formData.end_date.toISOString(),
    rental_type: formData.rental_type,
    total_price: formData.total_price,
  });

  if (error) {
    console.error('Error al reservar:', error);
    return { success: false, error: error.message };
  }

  // 3. Limpiar la caché de la página para que vea datos nuevos
  revalidatePath("/servicios/alquiler");
  return { success: true, error: null };
}