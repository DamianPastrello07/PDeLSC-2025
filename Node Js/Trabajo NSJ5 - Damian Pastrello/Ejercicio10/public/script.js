// Arreglos para almacenar los datos
const numerosTriple = [];
const nombresMayus = [];
const preciosConIVA = [];

// === Triplicar números ===
document.getElementById("formTriple").addEventListener("submit", function(e) {
  e.preventDefault();
  const numero = parseFloat(document.getElementById("inputTriple").value);
  if (!isNaN(numero)) {
    numerosTriple.push(numero);
    document.getElementById("inputTriple").value = '';
  }
});

document.getElementById("btnVerTriple").addEventListener("click", () => {
  const lista = document.getElementById("listaTriple");
  const resultado = numerosTriple.map(n => n * 3);
  lista.innerHTML = resultado.map(n => `<li>${n}</li>`).join('');
});

// === Convertir nombres a mayúsculas ===
document.getElementById("formNombres").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("inputNombre").value.trim();
  if (nombre) {
    nombresMayus.push(nombre);
    document.getElementById("inputNombre").value = '';
  }
});

document.getElementById("btnVerNombres").addEventListener("click", () => {
  const lista = document.getElementById("listaNombres");
  const resultado = nombresMayus.map(n => n.toUpperCase());
  lista.innerHTML = resultado.map(n => `<li>${n}</li>`).join('');
});

// === Calcular precios con IVA ===
document.getElementById("formPrecios").addEventListener("submit", function(e) {
  e.preventDefault();
  const precio = parseFloat(document.getElementById("inputPrecio").value);
  if (!isNaN(precio)) {
    preciosConIVA.push(precio);
    document.getElementById("inputPrecio").value = '';
  }
});

document.getElementById("btnVerIVA").addEventListener("click", () => {
  const lista = document.getElementById("listaIVA");
  const resultado = preciosConIVA.map(p => (p * 1.21).toFixed(2));
  lista.innerHTML = resultado.map(p => `<li>$${p}</li>`).join('');
});
