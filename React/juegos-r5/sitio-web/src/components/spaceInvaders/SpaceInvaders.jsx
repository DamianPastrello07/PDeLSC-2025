// Importaciones de React y hooks necesarios
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Importación de imágenes y estilos
import naveJugador from "../../assets/shooter.png";
import alienImagen from "../../assets/invader1.png";
import explosionPNG from "../../assets/explosion.png";
import "./SpaceInvaders.css";
import Leaderboard from "../Leaderboard";

const SpaceInvaders = () => {

  // Referencia al canvas donde se dibuja el juego
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const [pausado, setPausado] = useState(false);

  const pausadoRef = useRef(pausado);
  pausadoRef.current = pausado;

  // Estado para reiniciar el juego al cambiar resetKey
  const [resetKey, setResetKey] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [finalScore, setFinalScore] = useState(0);

  // useEffect principal: inicializa y ejecuta el juego
  useEffect(() => {
    const tamañoCasilla = 24;
    const filas = 16;
    const columnas = 32;

    // Obtener referencia al canvas y su contexto 2D
    const canvas = canvasRef.current;
    canvas.width = tamañoCasilla * columnas;
    canvas.height = tamañoCasilla * filas;
    const ctx = canvas.getContext("2d");

    // Centro la posición de mi nave
    const nave = {
      x: (tamañoCasilla * columnas) / 2 - tamañoCasilla,
      y: tamañoCasilla * filas - tamañoCasilla * 2,
      ancho: tamañoCasilla * 2,
      alto: tamañoCasilla,
    };

    // Cargo la imagen de la nave y defino su velocidad
    const imgNave = new Image();
    imgNave.src = naveJugador;
    let naveCargada = false;
    imgNave.onload = () => (naveCargada = true);
    const velocidadNave = tamañoCasilla;

    // Definición de aliens, tamaño y posición
    let aliens = [];
    const anchoAlien = tamañoCasilla * 2;
    const altoAlien = tamañoCasilla;
    const posXAlien = tamañoCasilla;
    const posYAlien = tamañoCasilla;
    const imgAlien = new Image();
    imgAlien.src = alienImagen;
    let alienCargado = false;
    imgAlien.onload = () => (alienCargado = true);

    let filasAlien = 2;
    let columnasAlien = 6;
    let cantidadAliens = 0;
    let velocidadAlienX = 2;

    // Definición de balas y sus propiedades
    let balasJugador = [];
    let probabilidadDisparoEnemigo = 0.005; // movido aquí para modificar nivel 3
    const velocidadBalaJugador = -10;
    let balasEnemigas = [];
    const velocidadBalaEnemiga = 4;
    const maxBalasEnemigas = 5;

    // Definición de escudos y sus propiedades
    let escudos = [];
    const anchoEscudo = tamañoCasilla * 3;
    const altoEscudo = tamañoCasilla / 2;
    const saludEscudo = 8;
    const posYEscudo = nave.y - tamañoCasilla * 4;
    const coloresEscudo = [
      "green", "green",
      "yellow", "yellow",
      "orange", "orange",
      "red", "red",
    ];

    // Definición de explosiones y sus propiedades (cuadros y duración)
    const imgExplosion = new Image();
    imgExplosion.src = explosionPNG;
    let explosiones = [];
    const cuadrosExplosion = 6;
    const duracionCuadro = 5;

    // Variables de estado del juego
    let puntaje = 0;
    let vidas = 3;
    let nivel = 1;
    const maxNiveles = 3;
    let gameOverLocal = false;
    let cargandoNivel = false;
    let nivelSiguiente = nivel + 1;

    // Función para detectar colisiones entre dos objetos rectangulares
    const colision = (a, b) =>
      a.x < b.x + b.ancho &&
      a.x + a.ancho > b.x &&
      a.y < b.y + b.alto &&
      a.y + a.alto > b.y;

    // Crear aliens en matriz según filas y columnas
    const crearAliens = () => {
      aliens = Array.from({ length: columnasAlien }, (_, c) =>
        Array.from({ length: filasAlien }, (_, f) => ({
          x: posXAlien + c * anchoAlien,
          y: posYAlien + f * altoAlien,
          ancho: anchoAlien,
          alto: altoAlien,
          vivo: true,
        }))
      ).flat();
      cantidadAliens = aliens.length; // actualizar contador de aliens vivos
    };

    // Crear escudos en el canvas
    const crearEscudos = () => {
      escudos = Array.from({ length: 4 }, (_, i) => ({
        x: tamañoCasilla * 2 + i * (anchoEscudo + 4 * tamañoCasilla),
        y: posYEscudo,
        ancho: anchoEscudo,
        alto: altoEscudo,
        salud: saludEscudo,
      }));
    };

    // Dibujar explosiones activas en el canvas
    const dibujarExplosiones = () => {
      explosiones = explosiones.filter((exp) => {
        const anchoCuadro = imgExplosion.width / cuadrosExplosion;
        ctx.drawImage(
          imgExplosion,
          exp.frame * anchoCuadro,
          0,
          anchoCuadro,
          imgExplosion.height,
          exp.x,
          exp.y,
          exp.ancho,
          exp.alto
        );
        exp.contador++;
        if (exp.contador >= duracionCuadro) {
          exp.contador = 0;
          exp.frame++;
        }
        return exp.frame < cuadrosExplosion; // mantiene solo explosiones activas
      });
    };

    // Dibujar HUD: puntaje, vidas y nivel
    const dibujarHUD = () => {
      ctx.fillStyle = "#00ff00";
      ctx.font = `${Math.floor(canvas.height / 20)}px 'Press Start 2P', monospace`;
      ctx.textAlign = "left";
      ctx.textBaseline = "top";
      ctx.fillText(`Puntaje: ${puntaje}`, 10, 10);
      ctx.fillText(`Vidas: ${vidas}`, 10, 30);
      ctx.textAlign = "right";
      ctx.fillText(`Nivel: ${nivel}`, canvas.width - 10, 10);
    };

    // Mover balas y verificar colisiones
    const moverBalas = (balas, velocidad, validarImpacto) => {
      for (let bala of balas) {
        bala.y += velocidad;       // actualizar posición
        if (!bala.usada) validarImpacto(bala); // verificar impacto
        if (!bala.usada) ctx.fillRect(bala.x, bala.y, bala.ancho, bala.alto); // dibujar bala
      }
      return balas.filter((b) => !b.usada && b.y > 0 && b.y < canvas.height); // filtrar balas fuera del canvas
    };

    // Mover la nave según flechas
    const moverNave = (e) => {
      if (gameOverLocal || pausadoRef.current) return; // no mover si game over o pausado
      if (e.code === "ArrowLeft" && nave.x - velocidadNave >= 0)
        nave.x -= velocidadNave;
      else if (
        e.code === "ArrowRight" &&
        nave.x + velocidadNave + nave.ancho <= canvas.width
      )
        nave.x += velocidadNave;
    };

    // Disparo del jugador con recarga
    let tiempoUltimoDisparo = 0;
    const recargaDisparo = 300; 
    const dispararJugador = (e) => {
      if (gameOverLocal || pausadoRef.current) return;
      const ahora = Date.now();
      if (e.code === "Space" && ahora - tiempoUltimoDisparo > recargaDisparo) {
        balasJugador.push({
          x: nave.x + (nave.ancho * 15) / 32,
          y: nave.y,
          ancho: tamañoCasilla / 8,
          alto: tamañoCasilla / 2,
          usada: false,
        });
        tiempoUltimoDisparo = ahora;
      }
    };

    // Ciclo principal de actualización
    let animationId;
    const actualizar = () => {
      animationId = requestAnimationFrame(actualizar); // siguiente frame

      ctx.clearRect(0, 0, canvas.width, canvas.height); // limpiar canvas

      dibujarHUD();

      // Pausa
      if (pausadoRef.current && !gameOverLocal && !cargandoNivel) {
        ctx.fillStyle = "yellow";
        ctx.font = `${Math.floor(canvas.height / 20)}px 'Press Start 2P', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("PAUSA", canvas.width / 2, canvas.height / 2);
        return;
      }

      // Game over
      if (gameOverLocal) {
        ctx.fillStyle = "red";
        ctx.font = `${Math.floor(canvas.height / 20)}px 'Press Start 2P', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
        setFinalScore(puntaje);
        setGameOver(true);
        return;
      }

      // Cargando nivel
      if (cargandoNivel) {
        ctx.fillStyle = "white";
        ctx.font = `${Math.floor(canvas.height / 24)}px 'Press Start 2P', monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          `Cargando nivel ${nivelSiguiente}...`,
          canvas.width / 2,
          canvas.height / 2
        );
        return;
      }

      // Dibujar escudos
      escudos.forEach((escudo) => {
        if (escudo.salud > 0) {
          ctx.fillStyle = coloresEscudo[saludEscudo - escudo.salud];
          ctx.fillRect(escudo.x, escudo.y, escudo.ancho, escudo.alto);
        }
      });

      // Dibujar naves
      if (naveCargada)
        ctx.drawImage(imgNave, nave.x, nave.y, nave.ancho, nave.alto);

      // Dibujar aliens y disparos enemigos
      for (let alien of aliens) {
        if (!alien.vivo) continue;
        alien.x += velocidadAlienX;

        // Cambiar dirección si toca bordes
        if (alien.x + alien.ancho >= canvas.width || alien.x <= 0) {
          velocidadAlienX *= -1;
          alien.x += velocidadAlienX * 2;
          aliens.forEach((al) => (al.y += altoAlien)); // bajar alienes
        }

        if (colision(alien, nave)) gameOverLocal = true; // colisión nave-alien

        if (alienCargado)
          ctx.drawImage(imgAlien, alien.x, alien.y, alien.ancho, alien.alto);

        // Disparo de alien
        if (
          balasEnemigas.length < maxBalasEnemigas &&
          Math.random() < probabilidadDisparoEnemigo
        ) {
          balasEnemigas.push({
            x: alien.x + alien.ancho / 2,
            y: alien.y + alien.alto,
            ancho: 4,
            alto: 10,
            usada: false,
          });
        }
      }

      // Mover balas del jugador
      balasJugador = moverBalas(balasJugador, velocidadBalaJugador, (bala) => {
        for (let alien of aliens) {
          if (alien.vivo && colision(bala, alien)) {
            bala.usada = true;
            alien.vivo = false;
            cantidadAliens--;
            puntaje += 100;
            explosiones.push({
              x: alien.x,
              y: alien.y,
              ancho: alien.ancho,
              alto: alien.alto,
              frame: 0,
              contador: 0,
            });
          }
        }
      });

      // Mover las balas enemigas
      balasEnemigas = moverBalas(
        balasEnemigas,
        velocidadBalaEnemiga,
        (bala) => {
          for (let escudo of escudos) {
            if (escudo.salud > 0 && colision(bala, escudo)) {
              escudo.salud--;
              bala.usada = true;
              return;
            }
          }
          if (colision(bala, nave)) {
            bala.usada = true;
            vidas--;
            if (vidas <= 0) gameOverLocal = true;
          }
        }
      );

      dibujarExplosiones();

      // Gestionar los niveles, y ajustar dificultad del nivel 3
      if (cantidadAliens === 0 && !cargandoNivel) {
        if (nivel < maxNiveles) {
          cargandoNivel = true;
          nivelSiguiente = nivel + 1;

          setTimeout(() => {
            nivel++;
            filasAlien = Math.min(filasAlien + 1, filas - 4);
            columnasAlien = Math.min(columnasAlien + 2, columnas / 2 - 2);

            // Ajuste de dificultad nivel 3
            if (nivel === 3) {
              velocidadAlienX = 2.5; // aliens más lentos
              probabilidadDisparoEnemigo = 0.003; // menos disparos
            } else {
              velocidadAlienX += velocidadAlienX > 0 ? 0.5 : -0.5; // niveles 1 y 2
              probabilidadDisparoEnemigo = 0.005;
            }

            crearAliens();
            crearEscudos();
            balasJugador = [];
            balasEnemigas = [];
            cargandoNivel = false;
          }, 3000);

          return;
        } else {
          cancelAnimationFrame(animationId);
          ctx.fillStyle = "yellow";
          ctx.font = `${Math.floor(canvas.height / 24)}px 'Press Start 2P', monospace`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(
            "¡Felicidades! Ganaste el juego",
            canvas.width / 2,
            canvas.height / 2
          );
          setGameOver(true);
        }
      }
    };

    // Inicializar las funciones, detectar las teclas
    crearAliens();
    crearEscudos();
    actualizar();
    document.addEventListener("keydown", moverNave);
    document.addEventListener("keyup", dispararJugador);

    // Remover listeners y animación al desmontar
    return () => {
      document.removeEventListener("keydown", moverNave);
      document.removeEventListener("keyup", dispararJugador);
      cancelAnimationFrame(animationId);
    };
  }, [resetKey]);

   useEffect(() => {
    if (gameOver && finalScore > 0) {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) return;
      const user = JSON.parse(storedUser);

      fetch("/api/score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.nombre,
          game: "space_invaders",
          score: finalScore,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Puntaje guardado:", data);
        })
        .catch((err) => console.error("Error guardando puntaje:", err));
    }
  }, [gameOver, finalScore]);

  // Interfaz del usuario
  return (
    <div className="space-invaders-wrapper">
      <div className="game-header">
        <div className="game-controls">
          {!gameOver && (
            <button
              onClick={() => setPausado(!pausado)}
              className="game-button pause-button"
            >
              {pausado ? "Play" : "Pause"}
            </button>
          )}
            <button
            className="game-button"
            onClick={() => navigate("/")}
            >
            Volver
           </button>

          {gameOver && (
            <button
              onClick={() => {
                setGameOver(false);
                setFinalScore(0);
                setResetKey((prev) => prev + 1);
              }}
              className="game-button restart-button"
            >
              Reiniciar 🔄
            </button>
          )}
        </div>
      </div>

      <div className="canvas-container">
        <canvas ref={canvasRef} className="game-canvas" />
        <div className="col-12 col-md-3 d-flex flex-column justify-content-start align-items-center p-3">
          <Leaderboard
            game="space_invaders"
            top={10}
            title="Top 10 Space Invaders"
            refreshTrigger={gameOver} // 🔥 se refresca al terminar el juego
          />
        </div>
      </div>
    </div>
  );
};

export default SpaceInvaders;