import React, { useState } from 'react';

export default function FormularioNombre() {
  const [nombre, setNombre] = useState('');
  const [bienvenida, setBienvenida] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (nombre.trim() !== '') {
      setBienvenida(`¡Bienvenido/a, ${nombre}!`);
      setNombre('');
    }
  };

  return (
    <div className="formulario-container">
      <form onSubmit={manejarEnvio} className="formulario">
        <input
          type="text"
          placeholder="Ingresa tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>

      {bienvenida && <h3 className="mensaje-bienvenida">{bienvenida}</h3>}
    </div>
  );
}
