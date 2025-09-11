import Tabla from "./components/Tabla";
import UsuarioForm from "./components/FormUsuario.jsx";
import { useRef } from "react";

function App() {
  const tablaRef = useRef();

  return (
    <div className="container mt-4">
      <Tabla ref={tablaRef} />
    </div>
  );
}

export default App;
