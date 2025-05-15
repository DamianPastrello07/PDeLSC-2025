document.addEventListener('DOMContentLoaded', () => {
  const hijosCheck = document.getElementById('tieneHijos');
  const hijosCantidad = document.getElementById('cantidadHijosGroup');

  hijosCheck.addEventListener('change', () => {
    hijosCantidad.style.display = hijosCheck.checked ? 'block' : 'none';
  });
});