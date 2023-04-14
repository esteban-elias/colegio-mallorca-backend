import { Router } from "express";
import { createAlumno,
         getAlumno,
         updateAlumno,
         deleteAlumno,
         loginAlumno,
         getNotas
} from "../controllers/alumno.controller.js";  // * as ???
import { cookieJwtAuthAlumno } from '../middlewares/cookieJwtAuth.js';

const alumnoRouter = Router();

alumnoRouter.post('/', createAlumno); 
alumnoRouter.post('/login', loginAlumno);

alumnoRouter.get('/', cookieJwtAuthAlumno, getAlumno);
alumnoRouter.get('/notas', cookieJwtAuthAlumno, getNotas);

alumnoRouter.put('/', updateAlumno);

alumnoRouter.delete('/', deleteAlumno);


export default alumnoRouter;
