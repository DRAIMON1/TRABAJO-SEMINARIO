"use client"; 

import Image from 'next/image';
import { motion, useInView } from "framer-motion"; 
import { useRef } from "react";
import AnimatedSection from '@/components/AnimatedSection';
// Importamos íconos para Misión, Visión y Valores
import { FaBullseye, FaEye, FaHandshake, FaLightbulb, FaShieldAlt } from "react-icons/fa";

// --- Datos del equipo ---
const team = [
  {
    name: "Draimon Andres Osorio",
    title: "Ingeniero de Sistemas / Arquitecto de Software",
    img: "/equipo/draimon.png", // ⬅️ Asegúrate de que la extensión sea correcta (.png o .jpg)
    bio: "Soy el fundador y arquitecto de la plataforma. Mi pasión es usar la tecnología para construir soluciones eficientes que resuelvan problemas del mundo real, optimizando cada clic del proceso de alquiler y contratación."
  },
  {
    name: "Hamilton Narvaez",
    title: "Ingeniero Industrial / Director de Operaciones",
    img: "/equipo/hamilton.jpeg",
    bio: "Especialista en optimización de procesos. Mi trabajo es asegurar que la logística, el inventario y la contratación de personal funcionen sin fricciones, garantizando un servicio de calidad y puntualidad."
  },
  {
    name: "Yerson Escobar",
    title: "Especialista en Logística",
    img: "/equipo/yerson.jpeg",
    bio: "Con experiencia en cadena de suministro, me encargo de la gestión de inventario y la logística de entrega. Mi objetivo es que tengas la herramienta correcta en el momento exacto que la necesitas."
  },
  {
    name: "Andres Mendez",
    title: "Especialista en Gestión de Inventarios",
    img: "/equipo/favio.jpeg",
    bio: "Mi enfoque es el análisis de datos para predecir la demanda y asegurar que nuestro stock de herramientas y la disponibilidad de nuestro personal calificado siempre cumplan con tus necesidades."
  }
];

// --- Componente de Tarjeta de Equipo (Sin cambios) ---
function AnimatedProfileCard({ member, index }: any) {
  // ... (este componente ya no se usa en el nuevo diseño alternado, 
  // pero lo dejamos por si quieres volver a usarlo en el futuro) ...
  return null; 
}

export default function QuienesSomosPage() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-20 bg-gray-900 text-white overflow-x-hidden">
      
      {/* --- 1. BANNER MEJORADO (RESPONSIVO) --- */}
      <div className="relative w-full min-h-[60vh] flex items-center justify-center text-center px-4 py-20">
        <Image
          src="/equipo/banner-equipo.jpeg" 
          alt="Equipo de Construtech ISL"
          fill
          style={{ objectFit: 'cover' }}
          className="absolute z-0 opacity-30" 
        />
        
        <div className="relative z-10 max-w-5xl mx-auto">
          <AnimatedSection>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-8 drop-shadow-lg leading-tight">
              Conectamos los Puntos del <br className="hidden md:block" /> Sector Constructor
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay={0.2}>
            <div className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed drop-shadow-md space-y-6 px-2 md:px-12">
              <p>
                Construtech ISL nació de una simple observación: el sector de la construcción residencial está fragmentado. Los clientes pierden tiempo y dinero buscando herramientas en un lugar y expertos en otro.
              </p>
              <p className="font-semibold text-white">
                Somos un equipo de Ingenieros y Expertos en Logística. No somos solo arquitectos, somos optimizadores de procesos.
              </p>
              <p>
                Nuestra misión es centralizar la cadena de valor. Yo construyo la plataforma tecnológica, nuestro Ingeniero Industrial diseña los procesos y el equipo de Logística asegura el inventario. Juntos, creamos una experiencia fluida.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* --- 2. SECCIÓN EQUIPO (DISEÑO ALTERNADO) --- */}
      <div className="w-full max-w-7xl mx-auto px-6 py-20">
        <AnimatedSection delay={0.4}>
          <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-16">
            Conoce a Nuestro Equipo
          </h2>
        </AnimatedSection>

        <div className="w-full max-w-6xl mx-auto space-y-20 md:space-y-32">
          {team.map((member, index) => (
            <AnimatedSection key={member.name}>
              {/* Grid responsivo: 1 columna en móvil, 2 en PC */}
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12 text-center md:text-left">
                
                {/* Lado Imagen */}
                <div className={`flex justify-center items-center ${index % 2 !== 0 ? 'md:order-2' : 'md:order-1'}`}>
                  <div className="relative w-60 h-60 md:w-80 md:h-80">
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
                
                {/* Lado Texto */}
                <div className={`space-y-4 ${index % 2 !== 0 ? 'md:order-1' : 'md:order-2'}`}>
                  <h3 className="text-3xl md:text-4xl font-bold text-blue-400">{member.name}</h3>
                  <p className="text-xl md:text-2xl font-semibold text-gray-100">{member.title}</p>
                  <p className="text-base md:text-lg text-gray-300 leading-relaxed">{member.bio}</p>
                </div>
                
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* --- 3. NUEVA SECCIÓN: MISIÓN, VISIÓN Y VALORES --- */}
      <div className="w-full bg-gray-800 py-20 px-6 mt-12">
        <div className="max-w-7xl mx-auto">
          
          {/* Misión y Visión */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <AnimatedSection>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700 h-full hover:border-blue-500 transition-colors">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-900 rounded-lg mr-4">
                    <FaBullseye className="text-3xl text-blue-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Nuestra Misión</h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Democratizar el acceso a herramientas profesionales y mano de obra calificada en el sector residencial. Buscamos eliminar las barreras de entrada para proyectos de construcción y remodelación, ofreciendo una plataforma tecnológica que garantice seguridad, calidad y eficiencia para cada hogar colombiano.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="bg-gray-900 p-8 rounded-2xl border border-gray-700 h-full hover:border-green-500 transition-colors">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-green-900 rounded-lg mr-4">
                    <FaEye className="text-3xl text-green-400" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Nuestra Visión</h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Ser la plataforma líder en Latinoamérica para la gestión integral de proyectos de construcción residencial en 2030. Aspiramos a crear un ecosistema donde la capacitación, el alquiler y la contratación se unan para transformar la manera en que las personas construyen y mejoran sus espacios.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Valores Corporativos */}
          <AnimatedSection delay={0.4}>
            <h3 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              Nuestros Valores
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                <FaHandshake className="text-5xl text-yellow-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Confianza</h4>
                <p className="text-gray-400">Transparencia total en precios y perfiles verificados.</p>
              </div>

              <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                <FaLightbulb className="text-5xl text-yellow-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Innovación</h4>
                <p className="text-gray-400">Uso de tecnología para simplificar procesos tradicionales.</p>
              </div>

              <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
                <FaShieldAlt className="text-5xl text-yellow-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-white mb-2">Calidad</h4>
                <p className="text-gray-400">Herramientas de primera y profesionales certificados.</p>
              </div>

            </div>
          </AnimatedSection>

        </div>
      </div>

    </main>
  );
}