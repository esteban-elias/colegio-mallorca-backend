import { Request, Response } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { JWT_EXPIRATION, JWT_SECRET } from '../config/env';
import * as docenteServices from '../services/docente.service';
import {
  DecodedToken,
  LoginRequestBody,
  NotaForCreation,
  NotaForUpdate,
  Payload,
} from '../types';
import {
  toLoginRequestBody,
  toNotaForCreation,
  toNotaForUpdate,
} from './utils/validations';

function assertReqDocente(
  req: Request
): asserts req is Request & { docente: DecodedToken } {
  if (req.docente === undefined) {
    throw new JsonWebTokenError('req.docente es undefined');
  }
}

export async function login(req: Request, res: Response) {
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
}

export async function getDocente(req: Request, res: Response) {
  assertReqDocente(req);
  const docente = await docenteServices.getDocenteById(req.docente.id);
  res.json(docente);
}

export async function getClases(req: Request, res: Response) {
  assertReqDocente(req);
  const clases = await docenteServices.getClasesByDocenteId(
    req.docente.id
  );
  res.json(clases);
}

export async function getRecursos(req: Request, res: Response) {
  assertReqDocente(req);
  const idClase = parseInt(req.params.idClase);
  const recursos = await docenteServices.getRecursosByClaseId(idClase);
  res.json(recursos);
}

export async function getAlumnos(req: Request, res: Response) {
  assertReqDocente(req);
  const idClase = parseInt(req.params.idClase);
  const alumnos = await docenteServices.getAlumnosByClaseId(idClase);
  res.json(alumnos);
}

export async function getNotasOfAlumno(req: Request, res: Response) {
  assertReqDocente(req);
  const idAlumno = parseInt(req.params.idAlumno);
  const idClase = parseInt(req.params.idClase);
  const notas = await docenteServices.getNotasByAlumnoIdAndClaseId(
    idAlumno,
    idClase
  );
  res.json(notas);
}

export async function createNota(req: Request, res: Response) {
  assertReqDocente(req);
  const idAlumno = parseInt(req.params.idAlumno);
  const idClase = parseInt(req.params.idClase);
  const idAsignatura = await docenteServices.getAsignaturaIdByClaseId(
    idClase
  );
  const nota: NotaForCreation = toNotaForCreation({
    ...req.body,
    idAlumno,
    idAsignatura,
  });
  const idNota = await docenteServices.createNota(nota);
  res.json({ message: 'Nota creada exitosamente. ID:', idNota });
}

export async function getHorario(req: Request, res: Response) {
  assertReqDocente(req);
  const horario = await docenteServices.getHorarioByDocenteId(
    req.docente.id
  );
  res.json(horario);
}

export async function updateNota(req: Request, res: Response) {
  assertReqDocente(req);
  const idNota = parseInt(req.params.idNota);
  const nota: NotaForUpdate = toNotaForUpdate(req.body);
  await docenteServices.updateNota(idNota, nota);
  res.json({ message: 'Nota actualizada exitosamente' });
}
