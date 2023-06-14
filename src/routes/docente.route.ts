import { Router } from 'express';
import * as docenteControllers from '../controllers/docente.controller'; // * as ???
import { verifyToken } from '../middlewares/auth';

const docenteRouter = Router();

docenteRouter.post('/login', docenteControllers.login);

docenteRouter.get('/', verifyToken, docenteControllers.getDocente);
docenteRouter.get(
  '/clases',
  verifyToken,
  docenteControllers.getClases
);
docenteRouter.get(
  '/clases/:idClase/recursos',
  verifyToken,
  docenteControllers.getRecursos
);
docenteRouter.get(
  '/clases/:idClase/alumnos',
  verifyToken,
  docenteControllers.getAlumnos
);
docenteRouter.get(
  '/clases/:idClase/alumnos/:idAlumno/notas',
  verifyToken,
  docenteControllers.getNotas
);

docenteRouter.post(
  '/clases/:idClase/alumnos/:idAlumno/notas',
  verifyToken,
  docenteControllers.createNota
);

export default docenteRouter;
