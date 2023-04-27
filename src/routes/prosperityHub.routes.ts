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
} from '../schemas/prosperityHub.schema';
import { validate } from '../middleware/validate';

import { auth, adminAuth } from '../middleware/auth';
import { requireUser } from '../middleware/requireUser';

const prosperityHubrouter = express.Router();

const base = ""

prosperityHubrouter.post(base+'/create', auth, requireUser, validate(createProsperityHubSchema), createProsperityHubHandler);
prosperityHubrouter.patch(base+'/update', auth, validate(updateProsperityHubSchema), updateProsperityHubHandler);
prosperityHubrouter.get(base+'/get', auth, getProsperityHubsHandler);
// prosperityHubrouter.get(base+'/:id', auth, getProsperityHubHandler);
prosperityHubrouter.get(base+'/:id', getProsperityHubHandler);
prosperityHubrouter.delete(base+'/delete', auth, adminAuth, deleteProsperityHubHandler);

export default prosperityHubrouter;