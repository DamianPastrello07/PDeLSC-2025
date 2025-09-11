import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Creacion({ agregarTarea, tareas, editarTarea }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const tareaExistente = id ? tareas.find(t => t.id === Number(id)) : null;

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [completa, setCompleta] = useState(false);

  useEffect(() => {
    if (tareaExistente) {
      setTitulo(tareaExistente.titulo);
      setDescripcion(tareaExistente.descripcion);
      setCompleta(tareaExistente.completa);
    }
  }, [tareaExistente]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo || !descripcion) return alert("⚠ Todos los campos son obligatorios");

    if (tareaExistente) {
      editarTarea(tareaExistente.id, { titulo, descripcion, completa });
    } else {
      agregarTarea({ titulo, descripcion, completa });
    }
    navigate("/");
  };

  return (
    <div>
      <h2 className="text-success">{tareaExistente ? "Editar Tarea" : "Crear Nueva Tarea"}</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label fw-bold">Título</label>
          <input
            type="text"
            className="form-control border-primary"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Descripción</label>
          <textarea
            className="form-control border-primary"
            rows="3"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={completa}
            onChange={(e) => setCompleta(e.target.checked)}
          />
          <label className="form-check-label">Marcar como completa</label>
        </div>

        <button type="submit" className="btn btn-success">
          {tareaExistente ? "Guardar cambios" : "Guardar tarea"}
        </button>
      </form>
    </div>
  );
}

export default Creacion;