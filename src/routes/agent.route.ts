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

agentRouter.get(base+'/get', auth, getAgentsHandler);
agentRouter.get(base+'/get/:id', auth, requireUser, getAgentHandler);
agentRouter.get(base+'/:pageNo', getAgentsByPageHandler);
agentRouter.patch(base+'/update/:id', validate(updateUserSchema), auth, updateUserHandler );
agentRouter.delete(base+'/delete/:id', auth, adminAuth, deleteAgentHandler );

export default agentRouter;