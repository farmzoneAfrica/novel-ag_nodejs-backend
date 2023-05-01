"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("../middleware/validate");
const agent_controller_1 = require("../controllers/agent.controller");
const auth_1 = require("../middleware/auth");
const agent_schema_1 = require("../schemas/agent.schema");
const requireUser_1 = require("../middleware/requireUser");
const agentRouter = express_1.default.Router();
const base = "";
agentRouter.get(base + '/get', auth_1.auth, agent_controller_1.getAgentsHandler);
agentRouter.get(base + '/get/:id', auth_1.auth, requireUser_1.requireUser, agent_controller_1.getAgentHandler);
agentRouter.get(base + '/:pageNo', agent_controller_1.getAgentsByPageHandler);
agentRouter.patch(base + '/update/:id', (0, validate_1.validate)(agent_schema_1.updateAgentSchema), auth_1.auth, agent_controller_1.updateAgentHandler);
agentRouter.delete(base + '/delete/:id', auth_1.auth, auth_1.adminAuth, agent_controller_1.deleteAgentHandler);
exports.default = agentRouter;
//# sourceMappingURL=agent.routes.js.map