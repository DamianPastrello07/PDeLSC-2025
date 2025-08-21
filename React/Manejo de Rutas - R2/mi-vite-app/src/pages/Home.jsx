import { Link } from "react-router-dom";

function Home({ tareas }) {
  return (
    <div>
      <h2 className="mb-4 text-success">Lista de Tareas</h2>
      <div className="row">
        {tareas.map((tarea) => (
          <div key={tarea.id} className="col-md-4 mb-3">
            <div className="card shadow border-0">
              <div className="card-body">
                <h5 className="card-title text-primary">{tarea.titulo}</h5>
                <p className="card-text text-muted">
                  {tarea.descripcion.substring(0, 50)}...
                </p>
                <Link
                  to={`/tarea/${tarea.id}`}
                  className="btn btn-danger btn-sm"
                >
                  Ver detalle
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {tareas.length === 0 && (
        <p className="text-center text-muted">No hay tareas creadas aún.</p>
      )}
    </div>
  );
}

export default Home;
