import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-20 max-w-4xl mx-auto text-center">
      <motion.h2 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="text-3xl font-bold mb-6"
      >
        Sobre mí
      </motion.h2>
      <p className="text-gray-700 text-lg">
        Soy un desarrollador apasionado por crear aplicaciones modernas, 
        rápidas y fáciles de usar. Me gusta trabajar tanto en frontend como en backend.
      </p>
    </section>
  );
}
