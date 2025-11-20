"use client";

import { useState } from "react";
import Image from "next/image";
import { TrashIcon, PencilIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { deleteTool } from "@/app/admin/actions";
import toast from "react-hot-toast";

type Tool = {
  id: string;
  name: string;
  image_url: string;
  stock_available: number;
};

// 1. Recibimos 'tools' pero le asignamos un valor por defecto '[]'
export default function ToolsManager({ tools = [] }: { tools: Tool[] }) {
  
  const [isExpanded, setIsExpanded] = useState(false);

  // 2. CREAMOS LA VARIABLE SEGURA 'safeTools'
  // Esto garantiza que nunca sea 'undefined' ni 'null'
  const safeTools = tools || []; 

  const handleDelete = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres borrar esta herramienta?")) return;

    const formData = new FormData();
    formData.append('id', id);
    
    const toastId = toast.loading("Borrando...");
    const result = await deleteTool(formData);
    toast.dismiss(toastId);

    if (result?.success) {
      toast.success("Herramienta eliminada");
    } else {
      toast.error("Error al eliminar");
    }
  };

  // 3. USAMOS 'safeTools' AQUÍ (Esta es la línea que te daba error)
  const displayedTools = isExpanded ? safeTools : safeTools.slice(0, 3);
  const hiddenCount = safeTools.length - 3;

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 mt-8">
      <div className="p-4 bg-gray-700 border-b border-gray-600 flex justify-between items-center">
        {/* Usamos safeTools.length */}
        <h3 className="font-bold text-lg text-white">Inventario Actual ({safeTools.length})</h3>
        
        {safeTools.length > 3 && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isExpanded ? <ChevronUpIcon className="h-5 w-5"/> : <ChevronDownIcon className="h-5 w-5"/>}
          </button>
        )}
      </div>
      
      <ul className="divide-y divide-gray-700 transition-all duration-300 ease-in-out">
        {displayedTools.map((tool) => (
          <li key={tool.id} className="p-4 flex items-center justify-between hover:bg-gray-750 transition-colors">
            
            <div className="flex items-center space-x-4">
              <div className="relative w-12 h-12 rounded-md overflow-hidden border border-gray-600 bg-gray-900">
                <Image 
                  src={tool.image_url} 
                  alt={tool.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-white">{tool.name}</p>
                <p className="text-xs text-gray-400">Stock: {tool.stock_available}</p>
              </div>
            </div>

            <div className="flex space-x-2">
              <button 
                className="p-2 text-gray-600 cursor-not-allowed"
                title="La edición aún no está implementada"
                disabled
              >
                <PencilIcon className="h-5 w-5" />
              </button>

              <button 
                onClick={() => handleDelete(tool.id)}
                className="p-2 text-red-400 hover:bg-red-900/30 rounded-full transition-colors"
                title="Borrar"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>

          </li>
        ))}
        
        {safeTools.length === 0 && (
          <li className="p-8 text-center text-gray-500">
            No hay herramientas registradas.
          </li>
        )}
      </ul>

      {safeTools.length > 3 && (
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
                Ver {hiddenCount} herramientas más <ChevronDownIcon className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}