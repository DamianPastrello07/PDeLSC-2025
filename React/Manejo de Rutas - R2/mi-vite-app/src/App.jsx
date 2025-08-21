import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Detalle from "./pages/Detalle";
import Creacion from "./pages/Creacion";

function App() {
  const [tareas, setTareas] = useState([
    {
      id: 1,
      titulo: "Tarea",
      descripcion: "Hacer la tarea de React",
      fecha: new Date().toLocaleDateString(),
      completa: false,
    },
    {
      id: 2,
      titulo: "Comida",
      descripcion: "Almorzar una tonelada de hamburguesas",
      fecha: new Date().toLocaleDateString(),
      completa: true,
    },
  ]);

  const agregarTarea = (tarea) => {
    setTareas((prev) => [
      ...prev,
      { ...tarea, id: Date.now(), fecha: new Date().toLocaleDateString() },
    ]);
  };

  const toggleCompleta = (id) => {
    setTareas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completa: !t.completa } : t))
    );
  };

  const eliminarTarea = (id) => {
    setTareas((prev) => prev.filter((t) => t.id !== id));
  };

  const editarTarea = (id, nuevaTarea) => {
    setTareas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...nuevaTarea } : t))
    );
  };

  const location = useLocation();

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <Link className="navbar-brand text-success fw-bold" to="/">
            ✓ Lista de Tareas
          </Link>
          <div className="ms-auto">
            {location.pathname !== "/" && (
              <Link className="btn btn-primary mx-2" to="/">
                Inicio
              </Link>
            )}
            {location.pathname !== "/crear" && (
              <Link className="btn btn-success" to="/crear">
                Crear tarea
              </Link>
            )}
          </div>
        </div>
      </nav>

      <div className="container-fluid flex-grow-1 d-flex justify-content-center align-items-start py-4">
        <div
          className="bg-white p-4 p-md-5 rounded-3 shadow w-100"
          style={{ maxWidth: "1100px" }}
        >
          <Routes>
            <Route path="/" element={<Home tareas={tareas} />} />
            <Route
              path="/tarea/:id"
              element={
                <Detalle
                  tareas={tareas}
                  toggleCompleta={toggleCompleta}
                  eliminarTarea={eliminarTarea}
                />
              }
            />
            <Route
              path="/crear"
              element={<Creacion agregarTarea={agregarTarea} />}
            />
            <Route
              path="/editar/:id"
              element={
                <Creacion
                  tareas={tareas}
                  editarTarea={editarTarea}
                  agregarTarea={agregarTarea}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
