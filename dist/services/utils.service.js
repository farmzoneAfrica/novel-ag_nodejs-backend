"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWards = exports.getLGA = exports.getLGAs = exports.getState = exports.getStates = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const getStates = async () => {
    return await prismaClient_1.default.state.findMany();
};
exports.getStates = getStates;
const getState = async (where) => {
    return await prismaClient_1.default.state.findMany();
};
exports.getState = getState;
const getLGAs = async () => {
    return await (prismaClient_1.default.localGovt.findMany());
};
exports.getLGAs = getLGAs;
const getLGA = async (where) => {
    return (await prismaClient_1.default.localGovt.findMany({
        where
    }));
};
exports.getLGA = getLGA;
// const localGovernments = await prisma.local_governments.findMany({
//   where: {
//     state_id: "7"
//   }
// });
const getWards = async () => {
    return await prismaClient_1.default.ward.findMany();
};
exports.getWards = getWards;
//# sourceMappingURL=utils.service.js.map