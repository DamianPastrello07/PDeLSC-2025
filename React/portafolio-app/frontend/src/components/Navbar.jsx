import React from "react";
import { Navbar as BootstrapNavbar, Nav, Container, Button } from "react-bootstrap";

export default function Navbar({ onLoginClick, user }) {
  return (
    <BootstrapNavbar expand="lg" bg="dark" variant="dark">
      <Container>
        <BootstrapNavbar.Brand href="#">Portafolio</BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav" className="justify-content-center">
          <Nav className="mx-auto">
            <Nav.Link href="#hero">Yo</Nav.Link>
            <Nav.Link href="#about">Sobre Mi</Nav.Link>
            <Nav.Link href="#cards">Cartas</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>

        <div className="d-flex">
          {user ? (
            <span className="text-light fw-bold">Hola, {user.username}</span>
          ) : (
            <Button variant="outline-light" onClick={onLoginClick}>
              Iniciar Sesión
            </Button>
          )}
        </div>
      </Container>
    </BootstrapNavbar>
  );
}
