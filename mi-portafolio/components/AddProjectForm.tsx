"use client";

import { createProject } from "@/app/admin/actions";
import { useRef, useState } from "react";

// (Tu tipo 'StaffListMember' y 'Props' van aquí)
type StaffListMember = {
  id: string;
  name: string;
};
type Props = {
  staffList: StaffListMember[];
};

export default function AddProjectForm({ staffList }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  
  // Estados para UX
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setFormMessage(null);

    const result = await createProject(formData);

    if (result.success) {
      setFormMessage({ type: 'success', text: "¡Proyecto añadido con éxito!" });
      formRef.current?.reset();
      setTimeout(() => setFormMessage(null), 3000);
    } else {
      setFormMessage({ type: 'error', text: result.error || "Ocurrió un error." });
    }

    setIsSubmitting(false);
  };

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      
      {/* (Título del Proyecto - sin cambios) */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Título del Proyecto</label>
        <input
          type="text" name="title" placeholder="Ej: Remodelación Cocina"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
          required
        />
      </div>

      {/* --- ¡EL CAMBIO! De 'text' a 'file' --- */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Imagen del Proyecto</label>
        <input
          type="file"
          name="image_file" // ⬅️ El 'name' ha cambiado
          accept="image/png, image/jpeg, image/webp"
          className="mt-1 block w-full text-sm text-gray-300
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-purple-600 file:text-white
                     hover:file:bg-purple-700"
          required
        />
      </div>
      {/* --- FIN DEL CAMBIO --- */}
      
      {/* (Profesional Asignado - sin cambios) */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Profesional Asignado</label>
        <select
          name="staff_id"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
          defaultValue=""
          required
        >
          <option value="" disabled>Selecciona un profesional...</option>
          {staffList.map((staff) => (
            <option key={staff.id} value={staff.id}>
              {staff.name}
            </option>
          ))}
        </select>
      </div>

      {/* (Descripción - sin cambios) */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Descripción</label>
        <textarea
          name="description"
          rows={3}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
          required
        />
      </div>

      {/* Botón actualizado */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full p-3 bg-purple-600 text-white rounded-md font-bold 
                   hover:bg-purple-700
                   disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Subiendo y Guardando...' : 'Añadir Proyecto'}
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