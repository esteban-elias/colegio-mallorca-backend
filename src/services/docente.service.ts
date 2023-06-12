import bcrypt from 'bcrypt';
import db from '../config/db';


export async function login(rut, contrasena) {
  const [result] = await db.query(`
    SELECT *
    FROM docente
    WHERE rut = ?
    `, [rut]);
  const docente = result[0];
  const isValidPassword = await bcrypt.compare(contrasena, docente.contrasena.toString('utf8'));
  if (!isValidPassword) {
    throw new Error('Credenciales inválidas');
  }
  return {
    id: docente.id,
    rut: docente.rut,
    dv: docente.dv,
    apellidos: docente.apellidos,
    nombres: docente.nombres,
    correo: docente.correo
  };
}

export async function getDocente(id) {
  const [result] = await db.query(`
    SELECT id, concat(rut, '-', dv) AS rut, apellidos, nombres, correo
    FROM docente
    WHERE id = ?
  `, [id]);
  const docente = result[0];
  return docente;
}

export async function getClases(id) {
  const [result] = await db.query(`
    SELECT clase.id, concat(curso.nivel, ' ', curso.letra) AS curso,
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

export async function getRecursos(idDocente, idClase) {
  const [result] = await db.query(`
    SELECT recurso.titulo, recurso.ubicacion
    FROM docente
    INNER JOIN clase ON docente.id=clase.id_docente
    INNER JOIN recurso ON clase.id=recurso.id_clase
    WHERE docente.id=? AND clase.id=?
  `, [idDocente, idClase]);
  const recursos = result;
  return recursos;
}

export async function getAlumnos(idDocente, idClase) {
    const [result] = await db.query(`
      SELECT alumno.id, alumno.apellidos, alumno.nombres,
      CONCAT(alumno.rut, '-', alumno.dv) AS rut
      FROM alumno
      INNER JOIN curso ON alumno.id_curso=curso.id
      INNER JOIN clase ON curso.id=clase.id_curso
      INNER JOIN docente ON clase.id_docente=docente.id
      WHERE docente.id=? AND clase.id=?
    `, [idDocente, idClase]);
    const alumnos = result;
    return alumnos;
}

export async function getNotas(idDocente, idClase, idAlumno) {
  const [result] = await db.query(`
    SELECT nota.numero, nota.porcentaje, nota.calificacion
    FROM nota
    INNER JOIN alumno ON nota.id_alumno=alumno.id
    INNER JOIN curso ON alumno.id_curso=curso.id
    INNER JOIN clase ON curso.id=clase.id_curso
    INNER JOIN docente ON clase.id_docente=docente.id
    WHERE docente.id=? AND nota.id_clase=? AND alumno.id=?
  `, [idDocente, idClase, idAlumno]);
  const notas = result;
  return notas;
}

// El semestre, por ahora, está hardcodeado en 1
export async function createNota(idClase, idAlumno, nota) {
  const [result] = await db.query(`
    INSERT INTO nota (numero, porcentaje, calificacion, 
                      semestre, id_alumno, id_clase)
    VALUES (?, ?, ?, ?, ?, ?);
  `, [nota.numero, nota.porcentaje, 
      nota.calificacion, 1, idAlumno, idClase]);
  const id = result.insertId;
  return id;
}
