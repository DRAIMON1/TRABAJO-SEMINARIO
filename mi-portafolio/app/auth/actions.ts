"use server"; // ⬅️ Le dice a Next.js que esto solo se ejecuta en el servidor

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  
  // Redirige al usuario a la página de inicio después de cerrar sesión
  return redirect("/"); 
}