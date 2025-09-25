import express from "express";
import { db } from "../db.js";

const router = express.Router();

// Agregar puntaje
router.post("/", async (req, res) => {
  const { userId, game, score } = req.body;

  if (!userId || !game || score == null) {
    return res.status(400).json({ status: "error", message: "Faltan datos" });
  }

  try {
    await db.query(
      `INSERT INTO scores (id, user_id, game, score, created_at) VALUES (?, ?, ?, NOW())`,
      [userId, game, score]
    );
    res.json({ status: "success", message: "Puntaje guardado" });
  } catch (err) {
    console.error("Error guardando puntaje:", err);
    res.status(500).json({ status: "error", message: "Error guardando puntaje" });
  }
});

// Obtener top scores de un juego
router.get("/top/:game", async (req, res) => {
  const { game } = req.params;
  const top = parseInt(req.query.top) || 10;

  try {
    const [rows] = await db.query(
      `SELECT u.nombre AS user_id, s.score
       FROM scores s
       JOIN user u ON s.user_id = u.nombre
       WHERE s.game = ?
       ORDER BY s.score DESC
       LIMIT ?`,
      [game, top]
    );

    res.json({ status: "success", leaderboard: rows.length ? rows : [] });
  } catch (err) {
    console.error("Error obteniendo leaderboard:", err);
    res.status(500).json({ status: "error", message: "Error obteniendo leaderboard" });
  }
});

export default router;
