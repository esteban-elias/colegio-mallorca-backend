import { Router } from "express";
import * as notaControllers
  from "../controllers/nota.controller.js";



const notaRouter = Router();

// for alumno
notaRouter.get('/', notaControllers.getNotas);

export default notaRouter;
