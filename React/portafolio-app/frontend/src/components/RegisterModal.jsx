import React, { useState } from "react";

export default function RegisterModal({ onClose, onRegister }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // aquí mostramos mensajes

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message);
        return;
      }

      // Registro correcto
      setMessage("Registrado correctamente. Vuelve a iniciar sesión.");
      setTimeout(() => {
        onClose(); // cerramos modal
      }, 1500);
    } catch (err) {
      setMessage("Error al registrar");
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Registro</h3>
        <input placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
        <input placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleRegister}>Registrarse</button>
        <p style={{ color: "green" }}>{message}</p>
      </div>
    </div>
  );
}
