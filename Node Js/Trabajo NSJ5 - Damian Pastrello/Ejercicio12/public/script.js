// Arreglos para almacenar valores ingresados
const numerosParaSumar = [];
const numerosParaMultiplicar = [];
const listaDePrecios = [];

// Agregar número para suma
document.getElementById("formSuma").addEventListener("submit", e => {
  e.preventDefault();
  const numero = parseFloat(document.getElementById("inputNumeroSuma").value);
  if (!isNaN(numero)) {
    numerosParaSumar.push(numero);
    document.getElementById("inputNumeroSuma").value = '';
  }
});

// Sumar todos los números
document.getElementById("btnSumar").addEventListener("click", () => {
  const sumaTotal = numerosParaSumar.reduce((acc, val) => acc + val, 0);
  document.getElementById("resultadoSuma").textContent = `Suma total: ${sumaTotal}`;
});

// Agregar número para multiplicación
document.getElementById("formMultiplicacion").addEventListener("submit", e => {
  e.preventDefault();
  const numero = parseFloat(document.getElementById("inputNumeroMultiplicar").value);
  if (!isNaN(numero)) {
    numerosParaMultiplicar.push(numero);
    document.getElementById("inputNumeroMultiplicar").value = '';
  }
});

// Multiplicar todos los números
document.getElementById("btnMultiplicar").addEventListener("click", () => {
  const productoTotal = numerosParaMultiplicar.reduce((acc, val) => acc * val, 1);
  document.getElementById("resultadoMultiplicacion").textContent = `Producto total: ${productoTotal}`;
});

// Agregar precio al arreglo
document.getElementById("formPrecios").addEventListener("submit", e => {
  e.preventDefault();
  const precio = parseFloat(document.getElementById("inputPrecio").value);
  if (!isNaN(precio)) {
    listaDePrecios.push(precio);
    document.getElementById("inputPrecio").value = '';
  }
});

// Sumar todos los precios
document.getElementById("btnCalcularTotal").addEventListener("click", () => {
  const totalPrecios = listaDePrecios.reduce((acc, precio) => acc + precio, 0);
  document.getElementById("resultadoTotal").textContent = `Total a pagar: $${totalPrecios.toFixed(2)}`;
});
