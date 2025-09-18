import express from "express";
import Component from "../models/component.js";

const router = express.Router();

// Obtener todos los componentes
router.get("/", async (req, res) => {
  try {
    const components = await Component.find().sort({ order: 1 });
    res.json(components);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener componente por tipo
router.get("/type/:type", async (req, res) => {
  try {
    const component = await Component.findOne({ 
      type: req.params.type, 
      isActive: true 
    });
    res.json(component);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nuevo componente
router.post("/", async (req, res) => {
  try {
    const newComponent = new Component(req.body);
    await newComponent.save();
    res.json(newComponent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Actualizar componente
router.put("/:id", async (req, res) => {
  try {
    const updatedComponent = await Component.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedComponent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar componente
router.delete("/:id", async (req, res) => {
  try {
    await Component.findByIdAndDelete(req.params.id);
    res.json({ message: "Componente eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
