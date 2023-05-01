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

prosperityHubrouter.post(base+'/create', validate(createProsperityHubSchema), auth, requireUser, createProsperityHubHandler);
prosperityHubrouter.get(base+'/get', auth, getProsperityHubsHandler);
prosperityHubrouter.get(base+'/get/:id', auth, getProsperityHubHandler);
prosperityHubrouter.patch(base+'/update/:id', validate(updateProsperityHubSchema), auth, updateProsperityHubHandler );
prosperityHubrouter.delete(base+'/delete/:id', auth, adminAuth, deleteProsperityHubHandler);

export default prosperityHubrouter;