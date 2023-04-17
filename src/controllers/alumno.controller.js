import jwt from 'jsonwebtoken';
import * as alumnoServices from '../services/alumno.service.js'

// export async function createAlumno(req, res) {
    
// }

export function getAlumno(req, res) {
  const alumno = req.alumno;
  if (alumno.id != req.params.id) {
    res.status(403).json({message: 'No autorizado'});
    return
  }
  res.json(alumno);
}

// for docente
export async function getAlumnos(req, res) {
  const docente = req.docente;
  const { idClase } = req.params;
  const alumnos = await docenteServices.getAlumnos(docente.id,
                                                   idClase);
  res.json(alumnos);
}

// export function updateAlumno(req, res) {

// }

// export function deleteAlumno(req, res) {

// }

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
