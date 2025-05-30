const listaNombres = [];
const listaNumeros = [];
const listaPersonas = [];

document.getElementById("formularioNombres").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombreIngresado").value.trim();
  if (nombre) {
    listaNombres.push(nombre);
    document.getElementById("nombreIngresado").value = '';
  }
});

document.getElementById("btnSaludar").addEventListener("click", () => {
  const ul = document.getElementById("saludosLista");
  ul.innerHTML = "";
  listaNombres.forEach(nombre => {
    const li = document.createElement("li");
    li.textContent = `¡Hola ${nombre}! Bienvenido.`;
    li.className = "list-group-item";
    ul.appendChild(li);
  });
});

document.getElementById("formularioNumeros").addEventListener("submit", function(e) {
  e.preventDefault();
  const numero = parseFloat(document.getElementById("numeroIngresado").value);
  if (!isNaN(numero)) {
    listaNumeros.push(numero);
    document.getElementById("numeroIngresado").value = '';
  }
});

document.getElementById("btnDobles").addEventListener("click", () => {
  const ul = document.getElementById("doblesLista");
  ul.innerHTML = "";
  listaNumeros.forEach(numero => {
    const li = document.createElement("li");
    li.textContent = `El doble de ${numero} es ${numero * 2}`;
    li.className = "list-group-item";
    ul.appendChild(li);
  });
});

document.getElementById("formularioPersonas").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombrePersona").value.trim();
  const edad = parseInt(document.getElementById("edadPersona").value);
  if (nombre && !isNaN(edad)) {
    listaPersonas.push({ nombre, edad });
    document.getElementById("nombrePersona").value = '';
    document.getElementById("edadPersona").value = '';
  }
});

document.getElementById("btnPersonas").addEventListener("click", () => {
  const ul = document.getElementById("personasLista");
  ul.innerHTML = "";
  listaPersonas.forEach(persona => {
    const li = document.createElement("li");
    li.textContent = `${persona.nombre} tiene ${persona.edad} años.`;
    li.className = "list-group-item";
    ul.appendChild(li);
  });
});
