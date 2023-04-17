// import express from 'express';
import express, { NextFunction, Request, Response, response } from 'express';
import {
  createProsperityHubHandler,
  viewProsperityHubsHandler,
  viewProsperityHubHandler,
  updateProsperityHubHandler,
  deleteProsperityHubHandler,
  
} from '../controllers/prosperityHub.controller';

import {
  createProsperityHubSchema,
  updateProsperityHubSchema,
} from '../schemas/prosperityHub.schema';
import { validate } from '../middleware/validate';

import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';

const prosperityHubrouter = express.Router();

// the base variable is for purposes of swagger compilation, 
// it should always be an empty string but api/agent when auto compiling swagger
const base = ""

prosperityHubrouter.post(base+'/create', deserializeUser, requireUser, validate(createProsperityHubSchema), createProsperityHubHandler);
prosperityHubrouter.patch(base+'/update', deserializeUser, validate(updateProsperityHubSchema), updateProsperityHubHandler);
prosperityHubrouter.get(base+'/', deserializeUser, viewProsperityHubsHandler);
prosperityHubrouter.get(base+'/:id', deserializeUser, viewProsperityHubHandler);
prosperityHubrouter.get(base+'/delete', deserializeUser, deleteProsperityHubHandler);

export default prosperityHubrouter;