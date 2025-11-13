"use client";

import { createProject } from "@/app/admin/actions";
import { useRef, useState } from "react";

export default function AddProjectForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await createProject(formData);

    if (result.success) {
      setSuccessMessage("¡Proyecto añadido con éxito!");
      formRef.current?.reset();
      setTimeout(() => setSuccessMessage(null), 3000);
    } else {
      alert("Error: " + result.error);
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
      
      <div>
        <label className="block text-sm font-medium text-gray-300">ID del Profesional (staff_id)</label>
        <input
          type="text"
          name="staff_id"
          placeholder="Pega el ID del profesional (de la tabla 'staff')"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
          required
        />
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