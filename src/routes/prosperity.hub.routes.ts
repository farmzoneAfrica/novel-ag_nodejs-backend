// import express from 'express';
import express, { NextFunction, Request, Response, response } from 'express';
import {
  createProsperityHubHandler,
  getProsperityHubsHandler,
  getProsperityHubHandler,
  updateProsperityHubHandler,
  deleteProsperityHubHandler,
  
} from '../controllers/prosperityHub.controller';

import {
  createProsperityHubSchema,
  updateProsperityHubSchema,
} from '../schemas/prosperity.hub.schema';
import { validate } from '../middleware/validate';

import { auth, adminAuth } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';

const prosperityHubrouter = express.Router();

prosperityHubrouter.post( '/', validate(createProsperityHubSchema), auth, requireUser, createProsperityHubHandler);
prosperityHubrouter.get( '/', auth, getProsperityHubsHandler);
prosperityHubrouter.get( '/:id', auth, getProsperityHubHandler);
prosperityHubrouter.patch( '/:id', validate(updateProsperityHubSchema), auth, updateProsperityHubHandler );
prosperityHubrouter.delete( '/:id', auth, adminAuth, deleteProsperityHubHandler);

export default prosperityHubrouter;