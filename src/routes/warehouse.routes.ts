// import express from 'express';
import express, { NextFunction, Request, Response, response } from 'express';
import {
  createWarehouseHandler,
  viewWarehousesHandler,
  viewWarehouseHandler,
  updateWarehouseHandler,
  deleteWarehouseHandler,
  
} from '../controllers/warehouse.controller';

import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import {
  createWarehouseSchema,
  updateWarehouseSchema,
} from '../schemas/warehouse.schema';

const router = express.Router();

let base ='/api/Warehouse'

router.post('/create', validate(createWarehouseSchema), createWarehouseHandler);
router.patch('/update', validate(updateWarehouseSchema), updateWarehouseHandler);
router.get('/', viewWarehousesHandler);
router.get('/:id', viewWarehouseHandler);
router.get('/delete', deleteWarehouseHandler);

export default router;