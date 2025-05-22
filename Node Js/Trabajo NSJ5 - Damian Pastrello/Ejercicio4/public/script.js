// Arreglos iniciales
let numeros = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
let mensajesChat = ["Hola", "Buen dia", "¿Como andas?", "Yo bien, ¿vos?", "Todo tranqui, aca me ando", "Me alegro" ];
let colaClientes = ["Cliente 1", "Cliente 2", "Cliente 3"];

// Mostrar estado inicial
actualizarTodos();

// Botones
document.getElementById("btnNumero").addEventListener("click", () => {
  numeros.shift();
  actualizarResultado("resultadoNumeros", "Números", numeros);
});

document.getElementById("btnChat").addEventListener("click", () => {
  mensajesChat.shift();
  actualizarResultado("resultadoChat", "Mensajes", mensajesChat);
});

document.getElementById("btnCola").addEventListener("click", () => {
  let atendido = colaClientes.shift();
  let mensaje = atendido ? `${atendido} ha sido atendido.` : "No hay más clientes en espera.";
  actualizarResultado("resultadoCola", mensaje, colaClientes);
});

// Funciones
function actualizarResultado(id, etiqueta, arreglo) {
  const div = document.getElementById(id);
  div.textContent = `${etiqueta}: ${arreglo.length ? arreglo.join(", ") : "(vacío)"}`;
}

function actualizarTodos() {
  actualizarResultado("resultadoNumeros", "Números", numeros);
  actualizarResultado("resultadoChat", "Mensajes", mensajesChat);
  actualizarResultado("resultadoCola", "Clientes en espera", colaClientes);
}
