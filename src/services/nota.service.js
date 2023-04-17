import db from '../config/db.js';

// export async function createNota(nota, idAlumno, idClase) {
//   const [result] = await db.query(`
//       INSERT INTO nota 
//       (semestre, numero, porcentaje, 
//        calificacion, id_alumno, id_clase)
//       VALUES (1, ?, ?, ?, ?, ?)
//   `, [nota.numero, nota.porcentaje, nota.calificacion, 
//       idAlumno, idClase]);
//   const id = result.insertId;
//   return id;  // todo: return the entire object
// }

// for alumno
export async function getNotas(id) {
  const [result] = await db.query(`
    SELECT asignatura.nombre AS asignatura, nota.numero, 
    nota.porcentaje, nota.calificacion, 
    CONCAT(docente.nombres, ' ', docente.apellidos) AS docente
    FROM alumno 
    INNER JOIN nota ON alumno.id=nota.id_alumno
    INNER JOIN clase ON nota.id_clase=clase.id
    INNER JOIN asignatura ON clase.id_asignatura=asignatura.id
    INNER JOIN docente ON clase.id_docente=docente.id
    WHERE alumno.id=?
    `, [id]);
  const notas = result;
  return notas;
}
