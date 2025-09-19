import React, { useState } from "react";
import { AuthService } from "../services/AuthService";

const Navbar = () => {
  const [user, setUser] = useState(AuthService.getCurrentUser());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const userData = await AuthService.login(email, password);
      setUser(userData);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#">Mi Portfolio</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><a className="nav-link" href="#hero">Inicio</a></li>
            <li className="nav-item"><a className="nav-link" href="#about">Sobre Mí</a></li>
            <li className="nav-item"><a className="nav-link" href="#skills">Habilidades</a></li>
            <li className="nav-item"><a className="nav-link" href="#projects">Proyectos</a></li>
          </ul>
          {!user ? (
            <form className="d-flex" onSubmit={handleLogin}>
              <input type="email" className="form-control me-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
              <input type="password" className="form-control me-2" placeholder="Contraseña" value={password} onChange={e=>setPassword(e.target.value)} required />
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm"></span> : "Iniciar Sesión"}
              </button>
            </form>
          ) : (
            <div className="d-flex align-items-center">
              <span className="text-light me-3">Bienvenido, {user.email}</span>
              <button onClick={handleLogout} className="btn btn-outline-light">Cerrar Sesión</button>
            </div>
          )}
        </div>
      </div>
      {error && <div className="container mt-2"><div className="alert alert-danger py-1">{error}</div></div>}
    </nav>
  );
};

export default Navbar;
