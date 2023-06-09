// import express from 'express';
import express, { NextFunction, Request, Response, response } from 'express';
import {
  createFarmHandler,
  getFarmsHandler,
  getFarmHandler,
  updateFarmHandler,
  deleteFarmHandler,
} from '../controllers/farm.controller';

import {
  createFarmSchema,
  updateFarmSchema,
} from '../schemas/farm.schema';

import {
  auth,
  adminAuth
} from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';


const farmRouter = express.Router();

farmRouter.post( '/:user_id', auth, validate(createFarmSchema), createFarmHandler);
farmRouter.get( '/', getFarmsHandler);
farmRouter.get( '/:id',  getFarmHandler);
farmRouter.patch( '/:id', auth, validate(updateFarmSchema),  updateFarmHandler);
farmRouter.delete( '/:id', auth, deleteFarmHandler);

// farmRouter.delete( '/:id', auth, adminAuth, deleteFarmHandler);
// farmRouter.delete( '/:id', auth, adminAuth, deleteFarmHandler);
// farmRouter.post( '/:farmer_id', validate(createFarmSchema), auth, createFarmHandler);
// farmRouter.get( '/', auth, getFarmsHandler);
// farmRouter.get( '/:id', auth, getFarmHandler);
// farmRouter.patch( '/:id', validate(updateFarmSchema), auth, updateFarmHandler);
// farmRouter.delete( '/:id', auth, adminAuth, deleteFarmHandler);

export default farmRouter;