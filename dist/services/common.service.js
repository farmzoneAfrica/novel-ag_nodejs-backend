"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLGAs_ = exports.getStates_ = exports.getWards = exports.getLGAs = exports.getStates__ = exports.getStates = void 0;
const statesAndLga_json_1 = __importDefault(require("../utils/statesAndLga.json"));
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const getStates = async () => {
    return await prismaClient_1.default.state.findMany();
};
exports.getStates = getStates;
function getStates__() {
    return prismaClient_1.default.state.findMany();
}
exports.getStates__ = getStates__;
function getLGAs(state) {
    const stateData = statesAndLga_json_1.default.find((s) => s.state === state);
    if (stateData) {
        return stateData.lgas;
    }
    else {
        return "State not found";
    }
}
exports.getLGAs = getLGAs;
function getWards(state) {
    const stateData = statesAndLga_json_1.default.find((s) => s.state === state);
    if (stateData) {
        return stateData.lgas;
    }
    else {
        return "State not found";
    }
}
exports.getWards = getWards;
function getStates_() {
    return statesAndLga_json_1.default.map((state) => state.state);
}
exports.getStates_ = getStates_;
function getLGAs_(state) {
    const stateData = statesAndLga_json_1.default.find((s) => s.state === state);
    if (stateData) {
        return stateData.lgas;
    }
    else {
        return "State not found";
    }
}
exports.getLGAs_ = getLGAs_;
//# sourceMappingURL=common.service.js.map