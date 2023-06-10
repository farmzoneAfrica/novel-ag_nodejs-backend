import express from 'express';
import { validate } from '../middleware/validate';
import {
    getUsersHandler,
    getUserHandler,
    usersPaginationHandler,
    updateUserHandler,
    deleteUserHandler
} from '../controllers/auth.controller';
import {
    auth,
    adminAuth
} from '../middleware/deserializeUser';
import {
  updateUserSchema
} from '../schemas/user.schema';

import { requireUser } from '../middleware/requireUser';

const agentRouter = express.Router();

agentRouter.get( '/get', auth, getUsersHandler);
agentRouter.get( '/get/:id', auth, requireUser, getUserHandler);
agentRouter.get( '/:pageNo', usersPaginationHandler);
agentRouter.patch( '/update/:id', validate(updateUserSchema), auth, updateUserHandler );
agentRouter.delete( '/delete/:id', auth, adminAuth, deleteUserHandler );

export default agentRouter;