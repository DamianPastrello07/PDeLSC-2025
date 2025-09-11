import React, { useState } from "react";
import { motion } from "framer-motion";
import { updatePortfolio } from "../services/portfolioService";

export default function CardsSection({ portfolio, user }) {
  const [editablePortfolio, setEditablePortfolio] = useState(portfolio);
  const [editing, setEditing] = useState(false);

  const handleChange = (e, field) => {
    setEditablePortfolio({ ...editablePortfolio, [field]: e.target.value });
  };

  const handleSave = async () => {
    if (!user?.token) return;
    try {
      await updatePortfolio(user.token, editablePortfolio);
      setEditing(false);
      alert("Portafolio actualizado");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar el portafolio");
    }
  };

  return (
    <motion.section
      id="cards"
      className="container my-5"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false }}
      transition={{ duration: 0.8 }}
    >
      <h2>Mis Habilidades, Logros, Experiencias y Proyectos</h2>

      {user?.username === "damian" && !editing && (
        <button className="btn btn-primary my-3" onClick={() => setEditing(true)}>
          Editar Portafolio
        </button>
      )}

      {editing ? (
        <div>
          <textarea
            className="form-control mb-2"
            value={editablePortfolio.skills || ""}
            onChange={(e) => handleChange(e, "skills")}
            placeholder="Habilidades"
          />
          <textarea
            className="form-control mb-2"
            value={editablePortfolio.achievements || ""}
            onChange={(e) => handleChange(e, "achievements")}
            placeholder="Logros"
          />
          <textarea
            className="form-control mb-2"
            value={editablePortfolio.experiences || ""}
            onChange={(e) => handleChange(e, "experiences")}
            placeholder="Experiencias"
          />
          <textarea
            className="form-control mb-2"
            value={editablePortfolio.projects || ""}
            onChange={(e) => handleChange(e, "projects")}
            placeholder="Proyectos"
          />
          <button className="btn btn-success me-2" onClick={handleSave}>Guardar</button>
          <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancelar</button>
        </div>
      ) : (
        <div className="row mt-4">
          <div className="col-md-6 mb-3">
            <div className="card p-3">{editablePortfolio.skills || "Habilidades"}</div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card p-3">{editablePortfolio.achievements || "Logros"}</div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card p-3">{editablePortfolio.experiences || "Experiencias"}</div>
          </div>
          <div className="col-md-6 mb-3">
            <div className="card p-3">{editablePortfolio.projects || "Proyectos"}</div>
          </div>
        </div>
      )}
    </motion.section>
  );
}
