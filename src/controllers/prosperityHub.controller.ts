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
} from '../services/utils.service';
 
import AppError from '../utils/app.error';

import {
  CreateProsperityHubInput,
  UpdateProsperityHubInput
} from "../schemas/prosperity.hub.schema";

import { Prisma } from '@prisma/client';

// import agentRouter from '../routes/agent.routes';
// import { userInfo } from 'os';

export const createProsperityHubHandler = async (
  req: Request<{}, {}, CreateProsperityHubInput> | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const prosperityHub = await createProsperityHub({
      name: req.body.name,
      location: req.body.location,
      closest_landmark: req.body.closest_landmark,
      state: req.body.state,
      local_govt: req.body.local_govt,
      ward: req.body.ward,
      status: req.body.status
    });
    
    // const inputState = prosperityHub.state;
    // const inputLGA = prosperityHub.local_govt;

    // const states = await getStates();
    // const LGAs = await getLGAs(inputState);

    // if ( states.includes(inputState) === false ) {
    //   return next(new AppError(400, 'Invalid state, please enter a valid state'));
    // }
    // if ( LGAs.includes(inputLGA) === false ) {
    //   return next(new AppError(400, 'Invalid LGA, please enter a valid local government'));
    // }

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
      return next(new AppError(401, 'Prosperity hub does not exist'));
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
    location: req.body.location,
    closest_landmark: req.body.closest_landmark,
    state: req.body.state,
    local_govt: req.body.local_govt,
    ward: req.body.ward,
    status: req.body.status,
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
    const { id } = req.params;
    const prosperityHub = await findById({id: id});
    if (!prosperityHub) 
      return next(new AppError(401, 'Prosperity Hub not found in database'));
    
    const response = await deleteProsperityHub(id)
    return res.status(200).json({
      status: 'success',
      response
    });
  } catch (err: any) {
    next(err);
  }
};


