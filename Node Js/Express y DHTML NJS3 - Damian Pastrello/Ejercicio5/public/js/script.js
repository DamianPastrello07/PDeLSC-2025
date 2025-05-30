function agregarH1() {
    document.getElementById('output').innerHTML += '<h1>Este es un H1 dinámico</h1>';
  }
  
  function agregarParrafo() {
    document.getElementById('output').innerHTML += '<p>Este es un párrafo agregado con innerHTML.</p>';
  }
  
  function agregarImagen() {
    document.getElementById('output').innerHTML += '<img src="/img/RomeoSantos.jpg" >';
  }
  
  function agregarLista() {
    document.getElementById('output').innerHTML += `
      <ul>
        <li>Elemento 1</li>
        <li>Elemento 2</li>
        <li>Elemento 3</li>
      </ul>`;
  }
  
  function agregarTabla() {
    document.getElementById('output').innerHTML += `
      <table border="1" class="table table-striped">
        <tr><th>Nombre</th><th>Edad</th></tr>
        <tr><td>Ana</td><td>23</td></tr>
        <tr><td>Juan</td><td>30</td></tr>
      </table>`;
  }