import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';
import db from '../config/db.js';
import { Alumno } from '../types.js';


export async function login(rut: string, contrasena: string): Promise<Alumno> {
  const [result]: Array<RowDataPacket> = await db.query(`
    SELECT *
    FROM alumno
    WHERE rut = ?
    `, [rut]) as Array<RowDataPacket>;
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
    telefono: alumno.telefono,
    fecha_nacimiento: alumno.fecha_nacimiento,
    foto_ubicacion: alumno.foto_ubicacion,
    direccion: alumno.direccion,
  };
}

export async function getAlumno(id: number) {
  const [result] = await db.query(`
    SELECT id, concat(rut, '-', dv) AS rut, apellidos, nombres, correo, id_curso
    FROM alumno
    WHERE id = ?
    `, [id]);
  const alumno = result[0];
  return alumno;
}

export async function getNotas(id: number) {
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

export async function getClases(id: number) {
  const [result] = await db.query(`
    SELECT clase.id, asignatura.nombre AS asignatura
    FROM alumno
    INNER JOIN curso ON alumno.id_curso=curso.id
    INNER JOIN clase ON curso.id=clase.id_curso
    INNER JOIN asignatura ON clase.id_asignatura=asignatura.id
    WHERE alumno.id=?
  `, [id]);
  const clases = result;
  return clases;
}

export async function getRecursos(idAlumno: number, idClase: number) {
  const [result] = await db.query(`
    SELECT recurso.titulo, recurso.ubicacion
    FROM alumno
    INNER JOIN curso ON alumno.id_curso=curso.id
    INNER JOIN clase ON curso.id=clase.id_curso
    INNER JOIN recurso ON clase.id=recurso.id_clase
    WHERE alumno.id=? AND clase.id=?
  `, [idAlumno, idClase]);
  const recursos = result;
  return recursos;
}