import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();
const SECRET = process.env.JWT_SECRET || "supersecreto123";

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  
  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ user: "admin" }, SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }
  res.status(401).json({ error: "Credenciales inválidas" });
});

export default router;

