// Arreglos para almacenar los datos
const listaDeNumeros = [];
const listaDePalabras = [];
const listaDeUsuarios = [];

// Agregar número al arreglo
document.getElementById("formNumeros").addEventListener("submit", e => {
  e.preventDefault();
  const numero = parseFloat(document.getElementById("numeroInput").value);
  if (!isNaN(numero)) {
    listaDeNumeros.push(numero);
    document.getElementById("numeroInput").value = '';
  }
});

// Mostrar números mayores a 10
document.getElementById("btnFiltrarNumeros").addEventListener("click", () => {
  const mayores = listaDeNumeros.filter(n => n > 10);
  document.getElementById("listaNumeros").innerHTML =
    mayores.map(n => `<li>${n}</li>`).join('');
});

// Agregar palabra al arreglo
document.getElementById("formPalabras").addEventListener("submit", e => {
  e.preventDefault();
  const palabra = document.getElementById("palabraInput").value.trim();
  if (palabra) {
    listaDePalabras.push(palabra);
    document.getElementById("palabraInput").value = '';
  }
});

// Mostrar palabras con más de 5 letras
document.getElementById("btnFiltrarPalabras").addEventListener("click", () => {
  const largas = listaDePalabras.filter(p => p.length > 5);
  document.getElementById("listaPalabras").innerHTML =
    largas.map(p => `<li>${p}</li>`).join('');
});

// Agregar usuario al arreglo
document.getElementById("formUsuarios").addEventListener("submit", e => {
  e.preventDefault();
  const nombreUsuario = document.getElementById("usuarioInput").value.trim();
  const esActivo = document.getElementById("activoInput").value === "true";
  if (nombreUsuario) {
    listaDeUsuarios.push({ nombre: nombreUsuario, activo: esActivo });
    document.getElementById("usuarioInput").value = '';
  }
});

// Mostrar usuarios activos
document.getElementById("btnFiltrarUsuarios").addEventListener("click", () => {
  const activos = listaDeUsuarios.filter(u => u.activo);
  document.getElementById("listaUsuarios").innerHTML =
    activos.map(u => `<li>${u.nombre} (activo)</li>`).join('');
});
