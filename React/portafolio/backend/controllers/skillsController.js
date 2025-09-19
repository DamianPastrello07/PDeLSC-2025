import Skill from '../models/Skill.js';

// Obtener todas las skills
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Añadir una nueva skill (solo admin)
export const addSkill = async (req, res) => {
  try {
    const { name, level, color } = req.body;
    const skill = new Skill({ name, level, color });
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una skill por ID (solo admin)
export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill no encontrada' });

    await skill.deleteOne();
    res.json({ message: 'Skill eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
