// Dependencias de Node.js
const http = require('http');     // Para levantar un servidor web
const fs = require('fs');         // Para trabajar con archivos del sistema

// Importación de módulos personalizados
const VerificaBisiesto = require('../modulos/verificarBisiesto.js');      // Comprueba si el año es bisiesto
const obtenerFecha = require('../modulos/fechaFutura.js');          // Suma 1 día, 1 mes y 1 año a la fecha actual
const chequearEdad = require('../modulos/mayordeEdad.js');            // Evalúa si alguien es mayor de edad

// Configuración del servidor
http.createServer(function (solicitud, respuesta) {
  // Contenido HTML generado dinámicamente
  const contenidoHTML = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Página Dinámica</title>
    </head>
    <body>
        <h1>¡Bienvenido!</h1>
        <!-- Información generada con módulos -->
        <p>¿Estamos en un año bisiesto? ${VerificaBisiesto.verificarBisiesto()} <br></p>
        <p>Fecha en el futuro (día+mes+año): ${obtenerFecha.fechaFutura()} <br></p>
        <p>¿Mayor de edad si nací en 2007? ${chequearEdad.mayordeEdad(2008)} <br></p>
    </body>
    </html>
  `;

  // Guardar el HTML generado
  fs.writeFile('index.html', contenidoHTML, function (error) {
    if (error) throw error; // Sobreescribe el archivo en caso de existir
    console.log('¡Archivo HTML generado exitosamente!');
  });

  // Leer y enviar el HTML generado como respuesta al navegador
  fs.readFile('index.html', function (error, datos) {
    if (error) {
      respuesta.writeHead(500); // Si ocurre un error al leer el archivo, se responde con un error 500
      return respuesta.end('Error al intentar cargar el contenido.');
    }
     // Si la lectura fue exitosa, se envía el HTML con el código de estado 200 (OK)
    respuesta.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    respuesta.write(datos);
    return respuesta.end();
  });
  // Mensaje que confirma que el servidor está activo y escuchando en el puerto 8080
}).listen(8080, function () {
  console.log('Servidor activo en: http://localhost:8080/');
});