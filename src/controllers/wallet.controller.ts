import { NextFunction, Request, Response } from 'express';
import {
    createWallet,
    getWallets,
    findById,
    updateWallet,
    deleteWallet
} from '../services/wallet.service';

import AppError from '../utils/app.error';

import {
  CreateWalletInput,
  UpdateWalletInput
} from "../schemas/wallet.schema"

import { Prisma } from '@prisma/client';

export const createWalletHandler = async (
  req: Request<{}, {}, CreateWalletInput> | any,
  res: Response,
  next: NextFunction
  ) => {
    
    try {
    const userId = req.user.sub;
    const data = {
      bvn: req.body.bvn,
      bank: req.body.bank,
      account_number: req.body.account_number,
      account_name: req.body.account_name,
      userId: userId,
    }

    const wallet = await createWallet(data);
    return res.status(201).json({
      status: "Sucess",
      wallet
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
    const warehouse = await findById({ id: id})
     if (!warehouse) {
      return next(new AppError(401, 'Warehouse does not exist'));
    }
      return res.status(200).json({
      status: 'success',
      data: {
        warehouse,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateWalletHandler = async (
  req: Request < {}, {}, UpdateWalletInput > | any,
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
    const warehouse = await updateWallet({ id: id }, data);
     if (!warehouse) 
      return next(new AppError(401, 'Warehouse does not exist'));
    
    return res.status(200).json({
      status: 'Success',
      warehouse,
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
    const warehouse = await findById({id: id});
    if (!warehouse) 
      return next(new AppError(401, 'Err! Warehouse not found'));
    
    const response = await deleteWallet(id)
    return res.status(200).json({
      status: 'success',
      response
    });
  } catch (err: any) {
    next(err);
  }
};