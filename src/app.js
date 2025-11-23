import { BibliotecaService } from './servicios/BibliotecaService.js';
import { mostrarInfoFlecha } from './helpers/Funciones.js';
import { Libro } from './entidades/Libro.js';

// Demostración función helper
console.log(mostrarInfoFlecha());

// Crear instancia del servicio
const biblioteca = new BibliotecaService();
console.log(biblioteca.infoSistema());

// Agregar datos usando diferentes métodos
biblioteca.agregarLibro('Cien años de soledad', 'García Márquez', '123456');
biblioteca.registrarUsuario('Ana Torres', '001');

// Uso de método estático con función flecha
const libroDemo = Libro.crearLibroDemo();
biblioteca.libros.push(libroDemo);

// Buscar libros (con callback tradicional)
biblioteca.buscarLibroPorTitulo('soledad', function (resultados) {
  console.log('\nResultados de búsqueda (tradicional):');
  resultados.forEach(libro => console.log(libro.descripcion));
});

// Buscar usuarios (con callback flecha)
biblioteca.buscarUsuarioPorNombre('ana', resultados => {
  console.log('\nUsuarios encontrados (flecha):');
  resultados.forEach(user => console.log(user.nombre));
});

// ===================================================================
// PARTE 4: Simulación de préstamo, devolución y multas
// ===================================================================

console.log('\n--- Simulación de préstamo y multas ---');

// 1. Simula un préstamo usando registrarPrestamo (arrow function)
const prestamo = biblioteca.registrarPrestamo('123456', '001');

if (prestamo) {
  console.log('\nEstado inicial del préstamo:');
  console.log(prestamo.infoPrestamo());

  // 2. Simula una devolución después de "20 días"
  //    Usamos setTimeout para simular el paso del tiempo
  setTimeout(() => {
    // Simulamos que el préstamo fue hace 20 días
    const VEINTE_DIAS_MS = 20 * 24 * 60 * 60 * 1000;
    prestamo.fechaPrestamo = new Date(
      prestamo.fechaPrestamo.getTime() - VEINTE_DIAS_MS
    );

    // Registrar devolución (método tradicional)
    prestamo.registrarDevolucion();

    console.log('\nDespués de la devolución (simulados 20 días):');
    console.log(prestamo.infoPrestamo());

    // 3. Buscar préstamos por usuario (tradicional con callback)
    biblioteca.buscarPrestamosPorUsuario('001', function (prestamosUsuario) {
      console.log('\nPréstamos del usuario 001:');
      prestamosUsuario.forEach(p => {
        console.log(p.infoPrestamo());
      });

      // 4. Calcular multas totales (arrow con reduce)
      const totalMultas = biblioteca.calcularMultasPendientes();
      console.log(`\nMultas pendientes totales: $${totalMultas}`);
    });
  }, 1000); // 1 segundo = "20 días" simulados
} else {
  console.log('No se pudo crear el préstamo de demostración.');
}
