"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePermission = exports.updateRole = exports.assignPermission = exports.assignRole = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const assignRole = async (input) => {
    return (await prisma.role.create({
        data: input,
    }));
};
exports.assignRole = assignRole;
const assignPermission = async (input) => {
    return (await prisma.permission.create({
        data: input,
    }));
};
exports.assignPermission = assignPermission;
const updateRole = async (where, data, select) => {
    return (await prisma.role.update({ where, data, select }));
};
exports.updateRole = updateRole;
const updatePermission = async (where, data, select) => {
    return (await prisma.permission.update({ where, data, select }));
};
exports.updatePermission = updatePermission;
//# sourceMappingURL=role.permision.service.js.map