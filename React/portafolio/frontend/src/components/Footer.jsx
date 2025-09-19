import React from "react";

const Footer = ({ contact }) => {
  return (
    <footer id="footer" className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-3 mb-md-0">
            <h4>Contacto</h4>
            <p><i className="fas fa-envelope me-2"></i>{contact.email}</p>
            <p><i className="fas fa-phone me-2"></i>{contact.phone}</p>
          </div>
          <div className="col-md-6 text-md-end">
            <h4>Redes Sociales</h4>
            <a href="#" className="text-white me-3"><i className="fab fa-github fa-2x"></i></a>
            <a href="#" className="text-white me-3"><i className="fab fa-linkedin fa-2x"></i></a>
            <a href="#" className="text-white me-3"><i className="fab fa-twitter fa-2x"></i></a>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 text-center">
            <p className="mb-0">&copy; 2025 Mi Portafolio Personal</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
