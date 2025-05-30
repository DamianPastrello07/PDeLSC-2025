// Arreglos para guardar los datos
let colores = ["Azul", "Rojo", "Verde"];
let tareas = ["Sacar la basura", "Limpiar el cuarto", "Hacer la compra"];
let usuarios = ["Estanga", "Flament", "Ortells", "Sanchez"];

// Manejar formulario de colores
document.getElementById('formularioColor').addEventListener('submit', function(e) {
  e.preventDefault();
  const entrada = document.getElementById('entradaColor');
  const valor = entrada.value.trim();
  if (valor !== "") {
    colores.unshift(valor);
    entrada.value = '';
    actualizarResultado('resultadoColores', 'Colores', colores);
  }
});

// Manejar formulario de tareas
document.getElementById('formularioTarea').addEventListener('submit', function(e) {
  e.preventDefault();
  const entrada = document.getElementById('entradaTarea');
  const valor = entrada.value.trim();
  if (valor !== "") {
    tareas.unshift(valor);
    entrada.value = '';
    actualizarResultado('resultadoTareas', 'Tareas', tareas);
  }
});

// Manejar formulario de usuarios
document.getElementById('formularioUsuario').addEventListener('submit', function(e) {
  e.preventDefault();
  const entrada = document.getElementById('entradaUsuario');
  const valor = entrada.value.trim();
  if (valor !== "") {
    usuarios.unshift(valor);
    entrada.value = '';
    actualizarResultado('resultadoUsuarios', 'Usuarios conectados', usuarios);
  }
});

// Función para mostrar resultados
function actualizarResultado(idElemento, etiqueta, arreglo) {
  const elemento = document.getElementById(idElemento);
  elemento.textContent = `${etiqueta}: ${arreglo.length > 0 ? arreglo.join(', ') : '(vacío)'}`;
}

actualizarResultado('resultadoColores', 'Colores', colores);
actualizarResultado('resultadoTareas', 'Tareas', tareas);
actualizarResultado('resultadoUsuarios', 'Usuarios conectados', usuarios);