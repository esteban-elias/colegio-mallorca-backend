import { Router } from 'express';

import * as recursoControllers
  from '../controllers/recurso.controller.js';
  
const recursoRouter = Router({mergeParams: true});

// for clase
recursoRouter.get('/', recursoControllers.getRecursos);

export default recursoRouter;