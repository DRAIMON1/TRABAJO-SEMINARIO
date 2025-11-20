import { createClient } from '@/utils/supabase/server';
import NavbarClient from './NavbarClient'; // Importamos el nuevo componente

export default async function Navbar() {
  // 1. Obtenemos el cliente en el servidor
  const supabase = await createClient();
  
  // 2. Obtenemos el usuario de forma segura
  const { data: { user } } = await supabase.auth.getUser();

  // 3. Renderizamos el componente de cliente pasando el usuario
  return <NavbarClient user={user} />;
}