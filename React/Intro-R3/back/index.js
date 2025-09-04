import express from "express";
import cors from "cors";
import { connectDB } from "./dbconnection.js";

const app = express();
app.use(cors());
app.use(express.json());

const db = connectDB(); // Obtener pool de conexiones

// GET: Obtener todos los usuarios
app.get("/usuarios", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM usr"); 
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener usuarios", details: err.message });
  }
});

// POST: Crear nuevo usuario
app.post("/usuarios", async (req, res) => {
  const { nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email } = req.body;
  try {
    const [result] = await db.execute(
      `INSERT INTO usr (nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (err) {
    console.error("Error en POST /usuarios:", err);

    // Detectar campos duplicados
    if (err.code === "ER_DUP_ENTRY") {
      const msg = err.message;
      if (msg.includes("email")) return res.status(400).json({ field: "email", message: "El email ya existe" });
      if (msg.includes("telefono")) return res.status(400).json({ field: "telefono", message: "El teléfono ya existe" });
      if (msg.includes("celular")) return res.status(400).json({ field: "celular", message: "El celular ya existe" });
    }

    res.status(500).json({ error: "Error al crear usuario", details: err.message });
  }
});

// PUT: Actualizar usuario por id
app.put("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email } = req.body;
  try {
    await db.execute(
      `UPDATE usr SET nombre=?, apellido=?, direccion=?, telefono=?, celular=?, fecha_nacimiento=?, email=? WHERE id=?`,
      [nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email, id]
    );
    res.json({ id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar usuario", details: err.message });
  }
});

// DELETE: Eliminar usuario por id
app.delete("/usuarios/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM usr WHERE id=?", [id]);
    res.json({ message: "Usuario eliminado", id });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar usuario", details: err.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
