import { NextFunction, Request, Response } from 'express';
import {
    assignRole,
    getRoles,
    getUniqueRole,
    updateRole,
    deleteRole
} from '../services/role.service';

import AppError from '../utils/app.error';

import {
  CreateRoleInput,
  UpdateRoleInput
} from "../schemas/role.schema"

import { Prisma } from '@prisma/client';

export const createRoleHandler = async (
  req: Request<{}, {}, CreateRoleInput>,
  res: Response,
  next: NextFunction
  ) => {
    
    try {
    // const admin = req.user.sub;
    const data = {
      role: req.body.role
    //   admin: userId,
    }

    const role = await assignRole(data);
    return res.status(201).json({
      status: "Sucess",
      role
    })
  } catch (err: any) { 
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return res.status(409).json({
          status: 'fail',
          message: 'Error! BVN  already exist ',
        });
      }
    }
    next(err);
  }
};

export const getWalletsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const wallets = await getWallets()
    return res.status(200).json({
      status: 'success',
      wallets
    });
  } catch (err: any) {
    next(err);
  }
};

export const getWalletHandler = async (
  req: Response | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const wallet = await findById({ id: id})
     if (!wallet) {
      return next(new AppError(401, 'wallet does not exist'));
    }
      return res.status(200).json({
      status: 'success',
      data: {
        wallet,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateWalletHandler = async (
  req: Request < {}, {}, UpdateRoleInput >,
  res: Response,
  next: NextFunction
) => {
  try {
  const { id } = req.params; 
  const data = {
      name: req.body.name,
      bank_name: req.body.bank_name,
      closest_landmark: req.body.closest_landmark,
      state: req.body.state,
      local_govt: req.body.local_govt,
      ward: req.body.ward,
      status: req.body.status
  }
    const wallet = await updateWallet({ id: id }, data);
     if (!wallet) 
      return next(new AppError(401, 'wallet does not exist'));
    
    return res.status(200).json({
      status: 'Success',
      wallet,
    });
  } catch (err: any) {    
    next(err);
  }
};

export const deleteWalletHandler = async (
  req: Request,
  res: Response, 
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const wallet = await findById({id: id});
    if (!wallet) 
      return next(new AppError(401, 'Err! wallet not found'));
    
    const response = await deleteWallet(id)
    return res.status(200).json({
      status: 'success',
      response
    });
  } catch (err: any) {
    next(err);
  }
};