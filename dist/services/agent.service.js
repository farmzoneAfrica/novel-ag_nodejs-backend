"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signTokens = exports.updateAgent = exports.findUniqueAgent = exports.findAgent = exports.findAll = exports.createAgent = exports.excludedFields = void 0;
const client_1 = require("@prisma/client");
const lodash_1 = require("lodash");
const config_1 = __importDefault(require("config"));
const connectRedis_1 = __importDefault(require("../utils/connectRedis"));
const jwt_1 = require("../utils/jwt");
exports.excludedFields = [
    "password",
    "verified",
    "verificationCode",
    "passwordResetAt",
    "passwordResetToken",
];
const prisma = new client_1.PrismaClient();
const createAgent = async (input) => {
    return (await prisma.agent.create({
        data: input,
    }));
};
exports.createAgent = createAgent;
// export const createAgent = async () => {
//   console.log(12,"register service")
//   return 
// };
const findAll = async () => {
    return await prisma.agent.findMany();
};
exports.findAll = findAll;
const findAgent = async (
// change the type from any to match the desire type
where, select) => {
    return (await prisma.agent.findFirst({
        where,
        select,
    }));
};
exports.findAgent = findAgent;
const findUniqueAgent = async (where, select) => {
    return (await prisma.agent.findUnique({
        where,
        select,
    }));
};
exports.findUniqueAgent = findUniqueAgent;
const updateAgent = async (where, data, select) => {
    return (await prisma.agent.update({ where, data, select }));
};
exports.updateAgent = updateAgent;
const signTokens = async (agent) => {
    // 1. Create Session
    connectRedis_1.default.set(`${agent.id}`, JSON.stringify((0, lodash_1.omit)(agent, exports.excludedFields)), {
        EX: config_1.default.get('redisCacheExpiresIn') * 60,
    });
    console.log(64, "sign in token function");
    // 2. Create Access and Refresh tokens
    const access_token = (0, jwt_1.signJwt)({ sub: agent.id }, 'accessTokenPrivateKey', {
        // expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`,
        expiresIn: `30s`,
    });
    const refresh_token = (0, jwt_1.signJwt)({ sub: agent.id }, 'refreshTokenPrivateKey', {
        // expiresIn: `${config.get<number>('refreshTokenExpiresIn')}m`,
        expiresIn: `30s`,
    });
    console.log(74, "sign in token function");
    return { access_token, refresh_token };
};
exports.signTokens = signTokens;
//# sourceMappingURL=agent.service.js.map