let h1Element = null;
let imgElement = null;

function addH1() {
  if (!h1Element) {
    h1Element = document.createElement('h1');
    h1Element.textContent = 'Hola DOM';
    document.getElementById('content').appendChild(h1Element);
  }
}

function changeText() {
  if (h1Element) {
    h1Element.textContent = 'Chau DOM';
  }
}

function changeColor() {
  if (h1Element) {
    h1Element.style.color = getRandomColor();
  }
}

function addImage() {
  if (!imgElement) {
    imgElement = document.createElement('img');
    imgElement.src = '/img/Wisin.jpg';
    document.getElementById('content').appendChild(imgElement);
  }
}

function changeImage() {
  if (imgElement) {
    imgElement.src = '/img/Yandel.jpg';
  }
}

function resizeImage() {
  if (imgElement) {
    imgElement.style.width = imgElement.style.width === '150px' ? '300px' : '150px';
  }
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) color += letters[Math.floor(Math.random() * 16)];
  return color;
}