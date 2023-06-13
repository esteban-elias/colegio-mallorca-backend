import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';
import db from '../config/db';
import {
  AlumnoForSelf,
  AlumnoForLogin,
  Nota,
  ClaseForAlumno,
  Recurso,
} from '../types';

export async function login(
  rut: string,
  contrasena: string
): Promise<AlumnoForSelf> {
  const [result] = (await db.query(
    `
    SELECT rut, dv, apellidos, nombres, correo, telefono,
    foto_ubicacion, contresena
    FROM alumno
    WHERE rut = ?
    `,
    [rut]
  )) as Array<RowDataPacket>;
  const alumno: AlumnoForLogin | undefined = result[0];
  if (alumno === undefined) {
    throw new Error('Alumno no encontrado');
  }
  const isValidPassword = await bcrypt.compare(
    contrasena,
    alumno.contrasena.toString('utf8')
  );
  if (!isValidPassword) {
    throw new Error('Contraseña incorrecta');
  }
  return {
    rut: alumno.rut,
    dv: alumno.dv,
    apellidos: alumno.apellidos,
    nombres: alumno.nombres,
    correo: alumno.correo,
    telefono: alumno.telefono,
    foto_ubicacion: alumno.foto_ubicacion,
  };
}

export async function getAlumnoById(
  id: number
): Promise<AlumnoForSelf> {
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
    throw new Error('Alumno no encontrado');
  }
  return {
    rut: alumno.rut,
    dv: alumno.dv,
    apellidos: alumno.apellidos,
    nombres: alumno.nombres,
    correo: alumno.correo,
    telefono: alumno.telefono,
    foto_ubicacion: alumno.foto_ubicacion,
  };
}

export async function getNotasByAlumnoId(
  id: number
): Promise<Array<Nota>> {
  const [result] = (await db.query(
    `
    select asignatura.nombre, nota.numero, nota.porcentaje,
    nota.calificacion
    from alumno 
    inner join nota on alumno.id=nota.id_alumno
    inner join asignatura on nota.id_asignatura=asignatura.id
    where alumno.id = ?
    `,
    [id]
  )) as Array<RowDataPacket>;
  if (result.length === 0) {
    throw new Error('Alumno no encontrado o sin notas registradas');
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

export async function getClasesByAlumnoId(
  id: number
): Promise<Array<ClaseForAlumno>> {
  const [result] = (await db.query(
    `
    select clase.id, asignatura.nombre as asignatura
    from alumno
    inner join alumno_curso on alumno.id=alumno_curso.id_alumno
    inner join curso on alumno_curso.id_curso=curso.id
    inner join clase on curso.id=clase.id_curso
    inner join asignatura on clase.id_asignatura=asignatura.id
    where alumno.id = ?
    `,
    [id]
  )) as Array<RowDataPacket>;
  if (result.length === 0) {
    throw new Error('Alumno no encontrado o sin clases registradas');
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

export async function getRecursosByClaseId(
  id: number
): Promise<Array<Recurso>> {
  const [result]: Array<RowDataPacket> = (await db.query(
    `
    select recurso.titulo, recurso.ubicacion
    from clase
    inner join recurso_clase on clase.id=recurso_clase.id_clase
    inner join recurso on recurso_clase.id_recurso=recurso.id
    where clase.id = ?
    `,
    [id]
  )) as Array<RowDataPacket>;
  if (result.length === 0) {
    throw new Error(
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

export async function getRecursosByAsignaturaId(
  id: number
): Promise<Array<Recurso>> {
  const [result]: Array<RowDataPacket> = (await db.query(
    `
    select recurso.titulo, recurso.ubicacion
    from asignatura
    inner join recurso_asignatura on 
    asignatura.id=recurso_asignatura.id_asignatura
    inner join recurso on recurso_asignatura.id_recurso=recurso.id
    where asignatura.id = ?
    `,
    [id]
  )) as Array<RowDataPacket>;
  if (result.length === 0) {
    throw new Error(
      'Asignatura no encontrada o sin recursos registrados'
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
