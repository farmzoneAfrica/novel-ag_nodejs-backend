"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRole = exports.updateRole = exports.getUniqueRole = exports.getRoles = exports.assignRole = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const assignRole = async (input) => {
    return (await prisma.role.create({
        data: input,
    }));
};
exports.assignRole = assignRole;
const getRoles = async () => {
    return await prisma.role.findMany();
};
exports.getRoles = getRoles;
const getUniqueRole = async (where, select) => {
    return (await prisma.role.findFirst({
        where,
        select,
    }));
};
exports.getUniqueRole = getUniqueRole;
const updateRole = async (where, data, select) => {
    return (await prisma.role.update({ where, data, select }));
};
exports.updateRole = updateRole;
const deleteRole = async (id) => {
    return await prisma.role.delete({ where: { id } });
};
exports.deleteRole = deleteRole;
//# sourceMappingURL=role.service.js.map