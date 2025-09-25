  import express from "express";
  import cors from "cors";
  import authRoutes from "./routes/auth.js";
  import scoreRoutes from "./routes/score.js";

  const app = express();
  const PORT = 5000;

  // Middleware
  app.use(cors({ origin: "http://localhost:5173", credentials: true }));
  app.use(express.json());

  // Logging simple para debug
  app.use((req, res, next) => {
    console.log(`➡ ${req.method} ${req.url}`);
    next();
  });

  // Rutas
  app.use("/api/auth", authRoutes);
  app.use("/api/score", scoreRoutes);

  // Iniciar servidor
  app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  });
