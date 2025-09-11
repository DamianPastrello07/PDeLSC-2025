import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Detalle({ tareas, toggleCompleta, eliminarTarea }) {
  const { id } = useParams();
  const tareaId = Number(id);
  const tarea = tareas.find((t) => t.id === tareaId);
  const navigate = useNavigate();

  const [confirmarEliminar, setConfirmarEliminar] = useState(false);

  if (!tarea) {
    return <h2 className="text-danger">X Tarea no encontrada</h2>;
  }

  const handleEliminar = () => {
    if (!confirmarEliminar) {
      setConfirmarEliminar(true);
      return;
    }
    eliminarTarea(tarea.id);
    navigate("/");
  };

  return (
    <div>
      <h2 className="text-primary">{tarea.titulo}</h2>
      <div className="mt-3 p-3 border rounded shadow-sm bg-light">
        <p>
          <strong>Descripción:</strong> {tarea.descripcion}
        </p>
        <p>
          <strong>Fecha:</strong> {tarea.fecha}
        </p>
        <p>
          <strong>Estado:</strong>{" "}
          <span
            className={`fw-bold ${
              tarea.completa ? "text-success" : "text-danger"
            }`}
          >
            {tarea.completa ? "Completa ✓" : "Incompleta X"}
          </span>
        </p>
        <button
          className={`btn ${
            tarea.completa ? "btn-warning" : "btn-success"
          } me-2`}
          onClick={() => toggleCompleta(tarea.id)}
        >
          {tarea.completa ? "Marcar como incompleta" : "Marcar como completa"}
        </button>
        <Link to={`/editar/${tarea.id}`} className="btn btn-primary me-2">
          Editar
        </Link>
        <button
          onClick={handleEliminar}
          className={`btn ${confirmarEliminar ? "btn-outline-danger" : "btn-danger"} me-2`}
        >
          {confirmarEliminar ? "¿Seguro?" : "Eliminar"}
        </button>
        <Link to="/" className="btn btn-dark">
          Volver
        </Link>
      </div>
    </div>
  );
}

export default Detalle;
