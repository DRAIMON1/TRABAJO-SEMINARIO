"use client"; // ⬅️ Lo convertimos a Client Component

import { useState } from "react";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteReservationAdmin } from "@/app/admin/actions";
import toast from "react-hot-toast";

// Recibimos las reservas como props en lugar de pedirlas aquí
export default function AdminReservations({ reservations = [] }: { reservations: any[] }) {
  
  const handleDelete = async (id: string, toolId: string) => {
    if (!confirm("¿Estás seguro? Esto cancelará la reserva y devolverá el stock.")) return;

    const formData = new FormData();
    formData.append('id', id);
    formData.append('toolId', toolId); // Necesitamos el Tool ID para devolver el stock

    const toastId = toast.loading("Cancelando reserva...");
    const result = await deleteReservationAdmin(formData);
    toast.dismiss(toastId);

    if (result?.success) {
      toast.success("Reserva cancelada y stock devuelto");
    } else {
      toast.error("Error al cancelar");
    }
  };

  if (reservations.length === 0) {
    return <p className="text-gray-400 italic p-4 text-center">No hay reservas registradas.</p>;
  }

  return (
    <div className="overflow-x-auto bg-gray-800 rounded-lg border border-gray-700 mt-8">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs uppercase bg-gray-700 text-gray-200">
          <tr>
            <th className="px-6 py-3">Herramienta</th>
            <th className="px-6 py-3">Cliente</th>
            <th className="px-6 py-3">Fechas</th>
            <th className="px-6 py-3">Estado</th>
            <th className="px-6 py-3 text-center">Acción</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res) => (
            <tr key={res.id} className="border-b border-gray-700 hover:bg-gray-750">
              
              <td className="px-6 py-4 flex items-center gap-3 font-medium text-white">
                <div className="relative w-8 h-8 rounded overflow-hidden flex-shrink-0">
                   <Image src={res.tools?.image_url} alt="T" fill className="object-cover"/>
                </div>
                {res.tools?.name}
              </td>

              <td className="px-6 py-4">
                <div className="text-white">{res.profiles?.full_name || 'Usuario'}</div>
                <div className="text-xs text-gray-500">{res.profiles?.phone_number}</div>
              </td>

              <td className="px-6 py-4 text-xs">
                <div className="text-gray-400">Del: {new Date(res.start_date).toLocaleDateString()}</div>
                <div className="text-gray-400">Al: {new Date(res.end_date).toLocaleDateString()}</div>
              </td>

              <td className="px-6 py-4">
                {new Date(res.end_date) < new Date() ? (
                  <span className="px-2 py-1 bg-gray-600 text-white rounded text-xs">Finalizada</span>
                ) : (
                  <span className="px-2 py-1 bg-green-600 text-white rounded text-xs animate-pulse">Activa</span>
                )}
              </td>

              <td className="px-6 py-4 text-center">
                <button 
                  onClick={() => handleDelete(res.id, res.tool_id)}
                  className="p-2 text-red-400 hover:bg-red-900/50 rounded-full transition-colors"
                  title="Cancelar Reserva y Devolver Stock"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}