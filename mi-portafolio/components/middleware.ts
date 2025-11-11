import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // Este es el patrón correcto para el middleware
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          // El middleware actualiza las cookies en la *petición* y la *respuesta*
          request.cookies.set(name, value)
          response.cookies.set(name, value, options)
        },
        remove(name: string, options?: CookieOptions) {
          request.cookies.delete(name)
          // response.cookies.delete acepta un solo argumento: el nombre string
          // o un objecto con las opciones (sin value/expires). Enviamos la forma objeto.
          const { expires, ...deleteOptions } = options || {}
          response.cookies.delete({ name, ...deleteOptions })
        },
      },
    }
  )

  // Esta línea es la magia: refresca la sesión del usuario
  await supabase.auth.getUser()

  // Devuelve la respuesta (con las cookies actualizadas, si las hubo)
  return response
}

// Configuración (esto no cambia)
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}