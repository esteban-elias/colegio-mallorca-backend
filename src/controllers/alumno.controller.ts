import { Request, Response } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { JWT_EXPIRATION, JWT_SECRET } from '../config/env';
import * as alumnoServices from '../services/alumno.service';
import { DecodedToken, LoginRequestBody, Payload } from '../types';
import { toLoginRequestBody } from './utils/validations';

/**
 * Arroja un error si req.alumno es undefined.
 */
function assertReqAlumno(
  req: Request
): asserts req is Request & { alumno: DecodedToken } {
  if (req.alumno === undefined) {
    throw new JsonWebTokenError('req.alumno es undefined');
  }
}

export async function login(req: Request, res: Response) {
  const loginRequestBody: LoginRequestBody = toLoginRequestBody(
    req.body
  );
  const idAlumno = await alumnoServices.login(loginRequestBody);
  const payload: Payload = { id: idAlumno, role: 'alumno' };
  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
  res.cookie('token', token, {
    httpOnly: true,
  });
  res.json({ message: 'Login exitoso' });
}

export async function getAlumno(req: Request, res: Response) {
  assertReqAlumno(req);
  const alumno = await alumnoServices.getAlumnoById(req.alumno.id);
  res.json(alumno);
}

export async function getNotas(req: Request, res: Response) {
  assertReqAlumno(req);
  const notas = await alumnoServices.getNotasByAlumnoId(req.alumno.id);
  res.json(notas);
}

export async function getClases(req: Request, res: Response) {
  assertReqAlumno(req);
  const clases = await alumnoServices.getClasesByAlumnoId(
    req.alumno.id
  );
  res.json(clases);
}

export async function getRecursos(req: Request, res: Response) {
  assertReqAlumno(req);
  const idClase = parseInt(req.params.idClase);
  const recursos = await alumnoServices.getRecursosByClaseId(idClase);
  res.json(recursos);
}

export async function getHorario(req: Request, res: Response) {
  assertReqAlumno(req);
  const horario = await alumnoServices.getHorarioByAlumnoId(
    req.alumno.id
  );
  res.json(horario);
}
