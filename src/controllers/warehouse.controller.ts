import { NextFunction, Request, Response } from 'express';
import {
    createWarehouse,
    getWarehouses,
    findById,
    getUniqueWarehouse,
    updateWarehouse,
    deleteWarehouse,
  
} from '../services/warehouse.service';

import { 
  getStates,
  getLGAs
 } from '../services/common.service';

import AppError from '../utils/appError';
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
    const agentId = req.user.sub
    const warehouse = await createWarehouse({
      name: req.body.name,
      address: req.body.address,
      state: req.body.state,
      localGovt: req.body.localGovt,
      remarks: req.body.remarks,
      agentId: agentId
    });

    const inputState = warehouse.state;
    const inputLGA = warehouse.localGovt;
    const states = await getStates();
    const LGAs = await getLGAs(inputState);
    if ( states.includes(inputState) === false ) {
      return next(new AppError(400, 'Invalid state, please enter a valid state'));
    }
    if ( LGAs.includes(inputLGA) === false ) {
      return next(new AppError(400, 'Invalid LGA, please enter a valid local government'));
    }
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
    const warehouse = await getWarehouses()
      return res.status(200).status(200).json({
      status: 'success',
      data: {
        warehouse,
      },
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
      return res.status(200).status(200).json({
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
    address: req.body.address,
    state: req.body.state,
    localGovt: req.body.localGovt,
    status: req.body.status,
    remarks: req.body.remarks,
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