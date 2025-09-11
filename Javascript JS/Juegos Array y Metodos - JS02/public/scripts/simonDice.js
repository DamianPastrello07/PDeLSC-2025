// Variables globales para almacenar la secuencia de movimientos y la cantidad total
let moves, totalMoves;

// Función para iluminar una celda (posición) por un corto período de tiempo
function illuminate(cellPos, time) {
    setTimeout(() => {
        // Agrega la clase 'active' para iluminar la celda
        document.querySelector('.cell[pos="' + cellPos + '"]').classList.add('active');
        setTimeout(() => {
            // La remueve después de 300ms para apagar la celda
            document.querySelector('.cell[pos="' + cellPos + '"]').classList.remove('active');
        }, 300 );
    }, time );
}

// Función recursiva para generar una secuencia de movimientos aleatorios
function setMoves(current) {
    // Agrega un número aleatorio entre 1 y 4 (inclusive)
    moves.push(Math.floor(Math.random() * 4) + 1);
    // Si no se ha llegado al total de movimientos, continúa agregando
    if (current < totalMoves) {
        setMoves(++current);
    }
}

// Inicia el juego
function startGame() {
    moves = [];               // Reinicia los movimientos
    totalMoves = 2;           // Empieza con 2 movimientos
    document.querySelector('#start').style.display = 'none';  // Oculta el botón de inicio
    document.querySelector('#message').style.display = 'block';  // Muestra el mensaje
    sequence();               // Llama a la secuencia inicial
}

// Muestra la secuencia generada por el sistema
function sequence() {
    moves = [];              // Reinicia el arreglo de movimientos
    setMoves(1);             // Genera la secuencia
    document.querySelector('#message').innerHTML = 'Simon Dice';  // Mensaje de Simon
    document.querySelector('#message').style.color = 'black';

    // Ilumina cada celda en secuencia con un retraso entre ellas
    for (let i = 0; i < moves.length; i++) {
        illuminate(moves[i], 600 * i);  // 600ms de separación entre cada movimiento
    }

    // Luego de mostrar toda la secuencia, cambia el mensaje
    setTimeout(() => {
        document.querySelector('#message').innerHTML = 'Replica La Secuencia';
    }, 600 * moves.length);
}

// Maneja el clic del jugador sobre una celda
function cellClick(e) {
    let cellPos = e.target.getAttribute('pos');  // Obtiene la posición clickeada
    illuminate(cellPos, 0);                      // La ilumina inmediatamente

    // Si hay una secuencia por seguir
    if (moves && moves.length) {
        // Verifica si el clic coincide con el primer valor de la secuencia
        if (moves[0] == cellPos) {
            moves.shift();  // Elimina el valor acertado

            // Si ya no quedan más movimientos, se avanza al siguiente nivel
            if (!moves.length) {
                totalMoves++;  // Aumenta la dificultad
                setTimeout(() => {
                    sequence();  // Muestra nueva secuencia
                }, 1000);
            }
        } else {
            // Si el jugador se equivoca, muestra mensaje de pérdida
            document.querySelector('#message').innerHTML = 'Perdiste';
            document.querySelector('#message').style.color = 'black';

            // Después de un segundo, reinicia la interfaz
            setTimeout(() => {
                document.querySelector('#start').style.display = 'block';
                document.querySelector('#message').style.display = 'none';
            }, 1000);
        }
    }
}

// Asocia la función de iniciar el juego al botón
document.querySelector('#start').addEventListener('click', startGame);

// Obtiene todas las celdas del juego
let cells = Array.from(document.getElementsByClassName('cell'));

// Asocia el evento de clic a cada celda
cells.forEach(cell => {
    cell.addEventListener('click', cellClick);
});