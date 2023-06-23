"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFarmer = exports.farmerPagination = exports.findAllFarmers = exports.excludedFields = void 0;
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
// export async function getFarmersService (
//   user_role: string): Promise<User[]> {
//     return ( await prisma.user.findMany({
//           where: {
//             user_role: user_role,
//           },
//         }))
//       }
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
//# sourceMappingURL=farmer.service.js.map