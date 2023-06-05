import crypto from 'crypto';
import { CookieOptions, NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import {
  ForgotPasswordInput,
  LoginUserInput,
  RegisterUserInput,
  ResetPasswordInput,
  VerifyEmailInput,
} from '../schemas/user.schema';

import {
  createUser,
  findUniqueUser,
  findUser,
  findUser1,
  findById,
  signTokens,
  updateUser,
} from '../services/user.service';

import { 
  getStates,
  getLGAs
} from '../services/common.service';
 
import { Prisma } from '@prisma/client';
import config from 'config';
import AppError from '../utils/appError';
import redisClient from '../utils/connectRedis';
import { signJwt, verifyJwt } from '../utils/jwt';
import Email from '../utils/email';
import { date } from 'zod';
import { log } from 'console';

const cookiesOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
};

const accessTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
  ),
  maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
};

const refreshTokenCookieOptions: CookieOptions = {
  ...cookiesOptions,
  expires: new Date(
    Date.now() + config.get<number>('refreshTokenExpiresIn') * 60 * 1000
  ),
  maxAge: config.get<number>('refreshTokenExpiresIn') * 60 * 1000,
};

export const registerUserHandler = async (
  req: Request<{}, {}, RegisterUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const verifyCode = crypto.randomBytes(32).toString('hex');
    const verificationCode = crypto
      .createHash('sha256')
      .update(verifyCode)
      .digest('hex');

    const user = await createUser({
        role: req.body.role,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,                                                                                                                               
        phone: req.body.phone,
        avatar: req.body.avatar,
        gender: req.body.gender,
        state: req.body.state,
        local_govt: req.body.local_govt,
        marital_status: req.body.marital_status,
        email: req.body.email.toLowerCase(),
        password: hashedPassword,
        verificationCode,
    });
    
    const inputState = user.state;
    const inputLGA = user.local_govt;
    const states = await getStates();
    const LGAs = await getLGAs(inputState);
    if ( states.includes(inputState) === false ) {
      return next(new AppError(400, 'Invalid state, please enter a valid state'));
    }
    if ( LGAs.includes(inputLGA) === false ) {
      return next(new AppError(400, 'Invalid LGA, please enter a valid local government'));
    }
    const user_role = user.role;
    const baseUrl = process.env.BASE_URL;
    const redirectUrl = `${baseUrl}/api/auth/verifyemail/${verifyCode}`;
    

    try {
      if (user_role === "farmer"){
        // logic for OTP
        console.log("user logic")
      } else {
        await new Email(user, redirectUrl).sendVerificationCode();      
        await updateUser({ id: user.id }, { verificationCode });
        res.status(201).json({
          status: 'success',
          message:
            'An email with a verification code has been sent to your email',
          user
        });
      }
    } catch (error) {
      await updateUser({ id: user.id }, { verificationCode: null });
      return res.status(500).json({
        status: 'error',
        message: 'There was an error sending email, please try again',
      });
    }
  } catch (err: any) {   
    console.log(117)
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return res.status(409).json({
          status: 'fail',
          message: 'Email already exist, please use another email address',
        });
      }
    }
    next(err);
  }
};

export const loginUserHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await findUniqueUser(
      { email: email.toLowerCase() },
      { id: true, email: true, verified: true, password: true }
    );
    if (!user) {
      return next(new AppError(400, 'Invalid email or password'));
    }
    if (!user.verified) {
      return next(
        new AppError(
          401,
          'You are not verified, please verify your email to login'
        )
      );
    }
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError(400, 'Invalid email or password'));
    }

    // Sign Tokens
    const { access_token, refresh_token } = await signTokens(user);
    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json({
      status: 'success',
      access_token,
    });
  } catch (err: any) {
    next(err);
  }
};

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refresh_token = req.cookies.refresh_token;

    const message = 'Could not refresh access token';

    if (!refresh_token) {
      return next(new AppError(403, message));
    }
    const decoded = verifyJwt<{ sub: string }>(
      refresh_token,
      'ab1234'
    );
    if (!decoded) {
      return next(new AppError(403, message));
    }
    const session = await redisClient.get(decoded.sub);
    if (!session) {
      return next(new AppError(403, message));
    }
    const user = await findUniqueUser({ id: JSON.parse(session).id });
    if (!user) {
      return next(new AppError(403, message));
    }
    const access_token = signJwt({ sub: user.id }, 'ab1234', {
      expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
    });

    res.cookie('access_token', access_token, accessTokenCookieOptions);
    res.cookie('logged_in', true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json({
      status: 'success',
      access_token,
    });
  } catch (err: any) {
    // console.log(err);
    next(err);
  }
};

