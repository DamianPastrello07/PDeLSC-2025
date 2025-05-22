// Arrays iniciales
let letras = ["A", "B", "C", "D", "E"];
let nombres = ["Juan", "Lucía", "Pedro"];
let elementos = ["Sol", "Luna", "Estrella", "Cometa"];

// Mostrar datos iniciales
actualizarTodos();

// Eventos
document.getElementById("btnLetras").addEventListener("click", () => {
  letras.splice(1, 2); // elimina 2 letras desde la posición 1
  actualizarResultado("resultadoLetras", "Letras", letras);
});

document.getElementById("btnInsertar").addEventListener("click", () => {
  nombres.splice(1, 0, "María"); // inserta "María" en la segunda posición sin borrar nada
  actualizarResultado("resultadoNombres", "Nombres", nombres);
});

document.getElementById("btnReemplazar").addEventListener("click", () => {
  elementos.splice(1, 2, "Planeta", "Satélite"); // reemplaza dos elementos desde la posición 1
  actualizarResultado("resultadoReemplazo", "Elementos", elementos);
});

// Funciones
function actualizarResultado(id, etiqueta, arreglo) {
  const div = document.getElementById(id);
  div.textContent = `${etiqueta}: ${arreglo.join(", ")}`;
}

function actualizarTodos() {
  actualizarResultado("resultadoLetras", "Letras", letras);
  actualizarResultado("resultadoNombres", "Nombres", nombres);
  actualizarResultado("resultadoReemplazo", "Elementos", elementos);
}
