"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../middleware/validate");
const auth_controller_1 = require("../controllers/auth.controller");
const deserializeUser_1 = require("../middleware/deserializeUser");
const user_schema_1 = require("../schemas/user.schema");
const requireUser_1 = require("../middleware/requireUser");
const agentRouter = express_1.default.Router();
agentRouter.get('/get', deserializeUser_1.auth, auth_controller_1.getUsersHandler);
agentRouter.get('/get/:id', deserializeUser_1.auth, requireUser_1.requireUser, auth_controller_1.getUserHandler);
agentRouter.get('/:pageNo', auth_controller_1.usersPaginationHandler);
agentRouter.patch('/update/:id', (0, validate_1.validate)(user_schema_1.updateUserSchema), deserializeUser_1.auth, auth_controller_1.updateUserHandler);
agentRouter.delete('/delete/:id', deserializeUser_1.auth, deserializeUser_1.adminAuth, auth_controller_1.deleteUserHandler);
exports.default = agentRouter;
//# sourceMappingURL=agent.route.js.map