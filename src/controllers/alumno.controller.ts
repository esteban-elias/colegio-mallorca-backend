import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as alumnoServices from '../services/alumno.service';
import { toLoginRequestBody } from './utils/validations';
import { LoginRequestBody, Payload } from '../types';

export async function login(
  req: Request,
  res: Response
): Promise<void> {
  const JWT_SECRET = process.env.JWT_SECRET;
  const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
  if (JWT_SECRET === undefined || JWT_SECRET.trim() === '') {
    throw new Error('JWT_SECRET no definida');
  }
  if (JWT_EXPIRATION === undefined || JWT_EXPIRATION.trim() === '') {
    throw new Error('JWT_EXPIRATION no definida');
  }
  try {
    const loginRequestBody: LoginRequestBody = toLoginRequestBody(req.body);
    const idAlumno = await alumnoServices.login(loginRequestBody);
    const payload: Payload = { id: idAlumno, role: 'alumno' };
    const token = jwt.sign(
      payload,
      JWT_SECRET,
      { expiresIn: JWT_EXPIRATION }
    );
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

export function getAlumno(req: Request, res: Response) {
  const alumno = req.alumno;
  res.json(alumno);
}

export async function getNotas(req: Request, res: Response) {
  const notas = await alumnoServices.getNotas(req.alumno.id);
  res.json(notas);
}

export async function getClases(req: Request, res: Response) {
  const clases = await alumnoServices.getClases(req.alumno.id);
  res.json(clases);
}

export async function getRecursos(req: Request, res: Response) {
  const { idClase } = req.params;
  const recursos = await alumnoServices.getRecursos(
    req.alumno.id,
    idClase
  );
  res.json(recursos);
}
