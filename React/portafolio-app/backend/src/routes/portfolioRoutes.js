import express from "express";
import { db } from "../db.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const SECRET = "secretkey123";

// Middleware de autenticación
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No autorizado" });

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido" });
  }
}

// Middleware para permitir solo al usuario 'damian'
function ownerMiddleware(req, res, next) {
  if (req.user.username === "damian") { // req.user viene del authMiddleware
    next();
  } else {
    res.status(403).json({ message: "No tienes permisos para modificar el portafolio" });
  }
}

// Obtener portafolio del usuario
router.get("/", authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM portfolios WHERE user_id = ?", [req.user.id]);
    res.json(rows[0] || {});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener el portafolio" });
  }
});

// Crear o actualizar portafolio (solo 'damian')
router.post("/", authMiddleware, ownerMiddleware, async (req, res) => {
  const { skills, achievements, experiences, projects } = req.body;

  try {
    const [exists] = await db.query("SELECT * FROM portfolios WHERE user_id = ?", [req.user.id]);

    if (exists.length) {
      await db.query(
        "UPDATE portfolios SET skills=?, achievements=?, experiences=?, projects=? WHERE user_id=?",
        [skills, achievements, experiences, projects, req.user.id]
      );
      res.json({ message: "Portafolio actualizado" });
    } else {
      await db.query(
        "INSERT INTO portfolios (user_id, skills, achievements, experiences, projects) VALUES (?, ?, ?, ?, ?)",
        [req.user.id, skills, achievements, experiences, projects]
      );
      res.json({ message: "Portafolio creado" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al guardar el portafolio" });
  }
});

export default router;
