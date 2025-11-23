// src/entidades/Prestamo.js
export class Prestamo {
  constructor(libro, usuario) {
    this.libro = libro;
    this.usuario = usuario;
    this.fechaPrestamo = new Date();
    this.fechaDevolucion = null;
    this.multa = 0;
  }

  // Método tradicional:
  // - fija fechaDevolucion
  // - calcula la multa
  // - marca el libro como disponible
  registrarDevolucion() {
    if (!this.fechaDevolucion) {
      this.fechaDevolucion = new Date();
      this.calcularMulta();   // cálculo mientras el libro aún está prestado
      this.libro.devolver();  // ahora sí, se marca como disponible
    }
  }

  // Arrow function:
  // Calcula multa de $2 por día de retraso
  calcularMulta = () => {
    if (!this.fechaDevolucion) {
      this.multa = 0;
      return this.multa;
    }

    const diasBase = this.libro.diasPrestamo(); // 15 si estaba prestado
    const diasTotales = this._diasTranscurridos();
    const diasRetraso = Math.max(0, diasTotales - diasBase);

    this.multa = diasRetraso * 2; // $2 por día
    return this.multa;
  };

  // Función tradicional "privada"
  _diasTranscurridos() {
    const fin = this.fechaDevolucion ?? new Date();
    const msPorDia = 1000 * 60 * 60 * 24;
    const diffMs = fin - this.fechaPrestamo;
    return Math.floor(diffMs / msPorDia);
  }

  // Método con arrow function interna
  infoPrestamo() {
    const estado = () => (this.fechaDevolucion ? 'Devuelto' : 'En préstamo');

    const fechaPrestamoStr = this.fechaPrestamo.toLocaleDateString('es-ES');
    const fechaDevolucionStr = this.fechaDevolucion
      ? this.fechaDevolucion.toLocaleDateString('es-ES')
      : '—';

    return `
Préstamo de "${this.libro.titulo}" a ${this.usuario.nombre}
Estado: ${estado()}
Fecha préstamo: ${fechaPrestamoStr}
Fecha devolución: ${fechaDevolucionStr}
Multa: $${this.multa}
`.trim();
  }
}
