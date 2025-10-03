import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Importar las imágenes correctamente
import avionAliado from "../../assets/avion_aliado.png";
import avionEnemigo from "../../assets/avion_enemigo.png";
import avionEnemigoPequeñoIzq from "../../assets/avion_bombarderoizq.png";
import avionEnemigoPequeñoDer from "../../assets/avion_bombarderoder.png";
import avionEnemigoGrande from "../../assets/avion_grande.png";

export default function Game1942() {
  const canvasRef = useRef(null);
    const navigate = useNavigate();
  // Estado React (UI)
  const [score, setScore] = useState(0);
  const [mute, setMute] = useState(false);
  const [restartLabel, setRestartLabel] = useState("Iniciar");
  const [instructions, setInstructions] = useState(
    "Controles: ← → ↑ ↓ para mover, Espacio para disparar. Evitá los enemigos y sus balas."
  );
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0);
  const [levelMessage, setLevelMessage] = useState("");

  // Estado motor
  const gameState = useRef("menu");
  const scoreRef = useRef(0);
  const levelRef = useRef(1);
  const levelTimeRef = useRef(0);
  const levelStartTimeRef = useRef(0);

  // Ref para poder llamar startGame desde el botón
  const startGameRef = useRef(null);

  // Referencias para los sprites
  const playerSpriteRef = useRef(null);
  const enemyNormalSpriteRef = useRef(null);
  const enemySmallLeftSpriteRef = useRef(null);
  const enemySmallRightSpriteRef = useRef(null);
  const enemyBigSpriteRef = useRef(null);

  // Cargar assets al montar el componente
  useEffect(() => {
    const loadAssets = async () => {
      try {
        const playerSprite = new Image();
        const enemyNormalSprite = new Image();
        const enemySmallLeftSprite = new Image();
        const enemySmallRightSprite = new Image();
        const enemyBigSprite = new Image();
        
        // Crear promesas para esperar a que las imágenes se carguen
        const playerLoad = new Promise((resolve, reject) => {
          playerSprite.onload = resolve;
          playerSprite.onerror = reject;
          playerSprite.src = avionAliado;
        });
        
        const enemyNormalLoad = new Promise((resolve, reject) => {
          enemyNormalSprite.onload = resolve;
          enemyNormalSprite.onerror = reject;
          enemyNormalSprite.src = avionEnemigo;
        });
        
        const enemySmallLeftLoad = new Promise((resolve, reject) => {
          enemySmallLeftSprite.onload = resolve;
          enemySmallLeftSprite.onerror = reject;
          enemySmallLeftSprite.src = avionEnemigoPequeñoIzq;
        });
        
        const enemySmallRightLoad = new Promise((resolve, reject) => {
          enemySmallRightSprite.onload = resolve;
          enemySmallRightSprite.onerror = reject;
          enemySmallRightSprite.src = avionEnemigoPequeñoDer;
        });
        
        const enemyBigLoad = new Promise((resolve, reject) => {
          enemyBigSprite.onload = resolve;
          enemyBigSprite.onerror = reject;
          enemyBigSprite.src = avionEnemigoGrande;
        });
        
        await Promise.all([playerLoad, enemyNormalLoad, enemySmallLeftLoad, enemySmallRightLoad, enemyBigLoad]);
        
        playerSpriteRef.current = playerSprite;
        enemyNormalSpriteRef.current = enemyNormalSprite;
        enemySmallLeftSpriteRef.current = enemySmallLeftSprite;
        enemySmallRightSpriteRef.current = enemySmallRightSprite;
        enemyBigSpriteRef.current = enemyBigSprite;
        setAssetsLoaded(true);
        
      } catch (error) {
        console.error("Error cargando sprites:", error);
        // Fallback a sprites embebidos si los PNG no cargan
        const playerSprite = new Image();
        const enemyNormalSprite = new Image();
        const enemySmallLeftSprite = new Image();
        const enemySmallRightSprite = new Image();
        const enemyBigSprite = new Image();
        
        playerSprite.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiBmaWxsPSIjMDczMDQ4Ii8+CjxwYXRoIGQ9Ik0xNiA0TDI0IDEyTDIwIDI0SDEyTDEyIDE2TDE2IDRaIiBmaWxsPSIjZDNlOWZmIi8+CjxjaXJjbGUgY3g9IjE2IiBjeT0iMTIiIHI9IjQiIGZpbGw9IiMwYTNmNTgiLz4KPC9zdmc+";
        enemyNormalSprite.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzYiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjM2IiBoZWlnaHQ9IjM2IiBmaWxsPSIjZmY1ZDVkIi8+CjxwYXRoIGQ9Ik0xOCA2TDI4IDE0TDI0IDI4SDEyTDEyIDE4TDE4IDZaIiBmaWxsPSIjZmY5ZjlmIi8+CjxyZWN0IHg9IjEyIiB5PSIxNiIgd2lkdGg9IjEyIiBoZWlnaHQ9IjQiIGZpbGw9IiMyYjFjMWMiLz4KPC9zdmc+";
        enemySmallLeftSprite.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI4IiBoZWlnaHQ9IjI4IiBmaWxsPSIjZmZjYzAwIi8+CjxwYXRoIGQ9Ik0xNCAyTDIyIDEwTDE4IDIySDEwTDEwIDE0TDE0IDJaIiBmaWxsPSIjZmY5OTAwIi8+CjxyZWN0IHg9IjEwIiB5PSIxNCIgd2lkdGg9IjgiIGhlaWdodD0iMyIgZmlsbD0iIzJiMWMxYyIvPgo8L3N2Zz4=";
        enemySmallRightSprite.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjI4IiBoZWlnaHQ9IjI4IiBmaWxsPSIjZmZjYzAwIi8+CjxwYXRoIGQ9Ik0xNCAyTDIyIDEwTDE4IDIySDEwTDEwIDE0TDE0IDJaIiBmaWxsPSIjZmY5OTAwIi8+CjxyZWN0IHg9IjEwIiB5PSIxNCIgd2lkdGg9IjgiIGhlaWdodD0iMyIgZmlsbD0iIzJiMWMxYyIvPgo8L3N2Zz4=";
        enemyBigSprite.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjZmYzMzMzIi8+CjxwYXRoIGQ9Ik0zMiA0TDU2IDI0TDQ4IDU2SDE2TDE2IDMyTDMyIDRaIiBmaWxsPSIjY2MwMDAwIi8+CjxyZWN0IHg9IjE2IiB5PSIzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjYiIGZpbGw9IiMyYjFjMWMiLz4KPC9zdmc+";
        
        playerSpriteRef.current = playerSprite;
        enemyNormalSpriteRef.current = enemyNormalSprite;
        enemySmallLeftSpriteRef.current = enemySmallLeftSprite;
        enemySmallRightSpriteRef.current = enemySmallRightSprite;
        enemyBigSpriteRef.current = enemyBigSprite;
        setAssetsLoaded(true);
      }
    };
    
    loadAssets();
  }, []);

  useEffect(() => {
    if (!assetsLoaded) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    // Canvas responsive
    const updateCanvasSize = () => {
      const maxWidth = Math.min(800, window.innerWidth - 40);
      const maxHeight = Math.min(900, window.innerHeight - 200);
      const aspectRatio = 640 / 480;
      
      let width = maxWidth;
      let height = width / aspectRatio;
      
      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }
      
      canvas.width = width;
      canvas.height = height;
    };
    
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    let W = canvas.width, H = canvas.height;
    let keys = {};
    let bullets = [];
    let enemies = [];
    let enemyBullets = [];
    let spawnTimer = 0;
    let bgY = 0;
    let levelMessageTimer = 0;

    // Avión más grande
    const player = { x: W / 2, y: H - 100, w: 48, h: 48, speed: 5, cooldown: 0, lives: 3 };

    // Tiempos por nivel (en segundos)
    const levelTimes = {
      1: 20,
      2: 25,  
      3: 40,
      infinity: Infinity
    };

    function reset() {
      scoreRef.current = 0;
      setScore(0);
      levelRef.current = 1;
      setLevel(1);
      bullets = [];
      enemies = [];
      enemyBullets = [];
      spawnTimer = 0;
      player.x = W / 2;
      player.y = H - 100;
      player.lives = 3;
      player.cooldown = 0;
      levelTimeRef.current = levelTimes[1];
      setTimeLeft(levelTimes[1]);
      levelStartTimeRef.current = Date.now();
      levelMessageTimer = 0;
      setLevelMessage("");
    }

    function startGame() {
      reset();
      gameState.current = "playing";
      setRestartLabel("Reiniciar");
      setInstructions("Controles: ← → ↑ ↓ para mover, Espacio para disparar.");
      showLevelMessage(`Nivel ${levelRef.current} - Sobrevive ${levelTimeRef.current}s`);
      requestAnimationFrame(loop);
    }
    
    startGameRef.current = startGame;

    function nextLevel() {
      if (levelRef.current < 3) {
        levelRef.current++;
        setLevel(levelRef.current);
        levelTimeRef.current = levelTimes[levelRef.current];
        setTimeLeft(levelTimeRef.current);
        levelStartTimeRef.current = Date.now();
        
        // Limpiar enemigos y balas al cambiar de nivel
        enemies = [];
        enemyBullets = [];
        
        showLevelMessage(`Nivel ${levelRef.current} - Sobrevive ${levelTimeRef.current}s`);
      } else {
        levelRef.current = "infinity";
        setLevel("∞");
        levelTimeRef.current = Infinity;
        setTimeLeft(0);
        showLevelMessage("¡Modo Infinito!");
      }
    }

    function showLevelMessage(message) {
      setLevelMessage(message);
      levelMessageTimer = 180;
    }

    function endGame() {
      gameState.current = "gameover";
      setInstructions("Game Over. Presioná Reiniciar o Space.");
    }

    function loop() {
      update();
      draw();
      if (gameState.current === "playing") requestAnimationFrame(loop);
    }

    function update() {
      W = canvas.width;
      H = canvas.height;
      
      bgY += 1.2;
      if (bgY > H) bgY = 0;

      // Actualizar tiempo restante
      if (levelRef.current !== "infinity") {
        const elapsed = Math.floor((Date.now() - levelStartTimeRef.current) / 1000);
        const remaining = Math.max(0, levelTimeRef.current - elapsed);
        setTimeLeft(remaining);
        
        if (remaining <= 0) {
          nextLevel();
        }
      }

      // Actualizar mensaje de nivel
      if (levelMessageTimer > 0) {
        levelMessageTimer--;
        if (levelMessageTimer === 0) {
          setLevelMessage("");
        }
      }

      // Movimiento del jugador
      if (keys["ArrowLeft"]) player.x -= player.speed;
      if (keys["ArrowRight"]) player.x += player.speed;
      if (keys["ArrowUp"]) player.y -= player.speed;
      if (keys["ArrowDown"]) player.y += player.speed;
      player.x = Math.max(12, Math.min(W - player.w - 12, player.x));
      player.y = Math.max(12, Math.min(H - player.h - 12, player.y));

      // Disparos del jugador
      if (player.cooldown > 0) player.cooldown--;
      if (keys["Space"] && player.cooldown === 0) {
        bullets.push({ x: player.x + player.w / 2 - 4, y: player.y - 10, w: 8, h: 16, speed: 10 });
        player.cooldown = 10;
        if (!mute) playBeep(880, 0.05);
      }

      // Actualizar balas del jugador
      bullets = bullets.filter(b => b.y > -20);
      bullets.forEach(b => b.y -= b.speed);

      // Generar enemigos (menos frecuencia)
      spawnTimer--;
      if (spawnTimer <= 0) {
        spawnWave();
        spawnTimer = getSpawnInterval();
      }

      // Actualizar enemigos
      enemies.forEach((e, i) => {
        // Comportamiento diferente según tipo
        if (e.type === "normal") {
          e.y += e.speed;
          e.x += Math.sin((performance.now() / 1000) + i) * 0.8;
        } else if (e.type === "small") {
          // Pequeños: solo movimiento horizontal rápido, no bajan
          e.x += e.direction * e.speed;
          
          // Cambiar dirección si llegan al borde
          if (e.x <= 0) {
            e.direction = 1; // Cambiar a derecha
            e.sprite = enemySmallRightSpriteRef.current;
          } else if (e.x >= W - e.w) {
            e.direction = -1; // Cambiar a izquierda
            e.sprite = enemySmallLeftSpriteRef.current;
          }
        } else if (e.type === "big") {
          e.y += e.speed;
          e.x += Math.sin((performance.now() / 500) + i) * 0.3;
        }
        
        // Disparos enemigos (más frecuencia)
        if (Math.random() < e.fireRate) {
          enemyBullets.push({ 
            x: e.x + e.w / 2 - 3, 
            y: e.y + e.h, 
            w: e.type === "big" ? 8 : 6, 
            h: e.type === "big" ? 14 : 10, 
            speed: e.type === "big" ? 3 : 5 
          });
        }
        
        // Eliminar enemigos que salgan de pantalla (CONDICIÓN CORREGIDA)
        if ((e.type === "normal" || e.type === "big") && e.y > H + 50) {
          enemies.splice(i, 1);
        } else if (e.type === "small" && (e.x < -100 || e.x > W + 100)) {
          // Solo eliminar pequeños cuando estén MUY lejos de la pantalla
          enemies.splice(i, 1);
        }
      });

      // Actualizar balas enemigas
      enemyBullets = enemyBullets.filter(b => b.y < H + 20);
      enemyBullets.forEach(b => b.y += b.speed);

      // Colisiones bala jugador -> enemigo
      for (let bi = bullets.length - 1; bi >= 0; bi--) {
        for (let ei = enemies.length - 1; ei >= 0; ei--) {
          if (rectOverlap(bullets[bi], enemies[ei])) {
            bullets.splice(bi, 1);
            enemies[ei].hp--;
            if (enemies[ei].hp <= 0) {
              scoreRef.current += enemies[ei].points;
              setScore(scoreRef.current);
              enemies.splice(ei, 1);
              if (!mute) playBeep(440, 0.07);
            }
            break;
          }
        }
      }

      // Colisiones bala enemiga -> jugador
      for (let bi = enemyBullets.length - 1; bi >= 0; bi--) {
        if (rectOverlap(enemyBullets[bi], player)) {
          enemyBullets.splice(bi, 1);
          player.lives--;
          if (!mute) playBeep(220, 0.12);
          if (player.lives <= 0) endGame();
        }
      }

      // Colisiones enemigo -> jugador
      for (let ei = enemies.length - 1; ei >= 0; ei--) {
        if (rectOverlap(enemies[ei], player)) {
          enemies.splice(ei, 1);
          player.lives--;
          if (!mute) playBeep(220, 0.12);
          if (player.lives <= 0) endGame();
        }
      }
    }

    function getSpawnInterval() {
      const baseInterval = 45;
      if (levelRef.current === 1) return baseInterval + Math.floor(Math.random() * 60);
      if (levelRef.current === 2) return baseInterval - 10 + Math.floor(Math.random() * 50);
      if (levelRef.current === 3) return baseInterval - 20 + Math.floor(Math.random() * 40);
      return baseInterval - 30 + Math.floor(Math.random() * 30);
    }

    function spawnWave() {
      const currentLevel = levelRef.current;
      
      console.log("Spawneando oleada - Nivel:", currentLevel); // DEBUG
      
      // Enemigos normales (siempre aparecen)
      const normalCount = currentLevel === 1 ? 1 + Math.floor(Math.random() * 2) :
                         currentLevel === 2 ? 1 + Math.floor(Math.random() * 3) :
                         2 + Math.floor(Math.random() * 3);
      
      for (let i = 0; i < normalCount; i++) {
        spawnEnemy("normal");
      }

      // Enemigos pequeños (nivel 2+) - PROBABILIDAD AUMENTADA
      if (currentLevel >= 2 && Math.random() < 0.6) { // 60% de probabilidad
        const smallCount = 1 + Math.floor(Math.random() * 2); // 1-2 pequeños
        for (let i = 0; i < smallCount; i++) {
          spawnEnemy("small");
        }
        console.log("Spawneados", smallCount, "enemigos pequeños"); // DEBUG
      }

      // Enemigos grandes (nivel 3+)
      if (currentLevel >= 3 && Math.random() < 0.15) {
        spawnEnemy("big");
      }
    }

    function spawnEnemy(type) {
      let enemyConfig;
      
      switch(type) {
        case "normal":
          enemyConfig = { 
            w: 40, h: 40, hp: 1, speed: 1.5, points: 50, 
            fireRate: 0.015,
            type: "normal",
            sprite: enemyNormalSpriteRef.current
          };
          break;
        case "small":
          const direction = Math.random() < 0.5 ? -1 : 1;
          enemyConfig = { 
            w: 32, h: 32, hp: 1, speed: 3.5, points: 80,
            fireRate: 0.025,
            type: "small",
            direction: direction,
            sprite: direction > 0 ? enemySmallRightSpriteRef.current : enemySmallLeftSpriteRef.current
          };
          break;
        case "big":
          enemyConfig = { 
            w: 64, h: 64, hp: 10, speed: 0.6, points: 300, 
            fireRate: 0.008,
            type: "big",
            sprite: enemyBigSpriteRef.current
          };
          break;
      }

      let x, y;
      
      if (type === "small") {
        // Pequeños aparecen desde los laterales a altura media
        x = enemyConfig.direction > 0 ? -enemyConfig.w : W;
        y = H/3 + Math.random() * (H/3);
        console.log("Spawneando pequeño en x:", x, "y:", y, "dirección:", enemyConfig.direction); // DEBUG
      } else {
        // Normales y grandes aparecen desde arriba
        x = 40 + Math.random() * (W - 80);
        y = -60 - Math.random() * 40;
      }

      enemies.push({ x, y, ...enemyConfig });
      console.log("Enemigo spawneado - Tipo:", type, "Total enemigos:", enemies.length); // DEBUG
    }

    function rectOverlap(a, b) {
      return a.x < b.x + b.w && a.x + (a.w || 10) > b.x && a.y < b.y + b.h && a.y + (a.h || 10) > b.y;
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      // Fondo
      ctx.save();
      ctx.fillStyle = "#07202b";
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 0.12;
      for (let i = 0; i < 30; i++) {
        const sx = (i * 73 + (bgY * 0.5)) % W;
        ctx.fillRect(sx, (i * 37 + bgY) % H, 6, 2);
      }
      ctx.globalAlpha = 1;
      ctx.restore();

      // Dibujar jugador
      if (playerSpriteRef.current && playerSpriteRef.current.complete) {
        ctx.drawImage(playerSpriteRef.current, player.x, player.y, player.w, player.h);
      } else {
        drawPlane(player.x, player.y, player.w, player.h);
      }

      // Dibujar balas del jugador
      bullets.forEach(b => roundRect(ctx, b.x, b.y, b.w, b.h));
      
      // Dibujar enemigos con sus sprites específicos
      enemies.forEach(e => {
        if (e.sprite && e.sprite.complete) {
          ctx.drawImage(e.sprite, e.x, e.y, e.w, e.h);
          
          // Barra de vida para enemigos grandes
          if (e.type === "big" && e.hp < 10) {
            const barWidth = e.w * 0.8;
            const barHeight = 4;
            const barX = e.x + (e.w - barWidth) / 2;
            const barY = e.y - 8;
            
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(barX, barY, barWidth, barHeight);
            ctx.fillStyle = "#00ff00";
            ctx.fillRect(barX, barY, barWidth * (e.hp / 10), barHeight);
          }
        } else {
          drawEnemy(e);
        }
      });
      
      // Dibujar balas enemigas
      enemyBullets.forEach(b => {
        ctx.fillStyle = b.speed === 3 ? "#ff6666" : "#ffccaa";
        ctx.fillRect(b.x, b.y, b.w, b.h);
      });

      // UI
      ctx.fillStyle = "#fff";
      ctx.font = "14px monospace";
      ctx.fillText("Vidas: " + player.lives, 8, 18);
      ctx.fillText(`Nivel: ${levelRef.current === "infinity" ? "∞" : levelRef.current}`, 8, 36);
      
      if (levelRef.current !== "infinity") {
        ctx.fillText(`Tiempo: ${timeLeft}s`, 8, 54);
      }

      // Mensaje de nivel
      if (levelMessage) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
        ctx.fillRect(W/2 - 150, H/2 - 20, 300, 40);
        ctx.fillStyle = "#fff";
        ctx.font = "bold 18px monospace";
        ctx.textAlign = "center";
        ctx.fillText(levelMessage, W/2, H/2 + 5);
        ctx.textAlign = "left";
      }

      // Overlay de menú
      if (gameState.current === "menu") {
        ctx.fillStyle = "rgba(0,0,0,0.4)";
        ctx.fillRect(0, 0, W, H);
      }
    }

    function drawPlane(x, y, w, h) {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = "#d3e9ff";
      ctx.beginPath();
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w, h * 0.4);
      ctx.lineTo(w * 0.8, h);
      ctx.lineTo(0, h);
      ctx.lineTo(0, h * 0.4);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#0a3048";
      ctx.fillRect(w * 0.35, h * 0.15, w * 0.3, h * 0.22);
      ctx.restore();
    }

    function drawEnemy(e) {
      ctx.save();
      ctx.translate(e.x, e.y);
      
      let color1, color2;
      if (e.type === "small") {
        color1 = "#ffcc00"; color2 = "#ff9900";
      } else if (e.type === "big") {
        color1 = "#ff3333"; color2 = "#cc0000";
      } else {
        color1 = "#ff9f9f"; color2 = "#ff5d5d";
      }
      
      const grad = ctx.createLinearGradient(0, 0, e.w, e.h);
      grad.addColorStop(0, color1);
      grad.addColorStop(1, color2);
      ctx.fillStyle = grad;
      roundRect(ctx, 0, 0, e.w, e.h, 6);
      ctx.fillStyle = "#2b1c1c";
      ctx.fillRect(e.w * 0.2, e.h * 0.2, e.w * 0.6, Math.max(2, e.h * 0.12));
      ctx.restore();
    }

    function roundRect(ctx, x, y, w, h, r = 3) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
      ctx.fillStyle = "#ffe";
      ctx.fill();
    }

    function playBeep(freq, duration) {
      try {
        const ac = window.__ac || (window.__ac = new (window.AudioContext || window.webkitAudioContext)());
        const o = ac.createOscillator();
        const g = ac.createGain();
        o.type = "sine";
        o.frequency.value = freq;
        o.connect(g); g.connect(ac.destination);
        g.gain.value = 0.06;
        o.start();
        g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + duration);
        o.stop(ac.currentTime + duration + 0.02);
      } catch (e) { }
    }

    const handleKeyDown = (e) => {
      keys[e.code] = true;
      if (gameState.current === "menu" && e.code === "Space") startGame();
    };
    const handleKeyUp = (e) => { keys[e.code] = false; };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [mute, assetsLoaded]);

  if (!assetsLoaded) {
    return (
      <div className="container text-center py-4">
        <h1>1942 — Mini Clone con Sprites</h1>
        <p>Cargando recursos...</p>
      </div>
    );
  }

  return (
    <div className="container text-center py-4">
      <h1>1942 — Mini Clone con Sprites</h1>
      {gameState.current !== "playing" && (
        <div className="mb-3">
          <button
            className="btn btn-primary me-2"
            onClick={() => startGameRef.current && startGameRef.current()}
          >
            {restartLabel}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => setMute(m => !m)}
          >
            {mute ? "🔇" : "🔊"}
          </button>
             <button
                className="btn btn-outline-secondary ms-2"
                onClick={() => navigate("/")}
                >
                Volver
            </button>

          <p className="small mt-2">{instructions}</p>
        </div>
      )}
      <div className="fw-bold mb-2">Puntaje: {score} | Nivel: {level} | Tiempo: {timeLeft}s</div>
      {levelMessage && (
        <div className="alert alert-info mb-2">
          {levelMessage}
        </div>
      )}
      <canvas
        ref={canvasRef}
        width="640"
        height="900"
        className="border border-3 rounded shadow"
        style={{ 
          background: "linear-gradient(#0b2b3a,#07202b)",
          maxWidth: "100%",
          height: "auto"
        }}
      />
    </div>
  );
}