import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "bootstrap";

const LoginModal = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const modalRef = useRef(null);
  const bsModal = useRef(null);

  useEffect(() => {
    if (modalRef.current) {
      bsModal.current = new Modal(modalRef.current);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    show: () => bsModal.current?.show(),
    hide: () => bsModal.current?.hide(),
  }));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Login exitoso");

        // Guardar token y usuario en localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setTimeout(() => {
          bsModal.current?.hide();
          setFormData({ email: "", password: "" });
          setMessage("");
          window.location.reload();
        }, 2000);
      } else {
        setMessage(`❌ ${data.message || data.error}`);
      }
    } catch (error) {
      setMessage("❌ Error de conexión con el servidor");
    }
  };

  return (
    <div className="modal fade" id="loginModal" tabIndex="-1" aria-hidden="true" ref={modalRef}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Iniciar Sesión</h5>
            <button type="button" className="btn-close" onClick={() => bsModal.current?.hide()} />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control mb-2"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                className="form-control mb-2"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit" className="btn btn-primary w-100">Ingresar</button>
            </form>
            {message && <div className="mt-3 text-center">{message}</div>}
          </div>
        </div>
      </div>
    </div>
  );
});

export default LoginModal;
