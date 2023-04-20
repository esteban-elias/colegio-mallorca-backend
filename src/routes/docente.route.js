import { Router } from "express";
import * as docenteControllers from "../controllers/docente.controller.js";  // * as ???
import { cookieJwtAuthDocente } from '../middlewares/cookieJwtAuth.js';


const docenteRouter = Router();

docenteRouter.post('/login', docenteControllers.login);

docenteRouter.get('/',
                  cookieJwtAuthDocente,
                  docenteControllers.getDocente);
docenteRouter.get('/clases',
                 cookieJwtAuthDocente,
                 docenteControllers.getClases);
docenteRouter.get('/clases/:idClase/recursos',
                  cookieJwtAuthDocente,
                  docenteControllers.getRecursos);
docenteRouter.get('/clases/:idClase/alumnos',
                  cookieJwtAuthDocente,
                  docenteControllers.getAlumnos);
docenteRouter.get('/clases/:idClase/alumnos/:idAlumno/notas',
                  cookieJwtAuthDocente,
                  docenteControllers.getNotas);

docenteRouter.post('/clases/:idClase/alumnos/:idAlumno/notas',
                  cookieJwtAuthDocente,
                  docenteControllers.createNota);

export default docenteRouter;
