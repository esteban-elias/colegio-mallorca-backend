import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as docenteServices from '../services/docente.service';
import {
  toLoginRequestBody,
  toNotaForCreation,
} from './utils/validations';
import {
  LoginRequestBody,
  NotaForCreation,
  Payload,
} from '../types';
import { JWT_EXPIRATION, JWT_SECRET } from '../config/env';

export async function login(req: Request, res: Response) {
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

export async function getDocente(req: Request, res: Response) {
  try {
    if (req.docente === undefined) {
      throw new Error('No autorizado');
    }
    const docente = await docenteServices.getDocenteById(req.docente.id);
    res.json(docente);
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
    if (req.docente === undefined) {
      throw new Error('No autorizado');
    }
    const clases = await docenteServices.getClasesByDocenteId(
      req.docente.id
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
    if (req.docente === undefined) {
      throw new Error('No autorizado');
    }
    const idClase = parseInt(req.params.idClase);
    const recursos = await docenteServices.getRecursosByClaseId(
      idClase
    );
    res.json(recursos);
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
}

export async function getAlumnos(req: Request, res: Response) {
  try {
    if (req.docente === undefined) {
      throw new Error('No autorizado');
    }
    const idClase = parseInt(req.params.idClase);
    const alumnos = await docenteServices.getAlumnosByClaseId(idClase);
    res.json(alumnos);
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
}

export async function getNotasOfAlumno(req: Request, res: Response) {
  try {
    if (req.docente === undefined) {
      throw new Error('No autorizado');
    }
    const idAlumno = parseInt(req.params.idAlumno);
    const idClase = parseInt(req.params.idClase);
    const notas = await docenteServices.getNotasByAlumnoIdAndClaseId(idAlumno, idClase);
    res.json(notas);
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error inesperado' });
    }
  }
}

export async function createNota(req: Request, res: Response) {
  try {
    if (req.docente === undefined) {
      throw new Error('No autorizado');
    }
    const idAlumno = parseInt(req.params.idAlumno);
    const idClase = parseInt(req.params.idClase);
    const idAsignatura =
      await docenteServices.getAsignaturaIdByClaseId(idClase);
    const nota: NotaForCreation = toNotaForCreation({
      ...req.body,
      idAlumno,
      idAsignatura,
    });
    const idNota = await docenteServices.createNota(nota);
    res.json({ message: 'Nota creada exitosamente. ID:', idNota });
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
    if (req.docente === undefined) {
      throw new Error('No autorizado');
    }
    const horario = await docenteServices.getHorarioByDocenteId(
      req.docente.id
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
