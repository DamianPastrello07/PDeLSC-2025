// Selecciona elementos del DOM y los guarda en variables
const gameContainer = document.querySelector(".container"), // Contenedor principal del juego
      userResult = document.querySelector(".user-result img"), // Imagen que representa la elección del usuario
      cpuResult = document.querySelector(".cpu-result img"), // Imagen que representa la elección de la CPU
      result = document.querySelector(".result"), // Elemento donde se muestra el resultado del juego
      optionImages = document.querySelectorAll(".option-image"); // Todas las imágenes que el usuario puede elegir

// Recorre cada imagen de opción (Piedra, Papel, Tijera)
optionImages.forEach((image, index)=>{
    // Agrega un listener al hacer clic en una imagen
    image.addEventListener("click",(e) =>{
        // Marca la imagen seleccionada como activa (para resaltar visualmente)
        image.classList.add("active");

        // Establece temporalmente imágenes por defecto y mensaje "Espera..."
        userResult.src = cpuResult.src = "/imagenes/Piedra.png";
        result.textContent = "Espera...";

        // Quita la clase "active" a las demás imágenes
        optionImages.forEach((image2,index2)=>{
            index !== index2 && image2.classList.remove("active");
        });

        // Agrega una clase al contenedor para mostrar alguna animación o estilo durante la espera
        gameContainer.classList.add("start");

        // Ejecuta el bloque de código después de 2.5 segundos
        let time = setTimeout(()=>{
            // Quita la clase de animación/espera
            gameContainer.classList.remove("start");

            // Obtiene la imagen que el usuario seleccionó
            let imageSrc = e.target.querySelector("img").src;
            userResult.src = imageSrc; // Muestra la elección del usuario

            // Genera una elección aleatoria para la CPU
            let randomNumber = Math.floor(Math.random()*3);

            // Arreglo con las rutas de imagen para la CPU
            let cpuImages = [
                "/imagenes/Piedra.png",
                "/imagenes/Papel.png",
                "/imagenes/Tijera.png"
            ];

            // Muestra la elección de la CPU
            cpuResult.src = cpuImages[randomNumber];

            // Traduce las elecciones a valores simples para comparar (R: Piedra, P: Papel, S: Tijera)
            let cpuValue = ["R","P","S"][randomNumber];
            let userValue = ["R","P","S"][index];

            // Diccionario de resultados posibles
            let outcomes = {
                RR: "Empate",
                RP: "Cpu",
                RS: "Usuario",
                PP: "Empate",
                PR: "Usuario",
                PS: "Cpu",
                SS: "Empate",
                SR: "Cpu",
                SP: "Usuario"
            };

            // Obtiene el resultado basado en las elecciones
            let outComeValue = outcomes[userValue + cpuValue];

            // Muestra el resultado del juego
            result.textContent = 
                userValue === cpuValue ? "Empate" : `${outComeValue} Gana!!`;
        },2500); // Espera 2.5 segundos antes de mostrar el resultado
    });
});