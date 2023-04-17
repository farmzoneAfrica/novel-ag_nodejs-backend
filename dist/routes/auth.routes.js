"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express';
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const deserializeUser_1 = require("../middleware/deserializeUser");
const requireUser_1 = require("../middleware/requireUser");
const validate_1 = require("../middleware/validate");
const agent_schema_1 = require("../schemas/agent.schema");
const authRouter = express_1.default.Router();
// the base variable is for purposes of swagger compilation, 
// it should always be an empty string but api/agent when auto compiling swagger
const base = "";
authRouter.post(base + '/register', (0, validate_1.validate)(agent_schema_1.registerAgentSchema), auth_controller_1.registerAgentHandler);
authRouter.post(base + '/login', (0, validate_1.validate)(agent_schema_1.loginAgentSchema), auth_controller_1.loginAgentHandler);
authRouter.get(base + '/refresh', auth_controller_1.refreshAccessTokenHandler);
authRouter.get(base + '/verifyemail/:verificationCode', (0, validate_1.validate)(agent_schema_1.verifyEmailSchema), auth_controller_1.verifyEmailHandler);
authRouter.get(base + '/logout', deserializeUser_1.deserializeUser, requireUser_1.requireUser, auth_controller_1.logoutAgentHandler);
authRouter.post(base + '/forgotpassword', (0, validate_1.validate)(agent_schema_1.forgotPasswordSchema), auth_controller_1.forgotPasswordHandler);
authRouter.patch(base + '/resetpassword/:resetToken', (0, validate_1.validate)(agent_schema_1.resetPasswordSchema), auth_controller_1.resetPasswordHandler);
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map