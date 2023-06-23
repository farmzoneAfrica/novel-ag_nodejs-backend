import { CookieOptions, NextFunction, Request, Response } from 'express';

import {
    GetUserTypeInput,
    UpdateUserInput
  } from '../schemas/user.schema';

  import {
    UserService,
    getUsersByRole1,
    findAll,
    pagination,
    findById,
    updateUser,
    deleteUser,
  } from '../services/user.service';


import AppError from '../utils/app.error';

const userService = new UserService();

export const getUsersHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users = await findAll()
      res.status(200).status(200).json({
        status: 'Success',
        users
      });
    } catch (err: any) {
      next(err);
    }
  };

export const getNoOfTotalUsersHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const users = await (await findAll()).length;
      res.status(200).status(200).json({
        status: 'Success',
        users
      });
    } catch (err: any) {
      next(err);
    }
  };

export const getUsersByRoleHandler_ = async (
    req: Response | any,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const role  = req.params.role; 
      const lgas = await  getUsersByRole1(role)
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

export const getUsersByRoleHandler1 = async (
    req: Response | any,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const role  = req.params.role; 
      const lgas = await getUsersByRole1(role)
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

  export async function getUsersByRoleHandler(req: Request, res: Response): Promise<void> {
    const { role } = req.query;
    console.log(role);
    
    try {
      const users = await userService.getUsersByRole(role as string);
      res.status(200).json(users);
      console.log(102);
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving users.' });
    }
  }

export const getUserByRoleNoHandler = async (
    req: Response | any,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const role  = req.params.role; 
      const users = await (await getUsersByRole1(role));
      const totalNo = users.length;
       if (!users) {
        return next(new AppError(401, 'Local Government does not exist'));
      }
        return res.status(200).json({
        status: 'Success',
        totalNo
      });
    } catch (err: any) {
      next(err);
    }
  };

  
  export const usersPaginationHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { pageNo } = req.params as any;
      const users = await pagination(pageNo * 10, 10)
      res.status(200).status(200).json({
        status: 'success',
        data: {
          users,
        },
      });
    } catch (err: any) {
      next(err);
    }
  };
  
  export const getUserHandler = async (
    req: Response | any,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const user = await findById({ id: id })
       if (!user) {
        return next(new AppError(401, 'User does not exist'));
      }
      return res.status(200).json({
        status: 'success',
        user
      });
    } catch (err: any) {
      next(err);
    }
  };
  
  export const getFarmerHandler = async (
    req: Response | any,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.params;
      const user = await findById({ id: id })
       if (!user) {
        return next(new AppError(401, 'User does not exist'));
      }
      return res.status(200).json({
        status: 'success',
        user
      });
    } catch (err: any) {
      next(err);
    }
  };
  
  export const updateUserHandler = async (
    req: Request < {}, {}, UpdateUserInput > | any,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        role: req.body.role,
        gender: req.body.gender,
        phone: req.body.phone,
        staff_id: req.body.staff_id,
        marital_status: req.body.marital_status,
        profile_picture: req.body.profile_picture,
        state: req.body.state,
        password: req.body.password,
      }
      const { id } = req.params;
   
    const user = await updateUser({ id: id }, data);
    if (!user) 
        return next(new AppError(401, 'User not found in database'));
     
      return res.status(201).json({
        status: 'Success',
        user 
      });
    } catch (err: any) {
      next(err);
    }
  };
  
  export const deleteUserHandler = async (
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
  