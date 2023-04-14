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
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import {
  forgotPasswordSchema,
  loginAgentSchema,
  registerAgentSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} from '../schemas/agent.schema';

const router = express.Router();
let base ='/api/agent'

router.post('/register', validate(registerAgentSchema), registerAgentHandler);
router.post('/login', validate(loginAgentSchema), loginAgentHandler);
router.get('/refresh', refreshAccessTokenHandler);

router.get(
  '/verifyemail/:verificationCode',
  validate(verifyEmailSchema),
  verifyEmailHandler
);

router.get('/logout', deserializeUser, requireUser, logoutAgentHandler);

router.post(
  '/forgotpassword',
  validate(forgotPasswordSchema),
  forgotPasswordHandler
);

router.patch(
  '/resetpassword/:resetToken',
  validate(resetPasswordSchema),
  resetPasswordHandler
);

export default router;