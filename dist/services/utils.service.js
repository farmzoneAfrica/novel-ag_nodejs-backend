"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRole = exports.getRoles = exports.getWard = exports.getWards = exports.getLocalGovtByStateId = exports.getLGA = exports.getLGAs = exports.getState = exports.getStates = void 0;
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const getStates = async () => {
    return await prismaClient_1.default.state.findMany();
};
exports.getStates = getStates;
const getState = async (where, select) => {
    return (await prismaClient_1.default.state.findFirst({
        where,
        select,
    }));
};
exports.getState = getState;
const getLGAs = async () => {
    return await (prismaClient_1.default.localGovt.findMany());
};
exports.getLGAs = getLGAs;
const getLGA = async (where, select) => {
    return (await prismaClient_1.default.localGovt.findFirst({
        where,
        select,
    }));
};
exports.getLGA = getLGA;
async function getLocalGovtByStateId(state_id) {
    return (await prismaClient_1.default.localGovt.findMany({
        where: {
            state_id: state_id,
        },
    }));
}
exports.getLocalGovtByStateId = getLocalGovtByStateId;
const getWards = async () => {
    return await prismaClient_1.default.ward.findMany();
};
exports.getWards = getWards;
const getWard = async (where, select) => {
    return (await prismaClient_1.default.ward.findFirst({
        where,
        select,
    }));
};
exports.getWard = getWard;
const getRoles = async () => {
    return await prismaClient_1.default.role.findMany();
};
exports.getRoles = getRoles;
const getRole = async (where, select) => {
    return (await prismaClient_1.default.role.findFirst({
        where,
        select,
    }));
};
exports.getRole = getRole;
//# sourceMappingURL=utils.service.js.map