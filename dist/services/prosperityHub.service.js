"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProsperityHub = exports.updateProsperityHub = exports.findById = exports.findProsperityHub = exports.getAllProsperityHubs = exports.createProsperityHub = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createProsperityHub = async (input) => {
    return (await prisma.prosperityHub.create({
        data: input,
    }));
};
exports.createProsperityHub = createProsperityHub;
const getAllProsperityHubs = async () => {
    return await prisma.prosperityHub.findMany();
};
exports.getAllProsperityHubs = getAllProsperityHubs;
const findProsperityHub = async (where, select) => {
    return (await prisma.prosperityHub.findFirst({
        where,
        select,
    }));
};
exports.findProsperityHub = findProsperityHub;
const findById = async (where) => {
    return await prisma.prosperityHub.findUnique({
        where
    });
};
exports.findById = findById;
const updateProsperityHub = async (where, data, select) => {
    return (await prisma.prosperityHub.update({ where, data, select }));
};
exports.updateProsperityHub = updateProsperityHub;
const deleteProsperityHub = async (where, select) => {
    return (await prisma.prosperityHub.findUnique({
        where,
        select,
    }));
};
exports.deleteProsperityHub = deleteProsperityHub;
//# sourceMappingURL=prosperityHub.service.js.map