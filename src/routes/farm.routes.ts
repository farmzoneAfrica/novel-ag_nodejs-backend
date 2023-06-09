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
  createWarehouseSchema,
  updateWarehouseSchema,
} from '../schemas/warehouse.schema';

import {
  auth,
  adminAuth
} from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';


const farmRouter = express.Router();

farmRouter.post( '/', validate(createWarehouseSchema), auth, requireUser, createFarmHandler);
farmRouter.get( '/', auth, getFarmsHandler);
farmRouter.get( '/:id', auth, getFarmHandler);
farmRouter.patch( '/:id', validate(updateWarehouseSchema), auth, updateFarmHandler);
farmRouter.delete( '/:id', auth, adminAuth, deleteFarmHandler);

export default farmRouter;