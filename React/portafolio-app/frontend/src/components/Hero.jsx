import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="hero-container d-flex flex-column justify-content-center align-items-center text-center"
      style={{
        height: "100vh",
        backgroundImage: "url('/hero-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
      }}
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Mi Portafolio
      </motion.h1>
      <motion.h3
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Desarrolladora Web Fullstack
      </motion.h3>
    </section>
  );
}
