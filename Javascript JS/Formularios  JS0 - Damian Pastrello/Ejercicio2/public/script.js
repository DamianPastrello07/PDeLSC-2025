document.getElementById('registroForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Evita que se recargue la página

  // Obtener los datos del formulario
  const formData = new FormData(this);
  const nombre = formData.get('nombre');
  const edad = formData.get('edad');
  const deporte = formData.get('deporte');
  const genero = formData.get('genero');
  const pais = formData.get('pais');

  // Mostrar los datos ingresados como campos deshabilitados
  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = `  
    <div class="mb-3">
      <input type="text" class="form-control text-center" value="${nombre}" disabled>
    </div>
    <div class="mb-3">
      <input type="number" class="form-control text-center" value="${edad}" disabled>
    </div>
    <div class="mb-3">
      <input type="text" class="form-control text-center" value="${deporte}" disabled>
    </div>
    <div class="mb-3">
      <input type="text" class="form-control text-center" value="${genero}" disabled>
    </div>
    <div class="mb-3">
      <input type="text" class="form-control text-center" value="${pais}" disabled>
    </div>
  `;
});
