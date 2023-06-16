import { Router } from 'express';
import * as docenteControllers from '../controllers/docente.controller';
import { verifyToken } from '../middlewares/auth';

const docenteRouter = Router();

docenteRouter.post('/login', (req, res, next) => {
  docenteControllers.login(req, res).catch(next);
});

docenteRouter.get('/', verifyToken, (req, res, next) => {
  docenteControllers.getDocente(req, res).catch(next);
});

docenteRouter.get('/clases', verifyToken, (req, res, next) => {
  docenteControllers.getClases(req, res).catch(next);
});

docenteRouter.get(
  '/clase/:idClase/recursos',
  verifyToken,
  (req, res, next) => {
    docenteControllers.getRecursos(req, res).catch(next);
  }
);

docenteRouter.get(
  '/clase/:idClase/alumnos',
  verifyToken,
  (req, res, next) => {
    docenteControllers.getAlumnos(req, res).catch(next);
  }
);

docenteRouter.get(
  '/clase/:idClase/alumno/:idAlumno/notas',
  verifyToken,
  (req, res, next) => {
    docenteControllers.getNotasOfAlumno(req, res).catch(next);
  }
);

docenteRouter.post(
  '/clase/:idClase/alumno/:idAlumno/notas',
  verifyToken,
  (req, res, next) => {
    docenteControllers.createNota(req, res).catch(next);
  }
);

docenteRouter.get('/horario', verifyToken, (req, res, next) => {
  docenteControllers.getHorario(req, res).catch(next);
});

export default docenteRouter;
