document.addEventListener('DOMContentLoaded', () => {
  const hijosCheck = document.getElementById('tieneHijos'); // Checkbox
  const hijosCantidad = document.getElementById('cantidadHijosGroup'); // Contenedor del input adicional

  // Mostrar u ocultar el campo según el estado del checkbox
  hijosCheck.addEventListener('change', () => {
    hijosCantidad.style.display = hijosCheck.checked ? 'block' : 'none';
  });
});
