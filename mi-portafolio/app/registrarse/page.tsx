"use client";

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

export default function RegistrarsePage() {
  // --- ESTADOS DEL FORMULARIO ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [cedula, setCedula] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [otherGender, setOtherGender] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // --- LÓGICA DE REGISTRO (SIN CAMBIOS) ---
  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setFormError(null);

    const supabase = createClient();
    
    // 1. Crea el usuario en 'auth.users'
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          nickname: nickname,
        }
      }
    });

    if (authError) {
      setFormError(authError.message);
      setIsLoading(false);
      return;
    }
    if (!authData.user) {
      setFormError("No se pudo crear el usuario.");
      setIsLoading(false);
      return;
    }

    // 2. Lógica de Género
    const genderToSave = gender === 'Otro' ? otherGender : gender;

    // 3. Inserta los datos en 'profiles'
    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      full_name: fullName,
      cedula: cedula,
      nickname: nickname,
      phone_number: phoneNumber,
      gender: genderToSave,
      birth_year: parseInt(birthYear),
    });

    if (profileError) {
      setFormError(profileError.message);
      setIsLoading(false);
      return;
    }

    alert('¡Registro exitoso! Por favor, revisa tu email para confirmar.');
    window.location.href = '/servicios/alquiler';
  };

  // --- RENDERIZADO (ACTUALIZADO AL TEMA CLARO) ---
  return (
    // 1. Fondo gris claro (como en el login)
    <main className="flex min-h-screen flex-col items-center p-8 pt-28 bg-gray-700">
      
      {/* 2. Tarjeta blanca (como en el login) */}
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        
        <h1 className="text-3xl font-bold mb-2 text-center text-gray-900">
          Crear tu Cuenta
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Completa tus datos para acceder a todos nuestros servicios.
        </p>
        
        <form onSubmit={handleSignUp} className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
            <input
              type="text" value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400" required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Apodo (Cómo te saludaremos)</label>
            <input
              type="text" value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="mt-1 w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400" required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Cédula</label>
              <input
                type="text" value={cedula}
                onChange={(e) => setCedula(e.target.value)}
                className="mt-1 w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400" required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Número Celular</label>
              <input
                type="tel" value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400" required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Año de Nacimiento</label>
              <input
                type="number" placeholder="Ej: 1990" value={birthYear}
                onChange={(e) => setBirthYear(e.target.value)}
                className="mt-1 w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400" required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Género</label>
              <select
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                  if (e.target.value !== 'Otro') {
                    setOtherGender('');
                  }
                }}
                className="mt-1 w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900" required
              >
                <option value="" disabled>Selecciona...</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
                <option value="Prefiero no decir">Prefiero no decir</option>
              </select>
            </div>
          </div>
          
          {/* Campo condicional "Otro Género" */}
          {gender === 'Otro' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Especificar Género:</label>
              <input
                type="text"
                placeholder="Por favor, especifica"
                value={otherGender}
                onChange={(e) => setOtherGender(e.target.value)}
                className="mt-1 w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400"
                required 
              />
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400" required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password" placeholder="Mínimo 6 caracteres" value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-3 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder:text-gray-400" required
            />
          </div>
          
          <button 
            type="submit"
            disabled={isLoading}
            className="w-full p-3 bg-blue-600 text-white rounded-md font-bold
                       disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </button>

          {formError && (
            <p className="text-red-500 text-center font-semibold mt-4">
              {formError}
            </p>
          )}

          <p className="text-center text-sm text-gray-600 !mt-8">
            ¿Ya tienes una cuenta? 
            <Link href="/login" className="font-medium text-blue-600 hover:underline">
              Inicia sesión aquí
            </Link>
          </p>

        </form>
      </div>
    </main>
  );
}