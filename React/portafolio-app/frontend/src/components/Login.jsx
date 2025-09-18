import { useState, useEffect } from "react";

export default function Login({ onLogin, onLogout }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    setLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      localStorage.setItem("token", "dummy-token");
      setLoggedIn(true);
      setUsername("");
      setPassword("");
      setError("");
      onLogin(); // notifica al escritorio que inició sesión
    } else {
      setError("Usuario o contraseña incorrecta");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    onLogout(); // notifica al escritorio que cerró sesión
  };

  if (loggedIn) {
    return (
      <div className="p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-bold">¡Bienvenido!</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 rounded border"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-2 rounded border"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Entrar
      </button>
    </div>
  );
}
