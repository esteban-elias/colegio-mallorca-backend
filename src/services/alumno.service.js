import bcrypt from 'bcrypt';
import db from '../config/db.js';

// export async function createAlumno(alumno) {
//     const {
//         rut,
//         dv,
//         apellidos,
//         nombres,
//         correo,
//         contrasena,
//         id_curso
//     } = alumno;

// }

export async function getAlumno(id) {
  const [result] = await db.query(`
    SELECT id, rut, dv, apellidos, nombres, correo, id_curso
    FROM alumno
    WHERE id = ?
    `, [id]);
  const alumno = result[0];
  return alumno;
}

// for docente
export async function getAlumnos(idDocente, idClase) {
  const [result] = await db.query(`
    SELECT alumno.apellidos, alumno.nombres, CONCAT(alumno.rut, '-', alumno.dv)
    FROM docente 
    INNER JOIN clase ON docente.id=clase.id_docente
    INNER JOIN curso ON clase.id_curso=curso.id
    INNER JOIN alumno ON curso.id=alumno.id_curso
    WHERE docente.id=? AND clase.id=?
  `, [idDocente, idClase]);
  const alumnos = result;
  return alumnos;
}

// export async function updateAlumno(id, alumno) {
    
// }

// export async function deleteAlumno(id) {
    
// }

export async function login(rut, contrasena) {
  const [result] = await db.query(`
    SELECT *
    FROM alumno
    WHERE rut = ?
    `, [rut]);
  const alumno = result[0];
  const isValidPassword = await 
    bcrypt.compare(contrasena, alumno.contrasena.toString('utf8'));
  if (!isValidPassword) {
    throw new Error('Credenciales inválidas');
  }
  return {
    id: alumno.id,
    rut: alumno.rut,
    dv: alumno.dv,
    apellidos: alumno.apellidos,
    nombres: alumno.nombres,
    correo: alumno.correo,
    id_curso: alumno.id_curso
  };
}
