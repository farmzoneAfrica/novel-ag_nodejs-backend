"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../middleware/validate");
const user_controller_1 = require("../controllers/user.controller");
const deserializeUser_1 = require("../middleware/deserializeUser");
const user_schema_1 = require("../schemas/user.schema");
const requireUser_1 = require("../middleware/requireUser");
const agentRouter = express_1.default.Router();
const base = "";
agentRouter.get(base + '/get', deserializeUser_1.auth, user_controller_1.getAgentsHandler);
agentRouter.get(base + '/get/:id', deserializeUser_1.auth, requireUser_1.requireUser, user_controller_1.getAgentHandler);
agentRouter.get(base + '/:pageNo', user_controller_1.getAgentsByPageHandler);
agentRouter.patch(base + '/update/:id', (0, validate_1.validate)(user_schema_1.updateUserSchema), deserializeUser_1.auth, user_controller_1.updateAgentHandler);
agentRouter.delete(base + '/delete/:id', deserializeUser_1.auth, deserializeUser_1.adminAuth, user_controller_1.deleteAgentHandler);
exports.default = agentRouter;
//# sourceMappingURL=farmer.routes.js.map