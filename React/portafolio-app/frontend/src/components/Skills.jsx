import { motion } from "framer-motion";

export default function Skills() {
  const skills = ["React", "Node.js", "Express", "MongoDB", "Tailwind", "Git"];

  return (
    <section id="skills" className="py-20 bg-gray-100">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-6"
        >
          Habilidades
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-4">
          {skills.map((skill, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.1 }}
              className="px-6 py-3 bg-white shadow-md rounded-lg font-medium"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
