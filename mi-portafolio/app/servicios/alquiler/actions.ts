"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

type ReservationData = {
  tool_id: string;
  start_date: Date;
  end_date: Date;
  rental_type: 'hourly' | 'daily' | 'project';
  total_price: number;
};

type DateRange = {
  from: Date;
  to: Date;
};

// --- FUNCIÓN 'createReservation' ACTUALIZADA ---
export async function createReservation(formData: ReservationData) {
  
  const supabase = await createClient();

  // 1. Asegurarnos de que el usuario esté logueado
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: "Debes iniciar sesión para reservar." };
  }

  // --- 2. VALIDACIÓN DE STOCK (Lectura) ---
  const { data: toolData, error: stockError } = await supabase
    .from('tools')
    .select('stock_available')
    .eq('id', formData.tool_id)
    .single();

  if (stockError || !toolData) {
    return { success: false, error: "No se pudo encontrar la herramienta." };
  }
  
  if (toolData.stock_available <= 0) {
    return { success: false, error: "Lo sentimos, no hay más stock disponible para esta herramienta." };
  }

  // --- 3. VALIDACIÓN DE FECHA ---
  const { data: existingReservations, error: checkError } = await supabase
    .from('reservations')
    .select('id')
    .eq('tool_id', formData.tool_id)
    .lt('start_date', formData.end_date.toISOString())
    .gt('end_date', formData.start_date.toISOString());

  if (checkError) {
    return { success: false, error: "Error al verificar disponibilidad." };
  }
  
  if (existingReservations && existingReservations.length >= toolData.stock_available) {
    return { success: false, error: "No hay más stock disponible para esta herramienta en la fecha seleccionada." };
  }
  
  // --- 4. SI TODO ESTÁ BIEN: Insertamos la reserva ---
  const { error: insertError } = await supabase.from("reservations").insert({
    tool_id: formData.tool_id,
    user_id: user.id,
    start_date: formData.start_date.toISOString(),
    end_date: formData.end_date.toISOString(),
    rental_type: formData.rental_type,
    total_price: formData.total_price,
  });

  if (insertError) {
    return { success: false, error: insertError.message };
  }
  
  // --- 5. ACTUALIZAR STOCK (LA PARTE CORREGIDA) ---
  // ⬇️ ⬇️ ⬇️ ⬇️ ⬇️
  // Forzamos la conversión a Número antes de restar
  const newStock = Number(toolData.stock_available) - 1;
  // ⬆️ ⬆️ ⬆️ ⬆️ ⬆️
  
  const { error: updateError } = await supabase
    .from('tools')
    .update({ stock_available: newStock }) // ⬅️ Resta 1 al stock
    .eq('id', formData.tool_id); 

  if (updateError) {
    console.error("¡Error CRÍTICO! Reserva creada, pero falló al actualizar el stock:", updateError);
  }

  // --- 6. Refrescar los datos para la página ---
  revalidatePath("/servicios/alquiler"); 
  return { success: true, error: null };
}

// --- FUNCIÓN 'getBookedDates' (MODIFICADA) ---
export async function getBookedDates(toolId: string) {
  
  const supabase = await createClient();

  // 1. Obtener el stock total de la herramienta
  const { data: toolData, error: toolError } = await supabase
    .from('tools')
    .select('stock_available')
    .eq('id', toolId)
    .single();

  if (toolError || !toolData) {
    console.error("Error al buscar herramienta:", toolError);
    return [];
  }

  // 2. Obtener TODAS las futuras reservaciones
  const { data: reservations, error } = await supabase
    .from('reservations')
    .select('start_date, end_date')
    .eq('tool_id', toolId)
    .gt('end_date', new Date().toISOString());

  if (error) {
    console.error("Error al buscar fechas:", error);
    return [];
  }

  // 3. Lógica simple: deshabilitar CUALQUIER día que tenga una reserva.
  const bookedRanges = reservations.map(res => ({
    from: new Date(res.start_date),
    to: new Date(res.end_date)
  }));

  return bookedRanges;
}

// --- FUNCIÓN 'cancelReservation' (ACTUALIZADA) ---
export async function cancelReservation(formData: FormData) { 
  // 1. Conéctate a Supabase
  const supabase = await createClient(); 

  // 2. Lee los datos desde los 'inputs' ocultos
  const reservationId = formData.get('reservationId') as string;
  const toolId = formData.get('toolId') as string;

  if (!reservationId || !toolId) {
    console.error("Faltan IDs de reserva o herramienta.");
    return; // Salimos de la función si hay un error
  }

  // 3. Obtén el usuario (¡Seguridad primero!)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    console.error("Usuario no autenticado intentó cancelar.");
    return; // Salimos
  }

  // 4. Borra la reserva SÓLO SI el user_id coincide
  const { error: deleteError } = await supabase
    .from('reservations')
    .delete()
    .eq('id', reservationId) 
    .eq('user_id', user.id); 

  if (deleteError) {
    console.error("Error al cancelar:", deleteError);
    return; // Salimos si hay un error
  }

  // 5. Obtén el stock actual de la herramienta
  const { data: toolData, error: stockError } = await supabase
    .from('tools')
    .select('stock_available')
    .eq('id', toolId)
    .single();

  if (stockError || !toolData) {
    console.error("Error al buscar herramienta para re-stock:", stockError);
    return; // Salimos
  }

  // 6. Devuelve el stock (Suma 1)
  const newStock = Number(toolData.stock_available) + 1;
  const { error: updateError } = await supabase
    .from('tools')
    .update({ stock_available: newStock })
    .eq('id', toolId);

  if (updateError) {
    console.error("Error crítico de re-stock:", updateError);
  }

  // 7. Refresca los datos en ambas páginas (¡Esto sigue funcionando!)
  revalidatePath("/servicios/alquiler"); 
  revalidatePath("/perfil"); 
  
  // 8. ¡No devolvemos nada! (void)
}