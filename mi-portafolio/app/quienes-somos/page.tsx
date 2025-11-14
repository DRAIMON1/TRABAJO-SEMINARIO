"use client";

import Image from 'next/image';
import { motion, useInView } from "framer-motion"; 
import { useRef } from "react";
import AnimatedSection from '@/components/AnimatedSection';

// --- Datos del equipo (sin cambios, solo las fotos de perfil) ---
const team = [
  {
    name: "Draimon (Tu Nombre)",
    title: "Ingeniero de Sistemas / Arquitecto de Software",
    img: "/equipo/draimon.jpg",
    bio: "Soy el fundador y arquitecto de la plataforma. Mi pasión es usar la tecnología para construir soluciones eficientes que resuelvan problemas del mundo real, optimizando cada clic del proceso de alquiler y contratación."
  },
  // ... resto de tu equipo ...
  {
    name: "[Nombre Socio 2]",
    title: "Ingeniero Industrial / Director de Operaciones",
    img: "/equipo/socio2.jpg",
    bio: "Especialista en optimización de procesos. Mi trabajo es asegurar que la logística, el inventario y la contratación de personal funcionen sin fricciones, garantizando un servicio de calidad y puntualidad."
  },
  {
    name: "[Nombre Socio 3]",
    title: "Especialista en Logística",
    img: "/equipo/socio3.jpg",
    bio: "Con experiencia en cadena de suministro, me encargo de la gestión de inventario y la logística de entrega. Mi objetivo es que tengas la herramienta correcta en el momento exacto que la necesitas."
  },
  {
    name: "[Nombre Socio 4]",
    title: "Especialista en Gestión de Inventarios",
    img: "/equipo/socio4.jpg",
    bio: "Mi enfoque es el análisis de datos para predecir la demanda y asegurar que nuestro stock de herramientas y la disponibilidad de nuestro personal calificado siempre cumplan con tus necesidades."
  }
];

// --- Componente de Tarjeta de Perfil Animada (Actualizado con nueva animación) ---
function AnimatedProfileCard({ member, index }: any) { // Cambiamos 'delay' por 'index'
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Nuevas variantes de animación: Escala y ligera rotación
  const variants = {
    hidden: { opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? -5 : 5 }, // Gira ligeramente
    visible: { opacity: 1, scale: 1, rotate: 0 }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ 
        duration: 0.7, // Duración de la animación
        delay: index * 0.1, // Retraso escalonado
        ease: [0.17, 0.67, 0.83, 0.67] // Curva de easing más dinámica
      }}
      className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 flex flex-col items-center text-center"
    >
      <Image
        src={member.img}
        alt={`Foto de ${member.name}`}
        width={150}
        height={150}
        className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 transition-transform duration-300 hover:scale-105"
      />
      <h3 className="text-2xl font-bold text-gray-900 mt-4">{member.name}</h3>
      <p className="text-md font-semibold text-blue-700">{member.title}</p>
    </motion.div>
  );
}

// --- El Componente de Página Principal (ACTUALIZADO) ---
export default function QuienesSomosPage() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-40 bg-gray-900 text-white">
      
      {/* --- 🚀 NUEVO BANNER CON IMAGEN DE FONDO --- */}
      <div className="relative w-full h-[60vh] flex items-center justify-center text-center overflow-hidden">
        {/* Imagen de fondo */}
        <Image
          src="/equipo/banner-equipo.jpg" // ⬅️ Tu foto del equipo completo
          alt="Equipo de Construtech ISL"
          fill
          style={{ objectFit: 'cover' }}
          className="absolute z-0 opacity-40" // Opacidad para que el texto se vea mejor
        />
        {/* Contenido del texto superpuesto */}
        <div className="relative z-10 max-w-4xl px-8">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 drop-shadow-lg">
              Conectamos los Puntos del Sector Constructor
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="text-center text-lg md:text-xl text-gray-100 leading-relaxed drop-shadow-md">
              <p>
                Construtech ISL nació de una simple observación: el sector de la construcción y remodelación residencial está fragmentado. Los clientes pierden tiempo y dinero buscando herramientas en un lugar, cursos de capacitación en otro, y personal calificado en un tercero, sin garantía de calidad.
              </p>
              <p className="mt-4">
                Somos un equipo multidisciplinario de Ingeniería de Sistemas, Ingeniería Industrial y expertos en Logística. Decidimos unir nuestras habilidades para resolver este problema. No somos arquitectos, somos optimizadores de procesos.
              </p>
              <p className="mt-4">
                Nuestra misión es digitalizar y centralizar la cadena de valor
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>
      {/* --- FIN DEL BANNER --- */}


      {/* --- SECCIÓN "Conoce a Nuestro Equipo" --- */}
      <div className="max-w-7xl mx-auto px-8 py-20"> {/* Más padding aquí */}
        <AnimatedSection delay={0.4}>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-16">
            Conoce a Nuestro Equipo
          </h2>
        </AnimatedSection>

        {/* --- Layout de Equipo Alternado (Sin cambios) --- */}
        <div className="w-full max-w-6xl space-y-20 md:space-y-32">
          
          {team.map((member, index) => (
            <AnimatedSection key={member.name}>
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
                <div className={`flex justify-center items-center ${index % 2 !== 0 ? 'md:order-2' : 'md:order-1'}`}>
                  <div className="relative w-72 h-72 md:w-80 md:h-80">
                    <div className="absolute inset-0 bg-blue-600 rounded-full opacity-30 blur-xl"></div>
                    <Image
                      src={member.img}
                      alt={`Foto de ${member.name}`}
                      width={500}
                      height={500}
                      className="relative z-10 w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  </div>
                </div>
                <div className={`space-y-4 ${index % 2 !== 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <h3 className="text-4xl font-bold text-blue-400">{member.name}</h3>
                  <p className="text-2xl font-semibold text-gray-100">{member.title}</p>
                  <p className="text-lg text-gray-300 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        
      </div>
      
    </main>
  );
}