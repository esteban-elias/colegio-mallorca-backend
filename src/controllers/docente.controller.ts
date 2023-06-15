import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as docenteServices from '../services/docente.service.js';
import { toLoginRequestBody } from './utils/validations.js';
import { LoginRequestBody, Payload } from '../types.js';

export async function login(req: Request, res: Response) {
  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
  if (JWT_SECRET === undefined || JWT_SECRET.trim() === '') {
    throw new Error('JWT_SECRET no definida');
  }
  if (JWT_EXPIRATION === undefined || JWT_EXPIRATION.trim() === '') {
    throw new Error('JWT_EXPIRATION no definida');
  }
  try {
    const loginRequestBody: LoginRequestBody = toLoginRequestBody(
      req.body
    );
    const idDocente = await docenteServices.login(loginRequestBody);
    const payload: Payload = { id: idDocente, role: 'docente' };
    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });
    res.cookie('token', token, {
      httpOnly: true,
    });
    res.json({ message: 'Login exitoso' });
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
}

export function getDocente(req, res) {
  res.json(req.docente);
}

export async function getClases(req, res) {// const { rut, contrasena } = req.body;
  // try {
  //   const docente = await docenteServices.login(rut, contrasena);
  //   const token = jwt.sign({ id: docente.id, role: 'docente' }, 
  //                           process.env.JWT_SECRET, {expiresIn: '1h'}) // 30m???
  //   res.cookie("token", token, {
  //       httpOnly: true
  //   })
  //   res.json(docente);
  // } catch (error) {
  //     res.status(401).json({message: error.message});
  // }

  const clases = await docenteServices.getClases(req.docente.id);
  res.json(clases);
}

export async function getRecursos(req, res) {
  const { idClase } = req.params;
  const recursos = await docenteServices.getRecursos(
    req.docente.id,
    idClase
  );
  res.json(recursos);
}

export async function getAlumnos(req, res) {
  const { idClase } = req.params;
  const alumnos = await docenteServices.getAlumnos(
    req.docente.id,
    idClase
  );
  res.json(alumnos);
}

export async function getNotas(req, res) {
  const { idClase } = req.params;
  const { idAlumno } = req.params;
  // Verificar que el alumno pertenezca a la clase del docente
  const alumnos = await docenteServices.getAlumnos(
    req.docente.id,
    idClase
  );
  const hasAlumno = alumnos.some((alumno) => alumno.id == idAlumno);
  if (!hasAlumno) {
    return res.status(403).json({ message: 'No autorizado' });
  }
  const notas = await docenteServices.getNotas(
    req.docente.id,
    idClase,
    idAlumno
  );
  res.json(notas);
}

export async function createNota(req, res) {
  const { idClase } = req.params;
  const { idAlumno } = req.params;
  const { nota } = req.body;
  // Verificar que el alumno pertenezca a la clase del docente
  const alumnos = await docenteServices.getAlumnos(
    req.docente.id,
    idClase
  );
  const hasAlumno = alumnos.some((alumno) => alumno.id == idAlumno);
  if (!hasAlumno) {
    return res.status(403).json({ message: 'No autorizado' });
  }
  const idNota = await docenteServices.createNota(
    idClase,
    idAlumno,
    nota
  );
  res.json({ id: idNota });
}
