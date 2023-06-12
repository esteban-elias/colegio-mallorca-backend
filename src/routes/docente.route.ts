import { Router } from "express";
import * as docenteControllers from "../controllers/docente.controller";  // * as ???
import { cookieJwtAuth } from '../middlewares/cookieJwtAuth';


const docenteRouter = Router();

docenteRouter.post('/login', docenteControllers.login);

docenteRouter.get('/',
                  cookieJwtAuth,
                  docenteControllers.getDocente);
docenteRouter.get('/clases',
                 cookieJwtAuth,
                 docenteControllers.getClases);
docenteRouter.get('/clases/:idClase/recursos',
                  cookieJwtAuth,
                  docenteControllers.getRecursos);
docenteRouter.get('/clases/:idClase/alumnos',
                  cookieJwtAuth,
                  docenteControllers.getAlumnos);
docenteRouter.get('/clases/:idClase/alumnos/:idAlumno/notas',
                  cookieJwtAuth,
                  docenteControllers.getNotas);

docenteRouter.post('/clases/:idClase/alumnos/:idAlumno/notas',
                  cookieJwtAuth,
                  docenteControllers.createNota);

export default docenteRouter;
