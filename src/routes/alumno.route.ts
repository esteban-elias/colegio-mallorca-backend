import { Router } from "express";
import * as alumnoControllers from "../controllers/alumno.controller";
import { verifyToken } from "../middlewares/auth";

const alumnoRouter = Router();

alumnoRouter.post("/login", alumnoControllers.login);

alumnoRouter.get("/", verifyToken, alumnoControllers.getAlumno);
alumnoRouter.get("/notas", verifyToken, alumnoControllers.getNotas);
alumnoRouter.get("/clases", verifyToken, alumnoControllers.getClases);
alumnoRouter.get(
  "/clases/:idClase/recursos",
  verifyToken,
  alumnoControllers.getRecursos
);

export default alumnoRouter;
