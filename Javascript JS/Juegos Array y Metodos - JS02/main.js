const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/taTeTi.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'taTeTi.html'));
});

app.get('/simonDice.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'simonDice.html'));
});

app.get('/ppt.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'ppt.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});