/**
 * ADVERTENCIA: Existen muchos errores en este archivo.
 *              No se recomienda confiar en él.
 */

/* eslint-disable no-tabs */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import bcrypt from 'bcrypt';

/**
 * Generar insert statements para 20 docentes.
 * Quitar la coma del final y cambiarla por un semicolon.
 */
// async function generateInsertStatementsDocente (): Promise<void> {
//   console.log(`INSERT into docente (rut, dv, apellidos, nombres,
// correo, contrasena, telefono, fecha_nacimiento,
// foto_ubicacion, direccion) VALUES `);
//   for (let i = 1; i <= 20; i++) {
//     const passwordBcrypt = await bcrypt.hash(`docente${i}`, 10);
//     const passwordBuffer = Buffer.from(passwordBcrypt, 'utf8');
//     const passwordHex = passwordBuffer.toString('hex');
//     console.log(`(${i}, '0', 'testing', 'docente${i}', 'docente${i}@testing.com', X'${passwordHex}',
// '${i}', '1980-01-01', 'https://colegio-mallorca-publico.s3.sa-east-1.amazonaws.com/fotos-perfil/emoji-profesor.png',
// 'calle ${i}'),`);
//   }
// }
// generateInsertStatementsDocente().catch((error) => {
//   console.log(error);
// });

// // /**
// //  * Generar insert statements para 120 alumnos, 20 por cada curso.
// //  * Quitar la coma del final y cambiarla por un semicolon.
// //  */
// async function generateInsertStatementsAlumno (): Promise<void> {
//   console.log(`INSERT into alumno (rut, dv, apellidos, nombres,
// correo, contrasena, telefono, fecha_nacimiento,
// foto_ubicacion, direccion) VALUES `);
//   for (let i = 1; i <= 120; i++) {
//     const passwordBcrypt = await bcrypt.hash(`${i}`, 10);
//     const passwordBuffer = Buffer.from(passwordBcrypt, 'utf8');
//     const passwordHex = passwordBuffer.toString('hex');
//     console.log(`(${i}, '0', 'testing', 'alumno${i}', 'alumno${i}@testing.com', X'${passwordHex}',
// '${i}', '2010-01-01', 'https://colegio-mallorca-publico.s3.sa-east-1.amazonaws.com/fotos-perfil/emoji-estudiante.png',
// 'calle ${i}'),`);
//   }
// }
// generateInsertStatementsAlumno().catch((error) => {
//   console.error(error);
// });

/**
 * Cambiar la última coma por un semicolon.
 */
function generateInsertStatementsClase(): void {
  console.log(
    'INSERT INTO clase (id_curso, id_asignatura, id_docente, ano) VALUES'
  );
  for (let curso = 1; curso <= 6; curso++) {
    console.log(`
    (${curso}, 1, 1, 2023),
    (${curso}, 2, 2, 2023),
    (${curso}, 3, 3, 2023),
    (${curso}, 4, 4, 2023),
    (${curso}, 5, 5, 2023),
    (${curso}, 6, 6, 2023),
    (${curso}, 7, 7, 2023),
    (${curso}, 8, 8, 2023),
    `);
  }
}
generateInsertStatementsClase();

// /**
//  * Generar insert statements para tabla `nota`.
//  * Serán 4 notas, con un porcentaje de 25% cada una.
//  * Serán del año 2023, primer semestre.
//  * Cambiar la última coma por un semicolon.
//  */
// function generateInsertStatementsNota (): void {
//   console.log(`INSERT INTO nota
// (numero, porcentaje, calificacion, ano, semestre, id_alumno, id_asignatura)
// VALUES `);
//   for (let asignatura = 1; asignatura <= 8; asignatura++) {
//     for (let numNota = 1; numNota <= 4; numNota++) {
//       for (let idAlumno = 1; idAlumno <= 120; idAlumno++) {
//         const calificacion = Math.floor(Math.random() * 60 + 10) / 10;
//         console.log(`(${numNota}, 25, ${calificacion}, 2023, 1, ${idAlumno}, ${asignatura}),`);
//       }
//     }
//   }
// }
// // generateInsertStatementsNota();

// /**
//  * Generar insert statements para la tabla asociativa `alumno_curso`.
//  * Se asignarán 20 alumnos a cada curso.
//  * Cambiar la coma del final por un semicolon.
//  */
// function generateInsertStatementsAlumnoCurso (): void {
//   console.log('INSERT INTO alumno_curso (id_alumno, id_curso, ano) VALUES ');

