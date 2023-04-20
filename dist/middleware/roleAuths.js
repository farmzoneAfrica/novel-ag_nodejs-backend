"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = exports.auth = void 0;
const lodash_1 = require("lodash");
const agent_service_1 = require("../services/agent.service");
const appError_1 = __importDefault(require("../utils/appError"));
const connectRedis_1 = __importDefault(require("../utils/connectRedis"));
const jwt_1 = require("../utils/jwt");
const auth = async (req, res, next) => {
    try {
        let access_token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            access_token = req.headers.authorization.split(' ')[1];
        }
        else if (req.cookies.access_token) {
            access_token = req.cookies.access_token;
        }
        if (!access_token) {
            return next(new appError_1.default(401, 'You are not logged in'));
        }
        const decoded = (0, jwt_1.verifyJwt)(access_token, 'ab1234');
        if (!decoded) {
            return next(new appError_1.default(401, `Invalid token or user doesn't exist`));
        }
        const session = await connectRedis_1.default.get(decoded.sub);
        if (!session) {
            return next(new appError_1.default(401, `Invalid token or session has expired`));
        }
        const user = await (0, agent_service_1.findUniqueAgent)({ id: JSON.parse(session).id });
        if (!user) {
            return next(new appError_1.default(401, `Invalid token or session has expired`));
        }
        res.locals.user = (0, lodash_1.omit)(user, agent_service_1.excludedFields);
        req.user = decoded;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.auth = auth;
const adminAuth = async (req, res, next) => {
    try {
        let access_token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            access_token = req.headers.authorization.split(' ')[1];
        }
        else if (req.cookies.access_token) {
            access_token = req.cookies.access_token;
        }
        if (!access_token) {
            return next(new appError_1.default(401, 'You are not logged in'));
        }
        const decoded = (0, jwt_1.verifyJwt)(access_token, 'ab1234');
        if (!decoded) {
            return next(new appError_1.default(401, `Invalid token or user doesn't exist`));
        }
        const session = await connectRedis_1.default.get(decoded.sub);
        if (!session) {
            return next(new appError_1.default(401, `Invalid token or session has expired`));
        }
        const user = await (0, agent_service_1.findUniqueAgent)({ id: JSON.parse(session).id });
        console.log(user);
        if (user.role !== "ADMIN")
            return next(new appError_1.default(401, "Fobbitten route, you are not an admin"));
        if (!user) {
            return next(new appError_1.default(401, `Invalid token or session has expired`));
        }
        res.locals.user = (0, lodash_1.omit)(user, agent_service_1.excludedFields);
        req.user = decoded;
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.adminAuth = adminAuth;
//# sourceMappingURL=roleAuths.js.map