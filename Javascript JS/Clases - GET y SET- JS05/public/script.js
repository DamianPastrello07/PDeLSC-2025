import { Czooanimal } from '/Animal.js'; //Se importa la clase Czooanimal

const animales = [];

//Formulari de carga de animales
document.getElementById('animalForm').addEventListener('submit', (e) => {
  e.preventDefault();

  // Validación de campos
  const IdAnimal = parseInt(document.getElementById('id').value);
  const nombre = document.getElementById('nombre').value.trim();
  const IdTypeAnimal = parseInt(document.getElementById('tipo').value);
  const peso = parseFloat(document.getElementById('peso').value);
  const JaulaNumero = parseInt(document.getElementById('jaula').value);

  if (!IdAnimal || !nombre || !IdTypeAnimal || !peso || !JaulaNumero) {
    alert('Por favor, completa todos los campos correctamente.');
    return;
  }

  //Crea un nuevo objeto de la clase Czooanimal
  const animal = new Czooanimal(IdAnimal, nombre, JaulaNumero, IdTypeAnimal, peso);
  animales.push(animal);

  e.target.reset();

  
  mostrarResultados(animales);
});

//Muestra los resultados por pantalla
function mostrarResultados(zooAnimals) {
  const resultadosDiv = document.getElementById('resultados');

  let html = `<h2>Resultados</h2>`;

  //Total de animales en jaula 5 con peso < 3 kg
  const b = zooAnimals.filter(a => a.JaulaNumero === 5 && a.peso < 3).length;
  html += `<p><strong>b)</strong> Animales en jaula 5 con peso < 3 kg: ${b}</p>`;

  //Felinos en jaulas 2 a 5
  const c = zooAnimals.filter(a => a.IdTypeAnimal === 1 && a.JaulaNumero >= 2 && a.JaulaNumero <= 5).length;
  html += `<p><strong>c)</strong> Felinos (tipo 1) entre jaulas 2 a 5: ${c}</p>`;

  //Nombre del animal en jaula 4 con peso < 120
  const animalesD = zooAnimals.filter(a => a.JaulaNumero === 4 && a.peso < 120);
    if (animalesD.length > 0) {
  const nombresD = animalesD.map(a => a.nombre).join(', ');
  html += `<p><strong>d)</strong> Animales en jaula 4 con peso < 120: ${nombresD}</p>`;
    } else {
  html += `<p><strong>d)</strong> Animales en jaula 4 con peso < 120: Ninguno</p>`;
  }


  //Tabla con todos los datos
  html += `<h3><strong>e)</strong> Tabla de Animales</h3>`;
  html += `<table class="table table-bordered table-striped">
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Jaula</th>
        <th>Tipo</th>
        <th>Peso</th>
      </tr>
    </thead>
    <tbody>`;

  for (const a of zooAnimals) {
    html += `<tr>
      <td>${a.IdAnimal}</td>
      <td>${a.nombre}</td>
      <td>${a.JaulaNumero}</td>
      <td>${a.IdTypeAnimal}</td>
      <td>${a.peso.toFixed(2)}</td>
    </tr>`;
  }

  html += `</tbody></table>`;

  resultadosDiv.innerHTML = html;
}
