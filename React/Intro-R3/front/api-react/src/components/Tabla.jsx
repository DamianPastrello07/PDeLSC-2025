import { useEffect, useState } from "react";
import axios from "axios";
import UsuarioForm from "./FormUsuario";

export default function Tabla() {
  const [usuarios, setUsuarios] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [editErrors, setEditErrors] = useState({});

  // Obtener usuarios desde el backend
  const fetchUsuarios = async () => {
    try {
      const res = await axios.get("http://localhost:4000/usuarios");
      setUsuarios(res.data);
    } catch (err) {
      console.error("Error al obtener usuarios:", err);
    }
  };

  //Ejecutar al montar
  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Validacion de usuario 
  const validateUser = (user) => {
    const newErrors = {};

    if (!user.nombre.trim()) newErrors.nombre = "Nombre requerido";
    else if (!/^[A-Za-z\s]+$/.test(user.nombre)) newErrors.nombre = "El nombre no puede contener números";

    if (!user.apellido.trim()) newErrors.apellido = "Apellido requerido";
    else if (!/^[A-Za-z\s]+$/.test(user.apellido)) newErrors.apellido = "El apellido no puede contener números";

    if (!user.direccion.trim()) newErrors.direccion = "Dirección requerida";

    if (!user.telefono.trim()) newErrors.telefono = "Teléfono requerido";
    else if (!/^\d+$/.test(user.telefono)) newErrors.telefono = "El teléfono solo puede contener números";

    if (!user.celular.trim()) newErrors.celular = "Celular requerido";
    else if (!/^\d+$/.test(user.celular)) newErrors.celular = "El celular solo puede contener números";

    if (!user.fecha_nacimiento) newErrors.fecha_nacimiento = "Fecha de nacimiento requerida";

    if (!user.email.trim()) newErrors.email = "Email requerido";
    else if (!/^.+@(gmail\.com|hotmail\.com)$/.test(user.email)) newErrors.email = "El email debe ser @gmail.com o @hotmail.com";

    return newErrors;
  };

  //Eliminar usuario
  const eliminarUsuario = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/usuarios/${id}`);
      fetchUsuarios();
    } catch (err) {
      console.error("Error al eliminar usuario:", err);
    }
  };
  //Guardar edición de usuario
  const guardarEdicion = async (user) => {
    const validationErrors = validateUser(user);
    if (Object.keys(validationErrors).length > 0) {
      setEditErrors(validationErrors);
      return;
    }

    try {
      await axios.put(`http://localhost:4000/usuarios/${user.id}`, user);
      setEditUser(null);
      setEditErrors({});
      fetchUsuarios();
    } catch (err) {
      if (err.response && err.response.status === 400 && err.response.data.field) {
        setEditErrors(prev => ({ ...prev, [err.response.data.field]: err.response.data.message }));
      } else {
        console.error("Error al editar usuario:", err);
      }
    }
  };

  return (
    <div className="container mt-4">
      <UsuarioForm onAdd={fetchUsuarios} />

      <h2 className="mb-3">Lista de Usuarios</h2>
      <table className="table table-striped table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Celular</th>
            <th>Fecha Nac.</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              {["nombre","apellido","direccion","telefono","celular","fecha_nacimiento","email"].map(field => (
                <td key={field}>
                  {editUser?.id === u.id ? (
                    <>
                      <input
                        type={field === "fecha_nacimiento" ? "date" : "text"}
                        value={editUser[field] || ""}
                        onChange={e => setEditUser({ ...editUser, [field]: e.target.value })}
                        className={`form-control ${editErrors[field] ? "is-invalid" : ""}`}
                      />
                      {editErrors[field] && (
                        <div className="invalid-feedback">{editErrors[field]}</div>
                      )}
                    </>
                  ) : (
                     field === "fecha_nacimiento"
                      ? u[field]?.split("T")[0] 
                      : u[field]
                  )}
                </td>
              ))}
              <td> 
                {editUser?.id === u.id ? (
                  <>
                    <button className="btn btn-success btn-sm mb-2" onClick={() => guardarEdicion(editUser)}>Guardar</button>
                    <button className="btn btn-secondary btn-sm" onClick={() => { setEditUser(null); setEditErrors({}); }}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => setEditUser(u)}>Editar</button>
                    <button className="btn btn-danger btn-sm" onClick={() => eliminarUsuario(u.id)}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
