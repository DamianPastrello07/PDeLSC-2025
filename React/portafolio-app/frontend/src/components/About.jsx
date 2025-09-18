import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="vh-100 container d-flex align-items-center">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="display-4 mb-4">Sobre mí</h2>
        <p className="fs-5 text-start">
          Soy un desarrollador apasionado por crear aplicaciones modernas, 
          rápidas y fáciles de usar. Me gusta trabajar tanto en frontend como en backend.
        </p>
      </motion.div>
    </section>
  );
}
