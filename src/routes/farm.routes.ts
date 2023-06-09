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


const warehouseRouter = express.Router();

// const base = ""

warehouseRouter.post( '/', validate(createWarehouseSchema), auth, requireUser, createFarmHandler);
warehouseRouter.get( '/', auth, getFarmsHandler);
warehouseRouter.get( '/:id', auth, getFarmHandler);
warehouseRouter.patch( '/:id', validate(updateWarehouseSchema), auth, updateFarmHandler);
warehouseRouter.delete( '/:id', auth, adminAuth, deleteFarmHandler);

export default warehouseRouter;