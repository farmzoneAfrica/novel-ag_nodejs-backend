"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordHandler = exports.forgotPasswordHandler = exports.verifyEmailHandler = exports.logoutAgentHandler = exports.refreshAccessTokenHandler = exports.loginAgentHandler = exports.registerAgentHandler = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const agent_service_1 = require("../services/agent.service");
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("config"));
const appError_1 = __importDefault(require("../utils/appError"));
const connectRedis_1 = __importDefault(require("../utils/connectRedis"));
const jwt_1 = require("../utils/jwt");
const email_1 = __importDefault(require("../utils/email"));
const cookiesOptions = {
    httpOnly: true,
    sameSite: 'lax',
};
if (process.env.NODE_ENV === 'production')
    cookiesOptions.secure = true;
const accessTokenCookieOptions = {
    ...cookiesOptions,
    expires: new Date(Date.now() + config_1.default.get('accessTokenExpiresIn') * 60 * 1000),
    maxAge: config_1.default.get('accessTokenExpiresIn') * 60 * 1000,
};
const refreshTokenCookieOptions = {
    ...cookiesOptions,
    expires: new Date(Date.now() + config_1.default.get('refreshTokenExpiresIn') * 60 * 1000),
    maxAge: config_1.default.get('refreshTokenExpiresIn') * 60 * 1000,
};
const registerAgentHandler = async (req, res, next) => {
    try {
        const hashedPassword = await bcryptjs_1.default.hash(req.body.password, 12);
        const verifyCode = crypto_1.default.randomBytes(32).toString('hex');
        const verificationCode = crypto_1.default
            .createHash('sha256')
            .update(verifyCode)
            .digest('hex');
        const agent = await (0, agent_service_1.createAgent)({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            phone: req.body.phone,
            avatar: req.body.avatar,
            email: req.body.email.toLowerCase(),
            password: hashedPassword,
            verificationCode,
        });
        const redirectUrl = `${config_1.default.get('origin')}/verifyemail/${verifyCode}`;
        try {
            await new email_1.default(agent, redirectUrl).sendVerificationCode();
            await (0, agent_service_1.updateAgent)({ id: agent.id }, { verificationCode });
            res.status(201).json({
                status: 'success',
                message: 'An email with a verification code has been sent to your email',
            });
        }
        catch (error) {
            await (0, agent_service_1.updateAgent)({ id: agent.id }, { verificationCode: null });
            return res.status(500).json({
                status: 'error',
                message: 'There was an error sending email, please try again',
            });
        }
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return res.status(409).json({
                    status: 'fail',
                    message: 'Email already exist, please use another email address',
                });
            }
        }
        next(err);
    }
};
exports.registerAgentHandler = registerAgentHandler;
const loginAgentHandler = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await (0, agent_service_1.findUniqueAgent)({ email: email.toLowerCase() }, { id: true, email: true, verified: true, password: true });
        if (!user) {
            return next(new appError_1.default(400, 'Invalid email or password'));
        }
        // Check if user is verified
        if (!user.verified) {
            return next(new appError_1.default(401, 'You are not verified, please verify your email to login'));
        }
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            return next(new appError_1.default(400, 'Invalid email or password'));
        }
        // Sign Tokens
        const { access_token, refresh_token } = await (0, agent_service_1.signTokens)(user);
        res.cookie('access_token', access_token, accessTokenCookieOptions);
        res.cookie('refresh_token', refresh_token, refreshTokenCookieOptions);
        res.cookie('logged_in', true, {
            ...accessTokenCookieOptions,
            httpOnly: false,
        });
        res.status(200).json({
            status: 'success',
            access_token,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.loginAgentHandler = loginAgentHandler;
const refreshAccessTokenHandler = async (req, res, next) => {
    try {
        const refresh_token = req.cookies.refresh_token;
        const message = 'Could not refresh access token';
        if (!refresh_token) {
            return next(new appError_1.default(403, message));
        }
        // Validate refresh token
        const decoded = (0, jwt_1.verifyJwt)(refresh_token, 'refreshTokenPublicKey');
        if (!decoded) {
            return next(new appError_1.default(403, message));
        }
        // Check if user has a valid session
        const session = await connectRedis_1.default.get(decoded.sub);
        if (!session) {
            return next(new appError_1.default(403, message));
        }
        // Check if user still exist
        const user = await (0, agent_service_1.findUniqueAgent)({ id: JSON.parse(session).id });
        if (!user) {
            return next(new appError_1.default(403, message));
        }
        // Sign new access token
        const access_token = (0, jwt_1.signJwt)({ sub: user.id }, 'accessTokenPrivateKey', {
            expiresIn: `${config_1.default.get('accessTokenExpiresIn')}m`,
        });
        // 4. Add Cookies
        res.cookie('access_token', access_token, accessTokenCookieOptions);
        res.cookie('logged_in', true, {
            ...accessTokenCookieOptions,
            httpOnly: false,
        });
        // 5. Send response
        res.status(200).json({
            status: 'success',
            access_token,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.refreshAccessTokenHandler = refreshAccessTokenHandler;
function logout(res) {
    res.cookie('access_token', '', { maxAge: 1 });
    res.cookie('refresh_token', '', { maxAge: 1 });
    res.cookie('logged_in', '', { maxAge: 1 });
}
const logoutAgentHandler = async (req, res, next) => {
    try {
        await connectRedis_1.default.del(res.locals.user.id);
        logout(res);
        res.status(200).json({
            status: 'success',
        });
    }
    catch (err) {
        next(err);
    }
};
exports.logoutAgentHandler = logoutAgentHandler;
const verifyEmailHandler = async (req, res, next) => {
    try {
        const verificationCode = crypto_1.default
            .createHash('sha256')
            .update(req.params.verificationCode)
            .digest('hex');
        const user = await (0, agent_service_1.updateAgent)({ verificationCode }, { verified: true, verificationCode: null }, { email: true });
        if (!user) {
            return next(new appError_1.default(401, 'Could not verify email'));
        }
        res.status(200).json({
            status: 'success',
            message: 'Email verified successfully',
        });
    }
    catch (err) {
        if (err.code === 'P2025') {
            return res.status(403).json({
                status: 'fail',
                message: `Verification code is invalid or user doesn't exist`,
            });
        }
        next(err);
    }
};
exports.verifyEmailHandler = verifyEmailHandler;
const forgotPasswordHandler = async (req, res, next) => {
    try {
        // Get the user from the collection
        const user = await (0, agent_service_1.findAgent)({ email: req.body.email.toLowerCase() });
        const message = 'You will receive a reset email if user with that email exist';
        if (!user) {
            return res.status(200).json({
                status: 'success',
                message,
            });
        }
        if (!user.verified) {
            return res.status(403).json({
                status: 'fail',
                message: 'Account not verified',
            });
        }
        if (user.provider) {
            return res.status(403).json({
                status: 'fail',
                message: 'We found your account. It looks like you registered with a social auth account. Try signing in with social auth.',
            });
        }
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        const passwordResetToken = crypto_1.default
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        await (0, agent_service_1.updateAgent)({ id: user.id }, {
            passwordResetToken,
            passwordResetAt: new Date(Date.now() + 10 * 60 * 1000),
        }, { email: true });
        try {
            const url = `${config_1.default.get('origin')}/resetpassword/${resetToken}`;
            await new email_1.default(user, url).sendPasswordResetToken();
            res.status(200).json({
                status: 'success',
                message,
            });
        }
        catch (err) {
            await (0, agent_service_1.updateAgent)({ id: user.id }, { passwordResetToken: null, passwordResetAt: null }, {});
            return res.status(500).json({
                status: 'error',
                message: 'There was an error sending email',
            });
        }
    }
    catch (err) {
        next(err);
    }
};
exports.forgotPasswordHandler = forgotPasswordHandler;
const resetPasswordHandler = async (req, res, next) => {
    try {
        // Get the user from the collection
        const passwordResetToken = crypto_1.default
            .createHash('sha256')
            .update(req.params.resetToken)
            .digest('hex');
        const user = await (0, agent_service_1.findAgent)({
            passwordResetToken,
            passwordResetAt: {
                gt: new Date(),
            },
        });
        if (!user) {
            return res.status(403).json({
                status: 'fail',
                message: 'Invalid token or token has expired',
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(req.body.password, 12);
        // Change password data
        await (0, agent_service_1.updateAgent)({
            id: user.id,
        }, {
            password: hashedPassword,
            passwordResetToken: null,
            passwordResetAt: null,
        }, { email: true });
        logout(res);
        res.status(200).json({
            status: 'success',
            message: 'Password data updated successfully',
        });
    }
    catch (err) {
        next(err);
    }
};
exports.resetPasswordHandler = resetPasswordHandler;
//# sourceMappingURL=auth.controller.js.map