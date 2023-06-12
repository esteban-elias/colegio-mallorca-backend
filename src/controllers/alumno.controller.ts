import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import * as alumnoServices from '../services/alumno.service';

export async function login(req: Request, res: Response) {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (typeof JWT_SECRET === 'undefined') {
    throw new Error('JWT_SECRET no definida');
  }
  const { rut, contrasena } = req.body;
  try {
    const alumno = await alumnoServices.login(rut, contrasena);
    const token = jwt.sign({ id: alumno.id, type: 'alumno' },
      JWT_SECRET, {expiresIn: '1h'}) // 30m???
    res.cookie("token", token, {
      httpOnly: true
    })
    res.json(alumno);
  } catch (error) {
    if (error instanceof Error){
      res.status(401).json({message: error.message});
    } else {
      res.status(500).json({message: 'Error inesperado'});
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
  const recursos = await alumnoServices.getRecursos(req.alumno.id,
                                                    idClase);
  res.json(recursos);
}
