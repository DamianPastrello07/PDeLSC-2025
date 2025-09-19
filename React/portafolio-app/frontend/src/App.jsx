// src/App.jsx
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Footer from './components/Footer';
import api from './services/api';

const App = () => {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null); // usuario logueado

  // Obtener token del localStorage al cargar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token }); // simple, puedes agregar email/nombre si lo devuelves desde backend
    }
  }, []);

  // Fetch de datos del backend
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await api.get('/components'); // Cambia la ruta si tu backend es otra
        setData(res.data);
      } catch (err) {
        console.error('Error cargando datos del backend:', err);
      }
    };

    fetchPortfolio();
  }, []);

  if (!data) return <div className="text-center mt-5">Cargando...</div>;

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <div style={{ paddingTop: '56px' }}>
        <Hero data={data.hero} isLoggedIn={!!user} />
        <About data={data.about} isLoggedIn={!!user} />
        <Skills data={data.skills} isLoggedIn={!!user} />
        <Projects data={data.projects} isLoggedIn={!!user} />
        <Footer data={data.contact} isLoggedIn={!!user} />
      </div>
    </>
  );
};

export default App;
