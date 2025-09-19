import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error MongoDB:", err));

// Rutas
import projectsRouter from "./routes/projects.js";
import componentsRouter from "./routes/components.js";
import authRoutes from "./authRoutes.js";

app.use("/api/projects", projectsRouter);
app.use("/api/components", componentsRouter);
app.use("/auth", authRoutes);

// Ruta raíz de prueba
app.get("/", (req, res) => {
  res.send("Backend corriendo.");
});

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
