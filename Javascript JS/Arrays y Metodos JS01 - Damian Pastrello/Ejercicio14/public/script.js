// Arrays donde se almacenan los datos ingresados
const listaLetras = [];
const listaNumeros = [];

// Maneja el formulario de letras
document.getElementById("formLetras").addEventListener("submit", e => {
  e.preventDefault();
  const letraIngresada = document.getElementById("inputLetra").value.trim();
  if (letraIngresada) {
    listaLetras.push(letraIngresada);
    document.getElementById("inputLetra").value = "";
  }
});

// Invertir la lista de letras
document.getElementById("btnInvertirLetras").addEventListener("click", () => {
  const letrasInvertidas = [...listaLetras].reverse();
  document.getElementById("resultadoLetras").textContent = `Lista invertida: ${letrasInvertidas.join(", ")}`;
});

// Maneja el formulario de números
document.getElementById("formNumeros").addEventListener("submit", e => {
  e.preventDefault();
  const numeroIngresado = parseFloat(document.getElementById("inputNumero").value);
  if (!isNaN(numeroIngresado)) {
    listaNumeros.push(numeroIngresado);
    document.getElementById("inputNumero").value = "";
  }
});

// Invertir la lista de números
document.getElementById("btnInvertirNumeros").addEventListener("click", () => {
  const numerosInvertidos = [...listaNumeros].reverse();
  document.getElementById("resultadoNumeros").textContent = `Lista invertida: ${numerosInvertidos.join(", ")}`;
});

// Invertir cualquier texto libre
document.getElementById("btnInvertirTexto").addEventListener("click", () => {
  const textoOriginal = document.getElementById("inputTexto").value;
  const textoInvertido = textoOriginal.split("").reverse().join("");
  document.getElementById("resultadoTexto").textContent = `Texto invertido: ${textoInvertido}`;
});
