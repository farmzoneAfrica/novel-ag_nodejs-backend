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

const base = "";

agentRouter.get(base+'/', auth, getAgentsHandler);
agentRouter.get(base+'/:id', auth, requireUser, getAgentHandler);
agentRouter.get(base+'/:pageNumber', getAgentsByPageHandler);
agentRouter.patch(base+'/:id', validate(updateUserSchema), auth, updateUserHandler );
agentRouter.delete(base+'/:id', auth, adminAuth, deleteAgentHandler );

export default agentRouter;