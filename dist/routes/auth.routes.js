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
const user_schema_1 = require("../schemas/user.schema");
const authRouter = express_1.default.Router();
const base = "";
authRouter.post(base + '/register', (0, validate_1.validate)(user_schema_1.registerUserSchema), auth_controller_1.registerUserHandler);
authRouter.post(base + '/login', (0, validate_1.validate)(user_schema_1.loginUserSchema), auth_controller_1.loginUserHandler);
authRouter.get(base + '/refresh', auth_controller_1.refreshAccessTokenHandler);
authRouter.get(base + '/verifyemail/:verificationCode', (0, validate_1.validate)(user_schema_1.verifyEmailSchema), auth_controller_1.verifyEmailHandler);
authRouter.post(base + '/otp', (0, validate_1.validate)(user_schema_1.verifyOtpSchema), auth_controller_1.verifyOtpHandler);
authRouter.get(base + '/logout', deserializeUser_1.auth, requireUser_1.requireUser, auth_controller_1.logoutUserHandler);
authRouter.post(base + '/forgotpassword', (0, validate_1.validate)(user_schema_1.forgotPasswordSchema), auth_controller_1.forgotPasswordHandler);
authRouter.patch(base + '/resetpassword/:resetToken', (0, validate_1.validate)(user_schema_1.resetPasswordSchema), auth_controller_1.resetPasswordHandler);
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map