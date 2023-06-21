"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const role_permission_controller_1 = require("../controllers/role.permission.controller");
const role_permissions_schema_1 = require("../schemas/role.permissions.schema");
const deserializeUser_1 = require("../middleware/deserializeUser");
const requireUser_1 = require("../middleware/requireUser");
const validate_1 = require("../middleware/validate");
const rolesAndPermissionsRouter = express_1.default.Router();
// rolesAndPermissionsRouter.post( '/role', validate(assignRoleSchema), auth, adminAuth, requireUser, assignRoleHandler );
rolesAndPermissionsRouter.post('/role', (0, validate_1.validate)(role_permissions_schema_1.assignRoleSchema), deserializeUser_1.auth, role_permission_controller_1.assignRoleHandler);
rolesAndPermissionsRouter.post('/permission', (0, validate_1.validate)(role_permissions_schema_1.assignPermissionSchema), deserializeUser_1.auth, requireUser_1.requireUser, role_permission_controller_1.assignPermissionHandler);
// rolesAndPermissionsRouter.patch( '/role:id', validate(updateWarehouseSchema), auth, updateWalletHandler);
// rolesAndPermissionsRouter.patch( '/permission:id', validate(updateWarehouseSchema), auth, updateWalletHandler);
exports.default = rolesAndPermissionsRouter;
//# sourceMappingURL=role.permission.route.js.map