import { Router } from "express";
import alumnoRouter from "./alumno.route.js";
import docenteRouter from "./docente.route.js";

const indexRouter = Router();

const PREFIX = '/api';

indexRouter.get(PREFIX, (req, res) => {
    res.json({message: 'Bienvenido a la backend API RESTful del Colegio Mallorca!'});
});

indexRouter.use(`${PREFIX}/alumnos`, alumnoRouter);

indexRouter.use(`${PREFIX}/docentes`, docenteRouter);

export default indexRouter;
