import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      // Esta es la nueva forma recomendada (getAll / setAll)
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          // Los Componentes de Servidor solo pueden escribir cookies
          // dentro de Server Actions o Route Handlers.
          // Envolvemos esto en un try/catch para ignorar el error
          // si se llama desde un Componente de Servidor simple.
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch (error) {
          // Ignorar el error (la cookie se establecerá en el middleware)
        }
      },
    },
  })
}