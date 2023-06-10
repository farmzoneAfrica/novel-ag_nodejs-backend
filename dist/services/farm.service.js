"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFarm = exports.updateFarm = exports.findUniqueFarm = exports.findById = exports.getUniqueFarm = exports.getFarms = exports.createFarm = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createFarm = async (input) => {
    return (await prisma.farm.create({
        data: input,
    }));
};
exports.createFarm = createFarm;
const getFarms = async () => {
    return await prisma.farm.findMany();
};
exports.getFarms = getFarms;
const getUniqueFarm = async (where, select) => {
    return (await prisma.farm.findFirst({
        where,
        select,
    }));
};
exports.getUniqueFarm = getUniqueFarm;
const findById = async (where) => {
    return await prisma.farm.findUnique({
        where
    });
};
exports.findById = findById;
const findUniqueFarm = async (where, select) => {
    return (await prisma.farm.findUnique({
        where,
        select,
    }));
};
exports.findUniqueFarm = findUniqueFarm;
const updateFarm = async (where, data, select) => {
    return (await prisma.farm.update({ where, data, select }));
};
exports.updateFarm = updateFarm;
const deleteFarm = async (id) => {
    return await prisma.farm.delete({ where: { id } });
};
exports.deleteFarm = deleteFarm;
//# sourceMappingURL=farm.service.js.map