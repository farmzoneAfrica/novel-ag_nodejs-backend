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

const base = ""

prosperityHubrouter.post(base+'/', validate(createProsperityHubSchema), auth, requireUser, createProsperityHubHandler);
prosperityHubrouter.get(base+'/', auth, getProsperityHubsHandler);
prosperityHubrouter.get(base+'/:id', auth, getProsperityHubHandler);
prosperityHubrouter.patch(base+'/:id', validate(updateProsperityHubSchema), auth, updateProsperityHubHandler );
prosperityHubrouter.delete(base+'/:id', auth, adminAuth, deleteProsperityHubHandler);

export default prosperityHubrouter;