//Caracteres para el tablero
const x = "✖";
const o = "〇";

//Elementos de la página
const cuadrados = document.querySelectorAll(".cuadrado");
const modal = document.querySelector("dialog");
const textoModal = modal.querySelector("h2");
let estadoJuego = "P1" // P1 | P2 | PAUSA

cuadrados.forEach((cuadrado, posicion) =>{ //Para cada cuadrado se asigna un evento click
    cuadrado.addEventListener("click", ()=>{
        if(estadoJuego === "PAUSA") return;
        if(cuadrado.textContent !== "") return; //No permite sobreescribir una casilla
        cuadrado.textContent = estadoJuego === "P1" ? x : o; //Se coloca el simbolo de jugador actual
        estadoJuego = estadoJuego === "P1" ? "P2" : "P1"; // Se cambia de jugador
        const posicionGanadora = revisarSiHayGanador(); //Se llama una funcion que revisa si hubo empate o victoria
        console.log(typeof posicionGanadora)
        if(typeof posicionGanadora === "object") {// Hay victoria
            ganar(posicionGanadora)
            return
        };
        if (posicionGanadora === "empate"){ // Hay empate
            mostrarModal("Empate")
        }
    })
})
// El jugador cierra el modal
modal.querySelector("button").addEventListener("click", ()=>{
    cuadrados.forEach(cuadrado => {
        cuadrado.textContent = ""; // Quita el contenido de los cuadrados
        cuadrado.classList.toggle("ganador",false); // Quita la clase ganador
    });
    modal.close();
    estadoJuego = "P1"; // Restaura el turno del jugador 1
})
// Se transforma el tablero en un array con los simbolos X y O
function revisarSiHayGanador(){
    const tablero = Array.from(cuadrados).map(cuadrado => cuadrado.textContent);
    console.log(tablero)

    // Reviso filas
    for (let i = 0; i < 9; i+=3) {
        if(tablero[i] && tablero[i] === tablero[i+1] && tablero[i] === tablero[i+2]){
            return ([i,i+1,i+2]);
        }
    }

    // Reviso columnas
    for (let i = 0; i < 3; i++) {
        if(tablero[i] && tablero[i] === tablero[i+3] && tablero[i] === tablero[i+6]){
            return ([i,i+3,i+6]);
        }
    }

    // Reviso oblicuas
    if(tablero[0] && tablero[0] === tablero[4] && tablero[0] === tablero[8]) return [0,4,8];
    if(tablero[2] && tablero[2] === tablero[4] && tablero[2] === tablero[6]) return [2,4,6];

    //Reviso empate
    if(tablero.includes("")) return false;
    return "empate";
}

// Marco las posiciones ganadoras y muestro el modal de victoria
function ganar(posicionesGanadoras){
    console.log(posicionesGanadoras)
    posicionesGanadoras.forEach(posicion => cuadrados[posicion].classList.toggle("ganador",true));
    mostrarModal("Ganador jugador " + (estadoJuego === "P1" ? "2" : "1"));
}
// Muestra el modal
function mostrarModal(texto){
    textoModal.innerText = texto;
    modal.showModal();
    estadoJuego = "PAUSA";
}