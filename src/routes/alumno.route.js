import { Router } from "express";
import { createAlumno,
         getAlumno,
         updateAlumno,
         deleteAlumno,
         loginAlumno
} from "../controllers/alumno.controller.js";  // * as ???
import { cookieJwtAuthAlumno } from '../middlewares/cookieJwtAuth.js';

const alumnoRouter = Router();

alumnoRouter.post('/', createAlumno); 

alumnoRouter.get('/', cookieJwtAuthAlumno, getAlumno);

alumnoRouter.put('/', updateAlumno);

alumnoRouter.delete('/', deleteAlumno);

alumnoRouter.post('/login', loginAlumno);

export default alumnoRouter;
