import db from '../config/db.js';

export async function getRecursos(idClase) {
  const [result] = await db.query(`
    SELECT recurso.titulo, recurso.ubicacion
    FROM clase
    INNER JOIN recurso ON recurso.id_clase=clase.id
    WHERE id_clase=?
  `, [idClase]);
  const recursos = result;
  return recursos;
}

// for docente
// export async function getRecursos(idDocente, idClase) {
//   const [result] = await db.query(`
//     SELECT CONCAT(curso.nivel, ' ', curso.letra) as curso,
//     asignatura.nombre as asignatura, 
//     recurso.titulo, recurso.ubicacion
//     FROM docente   
//     WHERE id_clase=?
//   `, [idClase]);
//   const recursos = result;
//   return recursos;
// }