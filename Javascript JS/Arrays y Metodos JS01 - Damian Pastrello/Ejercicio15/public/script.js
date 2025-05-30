function decodificarMensaje() {
  const input = document.getElementById('mensaje').value;
  const salida = document.getElementById('salida');

  let stack = [];
  let resultado = '';
  let i = 0;

  while (i < input.length) {
    if (input[i] === '(') {
      let j = i + 1;
      let contenido = '';
      let profundidad = 1;

      while (j < input.length && profundidad > 0) {
        if (input[j] === '(') profundidad++;
        else if (input[j] === ')') profundidad--;
        if (profundidad > 0) contenido += input[j];
        j++;
      }

      resultado += contenido.split('').reverse().join('');
      i = j; // saltar al caracter después del cierre
    } else {
      resultado += input[i];
      i++;
    }
  }

  salida.textContent = resultado;
}
