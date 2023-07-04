import bcrypt from 'bcrypt';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import db from '../config/db';
import { SEMESTER, YEAR } from '../config/env';
import { LoginError, NotFoundError } from '../errors/custom-errors';
import {
  AlumnoForDocente,
  BloqueHorarioForDocente,
  ClaseForDocente,
  DocenteForLogin,
  DocenteForSelf,
  LoginRequestBody,
  Nota,
  NotaForCreation,
  NotaForUpdate,
  Recurso,
} from '../types';

export async function login(loginRequestBody: LoginRequestBody) {
  const [result]: Array<RowDataPacket> = (await db.query(
    `
    SELECT id, contrasena
    FROM docente
    WHERE rut = ?
    `,
    [loginRequestBody.rut]
  )) as Array<RowDataPacket>;
  const docente: DocenteForLogin | undefined = result[0];
  if (docente === undefined) {
    throw new LoginError('Docente no encontrado');
  }
  const isValidPassword = await bcrypt.compare(
    loginRequestBody.contrasena,
    docente.contrasena.toString('utf8')
  );
  if (!isValidPassword) {
    throw new LoginError('Contraseña incorrecta');
  }
  return docente.id;
}

export async function getDocenteById(id: number) {
  const [result]: Array<RowDataPacket> = (await db.query(
    `
    SELECT rut, dv, apellidos, nombres,
    correo, telefono, foto_ubicacion, fecha_nacimiento, direccion
    FROM docente 
    WHERE id = ?
    `,
    [id]
  )) as Array<RowDataPacket>;
  const docente: DocenteForSelf | undefined = result[0];
  if (docente === undefined) {
    throw new NotFoundError('Docente no encontrado');
  }
  return docente;
}

export async function getClasesByDocenteId(id: number) {
  const [result]: Array<RowDataPacket> = (await db.query(
    `
    select clase.id, asignatura.nombre as asignatura,
    concat(curso.nivel, curso.letra) as curso
    from clase
    inner join asignatura on clase.id_asignatura=asignatura.id
    inner join curso on clase.id_curso=curso.id
    inner join docente on clase.id_docente=docente.id
    where docente.id = ? and clase.ano = ?
    `,
    [id, YEAR]
  )) as Array<RowDataPacket>;
  if (result.length === 0) {
    throw new NotFoundError(
      'Docente no encontrado o sin clases registradas'
    );
  }
  const clases: Array<ClaseForDocente> = result.map(
    (clase: RowDataPacket) => {
      return {
        id: clase.id,
        asignatura: clase.asignatura,
        curso: clase.curso,
      };
    }
  );
  return clases;
}

