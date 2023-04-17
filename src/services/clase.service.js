import db from '../config/db.js';


export async function getClases(userType, id) {
  if (userType === 'alumno') {
    const [result] = await db.query(`
      SELECT clase.id, asignatura.nombre as asignatura
      FROM alumno
      INNER JOIN curso ON alumno.id_curso=curso.id
      INNER JOIN clase ON curso.id=clase.id_curso
      INNER JOIN asignatura ON clase.id_asignatura=asignatura.id
      WHERE alumno.id=?
    `, [id]);
    const clases = result;
    return clases;
  } else if (userType === 'docente') {
    const [result] = await db.query(`
      SELECT clase.id, concat(curso.nivel, ' ', curso.letra) as curso,
      asignatura.nombre as asignatura
      FROM docente
      INNER JOIN clase on docente.id=clase.id_docente
      INNER JOIN asignatura on clase.id_asignatura=asignatura.id
      INNER JOIN curso on clase.id_curso=curso.id
      WHERE docente.id=?
    `, [id]);
    const clases = result;
    return clases;
  }
}

