import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("https://p-de-isc-back.vercel.app/api/projects") // URL de tu backend
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="projects" className="py-20">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-6"
        >
          Proyectos
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white shadow-lg rounded-xl"
            >
              {p.image && <img src={p.image} alt={p.title} className="rounded-lg mb-3"/>}
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="text-gray-600">{p.description}</p>
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-indigo-600 mt-2 block">Ver más</a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


