import { Router } from "express";

import { createAlumno,
         getAlumno,
         getAlumnos,
         updateAlumno,
         deleteAlumno
} from "../controllers/alumno.controller.js";  // * as ???

const alumnoRouter = Router();

alumnoRouter.post('/', createAlumno); 

alumnoRouter.get('/:id', getAlumno);

alumnoRouter.get('/', getAlumnos);

alumnoRouter.put('/:id', updateAlumno);

alumnoRouter.delete('/:id', deleteAlumno);

export default alumnoRouter;
