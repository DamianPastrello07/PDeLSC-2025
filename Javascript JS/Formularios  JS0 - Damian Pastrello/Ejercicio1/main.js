const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Arreglo para almacenar usuarios
const personas = [];

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view/index.html'));
});

// Permitir datos codificados en formularios
app.use(express.urlencoded({ extended: true }));

// Ruta para recibir datos del formulario (POST)
app.post('/enviar', (req, res) => {
  const persona = {
    usuario: req.body.usuario,
    contrasena: req.body.contrasena
  };
  personas.push(persona); // Agrega la persona al arreglo
  console.log(personas);  // Muestra en consola
  res.json({ usuario: persona.usuario }); // Devuelve respuesta al cliente
});

// Ruta para ver la lista de personas registradas
app.get('/personas', (req, res) => {
  let lista = '<h1>Listado de usuarios</h1>';
  personas.forEach(p => {
    lista += `<li>${p.usuario} - ${p.contrasena}</li>`;
  });
  lista += '<a href="/">Volver</a>';
  res.send(lista);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
