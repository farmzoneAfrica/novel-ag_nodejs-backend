import { NextFunction, Request, Response } from 'express';
import {
    createWarehouse,
    getWarehouses,
    findById,
    updateWarehouse,
    deleteWarehouse,
  
} from '../services/warehouse.service';

import { 
  getStates,
  getLGAs
 } from '../services/common.service';

import AppError from '../utils/app.error';
import {
  CreateWarehouseInput,
  UpdateWarehouseInput
} from "../schemas/warehouse.schema"
import prisma from '../utils/prismaClient';
import { Prisma } from '@prisma/client';

export const createWarehouseHandler = async (
  req: Request<{}, {}, CreateWarehouseInput> | any,
  res: Response,
  next: NextFunction
  ) => {
    
    try {
    const userId = req.user.sub;
    const data = {
      name: req.body.name,
      location: req.body.location,
      closest_landmark: req.body.closest_landmark,
      state: req.body.state,
      local_govt: req.body.local_govt,
      ward: req.body.ward,
      status: req.body.status,
      userId: userId,
    }

    if ( getStates().includes(data.state) === false ) {
      return next(new AppError(400, 'Invalid state, please enter a valid state'));
    }

    if ( getLGAs(data.state).includes(data.local_govt) === false ) {
      return next(new AppError(400, 'Invalid LGA, please enter a valid local government'));
    }

    const warehouse = await createWarehouse(data);
    return res.status(201).json({
      status: "Sucess",
      warehouse
    })
  } catch (err: any) { 
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return res.status(409).json({
          status: 'fail',
          message: 'Warehouse name already exist, please use another name',
        });
      }
    }
    next(err);
  }
};

export const getWarehousesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const warehouses = await getWarehouses()
      return res.status(200).json({
      status: 'success',
      warehouses
    });
  } catch (err: any) {
    next(err);
  }
};

export const getWarehouseHandler = async (
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

export const updateWarehouseHandler = async (
  req: Request < {}, {}, UpdateWarehouseInput > | any,
  res: Response,
  next: NextFunction
) => {
  try {
  const { id } = req.params; 
  const data = {
      name: req.body.name,
      location: req.body.location,
      closest_landmark: req.body.closest_landmark,
      state: req.body.state,
      local_govt: req.body.local_govt,
      ward: req.body.ward,
      status: req.body.status
  }
    const warehouse = await updateWarehouse({ id: id }, data);
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

export const deleteWarehouseHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const warehouse = await findById({id: id});
    if (!warehouse) 
      return next(new AppError(401, 'Err! Warehouse not found'));
    
    const response = await deleteWarehouse(id)
    return res.status(200).json({
      status: 'success',
      response
    });
  } catch (err: any) {
    next(err);
  }
};