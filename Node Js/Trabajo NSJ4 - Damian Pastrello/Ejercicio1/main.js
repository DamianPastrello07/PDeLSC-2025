const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const personas = [];
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));  

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view/index.html'));
});
app.use(express.urlencoded({ extended: true }));

app.post('/enviar', (req, res) => {
  const persona = {
    usuario: req.body.usuario,
    contrasena: req.body.contrasena
  };
   personas.push(persona);
  console.log(personas);
  res.json({ usuario: persona.usuario });
});

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