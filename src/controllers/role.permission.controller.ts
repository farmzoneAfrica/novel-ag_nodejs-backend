import { NextFunction, Request, Response } from 'express';
import {
    assignRole,
    assignPermission,
    // updateRole,
    // updatePermission,
} from '../services/role.permision.service';

import AppError from '../utils/app.error';

import {
  CreateRoleInput,
  CreatePermissionInput,
//   UpdateRoleInput,
//   UpdatePermissionInput
} from "../schemas/role.permissions.schema"

import { Prisma } from '@prisma/client';

export const assignRoleHandler = async (
  req: Request<{}, {}, CreateRoleInput>,
  res: Response,
  next: NextFunction
  ) => {
    
    try {
    const role = await assignRole({
        name: req.body.name
      });
    return res.status(201).json({
      status: "Success",
      role
    })
  } catch (err: any) { 
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return res.status(409).json({
          status: 'fail',
          message: `Error! Role ${req.body.name}  already exist`,
        });
      }
    }
    next(err);
  }
};

export const assignPermissionHandler = async (
  req: Request<{}, {}, CreatePermissionInput>,
  res: Response,
  next: NextFunction
  ) => {
    try {
    const permission = await assignPermission({
        name: req.body.name
      });
    return res.status(201).json({
      status: "Success",
      permission
    })
  } catch (err: any) { 
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        return res.status(409).json({
          status: 'fail',
          message: `Error! Permission ${req.body.name}  already exist`,
        });
      }
    }
    next(err);
  }
};


// export const updateRoleHandler = async (
//   req: Request < {}, {}, UpdateRoleInput >,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { id } = req.params;
//   const data = {
//       name: req.body.name
//   }
//     const role = await updateRole({id: id}, data);
//      if (!role) 
//       return next(new AppError(401, 'role does not exist'));
    
//     return res.status(200).json({
//       status: 'Success',
//       role,
//     });
//   } catch (err: any) {    
//     next(err);
//   }
// };

// export const updatePermissionsHandler = async (
//   req: Request < {}, {},   UpdatePermissionInput
//   >,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//   const { id } = req.params; 
//   const data = {
//       name: req.body.name,
//   }
//     const permission = await updatePermission({ id: id }, data);
//      if (!permission) 
//       return next(new AppError(401, 'permission does not exist'));
    
//     return res.status(200).json({
//       status: 'Success',
//       permission,
//     });
//   } catch (err: any) {    
//     next(err);
//   }
// };
