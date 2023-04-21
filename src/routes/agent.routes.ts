import express from 'express';
import { validate } from '../middleware/validate';
import {
    getMeHandler,
    getAgentsHandler,
    getAgentHandler,
    getAgentsByPageHandler,
    updateAgentHandler,
    deleteAgentHandler
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
agentRouter.delete(base+'/delete/:id', auth, deleteAgentHandler );

export default agentRouter;