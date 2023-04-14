import { NextFunction, Request, Response } from 'express';
import {
  findAll,
  findUniqueAgent
} from '../services/agent.service'
import AppError from '../utils/appError';
import {
  GetSingleAgentInput
} from "../schemas/agent.schema"
import prisma from '../utils/prismaClient';

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

// get single agent
export const getAgentHandler = async (
  req: Response | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    console.log(id);
    
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



