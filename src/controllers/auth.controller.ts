import crypto from 'crypto';
import { CookieOptions, NextFunction, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import {

  ForgotPasswordInput,
  LoginUserInput,
  RegisterUserInput,
  ResetPasswordInput,
  VerifyEmailInput,
  VerifyOtpInput
} from '../schemas/user.schema';

import { sendOtp } from '../utils/phoneOtp'

import {
  createUser,
  findAll,
  pagination,
  findById,
  findUniqueUser,
  findUser,
  findUser1,
  signTokens,
  updateUser,
  deleteUser,
} from '../services/user.service';

import { 
  getStates,
  getLGAs
} from '../services/common.service';
 
import { Prisma } from '@prisma/client';
import config from 'config';
import AppError from '../utils/app.error';
import redisClient from '../utils/connect.redis';
import { signJwt, verifyJwt } from '../utils/jwt';
import Email from '../utils/email';
import { log } from 'console';
// import { date } from 'zod';
// import { log } from 'console';

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

    const userRole = user.role;
    const phone = user.phone;
    const baseUrl = process.env.BASE_URL;
    const emailVerificationRedirectUrl = `${baseUrl}/api/auth/verifyemail/${verifyCode}`;
    const phoneVerificationRedirectUrl = `${baseUrl}/api/auth/verifyphone/:otp`;
    // const redirectUrl = `${baseUrl}/api/auth/verifyemail/${verifyCode}`;

    try { 
      const genOtp = Math.floor(Math.random()*1000000).toString();

      userRole === "farmer" ? 

      await sendOtp (phone, genOtp) :

      await new Email(user, emailVerificationRedirectUrl).sendVerificationCode();
      await updateUser({ id: user.id }, { verificationCode });
      res.status(201).json({
        status: 'success',
        message:
          'An email with a verification code has been sent to your email',
        user
      });
    } catch (error) {
      await updateUser({ id: user.id }, { verificationCode: null });
      return res.status(500).json({
        status: 'error',
        message: 'There was an error sending email, please try again',
      });
    }

  } catch (err: any) {   
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return res.status(409).json({
          status: 'fail',
          message: 'Email or Phone number already exist, please check and try again',
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
    const { email, phone, password } = req.body;

    const user = await findUniqueUser(
      { email: email.toLowerCase() } || { phone: email.toLowerCase() },
      { id: true, email: true, verified: true, phone: true, password: true }
    );
    if (!user) {
      return next(new AppError(400, 'Invalid credentials, kindly check and try again'));
    }

    if (!user.verified) {
      return next(
        new AppError(
          401,
          'You are not verified, please verify your email or phone number to login'
        )
      );
    }
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(new AppError(400, 'Invalid email or password'));
    }

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

export const verifyOtpHandler = async (
  req: Request<VerifyOtpInput>,
  res: Response,
  next: NextFunction
) => {
  try {
  
    const phoneVerificationCode = Math.floor(Math.random()*1000000).toString();

    const user = await updateUser(
      { phoneVerificationCode },
      { verified: true, phoneVerificationCode: null },
      { email: true }
    );

    if (!user) {
      return next(new AppError(401, 'Could not verify phone number'));
    }

    return res.status(200).json({
      status: 'success',
      message: 'Phone numbrt verified successfully',
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

export const getUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await findAll()
    res.status(200).status(200).json({
      status: 'Success',
      users
    });
  } catch (err: any) {
    next(err);
  }
};

export const usersPaginationHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pageNo } = req.params as any;
    const users = await pagination(pageNo * 10, 10)
    res.status(200).status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const getUserHandler = async (
  req: Response | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await findById({ id: id })
     if (!user) {
      return next(new AppError(401, 'User does not exist'));
    }
    return res.status(200).json({
      status: 'success',
      user
    });
  } catch (err: any) {
    next(err);
  }
};

export const getFarmerHandler = async (
  req: Response | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const user = await findById({ id: id })
     if (!user) {
      return next(new AppError(401, 'User does not exist'));
    }
    return res.status(200).json({
      status: 'success',
      user
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateUserHandler = async (
  req: Response | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const findUser = await findById({id: id});
    if (!findUser) 
      return next(new AppError(401, 'User not found in database'));
    const body: Array<string> = (Object.keys(req.body));    
  const data = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    address: req.body.address,
    gender: req.body.gender,
    marital_status: req.body.maritalStatus,
    phone: req.body.phone,
    avatar: req.body.avatar,
    state: req.body.state,
    local_govt: req.body.localGovt,
    password: req.body.password,
  }
  
  const dataKeys: Array<string> = Object.keys(data);
    
  if (dataKeys.includes(body.toString()) === false ) {
    return next(new AppError(401, 'Wrong input value'));
  }
  const user = await updateUser({ id: id }, data);
     if (!user) {
      return next(new AppError(401, 'User does not exist'));
    }
    return res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const agent = await findById({id: id});
    if (!agent) 
      return next(new AppError(401, 'Agent not found in database'));
    
    const response = await deleteUser(id)
    return res.status(200).json({
      status: 'success',
      response
    });
  } catch (err: any) {
    next(err);
  }
};
