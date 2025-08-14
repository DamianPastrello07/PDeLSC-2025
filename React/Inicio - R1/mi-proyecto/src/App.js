import React from 'react';
import Holamundo from './components/Holamundo';
import Tarjeta from './components/Tarjetapresentacion';
import Contador from './components/Contador';
import Tareas from './components/Tareas';
import Formulario from './components/Formulario';

function App() {
  return (
    <div className="App">
      <Holamundo />
      <Tarjeta />
      <Contador />
      <Tareas />
      <Formulario />
    </div>
  );
}

export default App;

