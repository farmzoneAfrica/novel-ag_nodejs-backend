// import express from 'express';
import express, { NextFunction, Request, Response, response } from 'express';
import {
  createProsperityHubHandler,
  viewProsperityHubsHandler,
  viewProsperityHubHandler,
  updateProsperityHubHandler,
  deleteProsperityHubHandler,
  
} from '../controllers/prosperityHub.controller';

import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import {
  createProsperityHubSchema,
  updateProsperityHubSchema,
} from '../schemas/prosperityHub.schema';

const router = express.Router();

let base ='/api/prosperityHub'

router.post('/create', validate(createProsperityHubSchema), createProsperityHubHandler);
router.patch('/update', validate(updateProsperityHubSchema), updateProsperityHubHandler);
router.get('/', viewProsperityHubsHandler);
router.get('/:id', viewProsperityHubHandler);
router.get('/delete', deleteProsperityHubHandler);

export default router;