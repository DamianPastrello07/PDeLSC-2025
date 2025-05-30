document.getElementById('registroForm').addEventListener('submit', function (e) {
  e.preventDefault(); // Evita recargar

  const formData = new FormData(this);
  const nombre = formData.get('nombre');
  const edad = formData.get('edad');
  const correo = formData.get('correo');
  const genero = formData.get('genero');
  const pais = formData.get('pais');
  const intereses = formData.getAll('intereses');

  const resultadoDiv = document.getElementById('resultado');
  resultadoDiv.innerHTML = `
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Edad:</strong> ${edad}</p>
    <p><strong>Correo:</strong> ${correo}</p>
    <p><strong>Género:</strong> ${genero}</p>
    <p><strong>País:</strong> ${pais}</p>
    <p><strong>Intereses:</strong> ${intereses.join(', ')}</p>
  `;
});