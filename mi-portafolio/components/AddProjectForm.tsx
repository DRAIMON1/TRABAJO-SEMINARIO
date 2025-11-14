"use client";

import { createProject } from "@/app/admin/actions";
import { useRef, useState } from "react";

// --- 1. Definimos los tipos que esperamos recibir ---
type StaffListMember = {
  id: string;
  name: string;
};

type Props = {
  staffList: StaffListMember[]; // ⬅️ Aceptamos la lista
};

// --- 2. Añadimos 'staffList' a las props ---
export default function AddProjectForm({ staffList }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await createProject(formData);

    if (result.success) {
      setSuccessMessage("¡Proyecto añadido con éxito!");
      formRef.current?.reset();
      setTimeout(() => setSuccessMessage(null), 3000);
    } else {
      alert("Error: " + (result.error || "Error desconocido"));
    }
  };

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      
      <div>
        <label className="block text-sm font-medium text-gray-300">Título del Proyecto</label>
        <input
          type="text"
          name="title"
          placeholder="Ej: Remodelación Cocina"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">URL de Imagen</label>
        <input
          type="text"
          name="image_url"
          placeholder="Ej: /proyectos/cocina1.jpg"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
          required
        />
      </div>
      
      {/* --- 3. ¡EL GRAN CAMBIO! (De Input a Select) --- */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Profesional Asignado</label>
        <select
          name="staff_id" // El 'name' sigue siendo 'staff_id'
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
          defaultValue="" // Importante para el placeholder
          required
        >
          <option value="" disabled>Selecciona un profesional...</option>
          {/* Mapeamos la lista que recibimos */}
          {staffList.map((staff) => (
            <option key={staff.id} value={staff.id}>
              {staff.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Descripción</label>
        <textarea
          name="description"
          rows={3}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full p-3 bg-purple-600 text-white rounded-md font-bold hover:bg-purple-700"
      >
        Añadir Proyecto
      </button>

      {successMessage && (
        <p className="text-green-400 text-center font-semibold">
          {successMessage}
        </p>
      )}
    </form>
  );
}