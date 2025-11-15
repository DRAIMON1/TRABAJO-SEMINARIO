"use client";

import { createStaff } from "@/app/admin/actions";
import { useRef, useState } from "react";

export default function AddStaffForm() {
  const formRef = useRef<HTMLFormElement>(null);
  
  // Estados para UX
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setFormMessage(null);

    const result = await createStaff(formData);

    if (result.success) {
      setFormMessage({ type: 'success', text: "¡Profesional añadido con éxito!" });
      formRef.current?.reset();
      setTimeout(() => setFormMessage(null), 3000);
    } else {
      setFormMessage({ type: 'error', text: result.error || "Ocurrió un error." });
    }
    
    setIsSubmitting(false);
  };

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      
      {/* (Nombre Completo - sin cambios) */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Nombre Completo</label>
        <input
          type="text" name="name" placeholder="Ej: Ana Silva"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
          required
        />
      </div>

      {/* (Título/Cargo - sin cambios) */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Título / Cargo</label>
        <input
          type="text" name="title" placeholder="Ej: Electricista Certificada"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
          required
        />
      </div>

      {/* (Experiencia y Estudios - sin cambios) */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Experiencia</label>
          <input
            type="text" name="experience" placeholder="Ej: 8 años"
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Estudios</label>
          <input
            type="text" name="education" placeholder="Ej: Téc. en Instalaciones"
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
            required
          />
        </div>
      </div>

      {/* --- ¡EL CAMBIO! De 'text' a 'file' --- */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Foto del Profesional</label>
        <input
          type="file"
          name="image_file" // ⬅️ El 'name' ha cambiado
          accept="image/png, image/jpeg, image/webp"
          className="mt-1 block w-full text-sm text-gray-300
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-green-600 file:text-white
                     hover:file:bg-green-700"
          required
        />
      </div>
      {/* --- FIN DEL CAMBIO --- */}

      {/* (Frase/Cita - sin cambios) */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Frase (Cita)</label>
        <textarea
          name="quote" rows={2} placeholder="Ej: La seguridad no es negociable..."
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
          required
        />
      </div>

      {/* Botón actualizado */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full p-3 bg-green-600 text-white rounded-md font-bold 
                   hover:bg-green-700
                   disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Subiendo y Guardando...' : 'Añadir Profesional'}
      </button>

      {/* Mensajes de éxito o error */}
      {formMessage && (
        <p className={`text-center font-semibold ${
          formMessage.type === 'success' ? 'text-green-400' : 'text-red-400'
        }`}>
          {formMessage.text}
        </p>
      )}
    </form>
  );
}