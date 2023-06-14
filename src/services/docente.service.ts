import bcrypt from 'bcrypt';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import db from '../config/db';
import {
  AlumnoForDocente,
  ClaseForDocente,
  DocenteForLogin,
  DocenteForSelf,
  Nota,
  NotaForCreation,
  Recurso,
  LoginRequestBody
} from '../types';

/**
 * Autentica a un docente utilizando su RUT y contraseña.
 * @param rut - El RUT del docente. Este es un string que representa el Rol Único Tributario del docente.
 * @param contrasena - La contraseña del docente. Esta es una cadena de texto que representa la contraseña del docente.
 * @returns - Si la autenticación es exitosa, devuelve el ID del docente como una promesa de número. Si el docente no se encuentra, o la contraseña es incorrecta, se lanza un error.
 *
 * @throws {Error} Si el docente no se encuentra en la base de datos, se lanza un error con el mensaje 'Docente no encontrado'.
 * @throws {Error} Si la contraseña proporcionada no coincide con la registrada en la base de datos, se lanza un error con el mensaje 'Contraseña incorrecta'.
 */
export async function login(
  loginRequestBody: LoginRequestBody
): Promise<number> {
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
    throw new Error('Docente no encontrado');
  }
  const isValidPassword = await bcrypt.compare(
    loginRequestBody.contrasena,
    docente.contrasena.toString('utf8')
  );
  if (!isValidPassword) {
    throw new Error('Contraseña incorrecta');
  }
  return docente.id;
}

export async function getDocenteById(
  id: number
): Promise<DocenteForSelf> {
  const [result]: Array<RowDataPacket> = (await db.query(
    `
    SELECT rut, dv, apellidos, nombres,
    correo, telefono, foto_ubicacion 
    FROM docente 
    WHERE id = ?
    `,
    [id]
  )) as Array<RowDataPacket>;
  const docente: DocenteForSelf | undefined = result[0];
  if (docente === undefined) {
    throw new Error('docente no encontrado');
  }
  return {
    rut: docente.rut,
    dv: docente.dv,
    apellidos: docente.apellidos,
    nombres: docente.nombres,
    correo: docente.correo,
    telefono: docente.telefono,
    foto_ubicacion: docente.foto_ubicacion,
  };
}

export async function getClasesByDocenteId(
  id: number
): Promise<Array<ClaseForDocente>> {
  const [result]: Array<RowDataPacket> = (await db.query(
    `
    select clase.id, asignatura.nombre as asignatura,
    concat(curso.nivel, curso.letra) as curso
    from clase
    inner join asignatura on clase.id_asignatura=asignatura.id
    inner join curso on clase.id_curso=curso.id
    inner join docente on clase.id_docente=docente.id
    where docente.id = ?
    `,
    [id]
  )) as Array<RowDataPacket>;
  if (result.length === 0) {
    throw new Error('Docente no encontrado o sin clases registradas');
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
    throw new Error('Clase no encontrada o sin recursos registrados');
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

export async function getAlumnosByClaseId(
  id: number
): Promise<Array<AlumnoForDocente>> {
  const [result] = (await db.query(
    `
    select alumno.apellidos, alumno.nombres, alumno.correo,
    alumno.foto_ubicacion
    from clase
    inner join curso on clase.id_curso=curso.id
    inner join alumno_curso on curso.id=alumno_curso.id_curso
    inner join alumno on alumno_curso.id_alumno=alumno.id
    where clase.id = ?`,
    [id]
  )) as Array<RowDataPacket>;
  if (result.length === 0) {
    throw new Error('Clase no encontrada o sin alumnos registrados');
  }
  const alumnos: Array<AlumnoForDocente> = result.map(
    (alumno: RowDataPacket) => {
      return {
        apellidos: alumno.apellidos,
        nombres: alumno.nombres,
        correo: alumno.correo,
        foto_ubicacion: alumno.foto_ubicacion,
      };
    }
  );
  return alumnos;
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

export async function createNota(
  nota: NotaForCreation
): Promise<number> {
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
      nota.ano,
      nota.semestre,
      nota.id_alumno,
      nota.id_asignatura,
    ]
  )) as Array<ResultSetHeader>;
  const id: number | undefined = result.insertId;
  if (id === undefined) {
    throw new Error('Error al crear nota');
  }
  return id;
}
