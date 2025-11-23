import { formatearFechaFlecha } from '../helpers/Funciones.js';

export class Libro {
  constructor(titulo, autor, isbn) {
    this.titulo = titulo;
    this.autor = autor;
    this.isbn = isbn;
    this.disponible = true;
    this.fechaRegistro = new Date();
  }

  // Método tradicional
  prestar() {
    if (this.disponible) {
      this.disponible = false;
      return true;
    }
    return false;
  }

  // Método flecha asignado a propiedad
  devolver = () => {
    this.disponible = true;
    console.log(`Libro devuelto: ${this.titulo}`);
  };

  // NUEVO 1: método flecha
  diasPrestamo = () => (this.disponible ? 0 : 15);

  // NUEVO 2: método tradicional
  estaDisponible() {
    return this.disponible;
  }

  // Método que usa helper flecha
  infoRegistro() {
    return `Registrado el: ${formatearFechaFlecha(this.fechaRegistro)}`;
  }

  // Getter tradicional
  get descripcion() {
    return `${this.titulo} - ${this.autor}`;
  }

  // Método estático flecha existente
  static crearLibroDemo = () => new Libro("Libro Demo", "Autor Demo", "000000");

  // NUEVO 3: método estático flecha
  static validarISBN = (isbn) => /^\d{6}$/.test(isbn);
}
