import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "./models/project.js";

dotenv.config();

// Datos iniciales
const projects = [
  {
    title: "Portfolio Web",
    description: "Sitio web personal hecho con React, Tailwind y Express.",
    link: "https://miportfolio.com",
    image: "https://via.placeholder.com/400x200.png?text=Portfolio"
  },
  {
    title: "API REST con Node.js",
    description: "API para gestión de usuarios y productos con Express y MongoDB.",
    link: "https://github.com/usuario/api-rest",
    image: "https://via.placeholder.com/400x200.png?text=API+REST"
  },
  {
    title: "Dashboard en React",
    description: "Dashboard interactivo con gráficas y autenticación.",
    link: "https://github.com/usuario/dashboard",
    image: "https://via.placeholder.com/400x200.png?text=Dashboard"
  }
];

// Conectar y poblar DB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Conectado a MongoDB");

    // Limpia la colección para evitar duplicados
    await Project.deleteMany({});
    console.log("🧹 Colección limpia");

    // Inserta proyectos
    await Project.insertMany(projects);
    console.log("🎉 Datos insertados correctamente");

    process.exit(); // Finaliza
  })
  .catch(err => {
    console.error("❌ Error en conexión:", err);
    process.exit(1);
  });
