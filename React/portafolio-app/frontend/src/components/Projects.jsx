import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("https://p-de-isc-back.vercel.app/api/projects")
      .then(res => setProjects(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="py-5 bg-white">
      <div className="container text-center">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="display-5 mb-4"
        >
          Mis Proyectos
        </motion.h2>
        <div className="row justify-content-center">
          {projects.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="col-md-6 col-lg-4 mb-4"
            >
              <div className="card h-100 shadow-sm">
                {p.image && <img src={p.image} className="card-img-top" alt={p.title} />}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{p.title}</h5>
                  <p className="card-text flex-grow-1">{p.description}</p>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-2">
                    Ver más
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
