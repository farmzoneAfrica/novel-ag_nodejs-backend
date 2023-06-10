import { NextFunction, Request, Response } from 'express';
import {
  findAll,
  pagination,
  findById,
  updateUser,
  deleteUser
} from '../services/user.service'
import AppError from '../utils/app.error';

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
    next(err);
  }
};

export const updateUserHandler = async (
  req: Response | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const findUser = await findById({id: id});
    if (!findUser) 
      return next(new AppError(401, 'User not found in database'));
    const body: Array<string> = (Object.keys(req.body));    
  const data = {
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    address: req.body.address,
    gender: req.body.gender,
    marital_status: req.body.maritalStatus,
    phone: req.body.phone,
    avatar: req.body.avatar,
    state: req.body.state,
    local_govt: req.body.localGovt,
    password: req.body.password,
  }
  
  const dataKeys: Array<string> = Object.keys(data);
    
  if (dataKeys.includes(body.toString()) === false ) {
    return next(new AppError(401, 'Wrong input value'));
  }
  const user = await updateUser({ id: id }, data);
     if (!user) {
      return next(new AppError(401, 'User does not exist'));
    }
    return res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (err: any) {
    next(err);
  }
};

export const deleteAgentHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const agent = await findById({id: id});
    if (!agent) 
      return next(new AppError(401, 'Agent not found in database'));
    
    const response = await deleteUser(id)
    return res.status(200).json({
      status: 'success',
      response
    });
  } catch (err: any) {
    next(err);
  }
};