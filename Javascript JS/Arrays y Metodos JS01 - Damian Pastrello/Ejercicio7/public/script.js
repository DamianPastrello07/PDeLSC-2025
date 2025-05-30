// Arrays para almacenar los datos ingresados
const animales = [];
const numeros = [];
const ciudades = [];

/** ANIMALES **/

// Agrega un animal al array
document.getElementById("formAnimales").addEventListener("submit", (e) => {
  e.preventDefault();
  const animal = document.getElementById("inputAnimal").value.trim().toLowerCase();
  if (animal) {
    animales.push(animal);
    document.getElementById("inputAnimal").value = "";
  }
});

// Busca "perro" en el array de animales
document.getElementById("btnBuscarPerro").addEventListener("click", () => {
  const resultado = animales.indexOf("perro");
  const mensaje = resultado !== -1
    ? `"perro" está en la posición ${resultado}.`
    : `"perro" no se encontró.`;
  document.getElementById("resultadoAnimal").textContent = mensaje;
});


/** NÚMEROS **/

// Agrega un número al array
document.getElementById("formNumeros").addEventListener("submit", (e) => {
  e.preventDefault();
  const numero = parseInt(document.getElementById("inputNumero").value);
  if (!isNaN(numero)) {
    numeros.push(numero);
    document.getElementById("inputNumero").value = "";
  }
});

// Busca el número 50 en el array de números
document.getElementById("btnBuscar50").addEventListener("click", () => {
  const resultado = numeros.indexOf(50);
  const mensaje = resultado !== -1
    ? `El número 50 está en la posición ${resultado}.`
    : `El número 50 no está en el array.`;
  document.getElementById("resultadoNumero").textContent = mensaje;
});


/** CIUDADES **/

// Agrega una ciudad al array
document.getElementById("formCiudades").addEventListener("submit", (e) => {
  e.preventDefault();
  const ciudad = document.getElementById("inputCiudad").value.trim();
  if (ciudad) {
    ciudades.push(ciudad);
    document.getElementById("inputCiudad").value = "";
  }
});

// Busca "Madrid" en el array de ciudades
document.getElementById("btnBuscarMadrid").addEventListener("click", () => {
  const resultado = ciudades.indexOf("Madrid");
  const mensaje = resultado !== -1
    ? `"Madrid" está en la posición ${resultado}.`
    : `"Madrid" no se encuentra en la lista de ciudades.`;
  document.getElementById("resultadoCiudad").textContent = mensaje;
});
