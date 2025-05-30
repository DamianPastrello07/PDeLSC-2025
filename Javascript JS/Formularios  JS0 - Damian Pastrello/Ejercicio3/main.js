const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true })); // body parser forms
app.use(express.static(path.join(__dirname, 'public'))); // archivos estáticos

let personas = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'index.html'));
});

// Ruta para recibir datos del form
app.post('/guardar', (req, res) => {
  const datos = req.body;
  personas.push(datos);
  console.log('Persona registrada:', datos);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
