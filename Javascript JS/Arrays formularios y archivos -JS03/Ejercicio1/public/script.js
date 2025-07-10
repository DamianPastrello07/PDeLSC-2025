//Elementos del DOM
const numberForm = document.getElementById('numberForm');
const numberInput = document.getElementById('numberInput');
const numberList = document.getElementById('numberList');
const saveBtn = document.getElementById('saveBtn');

//Variables globales
let numbers = [];

//Ingreso de numeros
numberForm.addEventListener('submit', (e) => {
  e.preventDefault();

  //Valida los numeros ingresados
  const value = Number(numberInput.value);

  if (isNaN(value) || value === '') return;

  if (numbers.length >= 20) { // Alerta cuando ya sean 20 numeros
    alert("Ya se ingresaron 20 números.");
    return;
  }
  // Guarda los valores
  numbers.push(value);
  updateList();

  numberInput.value = '';
  numberInput.focus();

  // Habilita el boton
  if (numbers.length >= 10) {
    saveBtn.disabled = false;
  }
});

//Boton de guardado
saveBtn.addEventListener('click', () => {
  const content = numbers.join('\n');
  const blob = new Blob([content], { type: 'text/plain' }); // Crea el archivo

  // Descarga al hacer click
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'numeros.txt';
  a.click();

  URL.revokeObjectURL(url);
});

// Se muestran los numeros por pantalla
function updateList() {
  numberList.innerHTML = '';
  numbers.forEach((num, index) => {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = `${index + 1}. ${num}`;
    numberList.appendChild(li);
  });
}
