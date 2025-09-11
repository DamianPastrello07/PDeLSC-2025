import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import CardsSection from "./components/CardsSection";
import LoginModal from "./components/LoginModal";
import { getPortfolio } from "./services/portfolioService";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [showLogin, setShowLogin] = useState(false);
  const [portfolio, setPortfolio] = useState({});

  // Cargar portafolio cada vez que cambia el usuario
  useEffect(() => {
    if (user?.token) {
      getPortfolio(user.token)
        .then(data => setPortfolio(data))
        .catch(err => console.log(err));
    } else {
      setPortfolio({});
    }
  }, [user]);

  return (
    <div>
      <Navbar user={user} onLogin={() => setShowLogin(true)} />

      <LoginModal
        show={showLogin}
        onClose={() => setShowLogin(false)}
        setUser={setUser}
      />

      <Hero />
      <About about={portfolio.about} />
      <CardsSection portfolio={portfolio} user={user} />
    </div>
  );
}

export default App;
