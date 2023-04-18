import jwt from 'jsonwebtoken';
import * as alumnoServices from '../services/alumno.service.js'


export async function login(req, res) {
  const { rut, contrasena } = req.body;
  try {
    const alumno = await alumnoServices.login(rut, contrasena);
    const token = jwt.sign({ id: alumno.id, type: 'alumno' },
      process.env.JWT_SECRET, {expiresIn: '1h'}) // 30m???
    res.cookie("token", token, {
      httpOnly: true
    })
    res.json(alumno);
  } catch (error) {
    res.status(401).json({message: error.message});
  }
}

export function getAlumno(req, res) {
  res.json(req.alumno);
}

export async function getNotas(req, res) {
  const notas = await alumnoServices.getNotas(req.alumno.id);   
  res.json(notas);
}

export async function getClases(req, res) {
  const clases = await alumnoServices.getClases(req.alumno.id);
  res.json(clases);
}

export async function getRecursos(req, res) {
  const { idClase } = req.params;
  const recursos = await alumnoServices.getRecursos(req.alumno.id,
                                                    idClase);
  res.json(recursos);
}
