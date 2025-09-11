// Elementos del DOM
const fileInput = document.getElementById('fileInput');
const processBtn = document.getElementById('processBtn');
const filteredList = document.getElementById('filteredList');
const resultsDiv = document.getElementById('results');
const totalCount = document.getElementById('totalCount');
const validCount = document.getElementById('validCount');
const invalidCount = document.getElementById('invalidCount');
const percentage = document.getElementById('percentage');
const downloadBtn = document.getElementById('downloadBtn');

// Variables globales
let validNumbers = [];
let loadedContent = '';

// Se selecciona un archivo
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file || file.type !== 'text/plain') { // Error por formato equivocado
    alert("Por favor, seleccioná un archivo .txt válido.");
    processBtn.disabled = true;
    return;
  }
  // Lectura del archivo
  const reader = new FileReader();
  reader.onload = function (e) {
    loadedContent = e.target.result;
    processBtn.disabled = false; 
  };

  reader.readAsText(file);
});

// Se procesa el archivo
processBtn.addEventListener('click', () => {
  if (!loadedContent) return;
  
  const lines = loadedContent.split(/\r?\n/) // Se divide en lineas y se eliminan las vacias
  .map(line => line.trim())
  .filter(line => line !== '');
  const numbers = lines.map(Number).filter(n => !isNaN(n)); // Convierte en numeros validos

  const filtered = numbers.filter(n => { // Numeros validos
    const str = n.toString();
    return str[0] === str[str.length - 1];
  });

  validNumbers = [...filtered].sort((a, b) => a - b); 

  displayResults(numbers.length, validNumbers.length, numbers.length - validNumbers.length);
});

// Se muestran los resultados
function displayResults(total, valid, invalid) {
  filteredList.innerHTML = '';
  validNumbers.forEach(n => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = n;
    filteredList.appendChild(li);
  });

  // Contadores
  totalCount.textContent = total;
  validCount.textContent = valid;
  invalidCount.textContent = invalid;
  percentage.textContent = ((valid / total) * 100).toFixed(2);

  resultsDiv.style.display = 'block';
}

// Boton de descarga
downloadBtn.addEventListener('click', () => {
  const content = validNumbers.join('\n');
  const blob = new Blob([content], { type: 'text/plain' });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'numeros_filtrados.txt';
  a.click();

  URL.revokeObjectURL(url);
});
