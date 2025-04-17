// Módulo para crear un servidor HTTP
const http = require('http');

// Módulo externo que convierte texto a mayúsculas
const upperCase = require('upper-case');

// Crear servidor web
http.createServer(function (req, res) {
  // Establece el encabezado de la respuesta HTTP (200 OK y tipo de contenido HTML)
  res.writeHead(200, { 'Content-Type': 'text/html' });

  // Convierte el mensaje a mayúsculas usando el módulo 'upper-case'
  const mensaje = upperCase.upperCase("Hola Mundo!");

  // Envía el mensaje como respuesta
  res.write(mensaje);

  // Finaliza la respuesta
  res.end();
  
}).listen(8080, function () {
  console.log("Servidor escuchando en http://localhost:8080/");
});