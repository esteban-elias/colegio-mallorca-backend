import { Router } from "express";
import alumnoRouter from "./alumno.route.js";
import docenteRouter from "./docente.route.js";

const indexRouter = Router();

const PREFIX = '/api';

indexRouter.get(PREFIX, (req, res) => {
    res.json({message: 'Bienvenido a la backend API RESTful del Colegio Mallorca!'});
});

indexRouter.use(`${PREFIX}/alumno`, alumnoRouter);

indexRouter.use(`${PREFIX}/docente`, docenteRouter);

export default indexRouter;
