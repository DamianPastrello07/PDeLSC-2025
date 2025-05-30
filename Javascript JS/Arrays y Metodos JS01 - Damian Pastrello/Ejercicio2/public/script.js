// Arrays iniciales
let animales = ["Liebre", "Nutria", "Oso hormiguero", "Narval", "Pangolin", "Solífugo"];
let listaCompras = ["Freidora de Aire Digital AirCrisp XL", "Batidora de Mano Multifunción ProMix 800W", "Horno Eléctrico de Sobremesa SmartBake 30L", "Horno a conveccion Turboblender"];
let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Función para actualizar la pantalla
function actualizarResultado(texto) {
  document.getElementById("resultado").textContent = texto;
}

// Evento para eliminar último animal
document.getElementById("eliminarAnimal").addEventListener("click", () => {
  if (animales.length > 0) {
    let eliminado = animales.pop();
    actualizarResultado(`Animal eliminado: ${eliminado}\nAnimales restantes: ${animales.join(", ")}`);
  } else {
    actualizarResultado("No quedan más animales.");
  }
});

// Evento para eliminar último producto de la lista de compras
document.getElementById("eliminarProducto").addEventListener("click", () => {
  if (listaCompras.length > 0) {
    let eliminado = listaCompras.pop();
    actualizarResultado(`Producto eliminado: ${eliminado}\nProductos restantes: ${listaCompras.join(", ")}`);
  } else {
    actualizarResultado("No quedan más productos.");
  }
});

// Evento para vaciar el array de números usando while + pop()
document.getElementById("vaciarNumeros").addEventListener("click", () => {
  let log = "";
  while (numeros.length > 0) {
    let eliminado = numeros.pop();
    log += `Elemento eliminado: ${eliminado}\n`;
  }
  log += "Array de números vacío.";
  actualizarResultado(log);
});
