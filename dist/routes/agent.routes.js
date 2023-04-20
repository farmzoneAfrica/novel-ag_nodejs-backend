"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agent_controller_1 = require("../controllers/agent.controller");
const auth_1 = require("../middleware/auth");
const requireUser_1 = require("../middleware/requireUser");
const agentRouter = express_1.default.Router();
// agentRouter.use(deserializeUser, requireUser);
// the base variable is for purposes of swagger compilation, 
// it should always be an empty string but api/agent when auto compiling swagger
const base = "";
agentRouter.get('/', auth_1.auth, agent_controller_1.getAgentsHandler);
agentRouter.get('/:pageNo', agent_controller_1.getAgentsByPageHandler);
agentRouter.get(base + '/:id', auth_1.auth, requireUser_1.requireUser, auth_1.adminAuth, agent_controller_1.getAgentHandler);
agentRouter.get('/me', auth_1.auth, agent_controller_1.getMeHandler);
exports.default = agentRouter;
//# sourceMappingURL=agent.routes.js.map