import React from 'react';

export default function Navbar({ adminLogged, toggleAdmin }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <a className="navbar-brand" href="#">Mi Portafolio</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><a className="nav-link" href="#hero">Inicio</a></li>
            <li className="nav-item"><a className="nav-link" href="#about">Sobre Mí</a></li>
            <li className="nav-item"><a className="nav-link" href="#skills">Habilidades</a></li>
            <li className="nav-item"><a className="nav-link" href="#projects">Proyectos</a></li>
            <li className="nav-item"><a className="nav-link" href="#footer">Contacto</a></li>
          </ul>
          <div className="d-flex text-white align-items-center">
            <span style={{cursor: 'pointer'}} onClick={toggleAdmin}>
              Estado: {adminLogged ? 'Admin' : 'Usuario'} <i className="fas fa-user-circle ms-2"></i>
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
