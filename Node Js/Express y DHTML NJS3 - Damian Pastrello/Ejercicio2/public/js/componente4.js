function changeColor() {
    const h1 = document.getElementById('title');
    h1.style.color = '#' + Math.floor(Math.random()*16777215).toString(16);
  }