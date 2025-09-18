import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Taskbar from "./components/Taskbar";
import Window from "./components/Window";
import DesktopIcons from "./components/DesktopIcons";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  return (
    <Router>

      {/* Escritorio con iconos y ventanas */}
      <DesktopIcons />
      {/* Taskbar siempre visible */}
      <Taskbar />

      {/* Rutas auxiliares (opcional) */}
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/admin" element={isLoggedIn ? <Admin /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
      </Routes>
    </Router>
  );
}
