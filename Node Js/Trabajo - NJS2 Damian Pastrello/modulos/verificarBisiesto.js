function verificarBisiesto() {
    const hoy = new Date();  // Obtener la fecha actual

    // Se extrae el año actual desde la fecha
    const anioEnCurso = hoy.getFullYear();
    let mensajeBisiesto = "El año actual no es bisiesto";

    // Verifica si el año es divisible por 4
    if (anioEnCurso % 4 === 0) {
        mensajeBisiesto = "El año actual es bisiesto";
    }

    return mensajeBisiesto;
}

// Exportar la función como parte del módulo
module.exports = { verificarBisiesto };