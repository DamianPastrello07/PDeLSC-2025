
// Importar el módulo 'url' para manipular direcciones web
const gestorUrl = require('url');

// URL simulada con dominio, ruta y parámetros
const direccionCompleta = 'http://localhost:8080/default.htm?year=2017&month=february';

// Se descompone la URL, pasando 'true' para que la parte de consulta venga como objeto
const analisisUrl = gestorUrl.parse(direccionCompleta, true);

//  Acceso a diferentes partes de la URL analizada
console.log(analisisUrl.host);        // Resultado: 'localhost:8080'
console.log(analisisUrl.pathname);    // Resultado: '/default.htm'
console.log(analisisUrl.search);      // Resultado: '?year=2017&month=february'

// 📬 Acceder a los parámetros de la URL como objeto clave/valor
const parametros = analisisUrl.query; // { year: 2017, month: 'february' }
console.log(parametros.month);        // Resultado: 'february'