import express, { NextFunction, Request, Response, response } from 'express';
import {
  forgotPasswordHandler,
  loginUserHandler,
  logoutUserHandler,
  refreshAccessTokenHandler,
  registerUserHandler,
  resetPasswordHandler,
  verifyEmailHandler,
  verifyOtpHandler,
  getUsersHandler,
  getUserHandler,
  usersPaginationHandler,
  updateUserHandler,
  deleteUserHandler
} from '../controllers/auth.controller';

import { auth, adminAuth } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import {
  forgotPasswordSchema,
  loginUserSchema,
  createUserSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  verifyOtpSchema,
  updateUserSchema
} from '../schemas/user.schema';

const authRouter = express.Router();

authRouter.post( '/register', validate(createUserSchema), registerUserHandler);

authRouter.get( '/users', auth, adminAuth, getUsersHandler);
authRouter.get( '/user/:id', auth, requireUser, getUserHandler);
authRouter.get( '/users/:pageNumber', usersPaginationHandler);
authRouter.patch( '/user/:id', validate(updateUserSchema), auth, adminAuth, updateUserHandler );
authRouter.delete( '/user/:id', auth, adminAuth, deleteUserHandler );

authRouter.post( '/login', validate(loginUserSchema), loginUserHandler);
authRouter.get( '/refresh', refreshAccessTokenHandler);
authRouter.get( '/verifyemail/:verificationCode', validate(verifyEmailSchema), verifyEmailHandler );
authRouter.post( '/otp', validate(verifyOtpSchema), verifyOtpHandler );
authRouter.get( '/logout', auth, requireUser, logoutUserHandler );
authRouter.post( '/forgotpassword', validate(forgotPasswordSchema), forgotPasswordHandler );
authRouter.patch( '/resetpassword/:resetToken', validate(resetPasswordSchema), resetPasswordHandler );

export default authRouter;