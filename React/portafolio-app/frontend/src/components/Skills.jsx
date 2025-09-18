import { motion } from "framer-motion";

export default function Skills() {
  const skills = ["React", "Node.js", "Express", "MongoDB", "Tailwind", "Git"];

  return (
    <section className="py-5 bg-light">
      <div className="container text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="display-5 mb-4"
        >
          Habilidades
        </motion.h2>
        <div className="row justify-content-center">
          {skills.map((skill, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="col-6 col-md-4 col-lg-2 mb-3"
            >
              <div className="card shadow-sm p-3">
                <span className="fw-semibold">{skill}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
