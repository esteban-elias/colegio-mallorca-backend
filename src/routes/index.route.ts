import { Router } from 'express';
import alumnoRouter from './alumno.route';
import docenteRouter from './docente.route';

const indexRouter = Router();

const PREFIX = '/api';

indexRouter.get(PREFIX, (_req, res) => {
    res.json({ message: 'Bienvenido a la backend API del Colegio Mallorca!' });
});

indexRouter.use(`${PREFIX}/alumno`, alumnoRouter);

indexRouter.use(`${PREFIX}/docente`, docenteRouter);

export default indexRouter;
