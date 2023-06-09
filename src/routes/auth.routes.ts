// import express from 'express';
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
  registerUserSchema,
  resetPasswordSchema,
  verifyEmailSchema,
  verifyOtpSchema
} from '../schemas/user.schema';

const authRouter = express.Router();

const base = ""

authRouter.post( base+'/register', validate(registerUserSchema), registerUserHandler);
authRouter.post( base+'/login', validate(loginUserSchema), loginUserHandler);
authRouter.get( base+'/refresh', refreshAccessTokenHandler);
authRouter.get( base+'/verifyemail/:verificationCode', validate(verifyEmailSchema), verifyEmailHandler );
authRouter.post( base+'/otp', validate(verifyOtpSchema), verifyOtpHandler );
authRouter.get( base+'/logout', auth, requireUser, logoutUserHandler );
authRouter.post( base+'/forgotpassword', validate(forgotPasswordSchema), forgotPasswordHandler );
authRouter.patch( base+'/resetpassword/:resetToken', validate(resetPasswordSchema), resetPasswordHandler );

export default authRouter;