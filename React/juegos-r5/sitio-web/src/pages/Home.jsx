import '../App.css';
import imagen1942 from '../assets/1942.jpg'; 
import imagenSpaceInvader from '../assets/spaceinvader.jpg';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import Leaderboard from '../components/Leaderboard';
import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const registerRef = useRef(null);
  const loginRef = useRef(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Verificar si hay sesión guardada
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleGameClick = (path) => {
    if (!user) {
      alert("Debes iniciar sesión para jugar");
      return;
    }
    navigate(path);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1 className="mb-5 text-dark fw-bold">Elige tu juego</h1>

      <div className="row justify-content-center align-items-start g-4 w-100">

        {/* Leaderboard izquierda: Space Invader */}
        <div className="col-12 col-md-3 d-flex justify-content-center">
          <Leaderboard game="space_invaders" top={5} />
        </div>

        {/* Cartas de juegos */}
        <div className="col-12 col-md-6 d-flex justify-content-center flex-wrap gap-4">
          {/* Space Invader */}
          <div 
            className="card game-card square-card rounded-4"
            style={{ cursor: "pointer" }}
            onClick={() => handleGameClick("/spaceInvaders")}
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <img 
                src={imagenSpaceInvader}
                alt="Space Invader" 
                className="game-img"
              />
              <h4 className="card-title fw-bold mt-3">Space Invader</h4>
            </div>
          </div>

          {/* 1942 */}
          <div 
            className="card game-card square-card rounded-4"
            style={{ cursor: "pointer" }}
            onClick={() => handleGameClick("/game1942")}
          >
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <img 
                src={imagen1942} 
                alt="1942" 
                className="game-img"
              />
              <h4 className="card-title fw-bold mt-3">1942</h4>
            </div>
          </div>
        </div>

        {/* Leaderboard derecha: 1942 */}
        <div className="col-12 col-md-3 d-flex justify-content-center">
          <Leaderboard game="1942" top={5} />
        </div>

      </div>

      {/* Zona inferior: botones o bienvenida */}
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mt-4 gap-3">
        {user ? (
          <>
            <h4 className="fw-bold text-success">👋 Bienvenido, {user.nombre}</h4>
            <button className="btn btn-danger btn-lg" onClick={handleLogout}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <button 
              className="btn btn-primary btn-lg"
              onClick={() => loginRef.current.show()}
            >
              Iniciar Sesión
            </button>
            <button 
              className="btn btn-success btn-lg"
              onClick={() => registerRef.current.show()}
            >
              Registrarse
            </button>
          </>
        )}
      </div>

      {/* Modales */}
      <LoginModal ref={loginRef} />
      <RegisterModal ref={registerRef} />
    </div>
  );
}

export default Home;
