export class Czooanimal {// Exporta la clase
  constructor(IdAnimal, nombre, JaulaNumero, IdTypeAnimal, peso) {//Constructor de la clase
    this.IdAnimal = IdAnimal;   
    this.nombre = nombre;
    this.JaulaNumero = JaulaNumero;
    this.IdTypeAnimal = IdTypeAnimal;
    this.peso = peso;
  } 
  // Getters y Setters
    get IdAnimal() {
      return this._IdAnimal;
    }
    set IdAnimal(value) {
      this._IdAnimal = value;
    }
    get nombre() {
      return this._nombre;
    }
    set nombre(value) {
      this._nombre = value;
    }
    get JaulaNumero() {
      return this._JaulaNumero;
    }
    set JaulaNumero(value) {
      this._JaulaNumero = value;
    }
    get IdTypeAnimal() {
      return this._IdTypeAnimal;
    }
    set IdTypeAnimal(value) {
      this._IdTypeAnimal = value;
    }
    get peso() {
      return this._peso;
    }
    set peso(value) {
      this._peso = value;
    }
}