"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserHandler = exports.updateUserHandler = exports.getFarmerHandler = exports.getUserHandler = exports.usersPaginationHandler = exports.getUsersHandler = exports.resetPasswordHandler = exports.forgotPasswordHandler = exports.verifyOtpHandler = exports.verifyEmailHandler = exports.logoutUserHandler = exports.refreshAccessTokenHandler = exports.loginUserHandler = exports.registerUserHandler = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_service_1 = require("../services/user.service");
const common_service_1 = require("../services/common.service");
const client_1 = require("@prisma/client");
const config_1 = __importDefault(require("config"));
const app_error_1 = __importDefault(require("../utils/app.error"));
const connect_redis_1 = __importDefault(require("../utils/connect.redis"));
const jwt_1 = require("../utils/jwt");
const email_1 = __importDefault(require("../utils/email"));
// import { date } from 'zod';
// import { log } from 'console';
const cookiesOptions = {
    httpOnly: true,
    sameSite: 'lax',
};
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
const registerUserHandler = async (req, res, next) => {
    try {
        const hashedPassword = await bcryptjs_1.default.hash(req.body.password, 12);
        const verifyCode = crypto_1.default.randomBytes(32).toString('hex');
        const verificationCode = crypto_1.default
            .createHash('sha256')
            .update(verifyCode)
            .digest('hex');
        if ((0, common_service_1.getStates)().includes(req.body.state) === false) {
            return next(new app_error_1.default(400, 'Invalid state, please enter a valid state'));
        }
        if ((0, common_service_1.getLGAs)(req.body.state).includes(req.body.local_govt) === false) {
            return next(new app_error_1.default(400, 'Invalid LGA, please enter a valid local government'));
        }
        const user = await (0, user_service_1.createUser)({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: req.body.address,
            phone: req.body.phone,
            avatar: req.body.avatar,
            gender: req.body.gender,
            state: req.body.state,
            local_govt: req.body.local_govt,
            marital_status: req.body.marital_status,
            email: req.body.email.toLowerCase(),
            password: hashedPassword,
            verificationCode
        });
        const baseUrl = process.env.BASE_URL;
        const emailVerificationRedirectUrl = `${baseUrl}/api/v1/auth/verifyemail/${verifyCode}`;
        // const phoneVerificationRedirectUrl = `${baseUrl}/api/auth/verifyphone/:otp`;
        // const redirectUrl = `${baseUrl}/api/auth/verifyemail/${verifyCode}`;
        try {
            // const genOtp = Math.floor(Math.random()*1000000).toString();
            // user.role === "farmer" ? 
            // await sendOtp (user.phone, genOtp) :
            await new email_1.default(user, emailVerificationRedirectUrl).sendVerificationCode();
            await (0, user_service_1.updateUser)({ id: user.id }, { verificationCode });
            res.status(201).json({
                status: 'success',
                message: 'An email with a verification code has been sent to your email',
                user
            });
        }
        catch (error) {
            await (0, user_service_1.updateUser)({ id: user.id }, { verificationCode: null });
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
                    message: 'Email or Phone number already exist, please check and try again',
                });
            }
        }
        next(err);
    }
};
exports.registerUserHandler = registerUserHandler;
const loginUserHandler = async (req, res, next) => {
    try {
        const { email, phone, password } = req.body;
        const user = await (0, user_service_1.findUniqueUser)({ email: email.toLowerCase() } || { phone: email.toLowerCase() }, { id: true, email: true, verified: true, phone: true, password: true });
        if (!user) {
            return next(new app_error_1.default(400, 'Invalid credentials, kindly check and try again'));
        }
        if (!user.verified) {
            return next(new app_error_1.default(401, 'You are not verified, please verify your email or phone number to login'));
        }
        if (!user || !(await bcryptjs_1.default.compare(password, user.password))) {
            return next(new app_error_1.default(400, 'Invalid email or password'));
        }
        const { access_token, refresh_token } = await (0, user_service_1.signTokens)(user);
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
exports.loginUserHandler = loginUserHandler;
const refreshAccessTokenHandler = async (req, res, next) => {
    try {
        const refresh_token = req.cookies.refresh_token;
        const message = 'Could not refresh access token';
        if (!refresh_token) {
            return next(new app_error_1.default(403, message));
        }
        const decoded = (0, jwt_1.verifyJwt)(refresh_token, 'ab1234');
        if (!decoded) {
            return next(new app_error_1.default(403, message));
        }
        const session = await connect_redis_1.default.get(decoded.sub);
        if (!session) {
            return next(new app_error_1.default(403, message));
        }
        const user = await (0, user_service_1.findUniqueUser)({ id: JSON.parse(session).id });
        if (!user) {
            return next(new app_error_1.default(403, message));
        }
        const access_token = (0, jwt_1.signJwt)({ sub: user.id }, 'ab1234', {
            expiresIn: `${config_1.default.get('accessTokenExpiresIn')}m`,
        });
        res.cookie('access_token', access_token, accessTokenCookieOptions);
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
        // console.log(err);
        next(err);
    }
};
exports.refreshAccessTokenHandler = refreshAccessTokenHandler;
function logout(res) {
    res.cookie('access_token', '', { maxAge: 1 });
    res.cookie('refresh_token', '', { maxAge: 1 });
    res.cookie('logged_in', '', { maxAge: 1 });
}
const logoutUserHandler = async (req, res, next) => {
    try {
        await connect_redis_1.default.del(res.locals.user.id);
        logout(res);
        res.status(200).json({
            status: 'success',
        });
    }
    catch (err) {
        next(err);
    }
};
exports.logoutUserHandler = logoutUserHandler;
const verifyEmailHandler = async (req, res, next) => {
    try {
        const verificationCode = crypto_1.default
            .createHash('sha256')
            .update(req.params.verificationCode)
            .digest('hex');
        const user = await (0, user_service_1.updateUser)({ verificationCode }, { verified: true, verificationCode: null }, { email: true });
        if (!user) {
            return next(new app_error_1.default(401, 'Could not verify email'));
        }
        return res.status(200).json({
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
const verifyOtpHandler = async (req, res, next) => {
    try {
        const phoneVerificationCode = Math.floor(Math.random() * 1000000).toString();
        const user = await (0, user_service_1.updateUser)({ phoneVerificationCode }, { verified: true, phoneVerificationCode: null }, { email: true });
        if (!user) {
            return next(new app_error_1.default(401, 'Could not verify phone number'));
        }
        return res.status(200).json({
            status: 'success',
            message: 'Phone numbrt verified successfully',
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
exports.verifyOtpHandler = verifyOtpHandler;
const forgotPasswordHandler = async (req, res, next) => {
    try {
        // const agent = await findUser({ email: req.body.email.toLowerCase() });
        const email = req.body.email.toLowerCase();
        const user = await (0, user_service_1.findUser1)({ email: email });
        console.log(user);
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
        await (0, user_service_1.updateUser)({ id: user.id }, {
            passwordResetToken,
            passwordResetAt: new Date(Date.now() + 10 * 60 * 1000),
        }, { email: true });
        try {
            const baseUrl = process.env.BASE_URL;
            const url = `${baseUrl}/api/auth/resetpassword/${resetToken}`;
            await new email_1.default(user, url).sendPasswordResetToken();
            return res.status(200).json({
                status: 'success',
                message,
            });
        }
        catch (err) {
            await (0, user_service_1.updateUser)({ id: user.id }, { passwordResetToken: null, passwordResetAt: null }, {});
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
        const user = await (0, user_service_1.findUser)({
            passwordResetToken,
            passwordResetAt: Date.now().toString(),
        });
        if (!user) {
            return res.status(403).json({
                status: 'fail',
                message: 'Invalid token or token has expired',
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(req.body.password, 12);
        await (0, user_service_1.updateUser)({
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
const getUsersHandler = async (req, res, next) => {
    try {
        const users = await (0, user_service_1.findAll)();
        res.status(200).status(200).json({
            status: 'Success',
            users
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getUsersHandler = getUsersHandler;
const usersPaginationHandler = async (req, res, next) => {
    try {
        const { pageNo } = req.params;
        const users = await (0, user_service_1.pagination)(pageNo * 10, 10);
        res.status(200).status(200).json({
            status: 'success',
            data: {
                users,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.usersPaginationHandler = usersPaginationHandler;
const getUserHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await (0, user_service_1.findById)({ id: id });
        if (!user) {
            return next(new app_error_1.default(401, 'User does not exist'));
        }
        return res.status(200).json({
            status: 'success',
            user
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getUserHandler = getUserHandler;
const getFarmerHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await (0, user_service_1.findById)({ id: id });
        if (!user) {
            return next(new app_error_1.default(401, 'User does not exist'));
        }
        return res.status(200).json({
            status: 'success',
            user
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getFarmerHandler = getFarmerHandler;
const updateUserHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findUser = await (0, user_service_1.findById)({ id: id });
        if (!findUser)
            return next(new app_error_1.default(401, 'User not found in database'));
        const body = (Object.keys(req.body));
        const data = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            address: req.body.address,
            gender: req.body.gender,
            marital_status: req.body.maritalStatus,
            phone: req.body.phone,
            avatar: req.body.avatar,
            state: req.body.state,
            local_govt: req.body.localGovt,
            password: req.body.password,
        };
        const dataKeys = Object.keys(data);
        if (dataKeys.includes(body.toString()) === false) {
            return next(new app_error_1.default(401, 'Wrong input value'));
        }
        const user = await (0, user_service_1.updateUser)({ id: id }, data);
        if (!user) {
            return next(new app_error_1.default(401, 'User does not exist'));
        }
        return res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateUserHandler = updateUserHandler;
const deleteUserHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const agent = await (0, user_service_1.findById)({ id: id });
        if (!agent)
            return next(new app_error_1.default(401, 'Agent not found in database'));
        const response = await (0, user_service_1.deleteUser)(id);
        return res.status(200).json({
            status: 'success',
            response
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteUserHandler = deleteUserHandler;
//# sourceMappingURL=auth.controller.js.map