function logout(res: Response) {
  res.cookie('access_token', '', { maxAge: 1 });
  res.cookie('refresh_token', '', { maxAge: 1 });
  res.cookie('logged_in', '', { maxAge: 1 });
}

export const logoutUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await redisClient.del(res.locals.user.id);
    logout(res);

    res.status(200).json({
      status: 'success',
    });
  } catch (err: any) {
    next(err);
  }
};

export const verifyEmailHandler = async (
  req: Request<VerifyEmailInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const verificationCode = crypto
      .createHash('sha256')
      .update(req.params.verificationCode)
      .digest('hex');

    const user = await updateUser(
      { verificationCode },
      { verified: true, verificationCode: null },
      { email: true }
    );

    if (!user) {
      return next(new AppError(401, 'Could not verify email'));
    }

    return res.status(200).json({
      status: 'success',
      message: 'Email verified successfully',
    });
  } catch (err: any) {
    if (err.code === 'P2025') {
      return res.status(403).json({
        status: 'fail',
        message: `Verification code is invalid or user doesn't exist`,
      });
    }
    next(err);
  }
};

export const forgotPasswordHandler = async (
  req: Request<
    Record<string, never>,
    Record<string, never>,
    ForgotPasswordInput
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    // const agent = await findUser({ email: req.body.email.toLowerCase() });
    const email = req.body.email.toLowerCase();
    const user = await findUser1({ email: email });
    console.log(user)
    const message =
      'You will receive a reset email if user with that email exist';
    if (!user) {
      return res.status(200).json({
        status: 'success',
        message,
      });
    }

    if (!user.verified) {
      return res.status(403).json({
        status: 'fail',
        message: 'Account not verified',
      });
    }

    if (user.provider) {
      return res.status(403).json({
        status: 'fail',
        message:
          'We found your account. It looks like you registered with a social auth account. Try signing in with social auth.',
      });
    }
    const resetToken = crypto.randomBytes(32).toString('hex');
    const passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    await updateUser(
      { id: user.id },
      {
        passwordResetToken,
        passwordResetAt: new Date(Date.now() + 10 * 60 * 1000),
      },
      { email: true }
    );

    try {
      const baseUrl = process.env.BASE_URL;
      const url = `${baseUrl}/api/auth/resetpassword/${resetToken}`;
      await new Email(user, url).sendPasswordResetToken();

     return res.status(200).json({
        status: 'success',
        message,
      });
    } catch (err: any) {
      await updateUser(
        { id: user.id },
        { passwordResetToken: null, passwordResetAt: null },
        {}
      );
      return res.status(500).json({
        status: 'error',
        message: 'There was an error sending email',
      });
    }
  } catch (err: any) {
    next(err);
  }
};

export const resetPasswordHandler = async (
  req: Request<
    ResetPasswordInput['params'],
    Record <string, never>,
    ResetPasswordInput['body']
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the user from the collection
    const passwordResetToken = crypto
      .createHash('sha256')
      .update(req.params.resetToken)
      .digest('hex');

    const user = await findUser({
      passwordResetToken,
      passwordResetAt: Date.now().toString(),
      
    });

    if (!user) {
      return res.status(403).json({
        status: 'fail',
        message: 'Invalid token or token has expired',
      });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);

    await updateUser(
      {
        id: user.id,
      },
      {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetAt: null,
      },
      { email: true }
    );

    logout(res);
    res.status(200).json({
      status: 'success',
      message: 'Password data updated successfully',
    });
  } catch (err: any) {
    next(err);
  }
};
