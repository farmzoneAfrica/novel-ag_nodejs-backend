import express, { NextFunction, Request, Response, response } from 'express';
import {
  getUsersHandler,
  getUserHandler,
  usersPaginationHandler,
  updateUserHandler,
  deleteUserHandler,
  getNoOfTotalUsersHandler,
  getUsersByRoleHandler,
  getUserByRoleNoHandler
} from '../controllers/user.controller';

import { auth, adminAuth } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import {
  updateUserSchema
} from '../schemas/user.schema';

const userRouter = express.Router();

// userRouter.get( '/', auth, getUsersHandler);
userRouter.get( '/', getUsersHandler);

userRouter.get( '/no', getNoOfTotalUsersHandler);
userRouter.get( '/me/:id',  getUserHandler);
userRouter.get( '/:pageNo', usersPaginationHandler);
userRouter.patch( '/:id', validate(updateUserSchema), updateUserHandler );
userRouter.delete( '/:id', deleteUserHandler );

// userRouter.get( '/', auth, adminAuth, getUsersHandler);
// userRouter.get( '/no', getNoOfTotalUsersHandler);
// userRouter.get( '/me/:id', auth, requireUser, getUserHandler);
// userRouter.get( '/:pageNo', usersPaginationHandler);
// userRouter.patch( '/:id', validate(updateUserSchema), auth, adminAuth, updateUserHandler );
// userRouter.delete( '/:id', auth, adminAuth, deleteUserHandler );


userRouter.get( '/:roles', getUsersByRoleHandler );
userRouter.get( '/:role/no', getUserByRoleNoHandler );

export default userRouter;