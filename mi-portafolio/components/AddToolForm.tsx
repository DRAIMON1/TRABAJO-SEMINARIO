"use client";

import { createTool } from "@/app/admin/actions"; // 1. Importa la Server Action
import { useRef, useState } from "react";

export default function AddToolForm() {
  // 2. Usamos 'useRef' para poder limpiar el formulario
  const formRef = useRef<HTMLFormElement>(null);
  
  // 3. Estado para mostrar un mensaje de éxito
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // 4. Función 'wrapper' que llama a la Server Action
  const handleSubmit = async (formData: FormData) => {
    const result = await createTool(formData);

    if (result.success) {
      setSuccessMessage("¡Herramienta añadida con éxito!");
      formRef.current?.reset(); // Limpia el formulario
      setTimeout(() => setSuccessMessage(null), 3000); // Oculta el mensaje después de 3s
    } else {
      // (Aquí podemos manejar el 'result.error' si lo deseamos)
      alert("Error: " + result.error);
    }
  };

  return (
    // 5. El formulario llama a la acción 'handleSubmit'
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300">Nombre De La Herramienta</label>
        <input
          type="text"
          name="name"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Stock Disponible</label>
          <input
            type="number"
            name="stock_available"
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Precio por Día ($)</label>
          <input
            type="number"
            name="price_per_day"
            step="0.01"
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">Categoría</label>
        <input
          type="text"
          name="category"
          placeholder="Ej: Eléctrica, Manual, Jardinería"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300">URL de Imagen</label>
        <input
          type="text"
          name="image_url"
          placeholder="Ej: /herramientas/mi-foto.jpg"
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
        />
      </div>

      <button
        type="submit"
        className="w-full p-3 bg-blue-600 text-white rounded-md font-bold hover:bg-blue-700"
      >
        Añadir Herramienta
      </button>

      {/* 6. Mensaje de éxito */}
      {successMessage && (
        <p className="text-green-400 text-center font-semibold">
          {successMessage}
        </p>
      )}
    </form>
  );
}