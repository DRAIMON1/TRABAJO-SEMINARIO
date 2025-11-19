import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(request: Request) {
  const body = await request.json();

  // Respondemos rápido a MP para que sepa que recibimos el mensaje
  if (body.type === 'payment') {
    const paymentId = body.data.id;

    try {
      const paymentClient = new Payment(client);
      const payment = await paymentClient.get({ id: Number(paymentId) });
      
      // --- CAMBIO DE SEGURIDAD ---
      // Verificamos si status está en la raíz o en .body (depende de la versión)
      // @ts-ignore
      const status = payment.status || payment.body?.status;
      // @ts-ignore
      const metadata = payment.metadata || payment.body?.metadata;

      if (status === 'approved' && metadata) {
        const supabase = await createClient();
        
        const { error: insertError } = await supabase.from("reservations").insert({
          tool_id: metadata.tool_id,
          user_id: metadata.user_id,
          start_date: metadata.start_date,
          end_date: metadata.end_date,
          rental_type: metadata.rental_type,
          total_price: Number(metadata.total_price),
        });

        if (insertError) {
          console.error("Error guardando reserva:", insertError);
          // No lanzamos error para que MP no siga reintentando infinitamente si es un error de datos
          return NextResponse.json({ error: insertError.message }, { status: 200 }); 
        }

        const newStock = Number(metadata.stock_available) - 1;
        const { error: updateError } = await supabase
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
      // Devolvemos 200 incluso si hay error interno para evitar bucles de reintentos de MP
      // (Revisar logs de Vercel para depurar)
      return NextResponse.json({ error: error.message }, { status: 200 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}