import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
// 1. IMPORTACIÓN CORREGIDA (SDK v2)
import { MercadoPagoConfig, Payment } from 'mercadopago';

// 2. CONFIGURACIÓN CORREGIDA (SDK v2)
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(request: Request) {
  const body = await request.json();

  if (body.type === 'payment') {
    const paymentId = body.data.id;

    try {
      // 3. OBTENER PAGO CORREGIDO (SDK v2)
      const paymentClient = new Payment(client);
      const payment = await paymentClient.get({ id: Number(paymentId) });
      
      // 4. VERIFICACIÓN CORREGIDA (SDK v2)
      if (payment && payment.status === 'approved' && payment.metadata) {
        const metadata: any = payment.metadata; // Usamos 'any' para metadata

        // 5. 'await' AÑADIDO
        const supabase = await createClient();
        
        // 6. Guardamos la reserva
        const { error: insertError } = await supabase.from("reservations").insert({
          tool_id: metadata.tool_id,
          user_id: metadata.user_id,
          start_date: metadata.start_date,
          end_date: metadata.end_date,
          rental_type: metadata.rental_type,
          total_price: Number(metadata.total_price),
        });

        if (insertError) {
          throw new Error(`Error al guardar reserva: ${insertError.message}`);
        }

        // 7. Actualizamos el stock
        const newStock = Number(metadata.stock_available) - 1;
        const { error: updateError } = await supabase
          .from('tools')
          .update({ stock_available: newStock })
          .eq('id', metadata.tool_id);
        
        if (updateError) {
          throw new Error(`Error al actualizar stock: ${updateError.message}`);
        }
      }
      
      return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
      console.error('Error en Webhook de Mercado Pago:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}