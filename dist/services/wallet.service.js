"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWallet = exports.updateWallet = exports.findUniqueWarehouse = exports.findById = exports.getUniqueWallet = exports.getWallets = exports.createWallet = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createWallet = async (input) => {
    return (await prisma.wallet.create({
        data: input,
    }));
};
exports.createWallet = createWallet;
const getWallets = async () => {
    return await prisma.wallet.findMany();
};
exports.getWallets = getWallets;
const getUniqueWallet = async (where, select) => {
    return (await prisma.wallet.findFirst({
        where,
        select,
    }));
};
exports.getUniqueWallet = getUniqueWallet;
const findById = async (where) => {
    return await prisma.wallet.findUnique({
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
const updateWallet = async (where, data, select) => {
    return (await prisma.wallet.update({ where, data, select }));
};
exports.updateWallet = updateWallet;
const deleteWallet = async (id) => {
    return await prisma.wallet.delete({ where: { id } });
};
exports.deleteWallet = deleteWallet;
//# sourceMappingURL=wallet.service.js.map