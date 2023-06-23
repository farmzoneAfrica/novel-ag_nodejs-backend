"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const deserializeUser_1 = require("../middleware/deserializeUser");
const requireUser_1 = require("../middleware/requireUser");
const validate_1 = require("../middleware/validate");
const user_schema_1 = require("../schemas/user.schema");
const userRouter = express_1.default.Router();
userRouter.get('/', deserializeUser_1.auth, deserializeUser_1.adminAuth, user_controller_1.getUsersHandler);
userRouter.get('/no', deserializeUser_1.auth, deserializeUser_1.adminAuth, user_controller_1.getUsersHandler);
userRouter.get('/me/:id', deserializeUser_1.auth, requireUser_1.requireUser, user_controller_1.getUserHandler);
userRouter.get('/:pageNo', user_controller_1.usersPaginationHandler);
userRouter.patch('/:id', (0, validate_1.validate)(user_schema_1.updateUserSchema), deserializeUser_1.auth, deserializeUser_1.adminAuth, user_controller_1.updateUserHandler);
userRouter.delete('/:id', deserializeUser_1.auth, deserializeUser_1.adminAuth, user_controller_1.deleteUserHandler);
userRouter.get('/farmers/', deserializeUser_1.auth, deserializeUser_1.adminAuth, user_controller_1.getUsersHandler);
userRouter.get('/farmers/no', user_controller_1.getUsersHandler);
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map