"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AcademicCapIcon, BriefcaseIcon, XMarkIcon, StarIcon } from '@heroicons/react/24/solid';
import StarRating from './StarRating';
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { submitReview, getReviews } from '@/app/servicios/personal/actions';

// (Tu tipo 'StaffMember')
type StaffMember = {
  id: string;
  name: string;
  title: string;
  experience: string;
  education: string;
  quote: string;
  image_url: string;
  average_rating: number | null;
};

// (Tu tipo 'Review')
type Review = {
  id: string;
  created_at: string;
  rating: number;
  comment: string;
  profiles: {
    nickname: string | null;
    full_name: string | null;
  } | null;
};

type Props = {
  staff: StaffMember[]; 
  user: User | null;     
};

export default function StaffGrid({ staff, user }: Props) {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadReviews = async (staffId: string) => {
    setIsLoadingReviews(true);
    setFormError(null);
    const loadedReviews = await getReviews(staffId);
    setReviews(loadedReviews as Review[]);
    setIsLoadingReviews(false);
  };

  const handleOpenModal = (staffMember: StaffMember) => {
    setSelectedStaff(staffMember);
    setModalOpen(true);
    loadReviews(staffMember.id);
    setShowReviewForm(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedStaff(null);
    setReviews([]);
  };
  
  // --- 🚀 AQUÍ ESTÁ EL CAMBIO A WHATSAPP ---
  const handleHireClick = () => {
    if (!user) {
      router.push('/login?message=Debes iniciar sesión para contratar a un profesional.');
      return;
    }
    
    // 1. REEMPLAZA ESTO con tu número de WhatsApp Business
    // (Incluye el código de país, sin '+', '00', espacios o guiones)
    const whatsappNumber = "573132441090"; // ⬅️ Ejemplo para Colombia (57)
    
    // 2. Crea el mensaje pre-llenado
    const message = `¡Hola Construtech! Estoy interesado en contratar los servicios de ${selectedStaff?.name}. ¿Podrían darme más información?`;
    
    // 3. Codifica el mensaje para que funcione en una URL
    const encodedMessage = encodeURIComponent(message);
    
    // 4. Crea la URL final y ábrela en una nueva pestaña
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };
  // --- FIN DEL CAMBIO ---

  const handleReviewClick = () => {
    if (!user) {
      router.push('/login?message=Debes iniciar sesión para dejar una reseña.');
      return;
    }
    setShowReviewForm(!showReviewForm); 
  };

  const handleSubmitReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedStaff) return;
    
    setIsSubmittingReview(true);
    setFormError(null);

    const formData = new FormData();
    formData.append('staff_id', selectedStaff.id);
    formData.append('rating', reviewRating.toString());
    formData.append('comment', reviewComment);

    const result = await submitReview(formData);

    if (result.success) {
      alert("¡Reseña enviada con éxito!");
      setReviewComment("");
      setReviewRating(5);
      setShowReviewForm(false);
      loadReviews(selectedStaff.id);
      router.refresh();
    } else {
      setFormError(result.error);
    }
    setIsSubmittingReview(false);
  };

  return (
    <>
      {/* --- 1. LA REJILLA DE PERFILES (Sin cambios) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {staff.map((person) => (
          <button
            key={person.id}
            onClick={() => handleOpenModal(person)}
            className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 h-full 
                       flex flex-col text-left hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            <Image
              src={person.image_url || '/equipo/placeholder.jpg'}
              alt={`Foto de ${person.name}`}
              width={500}
              height={500}
              className="w-full h-64 object-cover object-center"
            />
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{person.name}</h2>
              <p className="text-md font-semibold text-blue-700 mb-3">{person.title}</p>
              
              <div className="flex items-center space-x-2 mb-4">
                <StarRating rating={person.average_rating} />
                <span className="text-sm text-gray-500">({person.average_rating ? person.average_rating.toFixed(1) : 'Sin reseñas'})</span>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex items-center text-sm text-gray-700">
                  <BriefcaseIcon className="h-5 w-5 mr-2 text-gray-500" />
                  <strong>Experiencia:</strong>&nbsp;{person.experience}
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <AcademicCapIcon className="h-5 w-5 mr-2 text-gray-500" />
                  <strong>Estudios:</strong>&nbsp;{person.education}
                </div>
              </div>
              <p className="text-gray-600 text-sm italic border-t pt-4 mt-auto">
                "{person.quote}"
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* --- 2. EL MODAL (VENTANA EMERGENTE) (Actualizado) --- */}
      {modalOpen && selectedStaff && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div 
            className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Encabezado del Modal */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-3xl font-bold text-gray-900">{selectedStaff.name}</h2>
              <button onClick={handleCloseModal} className="p-1 rounded-full hover:bg-gray-200">
                <XMarkIcon className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            
            {/* Contenido del Modal */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto">
              {/* Columna Izquierda: Detalles y Contratación */}
              <div>
                <Image
                  src={selectedStaff.image_url || '/equipo/placeholder.jpg'}
                  alt={`Foto de ${selectedStaff.name}`}
                  width={600}
                  height={400}
                  className="w-full rounded-lg object-cover mb-4"
                />
                <StarRating rating={selectedStaff.average_rating} />
                <p className="text-lg text-blue-700 font-semibold mt-2">{selectedStaff.title}</p>
                <p className="text-gray-600 mt-4 italic">"{selectedStaff.quote}"</p>
                
                <button 
                  onClick={handleHireClick}
                  className="w-full mt-6 p-3 bg-blue-600 text-white font-bold rounded-lg text-lg hover:bg-blue-700 transition-colors"
                >
                  Contactar para Contratar (vía WhatsApp)
                </button>
              </div>
              
              {/* Columna Derecha: Comentarios (Actualizada) */}
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">Reseñas de Clientes</h3>
                
                <button 
                  onClick={handleReviewClick}
                  className="w-full mb-4 p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  {showReviewForm ? 'Ocultar Formulario' : 'Dejar una reseña'}
                </button>
                
                {/* Formulario de Reseña (Condicional) */}
                {showReviewForm && (
                  <form onSubmit={handleSubmitReview} className="mb-6 p-4 border rounded-lg bg-gray-50">
                    <h4 className="text-lg font-semibold mb-2 text-gray-800">Tu Calificación:</h4>
                    {/* Selector de Estrellas */}
                    <div className="flex space-x-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon 
                          key={star}
                          className={`h-8 w-8 cursor-pointer ${reviewRating >= star ? 'text-yellow-500' : 'text-gray-300'}`}
                          onClick={() => setReviewRating(star)}
                        />
                      ))}
                    </div>
                    <label className="block font-medium mb-1 text-gray-800">Tu Comentario:</label>
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full p-2 border rounded-md text-gray-800"
                      rows={3}
                      placeholder="Comparte tu experiencia..."
                      required
                    />
                    <button 
                      type="submit" 
                      disabled={isSubmittingReview}
                      className="w-full mt-3 p-2 bg-blue-600 text-white font-semibold rounded-lg 
                                 hover:bg-blue-700 disabled:bg-gray-400"
                    >
                      {isSubmittingReview ? 'Enviando...' : 'Enviar Reseña'}
                    </button>
                    {formError && <p className="text-red-600 text-sm mt-2">{formError}</p>}
                  </form>
                )}
                
                {/* Lista de Reseñas (Dinámica) */}
                <div className="flex-grow space-y-4">
                  {isLoadingReviews && <p className="text-gray-500">Cargando reseñas...</p>}
                  
                  {!isLoadingReviews && reviews.length === 0 && (
                    <p className="text-gray-500">Aún no hay reseñas para este profesional.</p>
                  )}

                  {!isLoadingReviews && reviews.map((review) => (
                    <div key={review.id} className="border-b pb-2">
                      <StarRating rating={review.rating} />
                      <p className="text-gray-800 mt-1">{review.comment}</p>
                      <span className="text-sm text-gray-500">
                        - {review.profiles?.nickname || review.profiles?.full_name || 'Anónimo'}
                        {' ('}{new Date(review.created_at).toLocaleDateString('es-CO')}{')'}
                      </span>
                    </div>
                  ))}
                </div>
                
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}