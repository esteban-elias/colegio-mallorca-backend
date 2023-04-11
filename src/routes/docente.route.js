import { Router } from "express";
import { createDocente,
         getDocente,
         updateDocente,
         deleteDocente,
         loginDocente
} from "../controllers/docente.controller.js";  // * as ???
import { cookieJwtAuthDocente } from '../middlewares/cookieJwtAuth.js';


const docenteRouter = Router();

docenteRouter.post('/', createDocente);

docenteRouter.get('/', cookieJwtAuthDocente, getDocente);

docenteRouter.put('/', updateDocente);

docenteRouter.delete('/', deleteDocente);

docenteRouter.post('/login', loginDocente);

export default docenteRouter;