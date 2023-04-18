import { Router } from "express";
import * as alumnoControllers from "../controllers/alumno.controller.js";  // * as ???
import { cookieJwtAuthAlumno } from '../middlewares/cookieJwtAuth.js';

const alumnoRouter = Router();

alumnoRouter.post('/login',
                  alumnoControllers.login);

alumnoRouter.get('/',
                 cookieJwtAuthAlumno,
                 alumnoControllers.getAlumno);
alumnoRouter.get('/notas',
                 cookieJwtAuthAlumno,
                 alumnoControllers.getNotas);
alumnoRouter.get('/clases',
                 cookieJwtAuthAlumno,
                 alumnoControllers.getClases);
alumnoRouter.get('/clases/:idClase/recursos',
                 cookieJwtAuthAlumno,
                 alumnoControllers.getRecursos);

export default alumnoRouter;
