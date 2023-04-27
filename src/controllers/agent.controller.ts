import { NextFunction, Request, Response } from 'express';
import {
  findAll,
  pagination,
  findById,
  updateAgent,
  deleteAgent
} from '../services/agent.service'
import AppError from '../utils/appError';

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

// get all agents by page
export const getAgentsByPageHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { pageNo } = req.params as any;
    const agents = await pagination(pageNo * 10, 10)
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
    const agent = await findById({ id: id })
     if (!agent) {
      return next(new AppError(401, 'Agent does not exist'));
    }
    return res.status(200).json({
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

// update agent
export const updateAgentHandler = async (
  req: Response | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const findAgent = await findById({id: id});

    console.log(findAgent);
    if (!findAgent) 
      return next(new AppError(401, 'Agent not found in database'));
  
    const body:Array<string> = (Object.keys(req.body));

     const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        phone: req.body.phone,
        avatar: req.body.avatar,
        password: req.body.password,
     }
    
    const keys:Array<string> = Object.keys(data);
    
    if (keys.includes(body.toString()) === false){
      return next(new AppError(401, 'Wrong input value'));
    }

    const agent = await updateAgent(
      { id: id },
      data,
    )
     if (!agent) {
      return next(new AppError(401, 'Agent does not exist'));
    }
    return res.status(200).json({
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

// delete agent
export const deleteAgentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const findAgent = await findById({id: id});
    console.log(findAgent);
    if (!findAgent) 
      return next(new AppError(401, 'Agent not found in database'));
    
    const agent = await deleteAgent(id)
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