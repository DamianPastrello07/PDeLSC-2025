document.getElementById('formulario').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const datos = {
    usuario: formData.get('usuario'),
    contrasena: formData.get('contrasena')
  };

  const respuesta = await fetch('/enviar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });

  const resultado = await respuesta.json();
  const mensajeDiv = document.getElementById('mensaje');
  mensajeDiv.innerHTML = `
    <div class="alert alert-success" role="alert">
      Usuario <strong>${resultado.usuario}</strong> agregado exitosamente.
    </div>
  `;
  this.reset();
});