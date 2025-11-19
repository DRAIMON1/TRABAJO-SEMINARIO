"use client"; 

import { useState, useEffect } from "react"; // 1. Importa useEffect
import Image from "next/image";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css"; 
import { createPaymentPreference, getBookedDates } from "@/app/servicios/alquiler/actions";
import { useRouter } from "next/navigation"; 
import { User } from '@supabase/supabase-js'; // 2. Importa el tipo 'User'

// Definimos el tipo 'Tool' que esperamos recibir
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
  tools: Tool[];
  user?: User | null; // El usuario (o null si no está logueado)
};

export default function ToolGrid({ tools, user }: ToolGridProps) {
  const router = useRouter(); 

  // --- Estados para manejar el Modal ---
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  // --- Estados para el Formulario de Reserva ---
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [rentalType, setRentalType] = useState<'daily' | 'hourly' | 'project'>('daily');
  const [hours, setHours] = useState(1);
  const [projectMonths, setProjectMonths] = useState(1);

  // --- Estados para el Calendario ---
  const [bookedDates, setBookedDates] = useState<DateRange[]>([]);
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(false);
  
  // --- Estados para el Formulario (UX) ---
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // --- Función para abrir el modal y buscar fechas ---
  const handleOpenModal = async (tool: Tool) => {
    if (!user) {
      alert("Debes iniciar sesión para reservar una herramienta.");
      return;
    }
    setSelectedTool(tool);
    setModalOpen(true);
    setIsLoadingCalendar(true);
    setBookedDates([]); 
    const dates = (await getBookedDates(tool.id)) as DateRange[] | undefined;
    setBookedDates(dates ?? []);
    setIsLoadingCalendar(false);
  };

  // --- Función para cerrar y resetear el modal ---
  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTool(null);
    setBookedDates([]); 
    setRentalType('daily'); 
    setSelectedDate(undefined); 
    setFormError(null); 
    setIsSubmitting(false);
    setFormSuccess(null); // Limpia el mensaje de éxito al cerrar
  };

  // --- Lógica de Precios ---
  const calculatePrice = () => {
    if (!selectedTool) return 0;
    if (rentalType === 'hourly') {
      return (selectedTool.price_per_day * 0.2) * hours;
    }
    if (rentalType === 'project') {
      return (selectedTool.price_per_day * 30) * projectMonths; 
    }
    return selectedTool.price_per_day; 
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null); 
    setFormSuccess(null);

    if (!selectedDate || !selectedTool) {
      setFormError("Por favor, selecciona una fecha en el calendario.");
      return;
    }

    setIsSubmitting(true); 

    const price = calculatePrice();
    let endDate = new Date(selectedDate);
    if (rentalType === 'hourly') endDate.setHours(endDate.getHours() + hours);
    if (rentalType === 'daily') endDate.setDate(endDate.getDate() + 1);
    if (rentalType === 'project') endDate.setMonth(endDate.getMonth() + projectMonths);

    const checkoutData = {
      tool_id: selectedTool.id,
      start_date: selectedDate,
      end_date: endDate,
      rental_type: rentalType,
      total_price: price,
    };

    // --- ¡AQUÍ ESTÁ EL CAMBIO! ---
    // Llamamos a la nueva acción de Mercado Pago
    const result = await createPaymentPreference(checkoutData);

    if (result.success && result.url) {
      // ÉXITO: Redirigimos al usuario a la página de pago
      window.location.href = result.url;
    } else {
      // ERROR: Mostramos el error (ej. "Sin stock")
      setFormError(result.error ?? "Ocurrió un error desconocido.");
      setIsSubmitting(false); // Reactivamos el botón solo si hay error
    }
    // Ya no hay 'setTimeout' ni 'router.refresh()',
    // porque el usuario es redirigido.
  };
  return (
    <>
      {/* --- 1. LA REJILLA DE HERRAMIENTAS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => handleOpenModal(tool)}
            className="relative border rounded-lg shadow-md overflow-hidden flex flex-col 
                       text-left hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            <div 
              className="absolute top-4 right-4 z-10 
                         bg-gray-600 text-white text-sm font-bold 
                         w-12 h-12 rounded-full 
                         flex flex-col items-center justify-center shadow-lg"
            >
              <span key="stock">{tool.stock_available}</span>
              <span key="label">Disp.</span>
            </div>
            <Image 
              src={tool.image_url} 
              alt={tool.name} 
              width={1000} 
              height={1000} 
              className="w-full h-auto object-cover" 
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold text-blue-700">{tool.name}</h3>
              <p className="text-gray-600 text-sm mt-2 flex-grow">{tool.description}</p>
              
              {/* --- 🚀 CAMBIO DE PRECIO (TARJETA) --- */}
              <p className="text-xl font-bold text-gray-900 mt-4 text-right">
                {/* Formateamos el número a pesos colombianos */}
                ${tool.price_per_day.toLocaleString('es-CO')} 
                <span className="text-sm font-normal"> COP / Día</span>
              </p>
              {/* --- FIN DEL CAMBIO --- */}
            </div>
          </button>
        ))}
      </div>

      {/* --- 2. EL MODAL (VENTANA EMERGENTE) --- */}
      {modalOpen && selectedTool && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-lg shadow-2xl w-full max-w-4xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Columna Izquierda: Calendario y Detalles */}
            <div>
              <h2 className="text-3xl font-bold mb-2 text-gray-700">{selectedTool.name}</h2>
              <p className="text-lg text-gray-700 mb-4">{selectedTool.description}</p>
              
              <div className="border rounded-md p-2 text-gray-700">
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="border rounded-md p-2"
                  disabled={[
                    { before: new Date() }, 
                    ...bookedDates        
                  ]}
                  footer={
                    isLoadingCalendar ? (
                      <p className="text-center text-sm text-gray-700 py-2">
                        Buscando disponibilidad...
                      </p>
                    ) : (
                      <p className="text-center text-sm text-gray-700 py-2">
                        Selecciona un día para tu reserva.
                      </p>
                    )
                  }
                />
              </div>
            </div>

            {/* Columna Derecha: Formulario de Reserva */}
            <form onSubmit={handleFormSubmit}>
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">Configura tu Reserva</h3>
              
              {/* Tipo de Alquiler */}
              <label className="block font-medium mb-2 text-gray-700">Tipo de Alquiler:</label>
              <select 
                value={rentalType} 
                onChange={(e) => setRentalType(e.target.value as any)} 
                className="w-full p-2 border rounded-md mb-4 text-blue-700"
              >
                <option value="daily">Por Día</option>
                <option value="hourly">Por Horas</option>
                <option value="project">Por Proyecto (meses)</option>
              </select>

              {/* Opciones Condicionales */}
              {rentalType === 'hourly' && (
                <label className="block mb-4 text-blue-700">
                  Horas:
                  <input type="number" value={hours} onChange={(e) => setHours(Number(e.target.value))} min="1" className="w-full p-2 border rounded-md" />
                </label>
              )}
              {rentalType === 'project' && (
                <label className="block mb-4 text-blue-700">
                  Meses:
                  <input type="number" value={projectMonths} onChange={(e) => setProjectMonths(Number(e.target.value))} min="1" className="w-full p-2 border rounded-md" />
                </label>
              )}

              {/* --- 🚀 CAMBIO DE PRECIO (MODAL) --- */}
              <div className="my-6">
                <span className="text-xl text-green-700">Precio Total Estimado:</span>
                <span className="text-3xl font-bold text-blue-700 block">
                  {/* Formateamos el número y añadimos 'COP' */}
                  ${calculatePrice().toLocaleString('es-CO')}
                  <span className="text-lg text-gray-700 ml-2">COP</span>
                </span>
              </div>
              {/* --- FIN DEL CAMBIO --- */}

              {/* 3. BOTÓN ACTUALIZADO */}
              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full p-4 bg-green-600 text-white font-bold rounded-lg text-lg 
                           hover:bg-green-700 transition-colors
                           disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Generando link de pago..." : "Ir a Pagar"}
              </button>
              
              {/* (Mensajes de Error y Éxito - sin cambios) */}
              {formError && (
                <p className="text-red-600 text-center font-semibold mt-4">
                  {formError}
                </p>
              )}
              {formSuccess && (
                <p className="text-green-600 text-center font-semibold mt-4">
                  {formSuccess}
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
}