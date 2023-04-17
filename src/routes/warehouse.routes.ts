// import express from 'express';
import express, { NextFunction, Request, Response, response } from 'express';
import {
  createWarehouseHandler,
  viewWarehousesHandler,
  viewWarehouseHandler,
  updateWarehouseHandler,
  deleteWarehouseHandler,
} from '../controllers/warehouse.controller';

import {
  createWarehouseSchema,
  updateWarehouseSchema,
} from '../schemas/warehouse.schema';

import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';


const warehouseRouter = express.Router();

// the base variable is for purposes of swagger compilation, 
// it should always be an empty string but api/agent when auto compiling swagger
const base = ""

warehouseRouter.post(base+'/create', deserializeUser, requireUser, validate(createWarehouseSchema), createWarehouseHandler);
warehouseRouter.patch(base+'/update', deserializeUser, requireUser, validate(updateWarehouseSchema), updateWarehouseHandler);
warehouseRouter.get(base+'/', deserializeUser, viewWarehousesHandler);
warehouseRouter.get(base+'/:id', deserializeUser, viewWarehouseHandler);
warehouseRouter.get(base+'/delete', deserializeUser, deleteWarehouseHandler);

export default warehouseRouter;