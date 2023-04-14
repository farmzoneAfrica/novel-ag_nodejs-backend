import express from 'express';
import {
    getMeHandler,
    getAgentsHandler,
    getAgentHandler
} from '../controllers/agent.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';

const router = express.Router();


// router.use(deserializeUser, requireUser);

router.get('/', getAgentsHandler);

router.get('/:id', getAgentHandler);

router.get('/me', getMeHandler);

export default router;