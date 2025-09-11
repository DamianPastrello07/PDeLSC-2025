function changeImage() {
    const img = document.getElementById("img");
    img.src = img.src.includes("Arcangel.jpg") ? "/img/BadBunny.jpg" : "/img/Arcangel.jpg";
  }