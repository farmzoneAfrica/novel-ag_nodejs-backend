"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLGAs = exports.getStates = void 0;
const statesAndLga_json_1 = __importDefault(require("../utils/statesAndLga.json"));
function getStates() {
    return statesAndLga_json_1.default.map((state) => state.state);
}
exports.getStates = getStates;
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
//# sourceMappingURL=common.service.js.map