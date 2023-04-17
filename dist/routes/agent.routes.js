"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agent_controller_1 = require("../controllers/agent.controller");
const deserializeUser_1 = require("../middleware/deserializeUser");
const requireUser_1 = require("../middleware/requireUser");
const agentRouter = express_1.default.Router();
// agentRouter.use(deserializeUser, requireUser);
// the base variable is for purposes of swagger compilation, 
// it should always be an empty string but api/agent when auto compiling swagger
const base = "";
agentRouter.get('/', agent_controller_1.getAgentsHandler);
agentRouter.get(base + '/:id', deserializeUser_1.deserializeUser, requireUser_1.requireUser, agent_controller_1.getAgentHandler);
agentRouter.get('/me', deserializeUser_1.deserializeUser, agent_controller_1.getMeHandler);
exports.default = agentRouter;
//# sourceMappingURL=agent.routes.js.map