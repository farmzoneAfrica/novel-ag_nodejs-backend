// import express from 'express';
import express, { NextFunction, Request, Response, response } from 'express';
import {
  createWarehouseHandler,
  getWarehousesHandler,
  getWarehouseHandler,
  updateWarehouseHandler,
  deleteWarehouseHandler,
} from '../controllers/warehouse.controller';

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

warehouseRouter.post( '/', validate(createWarehouseSchema), auth, requireUser, createWarehouseHandler);
warehouseRouter.get( '/', auth, getWarehousesHandler);
warehouseRouter.get( '/:id', auth, getWarehouseHandler);
warehouseRouter.patch( '/:id', validate(updateWarehouseSchema), auth, updateWarehouseHandler);
warehouseRouter.delete( '/:id', auth, adminAuth, deleteWarehouseHandler);

export default warehouseRouter;