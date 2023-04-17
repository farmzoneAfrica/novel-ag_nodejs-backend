import { NextFunction, Request, Response } from 'express';
import {
    createWarehouse,
    getWarehouses,
    findWarehouseById,
    getUniqueWarehouse,
    updateWarehouse,
    deleteWarehouse,
  
} from '../services/warehouse.service'
import AppError from '../utils/appError';
import {
  CreateWarehouseInput
} from "../schemas/warehouse.schema"
import prisma from '../utils/prismaClient';

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
      remarks: req.body.remarks,
      agentId: agentId
    });
    console.log(30, warehouse)
    return res.status(201).json({
      status: "Sucess",
      warehouse
    })
  } catch (err: any) { 
    console.log(91, "email verification fail", err)   
    next(err);
  }
};

export const viewWarehousesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const agents = await getWarehouses()
      res.status(200).status(200).json({
        hello: "hello viewWarehousesHandler",
      status: 'success',
      data: {
        agents,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

// get single agent
export const viewWarehouseHandler = async (
  req: Response | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const agent = await prisma.agent.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatar: true,
        prosperityHub: true,
        warhouse: true
      }
})
     if (!agent) {
      return next(new AppError(401, 'Agent does not exist'));
    }
      return res.status(200).status(200).json({
        hello: "hello viewWarehouseHandler",
      status: 'success',
      data: {
        agent,
      },
    });
  } catch (err: any) {
    console.log(76, err);
    next(err);
  }
};

export const updateWarehouseHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const agent = res.locals.agent;

      res.status(200).status(200).json({
        hello: "hello updateWarehouseHandler",
      status: 'success',
      data: {
        agent,
      },
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
    const agent = res.locals.agent;

      res.status(200).status(200).json({
        hello: "hello deleteWarehouseHandler",
      status: 'success',
      data: {
        agent,
      },
    });
  } catch (err: any) {
    next(err);
  }
};


