import { NextResponse } from 'next/server';
// 1. IMPORTAMOS 'createClient' DE LA LIBRERÍA DIRECTAMENTE (No de nuestro utils)
import { createClient } from '@supabase/supabase-js';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(request: Request) {
  const body = await request.json();

  if (body.type === 'payment') {
    const paymentId = body.data.id;

    try {
      const paymentClient = new Payment(client);
      const payment = await paymentClient.get({ id: Number(paymentId) });
      
      // @ts-ignore
      const status = payment.status || payment.body?.status;
      // @ts-ignore
      const metadata = payment.metadata || payment.body?.metadata;

      if (status === 'approved' && metadata) {
        
        // 2. CREAMOS EL CLIENTE "ADMIN" CON LA LLAVE MAESTRA
        // Este cliente se salta todas las reglas RLS (Seguridad)
        const supabaseAdmin = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!, // ⬅️ Usamos la nueva clave secreta
          {
            auth: {
              autoRefreshToken: false,
              persistSession: false,
            },
          }
        );
        
        // 3. Guardamos la reserva (Usando supabaseAdmin)
        const { error: insertError } = await supabaseAdmin
          .from("reservations")
          .insert({
            tool_id: metadata.tool_id,
            user_id: metadata.user_id,
            start_date: metadata.start_date,
            end_date: metadata.end_date,
            rental_type: metadata.rental_type,
            total_price: Number(metadata.total_price),
          });

        if (insertError) {
          console.error("Error guardando reserva:", insertError);
          // Devolvemos 200 para que MP deje de intentar, aunque falló internamente
          return NextResponse.json({ error: insertError.message }, { status: 200 });
        }

        // 4. Actualizamos el stock (Usando supabaseAdmin)
        const newStock = Number(metadata.stock_available) - 1;
        const { error: updateError } = await supabaseAdmin
          .from('tools')
          .update({ stock_available: newStock })
          .eq('id', metadata.tool_id);
        
        if (updateError) {
           console.error("Error actualizando stock:", updateError);
        }
      }
      
      return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
      console.error('Error CRÍTICO en Webhook:', error);
      return NextResponse.json({ error: error.message }, { status: 200 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}