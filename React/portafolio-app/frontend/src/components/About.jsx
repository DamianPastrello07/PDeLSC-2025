import React from "react";
import { motion } from "framer-motion";

export default function About({ about = "Lorem ipsum dolor sit amet." }) {
  return (
    <motion.section
       id="about"
      className="w-100 py-5 bg-light d-flex align-items-center"
      style={{ minHeight: "60vh" }} // mayor altura vertical
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: false, amount: 0.3 }} // se anima cada vez que entra en vista
      transition={{ duration: 0.8 }}
    >
        <div className="container">
        <h2 className="mb-3">Acerca de</h2>
        <p>
          {about || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
        </p>
      </div>
    </motion.section>
  );
}
