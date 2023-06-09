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

const userRouter = express.Router();

userRouter.get( '/', auth, getAgentsHandler);
userRouter.get( '/:id', auth, requireUser, getAgentHandler);
userRouter.get( '/:pageNumber', getAgentsByPageHandler);
userRouter.patch( '/:id', validate(updateUserSchema), auth, updateUserHandler );
userRouter.delete( '/:id', auth, adminAuth, deleteAgentHandler );

export default userRouter;