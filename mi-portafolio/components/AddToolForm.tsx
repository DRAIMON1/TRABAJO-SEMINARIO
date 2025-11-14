"use client";

import { createTool } from "@/app/admin/actions";
import { useRef, useState } from "react";

export default function AddToolForm() {
  const formRef = useRef<HTMLFormElement>(null);
  
  // 1. Estados mejorados para manejar la carga y los errores
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true); // 2. Mostrar "Subiendo..."
    setFormMessage(null);

    const result = await createTool(formData);

    if (result.success) {
      setFormMessage({ type: 'success', text: "¡Herramienta añadida con éxito!" });
      formRef.current?.reset(); // Limpia el formulario
      setTimeout(() => setFormMessage(null), 3000); // Oculta el mensaje
    } else {
      // 3. Mostrar el error
      setFormMessage({ type: 'error', text: result.error || "Ocurrió un error." });
    }
    
    setIsSubmitting(false); // 4. Reactivar el botón
  };

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      
      {/* (Nombre Herramienta - sin cambios) */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Nombre De La Herramienta</label>
        <input
          type="text"
          name="name"
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
          required
        />
      </div>

      {/* (Stock y Precio - sin cambios) */}
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

      {/* (Categoría - sin cambios) */}
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

      {/* --- 5. ¡EL CAMBIO! De 'text' a 'file' --- */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Imagen de la Herramienta</label>
        <input
          type="file"
          name="image_file" // ⬅️ El 'name' ha cambiado
          accept="image/png, image/jpeg, image/webp" // ⬅️ Acepta solo imágenes
          className="mt-1 block w-full text-sm text-gray-300
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-600 file:text-white
                     hover:file:bg-blue-700"
          required
        />
      </div>
      {/* --- FIN DEL CAMBIO --- */}

      {/* (Descripción - sin cambios) */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Descripción</label>
        <textarea
          name="description"
          rows={3}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 p-2 text-white"
        />
      </div>

      {/* 6. Botón actualizado con estado de carga */}
      <button
        type="submit"
        disabled={isSubmitting} // ⬅️ Deshabilitar mientras sube
        className="w-full p-3 bg-blue-600 text-white rounded-md font-bold 
                   hover:bg-blue-700
                   disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Subiendo y Guardando...' : 'Añadir Herramienta'}
      </button> 
      {/* ⬆️ LA ETIQUETA DE CIERRE ES </button>, NO </En> */}

      {/* 7. Mensajes de éxito o error */}
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