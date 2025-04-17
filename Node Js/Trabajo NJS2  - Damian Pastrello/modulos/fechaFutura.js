function fechaFutura() {
    // Obtener la fecha actual
    const hoy = new Date();

    // Extraer componentes individuales: año, mes y día
    const anioActual = hoy.getFullYear();
    const mesActual = hoy.getMonth() + 1; // Se suma 1 porque los meses van de 0 a 11
    const diaActual = hoy.getDate();

    // Crear una nueva fecha sumando 1 día, 1 mes y 1 año
    const fechaCalculada = new Date(anioActual + 1, mesActual, diaActual + 1);

    // Retornar la fecha futura generada
    return fechaCalculada;
}

// Exportar la función para poder utilizarla en otros archivos
module.exports = {fechaFutura};