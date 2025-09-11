import { useState } from "react";
import axios from "axios";

export default function UsuarioForm({ onAdd }) {
  const [form, setForm] = useState({
    nombre: "", apellido: "", direccion: "",
    telefono: "", celular: "", fecha_nacimiento: "", email: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Validación de campos
  const validate = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "Nombre requerido";
    else if (!/^[A-Za-z\s]+$/.test(form.nombre)) newErrors.nombre = "El nombre no puede contener números";

    if (!form.apellido.trim()) newErrors.apellido = "Apellido requerido";
    else if (!/^[A-Za-z\s]+$/.test(form.apellido)) newErrors.apellido = "El apellido no puede contener números";

    if (!form.direccion.trim()) newErrors.direccion = "Dirección requerida";

    if (!form.telefono.trim()) newErrors.telefono = "Teléfono requerido";
    else if (!/^\d+$/.test(form.telefono)) newErrors.telefono = "El teléfono solo puede contener números";

    if (!form.celular.trim()) newErrors.celular = "Celular requerido";
    else if (!/^\d+$/.test(form.celular)) newErrors.celular = "El celular solo puede contener números";

    if (!form.fecha_nacimiento) newErrors.fecha_nacimiento = "Fecha de nacimiento requerida";

    if (!form.email.trim()) newErrors.email = "Email requerido";
    else if (!/^.+@(gmail\.com|hotmail\.com)$/.test(form.email)) newErrors.email = "Email debe ser @gmail.com o @hotmail.com";

    return newErrors;
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      await axios.post("http://localhost:4000/usuarios", form);
      setForm({ nombre: "", apellido: "", direccion: "", telefono: "", celular: "", fecha_nacimiento: "", email: "" });
      setErrors({});
      if (onAdd) onAdd(); //Refrescar tabla
    } catch (err) {
      if (err.response && err.response.status === 400 && err.response.data.field) {
        setErrors(prev => ({ ...prev, [err.response.data.field]: err.response.data.message }));
      } else console.error("Error al agregar usuario:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h2>Agregar Usuario</h2>
      <div className="row g-2">
        {Object.entries({ nombre: "Nombre", apellido: "Apellido", direccion: "Dirección",
          telefono: "Teléfono", celular: "Celular", fecha_nacimiento: "Fecha Nac.", email: "Email"
        }).map(([name, label]) => (
          <div className="col-md-4" key={name}>
            <label className="form-label">{label}</label>
            <input
              type={name === "fecha_nacimiento" ? "date" : "text"} 
              name={name}
              value={form[name]}
              onChange={handleChange}
              className={`form-control ${errors[name] ? "is-invalid" : ""}`}
            />
            {errors[name] && <div className="invalid-feedback">{errors[name]}</div>}
          </div>
        ))}
      </div>
      <button type="submit" className="btn btn-success mt-3">Agregar</button>
    </form>
  );
}
