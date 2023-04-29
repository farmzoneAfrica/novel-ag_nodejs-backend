"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWarehouse = exports.updateWarehouse = exports.findUniqueWarehouse = exports.findById = exports.getUniqueWarehouse = exports.getWarehouses = exports.createWarehouse = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createWarehouse = async (input) => {
    return (await prisma.warehouse.create({
        data: input,
    }));
};
exports.createWarehouse = createWarehouse;
const getWarehouses = async () => {
    return await prisma.warehouse.findMany();
};
exports.getWarehouses = getWarehouses;
const getUniqueWarehouse = async (where, select) => {
    return (await prisma.warehouse.findFirst({
        where,
        select,
    }));
};
exports.getUniqueWarehouse = getUniqueWarehouse;
const findById = async (where) => {
    return await prisma.warehouse.findUnique({
        where
    });
};
exports.findById = findById;
const findUniqueWarehouse = async (where, select) => {
    return (await prisma.warehouse.findUnique({
        where,
        select,
    }));
};
exports.findUniqueWarehouse = findUniqueWarehouse;
const updateWarehouse = async (where, data, select) => {
    return (await prisma.warehouse.update({ where, data, select }));
};
exports.updateWarehouse = updateWarehouse;
const deleteWarehouse = async (id) => {
    return await prisma.warehouse.delete({ where: { id } });
};
exports.deleteWarehouse = deleteWarehouse;
//# sourceMappingURL=warehouse.service.js.map