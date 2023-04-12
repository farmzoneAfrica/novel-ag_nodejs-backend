import express from 'express';
import {
    getMeHandler,
    getAgentsHandler
} from '../controllers/agent.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';

const router = express.Router();


// router.use(deserializeUser, requireUser);

router.get('/', getAgentsHandler);

router.get('/me', getMeHandler);


// router.get('/:id', getAgentHandler);

export default router;