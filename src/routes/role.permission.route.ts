import express, { NextFunction, Request, Response, response } from 'express';
import {
    assignRoleHandler,
    assignPermissionHandler
    // updateRole,
    // updatePermission,
} from '../controllers/role.permission.controller';

import {
    assignRoleSchema,
    assignPermissionSchema,
} from '../schemas/role.permissions.schema';

import {
  auth,
  adminAuth
} from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';

const rolesAndPermissionsRouter = express.Router();

// rolesAndPermissionsRouter.post( '/role', validate(assignRoleSchema), auth, adminAuth, requireUser, assignRoleHandler );
rolesAndPermissionsRouter.post( '/role', validate(assignRoleSchema), auth, assignRoleHandler );
rolesAndPermissionsRouter.post( '/permission', validate(assignPermissionSchema), auth, requireUser, assignPermissionHandler );
// rolesAndPermissionsRouter.patch( '/role:id', validate(updateWarehouseSchema), auth, updateWalletHandler);
// rolesAndPermissionsRouter.patch( '/permission:id', validate(updateWarehouseSchema), auth, updateWalletHandler);

export default rolesAndPermissionsRouter;

