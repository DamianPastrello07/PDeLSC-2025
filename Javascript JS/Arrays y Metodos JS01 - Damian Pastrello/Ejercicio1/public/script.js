// Arrays
let frutas = [];
let amigos = ["Brian", "Bobaldo"];
let numeros = [2, 8, 9];

// Función para mostrar resultados
function actualizarResultado() {
  const resultado = document.getElementById("resultado");
  resultado.textContent = `
Frutas: ${frutas.join(", ")}
Amigos: ${amigos.join(", ")}
Números: ${numeros.join(", ")}
  `;
}

// Eventos para formularios

// Agregar frutas
document.getElementById("formFrutas").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("inputFruta");
  frutas.push(input.value);
  input.value = "";
  actualizarResultado();
});

// Agregar amigos
document.getElementById("formAmigos").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("inputAmigo");
  amigos.push(input.value);
  input.value = "";
  actualizarResultado();
});

// Agregar números (solo si es mayor que el último)
document.getElementById("formNumeros").addEventListener("submit", (e) => {
  e.preventDefault();
  const input = document.getElementById("inputNumero");
  const nuevoNumero = parseInt(input.value);

 if (isNaN(nuevoNumero) || nuevoNumero < 0 || nuevoNumero > 100) {
  mostrarModal("El número debe estar entre 0 y 100.");
} else if (nuevoNumero > numeros[numeros.length - 1]) {
  numeros.push(nuevoNumero);
} else {
  mostrarModal(`El número debe ser mayor que ${numeros[numeros.length - 1]}`);
}

  input.value = "";
  actualizarResultado();
});

// Mostrar estado inicial
actualizarResultado();

function mostrarModal(mensaje) {
  const contenido = document.getElementById("modalMensajeContenido");
  contenido.textContent = mensaje;

  const modal = new bootstrap.Modal(document.getElementById("modalMensaje"));
  modal.show();
}
