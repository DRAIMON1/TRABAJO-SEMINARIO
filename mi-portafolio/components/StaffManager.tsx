"use client";

import { useState } from "react";
import Image from "next/image";
import { TrashIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { deleteStaff } from "@/app/admin/actions"; 
import toast from "react-hot-toast";

type Staff = {
  id: string;
  name: string;
  title: string;
  image_url: string;
};

// 1. Recibimos 'staff' con valor por defecto []
export default function StaffManager({ staff = [] }: { staff: Staff[] }) {
  
  // 2. Estado para controlar la expansión
  const [isExpanded, setIsExpanded] = useState(false);

  // 3. Variable segura para evitar errores de 'undefined'
  const safeStaff = staff || [];

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar a este profesional?")) return;

    const formData = new FormData();
    formData.append('id', id);
    
    const toastId = toast.loading("Eliminando...");
    const result = await deleteStaff(formData);
    toast.dismiss(toastId);

    if (result?.success) {
      toast.success("Profesional eliminado");
    } else {
      toast.error("Error al eliminar");
    }
  };

  // 4. Calculamos qué mostrar (3 o todos)
  const displayedStaff = isExpanded ? safeStaff : safeStaff.slice(0, 3);
  const hiddenCount = safeStaff.length - 3;

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 mt-8">
      <div className="p-4 bg-gray-700 border-b border-gray-600 flex justify-between items-center">
        {/* Usamos safeStaff.length */}
        <h3 className="font-bold text-lg text-white">Equipo Actual ({safeStaff.length})</h3>
        
        {/* Botón de colapsar en el título */}
        {safeStaff.length > 3 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isExpanded ? <ChevronUpIcon className="h-5 w-5"/> : <ChevronDownIcon className="h-5 w-5"/>}
          </button>
        )}
      </div>
      
      <ul className="divide-y divide-gray-700 transition-all duration-300 ease-in-out">
        {/* Mapeamos la lista recortada 'displayedStaff' */}
        {displayedStaff.map((member) => (
          <li key={member.id} className="p-4 flex items-center justify-between hover:bg-gray-750 transition-colors">
            
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-600">
                <Image 
                  src={member.image_url || '/equipo/placeholder.jpg'} 
                  alt={member.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-white">{member.name}</p>
                <p className="text-xs text-gray-400">{member.title}</p>
              </div>
            </div>

            <button 
              onClick={() => handleDelete(member.id)}
              className="p-2 text-red-400 hover:bg-red-900/30 rounded-full transition-colors"
              title="Borrar"
            >
              <TrashIcon className="h-5 w-5" />
            </button>

          </li>
        ))}
        
        {safeStaff.length === 0 && (
          <li className="p-8 text-center text-gray-500">
            No hay personal registrado.
          </li>
        )}
      </ul>

      {/* 5. Botón de "Ver más / Ver menos" al pie */}
      {safeStaff.length > 3 && (
        <div className="p-2 bg-gray-750 border-t border-gray-700 text-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-blue-400 hover:text-blue-300 font-medium py-2 px-4 w-full flex items-center justify-center gap-2 transition-colors"
          >
            {isExpanded ? (
              <>
                Ver menos <ChevronUpIcon className="h-4 w-4" />
              </>
            ) : (
              <>
                Ver {hiddenCount} personas más <ChevronDownIcon className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}