import About from '../models/About.js';

// Obtener información "About"
export const getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar información "About" (solo admin)
export const updateAbout = async (req, res) => {
  try {
    const { text, image, details } = req.body;

    let about = await About.findOne();
    if (!about) {
      // Si no existe, creamos uno nuevo
      about = await About.create({ text, image, details });
    } else {
      about.text = text ?? about.text;
      about.image = image ?? about.image;
      about.details = details ?? about.details;
      await about.save();
    }

    res.json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
