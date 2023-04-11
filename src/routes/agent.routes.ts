import express from 'express';
import {
    getMeHandler,
    getAgentsHandler
} from '../controllers/agent.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';

const router = express.Router();

// router.get('/', () => {
//     console.log(18, "hello get all users")
// });

router.get('/', getAgentsHandler);

router.use(deserializeUser, requireUser);

router.get('/me', getMeHandler);




// router.get('/:id', getAgentHandler);

export default router;