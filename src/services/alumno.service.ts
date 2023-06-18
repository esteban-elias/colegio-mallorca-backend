import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';
import db from '../config/db';
import { SEMESTER, YEAR } from '../config/env';
import { LoginError, NotFoundError } from '../errors/custom-errors';
import {
  AlumnoForLogin,
  AlumnoForSelf,
  BloqueHorarioForAlumno,
  ClaseForAlumno,
  LoginRequestBody,
  Nota,
  Recurso,
} from '../types';

export async function login(loginRequestBody: LoginRequestBody) {
  const [result] = (await db.query(
    `
    SELECT id, contrasena
    FROM alumno
    WHERE rut = ?
    `,
    [loginRequestBody.rut]
  )) as Array<RowDataPacket>;
  const alumno: AlumnoForLogin | undefined = result[0];
  if (alumno === undefined) {
    throw new LoginError('Alumno no encontrado');
  }
  const isValidPassword = await bcrypt.compare(
    loginRequestBody.contrasena,
    alumno.contrasena.toString('utf8')
  );
  if (!isValidPassword) {
    throw new LoginError('Contraseña incorrecta');
  }
  return alumno.id;
}

export async function getAlumnoById(id: number) {
  const [result] = (await db.query(
    `
    SELECT rut, dv, apellidos, nombres, correo, telefono, 
    foto_ubicacion 
    FROM alumno
    WHERE id = ?
    `,
    [id]
  )) as Array<RowDataPacket>;
  const alumno: AlumnoForSelf | undefined = result[0];
  if (alumno === undefined) {
    throw new NotFoundError('Alumno no encontrado');
  }
  return alumno;
}

export async function getNotasByAlumnoId(id: number) {
  const [result] = (await db.query(
    `
    select asignatura.nombre, nota.numero, nota.porcentaje,
    nota.calificacion
    from alumno 
    inner join nota on alumno.id=nota.id_alumno
    inner join asignatura on nota.id_asignatura=asignatura.id
    where alumno.id = ? and nota.ano = ? and nota.semestre = ?
    `,
    [id, YEAR, SEMESTER]
  )) as Array<RowDataPacket>;
  if (result.length === 0) {
    throw new NotFoundError(
      'Alumno no encontrado o sin notas registradas'
    );
  }
  const notas: Array<Nota> = result.map((nota: RowDataPacket) => {
    return {
      asignatura: nota.nombre,
      numero: nota.numero,
      porcentaje: nota.porcentaje,
      calificacion: nota.calificacion,
    };
  });
  return notas;
}

export async function getClasesByAlumnoId(id: number) {
  const [result] = (await db.query(
    `
    select clase.id, asignatura.nombre as asignatura, 
    concat(docente.nombres, ' ', docente.apellidos) as docente
    from alumno
    inner join alumno_curso on alumno.id=alumno_curso.id_alumno
    inner join curso on alumno_curso.id_curso=curso.id
    inner join clase on curso.id=clase.id_curso
    inner join asignatura on clase.id_asignatura=asignatura.id
    inner join docente on clase.id_docente=docente.id
    where alumno.id = ? and clase.ano = ?
    `,
    [id, YEAR]
  )) as Array<RowDataPacket>;
  if (result.length === 0) {
    throw new NotFoundError(
      'Alumno no encontrado o sin clases registradas'
    );
  }
  const clases: Array<ClaseForAlumno> = result.map(
    (clase: RowDataPacket) => {
      return {
        id: clase.id,
        asignatura: clase.asignatura,
      };
    }
  );
  return clases;
}

export async function getRecursosByClaseId(id: number) {
  const [result]: Array<RowDataPacket> = (await db.query(
    `
    select recurso.titulo, recurso.ubicacion
    from clase
    inner join recurso_clase on clase.id=recurso_clase.id_clase
    inner join recurso on recurso_clase.id_recurso=recurso.id
    where clase.id = ? and clase.ano = ?
    union
    select recurso.titulo, recurso.ubicacion
    from clase
    inner join asignatura on clase.id_asignatura=asignatura.id
    inner join recurso_asignatura on asignatura.id=recurso_asignatura.id_asignatura
    inner join recurso on recurso_asignatura.id_recurso=recurso.id
    where clase.id = ? and clase.ano = ?
    `,
    [id, YEAR, id, YEAR]
  )) as Array<RowDataPacket>;
  if (result.length === 0) {
    throw new NotFoundError(
      'Clase no encontrada o sin recursos registrados'
    );
  }
  const recursos: Array<Recurso> = result.map(
    (recurso: RowDataPacket) => {
      return {
        titulo: recurso.titulo,
        ubicacion: recurso.ubicacion,
      };
    }
  );
  return recursos;
}

export async function getHorarioByAlumnoId(id: number) {
  const [result]: Array<RowDataPacket> = (await db.query(
    `
    select bloque.dia, bloque.hora_inicio, bloque.hora_termino,
    sala.codigo as sala, asignatura.nombre as asignatura,
    concat(docente.nombres, ' ', docente.apellidos) as docente
    from alumno
    inner join alumno_curso on alumno.id=alumno_curso.id_alumno
    inner join curso on alumno_curso.id_curso=curso.id
    inner join clase on curso.id=clase.id_curso
    inner join asignatura on clase.id_asignatura=asignatura.id
    inner join docente on clase.id_docente=docente.id
    inner join clase_bloque_sala on clase.id=clase_bloque_sala.id_clase
    inner join bloque on clase_bloque_sala.id_bloque=bloque.id
    inner join sala on clase_bloque_sala.id_sala=sala.id
    where alumno.id = ? and clase.ano = ?
    ORDER BY 
    CASE 
        WHEN bloque.dia = 'lunes' THEN 1
        WHEN bloque.dia = 'martes' THEN 2
        WHEN bloque.dia = 'miercoles' THEN 3
        WHEN bloque.dia = 'jueves' THEN 4
        WHEN bloque.dia = 'viernes' THEN 5
    END, 
    bloque.hora_inicio
    `,
    [id, YEAR]
  )) as Array<RowDataPacket>;
  if (result.length === 0) {
    throw new NotFoundError(
      'Alumno no encontrado o sin horario registrado'
    );
  }
  const horario: Array<BloqueHorarioForAlumno> = result.map(
    (bloque: RowDataPacket) => {
      return {
        dia: bloque.dia,
        hora_inicio: bloque.hora_inicio,
        hora_termino: bloque.hora_termino,
        sala: bloque.sala,
        asignatura: bloque.asignatura,
        docente: bloque.docente,
      };
    }
  );
  return horario;
}
