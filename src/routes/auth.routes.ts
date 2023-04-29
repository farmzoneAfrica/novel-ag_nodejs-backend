// import express from 'express';
import express, { NextFunction, Request, Response, response } from 'express';
import {
  forgotPasswordHandler,
  loginAgentHandler,
  logoutAgentHandler,
  refreshAccessTokenHandler,
  registerAgentHandler,
  resetPasswordHandler,
  verifyEmailHandler,
} from '../controllers/auth.controller';
import { auth, adminAuth } from '../middleware/auth';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import {
  forgotPasswordSchema,
  loginAgentSchema,
  registerAgentSchema,
  resetPasswordSchema,
  verifyEmailSchema
} from '../schemas/agent.schema';

const authRouter = express.Router();

// the base variable is for purposes of swagger compilation, 
// it should always be an empty string but api/agent when auto compiling swagger
const base = ""

authRouter.post(base+'/register', validate(registerAgentSchema), registerAgentHandler);
authRouter.post(base+'/login', validate(loginAgentSchema), loginAgentHandler);
authRouter.get(base+'/refresh', refreshAccessTokenHandler);
authRouter.get( base+'/verifyemail/:verificationCode', validate(verifyEmailSchema), verifyEmailHandler );
authRouter.get( base+'/logout', auth, requireUser, logoutAgentHandler );
authRouter.post( base+'/forgotpassword', validate(forgotPasswordSchema), forgotPasswordHandler );
authRouter.patch( base+'/resetpassword/:resetToken', validate(resetPasswordSchema), resetPasswordHandler );

export default authRouter;