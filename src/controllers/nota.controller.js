import * as notaServices
  from '../services/nota.service.js';

// export async function createNota(req, res) {
//   const { idClase, idAlumno } = req.params;
//   const nota = req.body;
//   const notaCreada = await docenteServices.createNota(nota, 
//                                                       idAlumno, 
//                                                       idClase);
//   res.json(notaCreada);
// } ???

// for alumno
export async function getNotas(req, res) {
  const alumno = req.alumno;
  const notas = await notaServices.getNotas(alumno.id);   
  res.json(notas);
}

// for docente. TODO: FORBID if not his clase
// export async function getNotas(req, res) {
//   const { idAlumno } = req.params;
//   const notas = await docenteServices.getNotas(idAlumno);
//   res.json(notas);
// }
