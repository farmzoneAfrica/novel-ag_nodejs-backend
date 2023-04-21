import express from 'express';
import { validate } from '../middleware/validate';
import {
    getMeHandler,
    getAgentsHandler,
    getAgentHandler,
    getAgentsByPageHandler,
    updateAgentHandler
} from '../controllers/agent.controller';
import {
    auth,
    adminAuth
} from '../middleware/auth';
import {
  updateAgentSchema
} from '../schemas/agent.schema';

import { requireUser } from '../middleware/requireUser';

const agentRouter = express.Router();

const base = ""

agentRouter.get(base+'/', auth, getAgentsHandler);
agentRouter.get(base+'/:pageNo', getAgentsByPageHandler);
agentRouter.get(base+'/:id', auth, requireUser, adminAuth, getAgentHandler);
agentRouter.get('/me', auth, getMeHandler);
agentRouter.patch(base+'/update/:id', validate(updateAgentSchema), auth, updateAgentHandler );

export default agentRouter;