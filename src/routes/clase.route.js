import { Router } from "express";
import * as claseControllers
  from "../controllers/clase.controller.js"; 
import recursoRouter from "./recurso.route.js";
// import alumnoRouter from "./alumno.route.js";


const claseRouter = Router();

claseRouter.get('/', claseControllers.getClases);

claseRouter.use('/:idClase/recurso', recursoRouter);

// for docente
// claseRouter.use('/:idClase/alumno', alumnoRouter);


export default claseRouter;
