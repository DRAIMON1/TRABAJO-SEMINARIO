"use client";

import { useState } from "react";
import Image from "next/image";
import { TrashIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { deleteProject } from "@/app/admin/actions";
import toast from "react-hot-toast";

type Project = {
  id: string;
  title: string;
  image_url: string;
  staff?: { name: string } | null; // El profesional asignado
};

export default function ProjectsManager({ projects = [] }: { projects: Project[] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const safeProjects = projects || [];

  const handleDelete = async (id: string) => {
    if (!confirm("¿Eliminar este proyecto?")) return;
    const formData = new FormData();
    formData.append('id', id);
    const toastId = toast.loading("Eliminando...");
    await deleteProject(formData);
    toast.dismiss(toastId);
    toast.success("Proyecto eliminado");
  };

  const displayed = isExpanded ? safeProjects : safeProjects.slice(0, 3);

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 mt-8">
      <div className="p-4 bg-gray-700 border-b border-gray-600 flex justify-between items-center">
        <h3 className="font-bold text-lg text-white">Proyectos Publicados ({safeProjects.length})</h3>
        {safeProjects.length > 3 && (
          <button onClick={() => setIsExpanded(!isExpanded)} className="text-gray-400 hover:text-white">
            {isExpanded ? <ChevronUpIcon className="h-5 w-5"/> : <ChevronDownIcon className="h-5 w-5"/>}
          </button>
        )}
      </div>
      
      <ul className="divide-y divide-gray-700">
        {displayed.map((project) => (
          <li key={project.id} className="p-4 flex items-center justify-between hover:bg-gray-750">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-12 rounded-md overflow-hidden border border-gray-600">
                <Image src={project.image_url} alt={project.title} fill className="object-cover" />
              </div>
              <div>
                <p className="font-medium text-white">{project.title}</p>
                <p className="text-xs text-gray-400">Por: {project.staff?.name || 'N/A'}</p>
              </div>
            </div>
            <button onClick={() => handleDelete(project.id)} className="p-2 text-red-400 hover:bg-red-900/30 rounded-full">
              <TrashIcon className="h-5 w-5" />
            </button>
          </li>
        ))}
      </ul>
      
      {safeProjects.length > 3 && (
        <div className="p-2 bg-gray-750 text-center">
           <button onClick={() => setIsExpanded(!isExpanded)} className="text-sm text-blue-400 hover:text-blue-300 w-full">
             {isExpanded ? "Ver menos" : "Ver todos"}
           </button>
        </div>
      )}
    </div>
  );
}