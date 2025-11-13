"use client"; // Esta página es interactiva

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
// Ya no necesitamos 'useRouter' porque usamos 'window.location'

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // --- 1. NUEVOS ESTADOS PARA UX ---
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const supabase = createClient();

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Usamos onSubmit en el <form>
    setIsLoading(true);
    setFormError(null); // Limpia errores antiguos

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      alert('¡Registro exitoso! Por favor, revisa tu email para confirmar.');
      window.location.href = '/servicios/alquiler';

    } catch (error: any) {
      setFormError(error.message); // ⬅️ Muestra el error
      setIsLoading(false); // ⬅️ Reactiva el botón
    }
  };

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    // 1. Recibe un evento de formulario real
    event.preventDefault(); 
    setIsLoading(true);
    setFormError(null); 

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      window.location.href = '/servicios/alquiler';

    } catch (error: any) {
      setFormError(error.message); 
      setIsLoading(false); 
    }
  };

  // 2. ¡Ya puedes BORRAR la función 'handleSignUp' de este archivo!
  // (Ahora se maneja en 'app/registrarse/page.tsx')

 return (
    // 1. Añadimos un fondo gris claro a la página
    <main className="flex min-h-screen flex-col items-center p-8 pt-28 bg-gray-700">
      
      {/* 2. Creamos una "tarjeta" con sombra y borde */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        
        {/* 3. Títulos centrados y claros */}
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-900">
          Iniciar Sesión
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Ingresa para acceder a tu perfil y reservas.
        </p>
        
        {/* 4. Un <form> real con 'onSubmit' */}
        <form onSubmit={handleSignIn} className="space-y-6">
          
          {/* 5. Inputs con <label> para accesibilidad */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="tu@email.com "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
               required
            />
          </div>
          
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
              required
            />
          </div>
          
          {/* 6. Un solo botón de 'submit' */}
          <button 
            type="submit"
            disabled={isLoading} 
            className="w-full p-3 bg-blue-600 text-white rounded-md font-bold
                       disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
          </button>

          {/* Mensaje de Error (sin cambios) */}
          {formError && (
            <p className="text-red-500 text-center font-semibold">
              {formError}
            </p>
          )}

          {/* 7. Enlace secundario para registrarse */}
          <p className="text-center text-sm text-gray-600 !mt-8">
            ¿Aún no tienes cuenta?{' '}
            <Link href="/registrarse" className="font-medium text-blue-600 hover:underline">
              Regístrate aquí
            </Link>
          </p>

        </form>
      </div>
    </main>
  );
}
