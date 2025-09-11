import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "./db.js";

const router = express.Router();
const SECRET = "secretkey123";

// Registro
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si existe usuario o email
    const [existing] = await db.query(
      "SELECT * FROM users WHERE username=? OR email=?",
      [username, email]
    );

    if (existing.length) return res.status(400).json({ message: "Usuario o correo ya existe" });

    // Guardar nuevo usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.query("SELECT * FROM users WHERE username=?", [username]);
    const user = rows[0];
    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, username: user.username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

export default router;
