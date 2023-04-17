import { Router } from "express";
import * as docenteControllers from "../controllers/docente.controller.js";  // * as ???
import { cookieJwtAuthDocente } from '../middlewares/cookieJwtAuth.js';
import claseRouter from "./clase.route.js";



const docenteRouter = Router();

// docenteRouter.post('/', createDocente);
docenteRouter.post('/login', docenteControllers.login);
// docenteRouter.post('/recursos/:idClase', cookieJwtAuthDocente, createRecurso);
// docenteRouter.post('/notas/:idClase/:idAlumno', cookieJwtAuthDocente, createNota);

docenteRouter.get('/:idDocente', cookieJwtAuthDocente, docenteControllers.getDocente);

docenteRouter.use('/:idDocente/clase',
                 cookieJwtAuthDocente,
                 claseRouter);

// docenteRouter.get('/recursos/:idClase', cookieJwtAuthDocente, getRecursos);
// docenteRouter.get('/alumnos/:idClase', cookieJwtAuthDocente, getAlumnos);
// docenteRouter.get('/notas/:idAlumno', cookieJwtAuthDocente, getNotas);

// docenteRouter.put('/', updateDocente);

// docenteRouter.delete('/', deleteDocente);


export default docenteRouter;
