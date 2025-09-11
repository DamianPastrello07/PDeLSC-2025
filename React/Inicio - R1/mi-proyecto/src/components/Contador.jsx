import React, { useState } from 'react';

export default function Contador() {
  const [contador, setContador] = useState(0);

  const incrementar = () => setContador(c => c + 1);
  const decrementar = () => setContador(c => c - 1);
  const reset = () => setContador(0);

  return (
    <div className="contador">
      <h1 className="titulo">Contador: {contador}</h1>
      <button className="boton" onClick={incrementar}>Incrementar</button>
      <button className="boton" onClick={decrementar}>Decrementar</button>
      <button className="boton" onClick={reset}>Reset</button>
    </div>
  );
}
