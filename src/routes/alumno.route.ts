import { Router } from 'express';
import * as alumnoControllers from '../controllers/alumno.controller';
import { verifyToken } from '../middlewares/auth';

const alumnoRouter = Router();

alumnoRouter.post('/login', (req, res, next) => {
  alumnoControllers.login(req, res).catch(next);
});

alumnoRouter.get('/', verifyToken, (req, res, next) => {
  alumnoControllers.getAlumno(req, res).catch(next);
});

alumnoRouter.get('/notas', verifyToken, (req, res, next) => {
  alumnoControllers.getNotas(req, res).catch(next);
});

alumnoRouter.get('/clases', verifyToken, (req, res, next) => {
  alumnoControllers.getClases(req, res).catch(next);
});

alumnoRouter.get(
  '/clases/:idClase/recursos',
  verifyToken,
  (req, res, next) => {
    alumnoControllers.getRecursos(req, res).catch(next);
  }
);

alumnoRouter.get('/horario', verifyToken, (req, res, next) => {
  alumnoControllers.getHorario(req, res).catch(next);
});

export default alumnoRouter;
