"use client"; // Esta página es interactiva

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
// 1. YA NO NECESITAMOS 'useRouter'. Lo hemos borrado.

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const supabase = createClient();
  // 2. YA NO NECESITAMOS 'const router = useRouter()'

  const handleSignUp = async () => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      alert('¡Registro exitoso! Por favor, revisa tu email para confirmar.');

      // 3. LA SOLUCIÓN: Forzamos una recarga completa
      // Esto pide una página NUEVA al servidor,
      // el cual verá la cookie y renderizará el Navbar "Perfil".
      window.location.href = '/servicios/alquiler';

    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      // 4. LA SOLUCIÓN: Forzamos una recarga completa
      window.location.href = '/servicios/alquiler';

    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 pt-28">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-6">Iniciar Sesión / Registrarse</h1>
        
        <div className="space-y-4">
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-md"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-md"
          />
          <button onClick={handleSignIn} className="w-full p-3 bg-blue-600 text-white rounded-md font-bold">
            Iniciar Sesión
          </button>
          <button onClick={handleSignUp} className="w-full p-3 bg-gray-600 text-white rounded-md font-bold">
            Registrarse
          </button>
        </div>
      </div>
    </main>
  );
}