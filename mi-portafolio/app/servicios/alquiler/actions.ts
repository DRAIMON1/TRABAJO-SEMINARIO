"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
// 1. IMPORTACIÓN CORREGIDA (SDK v2)
import { MercadoPagoConfig, Preference } from 'mercadopago';

// 2. CONFIGURACIÓN CORREGIDA (SDK v2)
// Creamos un 'cliente' con nuestras credenciales
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!, // ⬅️ Corregido a camelCase
});
// --- 🚀 AÑADE ESTA LÍNEA DE PRUEBA JUSTO AQUÍ ---
console.log("CLAVE DE MERCADO PAGO EN USO:", process.env.MERCADOPAGO_ACCESS_TOKEN);
// --- FIN DE LA LÍNEA DE PRUEBA ---

// (Tipo para los datos del formulario)
type CheckoutData = {
  tool_id: string;
  start_date: Date;
  end_date: Date;
  rental_type: 'hourly' | 'daily' | 'project';
  total_price: number;
};
// (Tipo para los rangos de fechas)
type DateRange = {
  from: Date;
  to: Date;
};

// --- FUNCIÓN 'createPaymentPreference' ---
export async function createPaymentPreference(formData: CheckoutData) {
  // 3. 'await' AÑADIDO
  const supabase = await createClient();

  // (Validar Usuario)
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) { return { success: false, error: "Debes iniciar sesión." }; }

  // (Validar Stock y Fechas)
  const { data: toolData, error: stockError } = await supabase
    .from('tools').select('name, stock_available').eq('id', formData.tool_id).single();
  if (stockError || !toolData) { return { success: false, error: "No se pudo encontrar la herramienta." }; }
  
  const { data: existingReservations, error: checkError } = await supabase
    .from('reservations').select('id').eq('tool_id', formData.tool_id)
    .lt('start_date', formData.end_date.toISOString())
    .gt('end_date', formData.start_date.toISOString());
  if (checkError) { return { success: false, error: "Error al verificar disponibilidad." }; }
  
  if (existingReservations && existingReservations.length >= toolData.stock_available) { 
    return { success: false, error: "No hay más stock disponible para esta herramienta en la fecha seleccionada." }; 
  }

  // (Crear Preferencia de Pago con SDK v2)
  try {
    // 4. 'await' AÑADIDO a headers()
    const origin = (await headers()).get('origin') || 'http://localhost:3000';
    
    const { data: profile } = await supabase
      .from('profiles').select('full_name, phone_number').eq('id', user.id).single();

    const preferenceData = {
      items: [
        {
          id: formData.tool_id, // ⬅️ 'id' REQUERIDO
          title: `Alquiler: ${toolData.name}`,
          description: `Reserva del ${formData.start_date.toLocaleDateString('es-CO')} al ${formData.end_date.toLocaleDateString('es-CO')}`,
          quantity: 1,
          currency_id: 'COP',
          unit_price: formData.total_price,
        },
      ],
      payer: {
        name: profile?.full_name || 'Nombre no disponible',
        email: user.email,
        phone: { number: profile?.phone_number || '0000000' },
      },
      back_urls: { // ⬅️ 'back_urls' en plural
        success: `${origin}/perfil?payment=success`,
        failure: `${origin}/servicios/alquiler?payment=cancelled`,
        pending: `${origin}/perfil?payment=pending`,
      },
      notification_url: `${origin}/api/mercadopago-webhook`,
      metadata: {
        user_id: user.id,
        tool_id: formData.tool_id,
        start_date: formData.start_date.toISOString(),
        end_date: formData.end_date.toISOString(),
        rental_type: formData.rental_type,
        total_price: formData.total_price,
        stock_available: toolData.stock_available,
      },
    };

    const preferenceClient = new Preference(client);
    const response = await preferenceClient.create({ body: preferenceData });

    if (!response.init_point) {
      return { success: false, error: "Error al crear la sesión de pago." };
    }
    return { success: true, url: response.init_point };

  } catch (error: any) {
    console.error("Error de Mercado Pago:", error);
    return { success: false, error: `Error de Mercado Pago: ${error.message}` };
  }
}
// ... (Tus funciones 'getBookedDates' y 'cancelReservation' van aquí) ...

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