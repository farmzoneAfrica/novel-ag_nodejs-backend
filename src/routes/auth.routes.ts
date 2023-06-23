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
  verifyOtpSchema
} from '../schemas/user.schema';

const authRouter = express.Router();

authRouter.post( '/register', validate(createUserSchema), registerUserHandler);

authRouter.post( '/login', validate(loginUserSchema), loginUserHandler);
authRouter.get( '/refresh', refreshAccessTokenHandler);
authRouter.get( '/verifyemail/:verificationCode', validate(verifyEmailSchema), verifyEmailHandler );
authRouter.post( '/otp', validate(verifyOtpSchema), verifyOtpHandler );
authRouter.get( '/logout', auth, requireUser, logoutUserHandler );
authRouter.post( '/forgotpassword', validate(forgotPasswordSchema), forgotPasswordHandler );
authRouter.patch( '/resetpassword/:resetToken', validate(resetPasswordSchema), resetPasswordHandler );

export default authRouter;