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
} from '../middleware/auth';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';


const warehouseRouter = express.Router();

const base = ""

warehouseRouter.post(base+'/create', auth, requireUser, validate(createWarehouseSchema), createWarehouseHandler);
warehouseRouter.get(base+'/get', auth, getWarehousesHandler);
warehouseRouter.get(base+'/get/:id', auth, getWarehouseHandler);
warehouseRouter.patch(base+'/update/:id', validate(updateWarehouseSchema), auth, updateWarehouseHandler);
warehouseRouter.get(base+'/delete/:id', auth, adminAuth, deleteWarehouseHandler);

export default warehouseRouter;