import { NextFunction, Request, Response } from 'express';
import { omit } from 'lodash';
import { excludedFields, findUniqueUser } from '../services/user.service';
import AppError from '../utils/app.error';
import redisClient from '../utils/connect.redis';
import { verifyJwt } from '../utils/jwt';

export const auth = async (
  req: Request|any,
  res: Response,
  next: NextFunction
) => {
  try {
    let access_token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }
    
    if (!access_token) {
      return next(new AppError(401, 'You are not logged in'));
    }

    const decoded = verifyJwt<{ sub: string }>(
      access_token,
      'ab1234'
    );

    if (!decoded) {
      return next(new AppError(401, `Invalid token or user doesn't exist`));
    }

    const session = await redisClient.get(decoded.sub);

    if (!session) {
      return next(new AppError(401, `Invalid token or session has expired`));
    }

    const user = await findUniqueUser({ id: JSON.parse(session).id });

    if (!user) {
      return next(new AppError(401, `Invalid token or session has expired`));
    }
    res.locals.user = omit(user, excludedFields);
    req.user = decoded

    next();
  } catch (err: any) {
    next(err);
  }
};


export const adminAuth = async (
  req: Request|any,
  res: Response,
  next: NextFunction
) => {
  try {
    let access_token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }
    
    if (!access_token) {
      return next(new AppError(401, 'You are not logged in'));
    }

    const decoded = verifyJwt<{ sub: string }>(
      access_token,
      'ab1234'
    );

    if (!decoded) {
      return next(new AppError(401, `Invalid token or user doesn't exist`));
    }

    const session = await redisClient.get(decoded.sub);

    if (!session) {
      return next(new AppError(401, `Invalid token or session has expired`));
    }

    const user = await findUniqueUser({ id: JSON.parse(session).id });
    
      if (user.role !== "admin")
          return next(new AppError(401, "Fobbitten route, you are not an admin"))

    if (!user) {
      return next(new AppError(401, `Invalid token or session has expired`));
    }

    res.locals.user = omit(user, excludedFields);
    req.user = decoded

    next();
  } catch (err: any) {
    next(err);
  }
};


 export const adminAuthdel = async (
  req: Request|any,
  res: Response,
  next: NextFunction
) => {
  try {
    let access_token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      access_token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.access_token) {
      access_token = req.cookies.access_token;
    }
    
    if (!access_token) {
      return next(new AppError(401, 'You are not logged in'));
    }

    const decoded = verifyJwt<{ sub: string }>(
      access_token,
      'ab1234'
    );

    if (!decoded) {
      return next(new AppError(401, `Invalid token or user doesn't exist`));
    }

    const session = await redisClient.get(decoded.sub);

    if (!session) {
      return next(new AppError(401, `Invalid token or session has expired`));
    }

    const user = await findUniqueUser({ id: JSON.parse(session).id });
    
      if (user.role !== "admin")
          return next(new AppError(401, "Fobbitten route, you are not an admin"))

    if (!user) {
      return next(new AppError(401, `Invalid token or session has expired`));
    }

    res.locals.user = omit(user, excludedFields);
    req.user = decoded

    next();
  } catch (err: any) {
    next(err);
  }
};

