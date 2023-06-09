"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../middleware/validate");
const farmers_controller_1 = require("../controllers/farmers.controller");
const deserializeUser_1 = require("../middleware/deserializeUser");
const user_schema_1 = require("../schemas/user.schema");
const requireUser_1 = require("../middleware/requireUser");
const agentRouter = express_1.default.Router();
const base = "";
agentRouter.get(base + '/', deserializeUser_1.auth, farmers_controller_1.getAgentsHandler);
agentRouter.get(base + '/:id', deserializeUser_1.auth, requireUser_1.requireUser, farmers_controller_1.getAgentHandler);
agentRouter.get(base + '/:pageNo', farmers_controller_1.getAgentsByPageHandler);
agentRouter.patch(base + '/:id', (0, validate_1.validate)(user_schema_1.updateUserSchema), deserializeUser_1.auth, farmers_controller_1.updateUserHandler);
agentRouter.delete(base + '/:id', deserializeUser_1.auth, deserializeUser_1.adminAuth, farmers_controller_1.deleteAgentHandler);
exports.default = agentRouter;
//# sourceMappingURL=farmer.routes.js.map