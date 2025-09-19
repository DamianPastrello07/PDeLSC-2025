import Project from '../models/Project.js';

// Obtener todos los proyectos
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Añadir nuevo proyecto (solo admin)
export const addProject = async (req, res) => {
  try {
    const { title, description, image, repoUrl } = req.body;
    const project = new Project({ title, description, image, repoUrl });
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar proyecto por ID (solo admin)
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Proyecto no encontrado' });

    const { title, description, image, repoUrl } = req.body;
    project.title = title ?? project.title;
    project.description = description ?? project.description;
    project.image = image ?? project.image;
    project.repoUrl = repoUrl ?? project.repoUrl;

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar proyecto por ID (solo admin)
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Proyecto no encontrado' });

    await project.deleteOne();
    res.json({ message: 'Proyecto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
