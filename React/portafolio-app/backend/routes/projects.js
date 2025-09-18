import express from "express";
import Project from "../models/project.js";

const router = express.Router();

// Obtener todos los proyectos
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nuevo proyecto
router.post("/", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.json(newProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Eliminar un proyecto
router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Proyecto eliminado" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
