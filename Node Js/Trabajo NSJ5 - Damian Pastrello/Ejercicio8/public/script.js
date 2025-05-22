// Arrays globales
const usuarios = [];
const colores = [];
const numeros = [];

/** USUARIOS **/

// Agrega un usuario al array
document.getElementById("formUsuarios").addEventListener("submit", (e) => {
  e.preventDefault();
  const usuario = document.getElementById("inputUsuario").value.trim();
  if (usuario) {
    usuarios.push(usuario);
    document.getElementById("inputUsuario").value = "";
  }
});

// Verifica si "admin" está en la lista
document.getElementById("btnBuscarAdmin").addEventListener("click", () => {
  const resultado = usuarios.includes("admin");
  document.getElementById("resultadoAdmin").textContent = resultado
    ? `"admin" está en la lista de usuarios.`
    : `"admin" no está en la lista.`;
});


/** COLORES **/

// Verifica si "verde" está en la lista
document.getElementById("btnBuscarVerde").addEventListener("click", () => {
  const resultado = colores.includes("verde");
  document.getElementById("resultadoVerde").textContent = resultado
    ? `El color "verde" está en la lista.`
    : `El color "verde" no está en la lista.`;
});


/** NÚMEROS **/

// Agrega un número si no existe aún
document.getElementById("formNumeros").addEventListener("submit", (e) => {
  e.preventDefault();
  const numero = parseInt(document.getElementById("inputNumero").value);
  const div = document.getElementById("resultadoNumero");

  if (!isNaN(numero)) {
    if (numeros.includes(numero)) {
      div.textContent = `El número ${numero} ya existe en el array.`;
    } else {
      numeros.push(numero);
      div.textContent = `El número ${numero} fue agregado al array.`;
    }
    document.getElementById("inputNumero").value = "";
  }
});
