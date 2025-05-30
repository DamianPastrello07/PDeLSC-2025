// Evento al enviar el formulario
document.getElementById('formulario').addEventListener('submit', async function (e) {
  e.preventDefault(); // Evita recargar la página

  const formData = new FormData(this);

  // Construcción del objeto con los datos del formulario
  const datos = {
    usuario: formData.get('usuario'),
    contrasena: formData.get('contrasena')
  };

  // Enviar datos al servidor usando fetch
  const respuesta = await fetch('/enviar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  // Mostrar mensaje con el usuario agregado
  const resultado = await respuesta.json();
  const mensajeDiv = document.getElementById('mensaje');
  mensajeDiv.innerHTML = `
    <div class="alert alert-success" role="alert">
      Usuario <strong>${resultado.usuario}</strong> agregado exitosamente.
    </div>
  `;

  this.reset(); // Limpiar el formulario
});
