"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agent_controller_1 = require("../controllers/agent.controller");
const deserializeUser_1 = require("../middleware/deserializeUser");
const requireUser_1 = require("../middleware/requireUser");
const router = express_1.default.Router();
// router.get('/', () => {
//     console.log(18, "hello get all users")
// });
router.get('/', agent_controller_1.getAgentsHandler);
router.use(deserializeUser_1.deserializeUser, requireUser_1.requireUser);
router.get('/me', agent_controller_1.getMeHandler);
// router.get('/:id', getAgentHandler);
exports.default = router;
//# sourceMappingURL=agent.routes.js.map