import express from 'express';
import {
    getMeHandler,
    getAgentsHandler,
    getAgentHandler,
    getAgentsByPageHandler
} from '../controllers/agent.controller';
import {
    auth,
    adminAuth
} from '../middleware/auth';
import { requireUser } from '../middleware/requireUser';

const agentRouter = express.Router();

// agentRouter.use(deserializeUser, requireUser);
// the base variable is for purposes of swagger compilation, 
// it should always be an empty string but api/agent when auto compiling swagger
const base = ""
agentRouter.get('/', auth, getAgentsHandler);
agentRouter.get('/:pageNo', getAgentsByPageHandler);
agentRouter.get(base+'/:id', auth, requireUser, adminAuth, getAgentHandler);
agentRouter.get('/me', auth, getMeHandler);

export default agentRouter;