export async function getRecursosByClaseId(id: number) {
  const [result]: Array<RowDataPacket> = (await db.query(
    `
    select recurso.id, recurso.titulo, recurso.ubicacion
    from clase
    inner join recurso_clase on clase.id=recurso_clase.id_clase
    inner join recurso on recurso_clase.id_recurso=recurso.id
    where clase.id = ? and clase.ano = ?
    union
    select recurso.id, recurso.titulo, recurso.ubicacion
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
        id: recurso.id,
        titulo: recurso.titulo,
        ubicacion: recurso.ubicacion,
      };
    }
  );
  return recursos;
}

export async function getAlumnosByClaseId(id: number) {
  const [result] = (await db.query(
    `
    select alumno.id, alumno.apellidos, alumno.nombres, alumno.correo,
    alumno.foto_ubicacion
    from clase
    inner join curso on clase.id_curso=curso.id
    inner join alumno_curso on curso.id=alumno_curso.id_curso
    inner join alumno on alumno_curso.id_alumno=alumno.id
    where clase.id = ? and clase.ano = ?
    `,
    [id, YEAR]
  )) as Array<RowDataPacket>;
  if (result.length === 0) {
    throw new NotFoundError(
      'Clase no encontrada o sin alumnos registrados'
    );
  }
  const alumnos: Array<AlumnoForDocente> = result.map(
    (alumno: RowDataPacket) => {
      return {
        id: alumno.id,
        apellidos: alumno.apellidos,
        nombres: alumno.nombres,
        correo: alumno.correo,
        foto_ubicacion: alumno.foto_ubicacion,
      };
    }
  );
  return alumnos;
}

export async function getNotasByAlumnoIdAndClaseId(
  idAlumno: number,
  idClase: number
) {
  const [result] = (await db.query(
    `
    select nota.id, asignatura.nombre, nota.numero, nota.porcentaje,
    nota.calificacion
    from alumno 
    inner join nota on alumno.id=nota.id_alumno
    inner join asignatura on nota.id_asignatura=asignatura.id
    inner join clase on asignatura.id = clase.id_asignatura
    where alumno.id = ? and clase.id = ? and nota.ano = ? and nota.semestre = ?
    `,
    [idAlumno, idClase, YEAR, SEMESTER]
  )) as Array<RowDataPacket>;
  if (result.length === 0) {
    throw new NotFoundError(
      'Alumno no encontrado o sin notas registradas'
    );
  }
  const notas: Array<Nota> = result.map((nota: RowDataPacket) => {
    return {
      id: nota.id,
      asignatura: nota.nombre,
      numero: nota.numero,
      porcentaje: nota.porcentaje,
      calificacion: nota.calificacion,
    };
  });
  return notas;
}

export async function createNota(nota: NotaForCreation) {
  const [result] = (await db.query(
    `
    insert into nota (numero, porcentaje, calificacion, ano,
    semestre, id_alumno, id_asignatura)
    values (?, ?, ?, ?, ?, ?, ?)
    `,
    [
      nota.numero,
      nota.porcentaje,
      nota.calificacion,
      YEAR,
      SEMESTER,
      nota.idAlumno,
      nota.idAsignatura,
    ]
  )) as Array<ResultSetHeader>;
  const id: number | undefined = result.insertId;
  if (id === undefined) {
    throw new Error('Error al crear nota');
  }
  return id;
}

export async function updateNota(idNota: number, nota: NotaForUpdate) {
  console.log(nota);
  const [result] = (await db.query(
    `
    update nota
    set
    numero = coalesce(?, numero),
    porcentaje = coalesce(?, porcentaje),
    calificacion = coalesce(?, calificacion)
    where id = ?
    `,
    [nota.numero, nota.porcentaje, nota.calificacion, idNota]
  )) as Array<ResultSetHeader>;
  if (result.affectedRows === 0) {
    throw new NotFoundError('Nota no encontrada');
  }
}

export async function getAsignaturaIdByClaseId(id: number) {
  const [result] = (await db.query(
    `
    select asignatura.id
    from clase
    inner join asignatura on clase.id_asignatura=asignatura.id
    where clase.id = ?
    `,
    [id]
  )) as Array<RowDataPacket>;
  if (result.length === 0) {
    throw new NotFoundError('Clase no encontrada');
  }
  const idAsignatura: number | undefined = result[0].id;
  if (idAsignatura === undefined) {
    throw new Error('Error al obtener asignatura');
  }
  return idAsignatura;
}

export async function getHorarioByDocenteId(id: number) {
  const [result] = (await db.query(
    `
    select bloque.dia, bloque.hora_inicio, bloque.hora_termino,
    sala.codigo as sala, asignatura.nombre as asignatura,
    concat(curso.nivel, curso.letra) as curso
    from docente
    inner join clase on docente.id=clase.id_docente
    inner join asignatura on clase.id_asignatura=asignatura.id
    inner join curso on clase.id_curso=curso.id
    inner join clase_bloque_sala on clase.id=clase_bloque_sala.id_clase
    inner join bloque on clase_bloque_sala.id_bloque=bloque.id
    inner join sala on clase_bloque_sala.id_sala=sala.id
    where docente.id = ? and clase.ano = ?
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
    throw new NotFoundError('Docente no encontrado o sin clases');
  }
  const horario: Array<BloqueHorarioForDocente> = result.map(
    (clase: RowDataPacket) => {
      return {
        dia: clase.dia,
        hora_inicio: clase.hora_inicio,
        hora_termino: clase.hora_termino,
        sala: clase.sala,
        asignatura: clase.asignatura,
        curso: clase.curso,
      };
    }
  );
  return horario;
}
