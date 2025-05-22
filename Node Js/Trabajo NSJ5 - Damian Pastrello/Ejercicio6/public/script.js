// Arrays donde se guardan los elementos ingresados
let listaNumeros = [];
let listaPeliculas = [];
const listaDias = ['Doming', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];

// Agrega un número a la lista
document.getElementById('formNumeros').addEventListener('submit', (e) => {
    e.preventDefault();
    const nuevoNumero = parseInt(document.getElementById('inputNumero').value);
    listaNumeros.push(nuevoNumero);
    document.getElementById('inputNumero').value = '';
});

// Muestra todos los números agregados
document.getElementById('mostrarNumeros').addEventListener('click', () => {
    mostrarLista('numeros', listaNumeros);
});

// Copia los primeros 3 números sin modificar el array original
document.getElementById('copiarPrimerosNumeros').addEventListener('click', () => {
    const copia = listaNumeros.slice(0, 3);
    mostrarLista('numerosResultado', copia);
});

// Agrega una película a la lista
document.getElementById('formPeliculas').addEventListener('submit', (e) => {
    e.preventDefault();
    const nuevaPelicula = document.getElementById('inputPelicula').value;
    listaPeliculas.push(nuevaPelicula);
    document.getElementById('inputPelicula').value = '';
});

// Muestra todas las películas
document.getElementById('mostrarPeliculas').addEventListener('click', () => {
    mostrarLista('peliculas', listaPeliculas);
});

// Copia dos películas desde la posición 2 (3ª y 4ª)
document.getElementById('copiarPeliculas').addEventListener('click', () => {
    const copia = listaPeliculas.slice(2, 4);
    mostrarLista('peliculasResultado', copia);
});

// Copia los últimos 3 elementos de la lista de frutas (fija)
document.getElementById('copiarFrutas').addEventListener('click', () => {
    const copia = listaDias.slice(-3);
    mostrarLista('ultimosResultado', copia);
});

// Función reutilizable para mostrar listas
function mostrarLista(id, array) {
    const contenedor = document.getElementById(id);
    contenedor.innerHTML = array.length
        ? `<ul class="list-group">${array.map(item => `<li class="list-group-item">${item}</li>`).join('')}</ul>`
        : '<p class="text-muted">No hay elementos para mostrar.</p>';
}
