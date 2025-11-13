import { getAllReservations } from "@/app/admin/actions";
import Image from "next/image";

export default async function AdminReservations() {
  const reservations = await getAllReservations();

  if (!reservations || reservations.length === 0) {
    return <p className="text-gray-400 italic">No hay reservas registradas.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs uppercase bg-gray-700 text-gray-200">
          <tr>
            <th className="px-6 py-3">Herramienta</th>
            <th className="px-6 py-3">Cliente</th>
            <th className="px-6 py-3">Fechas</th>
            <th className="px-6 py-3">Ingreso</th>
            <th className="px-6 py-3">Estado</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((res: any) => (
            <tr key={res.id} className="border-b border-gray-700 hover:bg-gray-800">
              
              {/* Columna Herramienta */}
              <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                <Image 
                  src={res.tools?.image_url || '/herramientas/placeholder.jpg'} 
                  alt="Tool" 
                  width={40} height={40} 
                  className="rounded object-cover w-10 h-10"
                />
                {res.tools?.name}
              </td>

              {/* Columna Cliente */}
              <td className="px-6 py-4">
                <div className="font-bold text-white">{res.profiles?.full_name}</div>
                <div className="text-xs text-gray-500">{res.profiles?.phone_number}</div>
              </td>

              {/* Columna Fechas */}
              <td className="px-6 py-4">
                <div>Del: {new Date(res.start_date).toLocaleDateString()}</div>
                <div>Al: {new Date(res.end_date).toLocaleDateString()}</div>
              </td>

              {/* Columna Precio */}
              <td className="px-6 py-4 text-green-400 font-bold">
                ${res.total_price}
              </td>

              {/* Columna Estado (Lógica simple de fechas) */}
              <td className="px-6 py-4">
                {new Date(res.end_date) < new Date() ? (
                  <span className="px-2 py-1 bg-gray-600 rounded text-xs">Finalizada</span>
                ) : (
                  <span className="px-2 py-1 bg-blue-600 rounded text-xs text-white">Activa</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}