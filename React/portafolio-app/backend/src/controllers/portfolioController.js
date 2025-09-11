import { db } from "../db.js";

export const getPortfolio = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM portfolio WHERE user_id = ?", [req.user.id]);
    res.json(rows[0] || {});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al obtener portafolio" });
  }
};

export const createOrUpdatePortfolio = async (req, res) => {
  const { about, skills, achievements, experiences, projects } = req.body;
  try {
    const [existing] = await db.query("SELECT * FROM portfolio WHERE user_id = ?", [req.user.id]);
    if (existing.length > 0) {
      await db.query(
        "UPDATE portfolio SET about=?, skills=?, achievements=?, experiences=?, projects=? WHERE user_id=?",
        [about, skills, achievements, experiences, projects, req.user.id]
      );
      res.json({ message: "Portafolio actualizado" });
    } else {
      await db.query(
        "INSERT INTO portfolio (user_id, about, skills, achievements, experiences, projects) VALUES (?, ?, ?, ?, ?, ?)",
        [req.user.id, about, skills, achievements, experiences, projects]
      );
      res.json({ message: "Portafolio creado" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error al guardar portafolio" });
  }
};
