"use client"; // ⬅️ IMPORTANTE: Es un componente de cliente

import { useState } from "react";
import Image from "next/image";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // Estilos para el calendario
import { createReservation } from "@/app/servicios/alquiler/actions"; // La Server Action

// Recibimos el tipo 'Tool' desde la página principal
type Tool = {
  id: string;
  name: string;
  image_url: string;
  stock_available: number;
  description: string;
  price_per_day: number;
};

// Definimos las props que recibirá este componente
type ToolGridProps = {
  tools: Tool[]; // Recibe la lista de herramientas
};

export default function ToolGrid({ tools }: ToolGridProps) {
  // --- Estados para manejar el Modal ---
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  // --- Estados para el Formulario de Reserva ---
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [rentalType, setRentalType] = useState<'daily' | 'hourly' | 'project'>('daily');
  const [hours, setHours] = useState(1);
  const [projectMonths, setProjectMonths] = useState(1);

  // Función para abrir el modal
  const handleOpenModal = (tool: Tool) => {
    setSelectedTool(tool);
    setModalOpen(true);
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTool(null);
  };

  // --- Lógica de Precios (Ejemplo) ---
  const calculatePrice = () => {
    if (!selectedTool) return 0;
    if (rentalType === 'hourly') {
      // Asumimos un precio por hora (ej. 20% del precio diario)
      return (selectedTool.price_per_day * 0.2) * hours;
    }
    if (rentalType === 'project') {
      return (selectedTool.price_per_day * 30) * projectMonths; // Precio por mes
    }
    // Por defecto 'daily'
    return selectedTool.price_per_day; 
  };

  // --- Función para manejar el envío del formulario ---
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedTool || !selectedDate) return;

    const price = calculatePrice();
    
    // Calcula la fecha final (simplificado)
    let endDate = new Date(selectedDate);
    if (rentalType === 'hourly') endDate.setHours(endDate.getHours() + hours);
    if (rentalType === 'daily') endDate.setDate(endDate.getDate() + 1);
    if (rentalType === 'project') endDate.setMonth(endDate.getMonth() + projectMonths);

    const reservationData = {
      tool_id: selectedTool.id,
      start_date: selectedDate,
      end_date: endDate,
      rental_type: rentalType,
      total_price: price,
    };

    const result = await createReservation(reservationData);

    if (result.success) {
      alert("¡Reserva exitosa!");
      handleCloseModal();
    } else {
      alert("Error en la reserva: " + result.error);
    }
  };


  return (
    <>
      {/* --- 1. LA REJILLA DE HERRAMIENTAS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tools.map((tool) => (
          // Ahora la tarjeta es un botón que abre el modal
          <button
            key={tool.id}
            onClick={() => handleOpenModal(tool)}
            className="relative border rounded-lg shadow-md overflow-hidden flex flex-col 
                       text-left hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            {/* ... (Tu código de la tarjeta de herramienta va aquí) ... */}
            <div 
              className="absolute top-4 right-4 z-10 
                         bg-green-600 text-white text-sm font-bold 
                         w-12 h-12 rounded-full 
                         flex flex-col items-center justify-center shadow-lg"
            >
              <span key="stock">{tool.stock_available}</span>
              <span key="label">Disp.</span>
            </div>
            <Image src={tool.image_url} alt={tool.name} width={1000} height={1000} className="w-full h-auto object-cover" />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold text-blue-700">{tool.name}</h3>
              <p className="text-gray-600 text-sm mt-2 flex-grow">{tool.description}</p>
              <p className="text-xl font-bold text-gray-900 mt-4 text-right">
                ${tool.price_per_day} <span className="text-sm font-normal">/ día</span>
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* --- 2. EL MODAL (VENTANA EMERGENTE) --- */}
      {modalOpen && selectedTool && (
        <div 
          // Fondo oscuro
          className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
          onClick={handleCloseModal} // Cierra al hacer clic afuera
        >
          <div 
            // Contenedor del Modal
            className="bg-white rounded-lg shadow-2xl w-full max-w-4xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
            onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic adentro
          >
            {/* Columna Izquierda: Calendario y Detalles */}
            <div>
              <h2 className="text-3xl font-bold mb-2">{selectedTool.name}</h2>
              <p className="text-lg text-gray-700 mb-4">{selectedTool.description}</p>
              {/* Calendario (debes agregar lógica para deshabilitar días) */}
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="border rounded-md p-2"
                disabled={{ before: new Date() }} // Deshabilita días pasados
              />
            </div>

            {/* Columna Derecha: Formulario de Reserva */}
            <form onSubmit={handleFormSubmit}>
              <h3 className="text-2xl font-semibold mb-4">Configura tu Reserva</h3>
              
              {/* Tipo de Alquiler */}
              <label className="block font-medium mb-2">Tipo de Alquiler:</label>
              <select 
                value={rentalType} 
                onChange={(e) => setRentalType(e.target.value as any)} 
                className="w-full p-2 border rounded-md mb-4"
              >
                <option value="daily">Por Día</option>
                <option value="hourly">Por Horas</option>
                <option value="project">Por Proyecto (meses)</option>
              </select>

              {/* Opciones Condicionales */}
              {rentalType === 'hourly' && (
                <label className="block mb-4">
                  Horas:
                  <input type="number" value={hours} onChange={(e) => setHours(Number(e.target.value))} min="1" className="w-full p-2 border rounded-md" />
                </label>
              )}
              {rentalType === 'project' && (
                <label className="block mb-4">
                  Meses:
                  <input type="number" value={projectMonths} onChange={(e) => setProjectMonths(Number(e.target.value))} min="1" className="w-full p-2 border rounded-md" />
                </label>
              )}

              {/* Cálculo de Precio */}
              <div className="my-6">
                <span className="text-xl">Precio Total Estimado:</span>
                <span className="text-3xl font-bold text-blue-700 block">
                  ${calculatePrice().toFixed(2)}
                </span>
              </div>

              {/* Botón de Confirmar */}
              <button 
                type="submit" 
                className="w-full p-4 bg-green-600 text-white font-bold rounded-lg text-lg hover:bg-green-700 transition-colors"
              >
                Confirmar Reserva
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}