import { NextFunction, Request, Response } from 'express';
import {
  createProsperityHub,
  getAllProsperityHubs,
  findById,
  updateProsperityHub,
  deleteProsperityHub,
  
} from '../services/prosperityHub.service';

import { 
  getStates,
  getLGAs
} from '../services/common.service';
 
import AppError from '../utils/appError';
import {
  CreateProsperityHubInput,
  UpdateProsperityHubInput
} from "../schemas/prosperityHub.schema";

import { Prisma } from '@prisma/client';
import agentRouter from '../routes/agent.routes';
import { userInfo } from 'os';

export const createProsperityHubHandler = async (
  req: Request<{}, {}, CreateProsperityHubInput> | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const agentId = req.user.sub
    const prosperityHub = await createProsperityHub({
      name: req.body.name,
      address: req.body.address,
      state: req.body.state,
      localGovt: req.body.localGovt,
      remarks: req.body.remarks,
      agentId: agentId
    });
    console.log(prosperityHub);
    
    const inputState = prosperityHub.state;
    const inputLGA = prosperityHub.localGovt;
    const states = await getStates();
    const LGAs = await getLGAs(inputState);

    if ( states.includes(inputState) === false ) {
      return next(new AppError(400, 'Invalid state, please enter a valid state'));
    }
    if ( LGAs.includes(inputLGA) === false ) {
      return next(new AppError(400, 'Invalid LGA, please enter a valid local government'));
    }
    return res.status(201).json({
      status: "success",
      prosperityHub
    })
  } catch (err: any) { 
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


export const getProsperityHubsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const prosperityHubs = await getAllProsperityHubs()
      res.status(200).status(200).json({
      status: 'success',
      prosperityHubs
    });
  } catch (err: any) {
    next(err);
  }
};

export const getProsperityHubHandler = async (
  req: Response | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const prosperityHub = await findById({ id: id })
     if (!prosperityHub) {
      return next(new AppError(401, 'Agent does not exist'));
    }
      return res.status(200).json({
      status: 'success',
      prosperityHub
    });
  } catch (err: any) {
    next(err);
  }
};

export const updateProsperityHubHandler = async (
  req: Request < {}, {}, UpdateProsperityHubInput > | any,
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
    const prosperityHub = await updateProsperityHub({ id: id }, data);
     if (!prosperityHub) 
      return next(new AppError(401, 'Prosperity Hub does not exist'));
    
    return res.status(200).json({
      status: 'Success',
      prosperityHub,
    });
  } catch (err: any) {    
    next(err);
  }
};

export const deleteProsperityHubHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const agent = res.locals.agent;

      res.status(200).status(200).json({
        hello: "hello deleteProsperityHubHandler",
      status: 'success',
      data: {
        agent,
      },
    });
  } catch (err: any) {
    next(err);
  }
};


