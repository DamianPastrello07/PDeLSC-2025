import express from "express";
import bcrypt from "bcryptjs";
import { db } from "../db.js";
import jwt from "jsonwebtoken";

const router = express.Router();
const SECRET_KEY = "supersecretkey123";

// Registro
router.post("/register", async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) {
    return res.status(400).json({ status: "error", message: "Faltan datos" });
  }

  try {
    const [rows] = await db.query("SELECT id FROM user WHERE email = ?", [email]);
    if (rows.length > 0) {
      return res.status(400).json({ status: "error", message: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      "INSERT INTO user (nombre, email, password) VALUES (?, ?, ?)",
      [nombre, email, hashedPassword]
    );

    const userId = result[0].insertId;
    const token = jwt.sign({ id: userId, nombre, email }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ status: "success", message: "Usuario registrado", token, user: { id: userId, nombre, email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Error en el servidor" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ status: "error", message: "Faltan datos" });
  }

  try {
    const [rows] = await db.query("SELECT id, nombre, password FROM user WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(400).json({ status: "error", message: "Email o contraseña incorrectos" });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ status: "error", message: "Email o contraseña incorrectos" });
    }

    const token = jwt.sign({ id: user.id, nombre: user.nombre, email }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ status: "success", message: "Login exitoso", token, user: { id: user.id, nombre: user.nombre, email } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: "error", message: "Error en el servidor" });
  }
});

export default router;
