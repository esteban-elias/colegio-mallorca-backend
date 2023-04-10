import { Router } from "express";
import alumnoRouter from "./alumno.route.js";
import docenteRouter from "./docente.route.js";

const indexRouter = Router();

const prefix = '/api';

indexRouter.get(prefix, (req, res) => {
    res.send('Bienvenido a la backend API del Colegio Mallorca!');
});

indexRouter.use(`${prefix}/alumno`, alumnoRouter);

indexRouter.use(`${prefix}/docente`, docenteRouter);


export default indexRouter;
