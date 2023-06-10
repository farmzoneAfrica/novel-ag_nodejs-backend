"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFarm = exports.updateUser = exports.findUniqueFarmer = exports.findFarmerById = exports.findUser1 = exports.findFarmer = exports.farmerPagination = exports.findAllFarmers = exports.excludedFields = void 0;
const client_1 = require("@prisma/client");
exports.excludedFields = [
    "password",
    "verified",
    "verificationCode",
    "passwordResetAt",
    "passwordResetToken",
];
const prisma = new client_1.PrismaClient();
// adjust logic to bring out farmers only
const findAllFarmers = async () => {
    return await prisma.user.findMany();
};
exports.findAllFarmers = findAllFarmers;
const farmerPagination = async (skip, take) => {
    return await prisma.user.findMany({
        skip,
        take
    });
};
exports.farmerPagination = farmerPagination;
const findFarmer = async (where) => {
    return (await prisma.user.findUnique({
        where
    }));
};
exports.findFarmer = findFarmer;
const findUser1 = async (where) => {
    return (await prisma.user.findUnique({
        where
    }));
};
exports.findUser1 = findUser1;
const findFarmerById = async (where) => {
    return (await prisma.user.findUnique({
        where,
        include: {
            prosperityHub: true,
            warhouse: true
        }
    }));
};
exports.findFarmerById = findFarmerById;
const findUniqueFarmer = async (where, select) => {
    return (await prisma.user.findUnique({
        where,
        select,
    }));
};
exports.findUniqueFarmer = findUniqueFarmer;
const updateUser = async (where, data, select) => {
    return (await prisma.user.update({ where, data, select }));
};
exports.updateUser = updateUser;
const deleteFarm = async (id) => {
    return await prisma.user.delete({ where: { id } });
};
exports.deleteFarm = deleteFarm;
//# sourceMappingURL=farmer.service.js.map