import { Libro } from '../entidades/Libro.js';
import { Usuario } from '../entidades/Usuario.js';
import { Prestamo } from '../entidades/Prestamo.js';
import { formatearFechaTradicional } from '../helpers/Funciones.js';

export class BibliotecaService {
  constructor() {
    this.libros = [];
    this.usuarios = [];
    this.prestamos = [];      // NUEVO: array de préstamos
    this.inicioSistema = new Date();
  }

  // Función tradicional
  agregarLibro(titulo, autor, isbn) {
    const libro = new Libro(titulo, autor, isbn);
    this.libros.push(libro);
    return libro;
  }

  // Función flecha asignada a propiedad
  registrarUsuario = (nombre, id) => {
    const usuario = new Usuario(nombre, id);
    this.usuarios.push(usuario);
    return usuario;
  };

  // NUEVO: registrarPrestamo (arrow function)
  // Registra un nuevo préstamo si el libro y el usuario existen
  // libroId = isbn, usuarioId = id
  registrarPrestamo = (libroId, usuarioId) => {
    const libro = this.libros.find(lib => lib.isbn === libroId);
    const usuario = this.usuarios.find(user => user.id === usuarioId);

    if (!libro || !usuario) {
      console.log('No se pudo registrar el préstamo: libro o usuario no encontrados');
      return null;
    }

    // Usamos la lógica ya existente de Usuario / Libro
    const prestamoExitoso = usuario.tomarPrestado(libro);
    if (!prestamoExitoso) {
      console.log('No se pudo registrar el préstamo: el libro no está disponible');
      return null;
    }

    const prestamo = new Prestamo(libro, usuario);
    this.prestamos.push(prestamo);
    return prestamo;
  };

  // Método que usa función tradicional externa
  infoSistema() {
    return `Sistema iniciado el: ${formatearFechaTradicional(this.inicioSistema)}`;
  }

  // Método con callback tradicional
  buscarLibroPorTitulo(titulo, callback) {
    const resultado = this.libros.filter(function (libro) {
      return libro.titulo.toLowerCase().includes(titulo.toLowerCase());
    });
    callback(resultado);
  }

  // Método con callback flecha
  buscarUsuarioPorNombre(nombre, callback) {
    const resultado = this.usuarios.filter(user =>
      user.nombre.toLowerCase().includes(nombre.toLowerCase())
    );
    callback(resultado);
  }

  // NUEVO: Tradicional con callback
  // Filtra préstamos por ID de usuario y usa callback tradicional
  buscarPrestamosPorUsuario(usuarioId, callback) {
    const prestamosUsuario = this.prestamos.filter(function (prestamo) {
      return prestamo.usuario.id === usuarioId;
    });
    callback(prestamosUsuario);
  }

  // NUEVO: Arrow function con reduce
  // Suma todas las multas (asumimos que son "no pagadas")
  calcularMultasPendientes = () =>
    this.prestamos.reduce((total, prestamo) => total + (prestamo.multa || 0), 0);
}
