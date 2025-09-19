import React, { useState } from "react";

const Footer = ({ data, isLoggedIn, onUpdate }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [email, setEmail] = useState(data.contact.email);
  const [phone, setPhone] = useState(data.contact.phone);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...data, contact: { email, phone } });
    setShowEdit(false);
  };

  return (
    <footer className="bg-dark text-white py-4 text-center">
      <p onClick={()=>isLoggedIn&&setShowEdit(true)}><i className="bi bi-envelope me-2"></i>{data.contact.email}</p>
      <p onClick={()=>isLoggedIn&&setShowEdit(true)}><i className="bi bi-telephone me-2"></i>{data.contact.phone}</p>
      <p className="mt-3 mb-0">© {new Date().getFullYear()} Mi Portafolio Personal</p>

      {showEdit && (
        <div className="edit-overlay">
          <form className="edit-form" onSubmit={handleSubmit}>
            <h3>Editar Contacto</h3>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required/>
            </div>
            <div className="mb-3">
              <label className="form-label">Teléfono</label>
              <input type="tel" className="form-control" value={phone} onChange={e=>setPhone(e.target.value)} required/>
            </div>
            <div className="d-flex justify-content-end">
              <button type="button" className="btn btn-secondary me-2" onClick={()=>setShowEdit(false)}>Cancelar</button>
              <button type="submit" className="btn btn-primary">Guardar</button>
            </div>
          </form>
        </div>
      )}
    </footer>
  );
};

export default Footer;
