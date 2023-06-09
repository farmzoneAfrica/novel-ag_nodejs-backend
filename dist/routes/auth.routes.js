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
authRouter.post('/register', (0, validate_1.validate)(user_schema_1.registerUserSchema), auth_controller_1.registerUserHandler);
authRouter.post('/login', (0, validate_1.validate)(user_schema_1.loginUserSchema), auth_controller_1.loginUserHandler);
authRouter.get('/refresh', auth_controller_1.refreshAccessTokenHandler);
authRouter.get('/verifyemail/:verificationCode', (0, validate_1.validate)(user_schema_1.verifyEmailSchema), auth_controller_1.verifyEmailHandler);
authRouter.post('/otp', (0, validate_1.validate)(user_schema_1.verifyOtpSchema), auth_controller_1.verifyOtpHandler);
authRouter.get('/logout', deserializeUser_1.auth, requireUser_1.requireUser, auth_controller_1.logoutUserHandler);
authRouter.post('/forgotpassword', (0, validate_1.validate)(user_schema_1.forgotPasswordSchema), auth_controller_1.forgotPasswordHandler);
authRouter.patch('/resetpassword/:resetToken', (0, validate_1.validate)(user_schema_1.resetPasswordSchema), auth_controller_1.resetPasswordHandler);
exports.default = authRouter;
//# sourceMappingURL=auth.routes.js.map