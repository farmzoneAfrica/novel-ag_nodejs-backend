"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const deserializeUser_1 = require("../middleware/deserializeUser");
const requireUser_1 = require("../middleware/requireUser");
const validate_1 = require("../middleware/validate");
const agent_schema_1 = require("../schemas/agent.schema");
const router = express_1.default.Router();
router.post('/register', (0, validate_1.validate)(agent_schema_1.registerAgentSchema), auth_controller_1.registerAgentHandler);
router.post('/login', (0, validate_1.validate)(agent_schema_1.loginAgentSchema), auth_controller_1.loginAgentHandler);
router.get('/refresh', auth_controller_1.refreshAccessTokenHandler);
router.get('/verifyemail/:verificationCode', (0, validate_1.validate)(agent_schema_1.verifyEmailSchema), auth_controller_1.verifyEmailHandler);
router.get('/logout', deserializeUser_1.deserializeUser, requireUser_1.requireUser, auth_controller_1.logoutAgentHandler);
router.post('/forgotpassword', (0, validate_1.validate)(agent_schema_1.forgotPasswordSchema), auth_controller_1.forgotPasswordHandler);
router.patch('/resetpassword/:resetToken', (0, validate_1.validate)(agent_schema_1.resetPasswordSchema), auth_controller_1.resetPasswordHandler);
exports.default = router;
//# sourceMappingURL=auth.route.js.map