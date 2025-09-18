import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="vh-100 d-flex flex-column justify-content-center align-items-center bg-primary text-white text-center">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="display-1 fw-bold"
      >
        ¡Hola, soy Nataniel!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="lead mt-3"
      >
        Desarrollador Fullstack | React & Node.js
      </motion.p>
    </section>
  );
}
