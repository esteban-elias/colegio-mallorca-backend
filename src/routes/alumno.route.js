import { Router } from "express";
import { createAlumno,
         getAlumno,
         updateAlumno,
         deleteAlumno,
         loginAlumno,
         getNotas,
         getAsignaturas,
         getRecursos
} from "../controllers/alumno.controller.js";  // * as ???
import { cookieJwtAuthAlumno } from '../middlewares/cookieJwtAuth.js';

const alumnoRouter = Router();

alumnoRouter.post('/', createAlumno); 
alumnoRouter.post('/login', loginAlumno);

alumnoRouter.get('/', cookieJwtAuthAlumno, getAlumno);
alumnoRouter.get('/notas', cookieJwtAuthAlumno, getNotas);
alumnoRouter.get('/asignaturas', cookieJwtAuthAlumno, getAsignaturas);
alumnoRouter.get('/recursos/:idAsignatura', cookieJwtAuthAlumno, getRecursos);


alumnoRouter.put('/', updateAlumno);

alumnoRouter.delete('/', deleteAlumno);


export default alumnoRouter;
