import express, { NextFunction, Request, Response, response } from 'express';
import {
  createWalletHandler,
  getWalletsHandler,
  getWalletHandler,
  updateWalletHandler,
  deleteWalletHandler
} from '../controllers/wallet.controller';

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

const walletRouter = express.Router();

walletRouter.post( '/', validate(createWarehouseSchema), auth, requireUser, createWalletHandler );
walletRouter.get( '/', auth, getWalletsHandler);
walletRouter.get( '/:id', auth, getWalletHandler);
walletRouter.patch( '/:id', validate(updateWarehouseSchema), auth, updateWalletHandler);
walletRouter.delete( '/:id', auth, adminAuth, deleteWalletHandler);

export default walletRouter;

