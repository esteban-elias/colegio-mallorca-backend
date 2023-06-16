import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as alumnoServices from '../services/alumno.service';
import { toLoginRequestBody } from './utils/validations';
import { LoginRequestBody, Payload } from '../types';
import { JWT_EXPIRATION, JWT_SECRET } from '../config/env';

export async function login(req: Request, res: Response) {
  try {
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
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
}

export async function getAlumno(req: Request, res: Response) {
  try {
    if (req.alumno === undefined) {
      throw new Error('No autorizado');
    }
    const alumno = await alumnoServices.getAlumnoById(req.alumno.id);
    res.json(alumno);
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
}

export async function getNotas(req: Request, res: Response) {
  try {
    if (req.alumno === undefined) {
      throw new Error('No autorizado');
    }
    const notas = await alumnoServices.getNotasByAlumnoId(
      req.alumno.id
    );
    res.json(notas);
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
}

export async function getClases(req: Request, res: Response) {
  try {
    if (req.alumno === undefined) {
      throw new Error('No autorizado');
    }
    const clases = await alumnoServices.getClasesByAlumnoId(
      req.alumno.id
    );
    res.json(clases);
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
}

export async function getRecursos(req: Request, res: Response) {
  try {
    if (req.alumno === undefined) {
      throw new Error('No autorizado');
    }
    const idClase = parseInt(req.params.idClase);
    const recursos = await alumnoServices.getRecursosByClaseId(idClase);
    res.json(recursos);
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
}

export async function getHorario(req: Request, res: Response) {
  try {
    if (req.alumno === undefined) {
      throw new Error('No autorizado');
    }
    const horario = await alumnoServices.getHorarioByAlumnoId(
      req.alumno.id
    );
    res.json(horario);
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
}