//   for (let idAlumno = 1; idAlumno <= 20; idAlumno++) {
//     console.log(`(${idAlumno}, 1, 2023),`);
//   }
//   for (let idAlumno = 21; idAlumno <= 40; idAlumno++) {
//     console.log(`(${idAlumno}, 2, 2023),`);
//   }
//   for (let idAlumno = 41; idAlumno <= 60; idAlumno++) {
//     console.log(`(${idAlumno}, 3, 2023),`);
//   }
//   for (let idAlumno = 61; idAlumno <= 80; idAlumno++) {
//     console.log(`(${idAlumno}, 4, 2023),`);
//   }
//   for (let idAlumno = 81; idAlumno <= 100; idAlumno++) {
//     console.log(`(${idAlumno}, 5, 2023),`);
//   }
//   for (let idAlumno = 101; idAlumno <= 120; idAlumno++) {
//     console.log(`(${idAlumno}, 6, 2023),`);
//   }
// }
// // generateInsertStatementsAlumnoCurso();

// /*
// BORRADOR
// ========

// INSERT INTO curso (nivel, letra) VALUES
// (1, 'a'),
// (1, 'b'),
// (1, 'c'),
// (1, 'd'),
// (1, 'e'),
// (1, 'f');

// INSERT INTO asignatura (nombre) VALUES
// ('matemáticas'),
// ('lenguaje'),
// ('historia'),
// ('ciencias naturales'),
// ('inglés'),
// ('educación física'),
// ('música'),
// ('artística');

// INSERT INTO recurso (titulo, ubicacion) VALUES
// ('programa-matematicas.pdf', 'https://colegio-mallorca-publico.s3.sa-east-1.amazonaws.com/recursos/programa-matematicas.pdf'),
// ('programa-ciencias-naturales.pdf', 'https://colegio-mallorca-publico.s3.sa-east-1.amazonaws.com/recursos/programa-ciencias-naturales.pdf'),
// ('programa-educacion-fisica.pdf', 'https://colegio-mallorca-publico.s3.sa-east-1.amazonaws.com/recursos/programa-educacion-fisica.pdf'),
// ('programa-historia.pdf', 'https://colegio-mallorca-publico.s3.sa-east-1.amazonaws.com/recursos/programa-historia.pdf'),
// ('programa-ingles.pdf', 'https://colegio-mallorca-publico.s3.sa-east-1.amazonaws.com/recursos/programa-ingles.pdf'),
// ('programa-lenguaje.pdf', 'https://colegio-mallorca-publico.s3.sa-east-1.amazonaws.com/recursos/programa-lenguaje.pdf'),
// ('programa-musica.pdf', 'https://colegio-mallorca-publico.s3.sa-east-1.amazonaws.com/recursos/programa-musica.pdf'),
// ('programa-artistica.pdf', 'https://colegio-mallorca-publico.s3.sa-east-1.amazonaws.com/recursos/programa-artistica.pdf');

// INSERT INTO recurso (titulo, ubicacion) VALUES
// ('artistica1.pdf', 'https://colegio-mallorca-publico.s3.sa-east-1.amazonaws.com/recursos/artistica1.pdf'),
// ('ciencias-naturales1.pdf', 'https://colegio-mallorca-publico.s3.sa-east-1.amazonaws.com/recursos/ciencias-naturales1.pdf'),
// ('educacion-fisica1.pdf', 'https://colegio-mallorca-publico.s3.sa-east-1.amazonaws.com/recursos/educacion-fisica1.pdf'),
// ('historia1.pdf', 'https://colegio-mallorca-publico.s3.sa-east-1.amazonaws.com/recursos/historia1.pdf'),
// ('ingles1.pdf', 'https://colegio-mallorca-publico.s3.sa-east-1.amazonaws.com/recursos/ingles1.pdf'),
// ('lenguaje1.pdf', 'https://colegio-mallorca-publico.s3.sa-east-1.amazonaws.com/recursos/lenguaje1.pdf'),
// ('matematicas1.pdf', 'https://colegio-mallorca-publico.s3.sa-east-1.amazonaws.com/recursos/matematicas1.pdf'),
// ('musica1.pdf', 'https://colegio-mallorca-publico.s3.sa-east-1.amazonaws.com/recursos/musica1.pdf');

