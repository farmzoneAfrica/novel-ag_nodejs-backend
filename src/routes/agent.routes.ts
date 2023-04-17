import express from 'express';
import {
    getMeHandler,
    getAgentsHandler,
    getAgentHandler
} from '../controllers/agent.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';

const agentRouter = express.Router();

// agentRouter.use(deserializeUser, requireUser);
// the base variable is for purposes of swagger compilation, 
// it should always be an empty string but api/agent when auto compiling swagger
const base = ""
agentRouter.get('/', getAgentsHandler);
agentRouter.get(base+'/:id', deserializeUser, requireUser, getAgentHandler);
agentRouter.get('/me', deserializeUser, getMeHandler);

export default agentRouter;