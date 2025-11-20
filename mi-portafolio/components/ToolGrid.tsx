"use client"; 

import { useState } from "react";
import Image from "next/image";
import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css"; 
import { createPaymentPreference, getBookedDates } from "@/app/servicios/alquiler/actions";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
// Importamos los íconos
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
// Importamos Toast
import toast from 'react-hot-toast';

type Tool = {
  id: string;
  name: string;
  image_url: string;
  stock_available: number;
  description: string;
  price_per_day: number;
  category: string; 
};

type ToolGridProps = {
  tools: Tool[];
  user: User | null; 
  categories: string[]; // Nueva prop
};

export default function ToolGrid({ tools, user, categories }: ToolGridProps) {
  const router = useRouter(); 

  // --- Estados de Filtro ---
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [showFilters, setShowFilters] = useState(true);
// --- Lógica de Filtrado y Ordenamiento ---
  const filteredTools = tools
    .filter((tool) => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "Todas" || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    // 🚀 AQUÍ ESTÁ EL CAMBIO: Ordenamos alfabéticamente ignorando mayúsculas/minúsculas
    .sort((a, b) => a.name.localeCompare(b.name));

  // (Estados del Modal y Formulario)
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [rentalType, setRentalType] = useState<'daily' | 'hourly' | 'project'>('daily');
  const [hours, setHours] = useState(1);
  const [projectMonths, setProjectMonths] = useState(1);
  const [bookedDates, setBookedDates] = useState<DateRange[]>([]);
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // (Funciones de Modal)
  const handleOpenModal = async (tool: Tool) => {
    if (!user) {
      router.push('/login?message=Debes iniciar sesión para poder alquilar.');
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

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTool(null);
    setBookedDates([]); 
    setRentalType('daily'); 
    setSelectedDate(undefined); 
    setIsSubmitting(false);
  };

  const calculatePrice = () => {
    if (!selectedTool) return 0;
    if (rentalType === 'hourly') return (selectedTool.price_per_day * 0.2) * hours;
    if (rentalType === 'project') return (selectedTool.price_per_day * 30) * projectMonths; 
    return selectedTool.price_per_day; 
  };

  // --- Función 'handleFormSubmit' (Con Toasts) ---
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedDate || !selectedTool) {
      toast.error("Por favor, selecciona una fecha.");
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

    // Notificación de carga
    const toastId = toast.loading("Generando link de pago...");

    const result = await createPaymentPreference(checkoutData);

    toast.dismiss(toastId); // Quitamos el 'cargando'

    if (result.success && result.url) {
      toast.success("¡Listo! Redirigiendo a Mercado Pago...");
      window.location.href = result.url;
    } else {
      toast.error(result.error || "Error desconocido");
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* --- BARRA DE BÚSQUEDA Y FILTROS --- */}
      <div className="mb-10 space-y-6">
        
        <div className="relative max-w-lg mx-auto flex gap-2 bg-gray-50">
          <div className="relative flex-grow ">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 " />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow shadow-sm text-gray-900"
              placeholder="Buscar herramienta..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-full border transition-colors ${
              showFilters ? 'bg-blue-100 border-blue-300 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
            }`}
            title="Mostrar/Ocultar filtros"
          >
            <AdjustmentsHorizontalIcon className="h-6 w-6" />
          </button>
        </div>

        {/* Botones de Categoría */}
        {showFilters && (
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                  ${selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* --- LA REJILLA DE HERRAMIENTAS --- */}
      
      {filteredTools.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No encontramos herramientas.</p>
          <button 
            onClick={() => { setSearchTerm(""); setSelectedCategory("Todas"); }}
            className="mt-4 text-blue-600 hover:underline"
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => handleOpenModal(tool)}
              className="relative border rounded-lg shadow-md overflow-hidden flex flex-col 
                         text-left hover:shadow-xl hover:-translate-y-1 transition-all bg-white group"
            >
              <div className="absolute top-4 left-4 z-10 bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                {tool.category}
              </div>

              <div className="absolute top-4 right-4 z-10 bg-gray-100 text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow-sm border border-gray-200">
                {tool.stock_available} Disp.
              </div>

              {/* --- INICIO DEL CAMBIO DE IMAGEN --- */}
            {/* Contenedor de altura fija con fondo blanco */}
            <div className="h-64 w-full relative bg-white p-4 flex items-center justify-center overflow-hidden border-b border-gray-100">
               <Image 
                src={tool.image_url} 
                alt={tool.name} 
                fill // Usa 'fill' para llenar el contenedor padre
                className="object-contain hover:scale-110 transition-transform duration-500" 
              />
            </div>
            {/* --- FIN DEL CAMBIO --- */}
              
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{tool.name}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{tool.description}</p>
                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                   <span className="text-xs text-gray-400">Alquiler desde:</span>
                   <p className="text-lg font-bold text-blue-600">
                    ${tool.price_per_day.toLocaleString('es-CO')} 
                    <span className="text-sm font-normal text-gray-500 ml-1">COP</span>
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* --- EL MODAL --- */}
      {modalOpen && selectedTool && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4 backdrop-blur-sm text-gray-900"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h2 className="text-3xl font-bold mb-2 text-gray-900">{selectedTool.name}</h2>
              <p className="text-lg text-gray-600 mb-6">{selectedTool.description}</p>
              <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
                <h4 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">Disponibilidad</h4>
                <DayPicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="m-0"
                  disabled={[ { before: new Date() }, ...bookedDates ]}
                  footer={ isLoadingCalendar ? <p className="text-center text-sm text-blue-600 py-2 animate-pulse">Verificando...</p> : null }
                />
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="flex flex-col h-full justify-center">
              <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-6">
                 <h3 className="text-xl font-bold mb-4 text-blue-900">Configura tu Reserva</h3>
                 <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Alquiler</label>
                 <select 
                    value={rentalType} 
                    onChange={(e) => setRentalType(e.target.value as any)} 
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="daily">Por Día</option>
                    <option value="hourly">Por Horas</option>
                    <option value="project">Por Proyecto (meses)</option>
                  </select>
                  
                  {rentalType === 'hourly' && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Horas</label>
                      <input type="number" value={hours} onChange={(e) => setHours(Number(e.target.value))} min="1" className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                  )}
                  {rentalType === 'project' && (
                     <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Meses</label>
                      <input type="number" value={projectMonths} onChange={(e) => setProjectMonths(Number(e.target.value))} min="1" className="w-full p-2 border border-gray-300 rounded-lg" />
                    </div>
                  )}
              </div>

              <div className="flex justify-between items-end mb-6 px-2">
                <span className="text-gray-600 font-medium">Total a pagar:</span>
                <span className="text-4xl font-bold text-gray-900">
                  ${calculatePrice().toLocaleString('es-CO')}
                  <span className="text-lg text-gray-500 ml-2">COP</span>
                </span>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting} 
                className="w-full p-4 bg-blue-600 text-white font-bold rounded-xl text-lg 
                           hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30
                           disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Procesando..." : "Ir a Pagar con Mercado Pago"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}