const calcularFechaFutura = require('../modulos/fechaFutura.js');
const evaluarEdad = require('../modulos/mayordeEdad.js');
const VerificarBisiesto = require('../modulos/verificarBisiesto.js');
// Se importan los módulos con sus métodos

let proximaFecha = calcularFechaFutura.fechaFutura();
let esMayorDeEdad = evaluarEdad.mayordeEdad(2008);
let añoEsBisiesto = VerificarBisiesto.verificarBisiesto();
// Se llaman las funciones y se almacenan los valores retornados

console.log(proximaFecha);
console.log(esMayorDeEdad);
console.log(añoEsBisiesto);
// Mostrar los resultados en consola