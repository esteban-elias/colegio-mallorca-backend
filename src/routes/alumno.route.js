import { Router } from "express";
import * as alumnoControllers from "../controllers/alumno.controller.js";  // * as ???
import { cookieJwtAuthAlumno } from '../middlewares/cookieJwtAuth.js';
import claseRouter from "./clase.route.js";
import notaRouter from "./nota.route.js";

const alumnoRouter = Router();

// alumnoRouter.post('/', createAlumno); 
alumnoRouter.post('/login',
                  alumnoControllers.login);

alumnoRouter.get('/:id',
                 cookieJwtAuthAlumno,
                 alumnoControllers.getAlumno);
alumnoRouter.use('/:idAlumno/nota',
                 cookieJwtAuthAlumno,
                 notaRouter);
alumnoRouter.use('/:idAlumno/clase',
                 cookieJwtAuthAlumno,
                 claseRouter);

// alumnoRouter.put('/', updateAlumno);

// alumnoRouter.delete('/', deleteAlumno);


export default alumnoRouter;
