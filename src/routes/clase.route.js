import { Router } from "express";
import * as claseControllers
  from "../controllers/clase.controller.js"; 
import recursoRouter from "./recurso.route.js";


const claseRouter = Router();

// for alumno
claseRouter.get('/', claseControllers.getClases);

claseRouter.use('/:idClase/recurso', recursoRouter);


export default claseRouter;
