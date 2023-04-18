import jwt from 'jsonwebtoken';
import * as docenteServices from '../services/docente.service.js'


export async function login(req, res) {
  const { rut, contrasena } = req.body;
  try {
    const docente = await docenteServices.login(rut, contrasena);
    const token = jwt.sign({ id: docente.id, type: 'docente' }, 
                            process.env.JWT_SECRET, {expiresIn: '1h'}) // 30m???
    res.cookie("token", token, {
        httpOnly: true
    })
    res.json(docente);
  } catch (error) {
      res.status(401).json({message: error.message});
  }
}

export function getDocente(req, res) {
  res.json(req.docente);
}

export async function getClases(req, res) {
const clases = await docenteServices.getClases(req.docente.id);
res.json(clases);
}

export async function getRecursos(req, res) {
  const { idClase } = req.params;
  const recursos = await docenteServices.getRecursos(req.docente.id,
                                                     idClase);
  res.json(recursos);
}

export async function getAlumnos(req, res) {
  const { idClase } = req.params;
  const alumnos = await docenteServices.getAlumnos(req.docente.id, 
                                                   idClase);
  res.json(alumnos);
}

export async function getNotas(req, res) {
  const { idClase } = req.params;
  const { idAlumno } = req.params;
  const notas = await docenteServices.getNotas(req.docente.id, 
                                               idClase, idAlumno);
  res.json(notas);
}
