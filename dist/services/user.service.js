"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.deleteUser = exports.signTokens = exports.updateUser = exports.findUniqueUser = exports.findById = exports.findUser1 = exports.findUser = exports.pagination = exports.getUsersByRole1 = exports.findAll = exports.createUser = exports.excludedFields = void 0;
const client_1 = require("@prisma/client");
const lodash_1 = require("lodash");
const config_1 = __importDefault(require("config"));
const connect_redis_1 = __importDefault(require("../utils/connect.redis"));
const jwt_1 = require("../utils/jwt");
exports.excludedFields = [
    "password",
    "verified",
    "verification_code",
    "password_reset_at",
    "password_reset_token",
];
const prisma = new client_1.PrismaClient();
const createUser = async (input) => {
    return (await prisma.user.create({
        data: input,
    }));
};
exports.createUser = createUser;
const findAll = async () => {
    return await prisma.user.findMany();
};
exports.findAll = findAll;
// export const findUserByUserTypeService = async () => {
//   return await prisma.user.findMany();
// }
const getUsersByRole1 = async (role) => {
    return (await prisma.user.findMany({
        where: {
            role: role,
        }
    }));
};
exports.getUsersByRole1 = getUsersByRole1;
const pagination = async (skip, take) => {
    return await prisma.user.findMany({
        skip,
        take
    });
};
exports.pagination = pagination;
const findUser = async (where) => {
    return (await prisma.user.findUnique({
        where
    }));
};
exports.findUser = findUser;
const findUser1 = async (where) => {
    return (await prisma.user.findUnique({
        where
    }));
};
exports.findUser1 = findUser1;
const findById = async (where) => {
    return (await prisma.user.findUnique({
        where,
        include: {
            prosperityHub: true,
            warhouse: true,
            farm: true
        }
    }));
};
exports.findById = findById;
const findUniqueUser = async (where, select) => {
    return (await prisma.user.findUnique({
        where,
        select,
    }));
};
exports.findUniqueUser = findUniqueUser;
const updateUser = async (where, data, select) => {
    return (await prisma.user.update({ where, data, select }));
};
exports.updateUser = updateUser;
const signTokens = async (user) => {
    connect_redis_1.default.set(`${user.id}`, JSON.stringify((0, lodash_1.omit)(user, exports.excludedFields)), {
        EX: config_1.default.get('redisCacheExpiresIn') * 60,
    });
    const access_token = (0, jwt_1.signJwt)({ sub: user.id }, 'ab1234', {
        expiresIn: `30s`,
    });
    const refresh_token = (0, jwt_1.signJwt)({ sub: user.id }, 'ab1234', {
        expiresIn: `30s`,
    });
    return { access_token, refresh_token };
};
exports.signTokens = signTokens;
const deleteUser = async (id) => {
    return await prisma.user.delete({ where: { id } });
};
exports.deleteUser = deleteUser;
class UserService {
    async getUsersByRole(role) {
        return prisma.user.findMany({
            where: {
                role: role,
            },
        });
    }
}
exports.UserService = UserService;
// export default UserService;
//# sourceMappingURL=user.service.js.map