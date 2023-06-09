"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const validate_1 = require("../middleware/validate");
const user_schema_1 = require("../schemas/user.schema");
const userRouter = express_1.default.Router();
// userRouter.get( '/', auth, getUsersHandler);
userRouter.get('/', user_controller_1.getUsersHandler);
userRouter.get('/no', user_controller_1.getNoOfTotalUsersHandler);
userRouter.get('/me/:id', user_controller_1.getUserHandler);
userRouter.get('/:pageNo', user_controller_1.usersPaginationHandler);
userRouter.patch('/:id', (0, validate_1.validate)(user_schema_1.updateUserSchema), user_controller_1.updateUserHandler);
userRouter.delete('/:id', user_controller_1.deleteUserHandler);
// userRouter.get( '/', auth, adminAuth, getUsersHandler);
// userRouter.get( '/no', getNoOfTotalUsersHandler);
// userRouter.get( '/me/:id', auth, requireUser, getUserHandler);
// userRouter.get( '/:pageNo', usersPaginationHandler);
// userRouter.patch( '/:id', validate(updateUserSchema), auth, adminAuth, updateUserHandler );
// userRouter.delete( '/:id', auth, adminAuth, deleteUserHandler );
userRouter.get('/:roles', user_controller_1.getUsersByRoleHandler);
userRouter.get('/:role/no', user_controller_1.getUserByRoleNoHandler);
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map