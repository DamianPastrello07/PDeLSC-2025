import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="hero" className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
        className="text-5xl font-bold"
      >
        ¡Hola, soy Nataniel!
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5 }}
        className="mt-4 text-lg"
      >
        Desarrollador Fullstack | React & Node.js
      </motion.p>
    </section>
  );
}
