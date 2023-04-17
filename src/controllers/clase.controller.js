import * as claseServices
  from '../services/clase.service.js'

export async function getClases(req, res) {
  if (req.alumno) {
    const clases = await claseServices.getClases('alumno',
                                                 req.alumno.id);
    res.json(clases);
  } else if (req.docente) {
    const clases = await claseServices.getClases('docente',
                                                 req.docente.id);
    res.json(clases);
  } else {
    res.status(401).json({ message: 'No autorizado' });
  }
}
