"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agent_controller_1 = require("../controllers/agent.controller");
const router = express_1.default.Router();
// router.use(deserializeUser, requireUser);
router.get('/', agent_controller_1.getAgentsHandler);
router.get('/me', agent_controller_1.getMeHandler);
// router.get('/:id', getAgentHandler);
exports.default = router;
//# sourceMappingURL=agent.routes.js.map