import { NextFunction, Request, Response } from 'express';
import {
    createFarm,
    getFarms,
    findById,
    updateFarm,
    deleteFarm
} from '../services/farm.service';

import { 
  getStates,
  getLGAs
 } from '../services/utils.service';

import AppError from '../utils/app.error';
import {
  CreateFarmInput,
  UpdateFarmInput
} from "../schemas/farm.schema"
import { Prisma } from '@prisma/client';

export const createFarmHandler = async (
  req: Request<{}, {}, CreateFarmInput> | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const farmerId = req.params.user_id;
    const farm = await createFarm({
      name: req.body.name,
      location: req.body.location,
      landmark: req.body.closest_landmark,
      state: req.body.state,
      local_govt: req.body.local_govt,
      ward: req.body.ward, 
      user_id: farmerId
    });

    return res.status(201).json({
      status: "Success",
      farm
    })
  } catch (err: any) { 
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return res.status(409).json({
          status: 'fail',
          message: 'Farm with similara name already exist, please use another name',
        });
      }
    }
    next(err);
  }
};

export const getFarmsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const farm = await getFarms()
      return res.status(200).json({
      status: 'Success',
      farm
    });
  } catch (err: any) {
    next(err);
  }
};

export const getFarmHandler = async (
  req: Response | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const farm = await findById({ id: id})
     if (!farm) {
      return next(new AppError(401, 'Warehouse does not exist'));
    }
      return res.status(200).status(200).json({
      status: 'success',
      farm
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateFarmHandler = async (
  req: Request < {}, {}, UpdateFarmInput > | any,
  res: Response,
  next: NextFunction
) => {
  try {
//   const data = 
  const { id } = req.params;
    const farm = await updateFarm(
        { id: id }, 
        {
            name: req.body.name,
            location: req.body.location,
            landmark: req.body.closest_landmark,
            state: req.body.state,
            local_govt: req.body.local_govt,
            ward: req.body.ward, 
            size: req.body.size,
          });
     if (!farm) 
      return next(new AppError(401, 'Farm does not exist'));
    
    return res.status(200).json({
      status: 'Success',
      farm,
    });
  } catch (err: any) {    
    next(err);
  }
};

export const deleteFarmHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const farm = await findById({id: id});
    if (!farm) 
      return next(new AppError(401, 'Err! Warehouse not found'));
    
    const response = await deleteFarm(id)
    return res.status(200).json({
      status: 'success',
      response
    });
  } catch (err: any) {
    next(err);
  }
};