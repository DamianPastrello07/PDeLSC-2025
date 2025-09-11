import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { loginUser, registerUser } from "../services/authService";

export default function LoginModal({ show, onClose, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // Para registro
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    try {
      const data = await loginUser(username, password);
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      onClose();
    } catch (err) {
      setMessage(err.response?.data?.message || "Error al iniciar sesión");
    }
  };

  const handleRegister = async () => {
    try {
      await registerUser(username, email, password);
      setMessage("Usuario registrado correctamente. Inicia sesión.");
      setIsRegister(false);
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage(err.response?.data?.message || "Error al registrarse");
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isRegister ? "Registrarse" : "Iniciar sesión"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {message && <Alert variant="info">{message}</Alert>}
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          {isRegister && (
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? "Volver a login" : "Registrarse"}
        </Button>
        <Button variant="primary" onClick={isRegister ? handleRegister : handleLogin}>
          {isRegister ? "Registrarse" : "Iniciar sesión"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
