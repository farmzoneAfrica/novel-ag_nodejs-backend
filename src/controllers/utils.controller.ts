import { NextFunction, Request, Response } from 'express';
import {
    getStates,
    getState,
    getLGAs,
    getWards,
} from '../services/utils.service';
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

// export const getLgaHandler = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const state_id = Number(req.params) 
//     console.log(state_id)
//     const lgas = await getLGAs( state_id)
//       return res.status(200).json({
//       status: 'Success',
//       lgas
//     });
//   } catch (err: any) {
//     next(err);
//   }
// };

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

