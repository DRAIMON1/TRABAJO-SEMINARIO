import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // --- LA CORRECCIÓN ESTÁ AQUÍ ---
  const supabase = await createClient(); // ⬅️ Añadimos 'await'

  // 1. Verificar si hay un usuario logueado
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login?message=Debes iniciar sesión para ver esta página.');
  }

  // 2. Verificar si el usuario es un 'admin'
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id) // ⬅️ Ahora 'user.id' funcionará
    .single();

  if (error || profile?.role !== 'admin') {
    redirect('/');
  }

  // 3. Si pasó ambas pruebas, le permitimos ver el contenido
  return <>{children}</>;
}