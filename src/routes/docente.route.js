import { Router } from "express";

import { createDocente,
            getDocente,
            getDocentes,
            updateDocente,
            deleteDocente
} from "../controllers/docente.controller.js";  // * as ???

const docenteRouter = Router();

docenteRouter.post('/', createDocente);

docenteRouter.get('/:id', getDocente);

docenteRouter.get('/', getDocentes);

docenteRouter.put('/:id', updateDocente);

docenteRouter.delete('/:id', deleteDocente);

export default docenteRouter;