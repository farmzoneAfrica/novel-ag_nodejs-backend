import { NextFunction, Request, Response } from 'express';
import {
    getStates,
    getState,
    getLGAs,
    getLGA,
    getLocalGovtByStateId,
    getWards,
    getWard,
    getRoles,
    getRole,

} from '../services/utils.service';
import AppError from '../utils/app.error';
import { nullable } from 'zod';


export const getStatesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const states = await getStates()
      return res.status(200).json({
      status: 'Success',
      states
    });
  } catch (err: any) {
    next(err);
  }
};

export const getStateHandler = async (
  req: Response | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id  = +req.params.id   
    const state = await getState({ id: id})
     if (!state) {
      return next(new AppError(401, 'State does not exist'));
    }
      return res.status(200).json({
      status: 'Success',
      state
    });
  } catch (err: any) {
    next(err);
  }
};

export const getLGAsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const LGAs = await getLGAs()
      return res.status(200).json({
      status: 'Success',
      LGAs
    });
  } catch (err: any) {
    next(err);
  }
};

export const getLocalGovtHandler = async (
  req: Response | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id  = +req.params.id; 
    const lga = await getLGA({ id: id})
     if (!lga) {
      return next(new AppError(401, 'Local Government does not exist'));
    }
      return res.status(200).json({
      status: 'Success',
      lga
    });
  } catch (err: any) {
    next(err);
  }
};

export const getLocalGovtinStateHandler = async (
  req: Response | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id  = +req.params.id; 
    console.log(id);
    
    const lgas = await getLocalGovtByStateId(id)
     if (!lgas) {
      return next(new AppError(401, 'Local Government does not exist'));
    }
      return res.status(200).json({
      status: 'Success',
      lgas
    });
  } catch (err: any) {
    next(err);
  }
};


export const getRolesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const states = await getRoles()
      return res.status(200).json({
      status: 'Success',
      states
    });
  } catch (err: any) {
    next(err);
  }
};

export const getRoleHandler = async (
  req: Response | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const id  = +req.params.id   
    const lga = await getRole({ id: id})
     if (!lga) {
      return next(new AppError(401, 'Local Government does not exist'));
    }
      return res.status(200).json({
      status: 'Success',
      lga
    });
  } catch (err: any) {
    next(err);
  }
};

export const getWardsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const states = await getWards()
      return res.status(200).json({
      status: 'Success',
      states
    });
  } catch (err: any) {
    next(err);
  }
};

