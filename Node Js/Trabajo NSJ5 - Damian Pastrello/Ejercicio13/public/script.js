// Arrays para almacenar los datos
const listaNumeros = [];
const listaPalabras = [];
const listaPersonas = [];

// Agregar número
document.getElementById("formNumeros").addEventListener("submit", e => {
  e.preventDefault();
  const numero = parseFloat(document.getElementById("inputNumero").value);
  if (!isNaN(numero)) {
    listaNumeros.push(numero);
    document.getElementById("inputNumero").value = "";
  }
});

// Ordenar números de menor a mayor
document.getElementById("btnOrdenarNumeros").addEventListener("click", () => {
  const ordenados = [...listaNumeros].sort((a, b) => a - b);
  document.getElementById("resultadoNumeros").textContent = `Números ordenados: ${ordenados.join(", ")}`;
});

// Agregar palabra
document.getElementById("formPalabras").addEventListener("submit", e => {
  e.preventDefault();
  const palabra = document.getElementById("inputPalabra").value.trim();
  if (palabra) {
    listaPalabras.push(palabra);
    document.getElementById("inputPalabra").value = "";
  }
});

// Ordenar palabras alfabéticamente
document.getElementById("btnOrdenarPalabras").addEventListener("click", () => {
  const ordenadas = [...listaPalabras].sort((a, b) => a.localeCompare(b));
  document.getElementById("resultadoPalabras").textContent = `Palabras ordenadas: ${ordenadas.join(", ")}`;
});

// Agregar persona
document.getElementById("formPersonas").addEventListener("submit", e => {
  e.preventDefault();
  const nombre = document.getElementById("inputNombre").value.trim();
  const edad = parseInt(document.getElementById("inputEdad").value);
  if (nombre && !isNaN(edad)) {
    listaPersonas.push({ nombre, edad });
    document.getElementById("inputNombre").value = "";
    document.getElementById("inputEdad").value = "";
  }
});

// Ordenar personas por edad (ascendente)
document.getElementById("btnOrdenarPersonas").addEventListener("click", () => {
  const ordenadas = [...listaPersonas].sort((a, b) => a.edad - b.edad);
  const resultadoHTML = ordenadas.map(p => `${p.nombre} (${p.edad} años)`).join("<br>");
  document.getElementById("resultadoPersonas").innerHTML = resultadoHTML;
});
