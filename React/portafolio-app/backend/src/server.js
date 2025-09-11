import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/portfolio", portfolioRoutes);

app.listen(5000, () => console.log("Servidor backend corriendo en puerto 5000"));
