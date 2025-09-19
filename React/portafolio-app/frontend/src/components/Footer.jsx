// src/components/Footer.jsx
import React from 'react';

const Footer = ({ data }) => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <p><i className="bi bi-envelope me-2"></i> {data.email}</p>
            <p><i className="bi bi-telephone me-2"></i> {data.phone}</p>
            <p className="mt-3 mb-0">© {new Date().getFullYear()} Mi Portafolio Personal</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
