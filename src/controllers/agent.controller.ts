import { NextFunction, Request, Response } from 'express';
import { findAll } from '../services/agent.service'

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const agent = res.locals.agent;

    res.status(200).status(200).json({
      status: 'success',
      data: {
        agent,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

// get all agents 
export const getAgentsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // const agent = res.locals.agent;
    const agents = await findAll()
    res.status(200).status(200).json({
      status: 'success',
      data: {
        agents,
      },
    });
  } catch (err: any) {
    next(err);
  }
};
