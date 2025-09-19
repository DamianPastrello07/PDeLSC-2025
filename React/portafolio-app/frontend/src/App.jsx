import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import { DataService } from "./services/DataService";
import { AuthService } from "./services/AuthService";

const App = () => {
  const [data, setData] = useState(() => DataService.getData());
  const [user, setUser] = useState(AuthService.getCurrentUser());

  useEffect(() => {
    const checkUser = () => {
      const currentUser = AuthService.getCurrentUser();
      if (JSON.stringify(currentUser) !== JSON.stringify(user)) setUser(currentUser);
    };
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, [user]);

  const handleUpdateData = (updatedData) => {
    setData(updatedData);
    DataService.updateData(updatedData);
  };

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '56px' }}>
        <Hero data={data} isLoggedIn={!!user} onUpdate={handleUpdateData} />
        <About data={data} isLoggedIn={!!user} onUpdate={handleUpdateData} />
        <Skills data={data} isLoggedIn={!!user} onUpdate={handleUpdateData} />
        <Projects data={data} isLoggedIn={!!user} onUpdate={handleUpdateData} />
        <Footer data={data} isLoggedIn={!!user} onUpdate={handleUpdateData} />
      </div>
    </>
  );
};

export default App;
