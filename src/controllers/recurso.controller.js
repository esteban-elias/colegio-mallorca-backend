import * as recursoServices
  from '../services/recurso.service.js';

// for clase
export async function getRecursos(req, res) {
  const { idClase } = req.params;
  const recursos = await recursoServices.getRecursos(idClase);
  res.json(recursos);
}

// for docente
// export async function getRecursos(req, res) {
//   const docente = req.docente;
//   const { idClase } = req.params;
//   const recursos = await docenteServices.getRecursos(docente.id, idClase);
//   res.json(recursos);
// }
