import React, { useState } from 'react';

export default function Tarjeta() {
  const [tareas, setTareas] = useState([
    { id: 1, descripcion: 'Limpiar los platos', completada: false },
    { id: 2, descripcion: 'Secar los platos', completada: true }
  ]);

  const [nuevaTarea, setNuevaTarea] = useState('');

  const agregarTarea = () => {
    if (nuevaTarea.trim() === '') return;

    const nueva = {
      id: Date.now(),
      descripcion: nuevaTarea,
      completada: false
    };

    setTareas([...tareas, nueva]);
    setNuevaTarea('');
  };

  const toggleCompletada = (id) => {
    setTareas(tareas.map(t =>
      t.id === id ? { ...t, completada: !t.completada } : t
    ));
  };

  return (
    <div className="tarjeta-container">
      <h2>Lista de tareas</h2>

      <div className="formulario-tarea">
        <input
          type="text"
          placeholder="Nueva tarea"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
        />
        <button onClick={agregarTarea}>Agregar</button>
      </div>

      <ul className="lista-tareas">
        {tareas.map(t => (
          <li
            key={t.id}
            style={{
              textDecoration: t.completada ? 'line-through' : 'none',
              cursor: 'pointer'
            }}
            onClick={() => toggleCompletada(t.id)}
          >
            {t.descripcion} {t.completada ? '' : 'X'}
          </li>
        ))}
      </ul>
    </div>
  );
}
