"use client";

import { createStaff } from "@/app/admin/actions"; // Importa la nueva acción
import { useRef, useState } from "react";

export default function AddStaffForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await createStaff(formData);

    if (result.success) {
      setSuccessMessage("¡Profesional añadido con éxito!");
      formRef.current?.reset();
      setTimeout(() => setSuccessMessage(null), 3000);
    } else {
      alert("Error: " + result.error);
    }
  };

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      
      <div>
        <label className="block text-sm font-medium text-gray-300">Nombre Completo</label>
        <input
          type="text"
          name="name"
          placeholder="Ej: Ana Silva"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Título / Cargo</label>
        <input
          type="text"
          name="title"
          placeholder="Ej: Electricista Certificada"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Experiencia</label>
          <input
            type="text"
            name="experience"
            placeholder="Ej: 8 años"
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Estudios</label>
          <input
            type="text"
            name="education"
            placeholder="Ej: Téc. en Instalaciones"
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">URL de Foto</label>
        <input
          type="text"
          name="image_url"
          placeholder="Ej: /equipo/ana-silva.jpg"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Frase (Cita)</label>
        <textarea
          name="quote"
          rows={2}
          placeholder="Ej: La seguridad no es negociable..."
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full p-3 bg-green-600 text-white rounded-md font-bold hover:bg-green-700"
      >
        Añadir Profesional
      </button>

      {successMessage && (
        <p className="text-green-400 text-center font-semibold">
          {successMessage}
        </p>
      )}
    </form>
  );
}