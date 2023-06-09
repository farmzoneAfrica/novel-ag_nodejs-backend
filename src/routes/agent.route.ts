import express from 'express';
import { validate } from '../middleware/validate';
import {
    getAgentsHandler,
    getAgentHandler,
    getAgentsByPageHandler,
    updateUserHandler,
    deleteAgentHandler
} from '../controllers/user.controller';
import {
    auth,
    adminAuth
} from '../middleware/deserializeUser';
import {
  updateUserSchema
} from '../schemas/user.schema';

import { requireUser } from '../middleware/requireUser';

const agentRouter = express.Router();

agentRouter.get( '/get', auth, getAgentsHandler);
agentRouter.get( '/get/:id', auth, requireUser, getAgentHandler);
agentRouter.get( '/:pageNo', getAgentsByPageHandler);
agentRouter.patch( '/update/:id', validate(updateUserSchema), auth, updateUserHandler );
agentRouter.delete( '/delete/:id', auth, adminAuth, deleteAgentHandler );

export default agentRouter;