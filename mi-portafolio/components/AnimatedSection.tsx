"use client"; // 1. OBLIGATORIO: Indica que es un componente de cliente

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Esto define el tipo de las "props" que aceptará el componente
type Props = {
  children: React.ReactNode;
  delay?: number; // Hacemos el retraso opcional
};

export default function AnimatedSection({ children, delay = 0.2 }: Props) {
  // 2. Creamos una referencia para detectar cuándo se ve el elemento
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // 'once: true' para que solo se anime una vez

  // 3. Definimos las variantes de la animación
  const variants = {
    hidden: { opacity: 0, y: 50 }, // Estado inicial: invisible y 50px más abajo
    visible: { opacity: 1, y: 0 },  // Estado final: visible y en su posición original
  };

  return (
    // 4. Usamos 'motion.div' para aplicar la animación
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden" // Siempre empieza "oculto"
      animate={isInView ? "visible" : "hidden"} // Anima a "visible" cuando 'isInView' es true
      transition={{
        duration: 0.5,
        delay: delay, // Usa el retraso que pasamos como prop
      }}
    >
      {children}
    </motion.div>
  );
}