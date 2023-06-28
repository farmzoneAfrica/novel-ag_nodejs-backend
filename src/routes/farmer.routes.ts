import express from 'express';
import { validate } from '../middleware/validate';
import {
    getAgentsHandler,
    getAgentHandler,
    getAgentsByPageHandler,
    updateUserHandler,
    deleteAgentHandler
} from '../controllers/farmers.controller';
import {
    auth,
    adminAuth
} from '../middleware/deserializeUser';
import {
  updateUserSchema
} from '../schemas/user.schema';

import { requireUser } from '../middleware/requireUser';

const farmerRouter = express.Router();

farmerRouter.get( '/', getAgentsHandler);
farmerRouter.get( '/:id', requireUser, getAgentHandler);
farmerRouter.get( '/:pageNo', getAgentsByPageHandler);
farmerRouter.patch( '/:id', validate(updateUserSchema), updateUserHandler );
farmerRouter.delete( '/:id', deleteAgentHandler );

// farmerRouter.get( '/', auth, getAgentsHandler);
// farmerRouter.get( '/:id', auth, requireUser, getAgentHandler);
// farmerRouter.get( '/:pageNo', getAgentsByPageHandler);
// farmerRouter.patch( '/:id', validate(updateUserSchema), auth, updateUserHandler );
// farmerRouter.delete( '/:id', auth, adminAuth, deleteAgentHandler );

export default farmerRouter;