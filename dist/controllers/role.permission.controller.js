"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignPermissionHandler = exports.assignRoleHandler = void 0;
const role_permision_service_1 = require("../services/role.permision.service");
const client_1 = require("@prisma/client");
const assignRoleHandler = async (req, res, next) => {
    try {
        const role = await (0, role_permision_service_1.assignRole)({
            name: req.body.name
        });
        return res.status(201).json({
            status: "Success",
            role
        });
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
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
exports.assignRoleHandler = assignRoleHandler;
const assignPermissionHandler = async (req, res, next) => {
    try {
        const permission = await (0, role_permision_service_1.assignPermission)({
            name: req.body.name
        });
        return res.status(201).json({
            status: "Success",
            permission
        });
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
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
exports.assignPermissionHandler = assignPermissionHandler;
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
//# sourceMappingURL=role.permission.controller.js.map