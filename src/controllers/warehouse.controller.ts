import { NextFunction, Request, Response } from 'express';
import {
    createWarehouse,
    getWarehouses,
    findWarehouseById,
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
  CreateWarehouseInput
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
    console.log(91, "email verification fail", err)
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return res.status(409).json({
          status: 'fail',
          message: 'Prosperity Hub with a similar name already exist, please use another name',
        });
      }
    }
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