// INSERT INTO recurso_asignatura (id_recurso, id_asignatura) VALUES
// (1, 1),
// (2, 4),
// (3, 6),
// (4, 3),
// (5, 5),
// (6, 2),
// (7, 7),
// (8, 8);

// INSERT INTO recurso_clase (id_recurso, id_clase) VALUES
// ()

// INSERT INTO sala (codigo, capacidad) VALUES
// ('101', 20),
// ('102', 20),
// ('103', 20),
// ('104', 20),
// ('105', 20),
// ('106', 20);

// INSERT INTO bloque (dia, hora_inicio, hora_termino) VALUES
// ('lunes', '07:45:00', '08:30:00'),
// ('lunes', '08:30:00', '09:15:00'),
// ('lunes', '09:25:00', '10:10:00'),
// ('lunes', '10:10:00', '10:55:00'),
// ('lunes', '11:00:00', '11:45:00'),
// ('lunes', '11:45:00', '12:30:00'),
// ('lunes', '12:35:00', '13:20:00'),
// ('lunes', '13:20:00', '14:05:00'),
// ('martes', '07:45:00', '08:30:00'),
// ('martes', '08:30:00', '09:15:00'),
// ('martes', '09:25:00', '10:10:00'),
// ('martes', '10:10:00', '10:55:00'),
// ('martes', '11:00:00', '11:45:00'),
// ('martes', '11:45:00', '12:30:00'),
// ('martes', '12:35:00', '13:20:00'),
// ('martes', '13:20:00', '14:05:00');

// INSERT INTO clase_bloque_sala (id_bloque, id_sala, id_clase) VALUES
// (1, 1, 1),
// (2, 1, 1),
// (3, 1, 2),
// (4, 1, 2),
// (5, 1, 3),
// (6, 1, 3),
// (7, 1, 4),
// (8, 1, 4),
// (9, 1, 5),
// (10, 1, 5),
// (11, 1, 6),
// (12, 1, 6),
// (13, 1, 7),
// (14, 1, 7),
// (15, 1, 8),
// (16, 1, 8),

// (1, 2, 9),
// (2, 2, 9),
// (3, 2, 10),
// (4, 2, 10),
// (5, 2, 11),
// (6, 2, 11),
// (7, 2, 12),
// (8, 2, 12),
// (9, 2, 13),
// (10, 2, 13),
// (11, 2, 14),
// (12, 2, 14),
// (13, 2, 15),
// (14, 2, 15),
// (15, 2, 16),
// (16, 2, 16),

// (1, 3, 17),
// (2, 3, 17),
// (3, 3, 18),
// (4, 3, 18),
// (5, 3, 19),
// (6, 3, 19),
// (7, 3, 20),
// (8, 3, 20),
// (9, 3, 21),
// (10, 3, 21),
// (11, 3, 22),
// (12, 3, 22),
// (13, 3, 23),
// (14, 3, 23),
// (15, 3, 24),
// (16, 3, 24),

// (1, 4, 25),
// (2, 4, 25),
// (3, 4, 26),
// (4, 4, 26),
// (5, 4, 27),
// (6, 4, 27),
// (7, 4, 28),
// (8, 4, 28),
// (9, 4, 29),
// (10, 4, 29),
// (11, 4, 30),
// (12, 4, 30),
// (13, 4, 31),
// (14, 4, 31),
// (15, 4, 32),
// (16, 4, 32),

// (1, 5, 33),
// (2, 5, 33),
// (3, 5, 34),
// (4, 5, 34),
// (5, 5, 35),
// (6, 5, 35),
// (7, 5, 36),
// (8, 5, 36),
// (9, 5, 37),
// (10, 5, 37),
// (11, 5, 38),
// (12, 5, 38),
// (13, 5, 39),
// (14, 5, 39),
// (15, 5, 40),
// (16, 5, 40),

// (1, 6, 41),
// (2, 6, 41),
// (3, 6, 42),
// (4, 6, 42),
// (5, 6, 43),
// (6, 6, 43),
// (7, 6, 44),
// (8, 6, 44),
// (9, 6, 45),
// (10, 6, 45),
// (11, 6, 46),
// (12, 6, 46),
// (13, 6, 47),
// (14, 6, 47),
// (15, 6, 48),
// (16, 6, 48);

// */
