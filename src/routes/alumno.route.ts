import { Router } from "express";
import * as alumnoControllers from "../controllers/alumno.controller";  // * as ???
import { cookieJwtAuth } from '../middlewares/cookieJwtAuth';

const alumnoRouter = Router();

alumnoRouter.post('/login',
                  alumnoControllers.login);

alumnoRouter.get('/',
                 cookieJwtAuth,
                 alumnoControllers.getAlumno);
alumnoRouter.get('/notas',
                 cookieJwtAuth,
                 alumnoControllers.getNotas);
alumnoRouter.get('/clases',
                 cookieJwtAuth,
                 alumnoControllers.getClases);
alumnoRouter.get('/clases/:idClase/recursos',
                 cookieJwtAuth,
                 alumnoControllers.getRecursos);

export default alumnoRouter;
