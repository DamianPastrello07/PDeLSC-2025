import { suma } from './Modulo4.js'; //Se importa la suma
import { resta } from './Modulo4.js'; //Se importa la resta
import { multiplicacion } from './Modulo4.js'; //Se importa la multiplicación
import { division } from './Modulo4.js'; //Se importa la división

document.addEventListener("DOMContentLoaded", function () { //Se genera la tabla en el DOM
    const resultados = [ //Se crea un array que contiene la operación, los valores y el resultado
        { operacion: 'Suma', valores: '5 + 3', resultado: suma(5, 3) },
        { operacion: 'Resta', valores: '8 - 6', resultado: resta(8, 6) },
        { operacion: 'Multiplicación', valores: '3 * 11', resultado: multiplicacion(3, 11) },
        { operacion: 'División', valores: '30 / 5', resultado: division(30, 5) }
    ];
    
    let tabla = document.getElementById("tablaResultados"); //Se obtiene una referencia a la tabla por id
    resultados.forEach(res => { //Se recorre el array
        let fila = `<tr> 
                        <td>${res.operacion}</td> 
                        <td>${res.valores}</td> 
                        <td>${res.resultado}</td> 
                    </tr>`;
        tabla.innerHTML += fila; //Se añade la fila al innerHTML
    });
});