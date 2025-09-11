function countChildren() {
    const container = document.getElementById('container');
    const count = container.children.length;
    document.getElementById('result').textContent = `Cantidad de hijos: ${count}`;
  }