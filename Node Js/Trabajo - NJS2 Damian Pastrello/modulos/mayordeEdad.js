function mayordeEdad(añoNacimiento) {
    const hoy = new Date(); // Fecha actual del sistema

    // Mensaje predeterminado (por defecto, se asume que no tiene 18 aún)
    let mensajeEdad = "Usted no tiene aún 18 años";

    // Se obtiene el año actual y se calcula la edad
    const anioActual = parseInt(hoy.getFullYear());
    const edadCalculada = anioActual - añoNacimiento;

    // Si tiene 18 años o más, se actualiza el mensaje
    if (edadCalculada >= 18) {
        mensajeEdad = "Usted ya tiene 18 años o los cumplirá en este año";
    }

    return mensajeEdad;
}

// Exporta la función para que pueda ser utilizada en otros archivos
module.exports = {mayordeEdad};