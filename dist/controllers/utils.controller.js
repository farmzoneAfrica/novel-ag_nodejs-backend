"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWardsHandler = exports.getRoleHandler = exports.getRolesHandler = exports.getLocalGovtinStateHandler = exports.getLocalGovtHandler = exports.getLGAsHandler = exports.getStateHandler = exports.getStatesHandler = void 0;
const utils_service_1 = require("../services/utils.service");
const app_error_1 = __importDefault(require("../utils/app.error"));
const getStatesHandler = async (req, res, next) => {
    try {
        const states = await (0, utils_service_1.getStates)();
        return res.status(200).json({
            status: 'Success',
            states
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getStatesHandler = getStatesHandler;
const getStateHandler = async (req, res, next) => {
    try {
        const id = +req.params.id;
        const state = await (0, utils_service_1.getState)({ id: id });
        if (!state) {
            return next(new app_error_1.default(401, 'State does not exist'));
        }
        return res.status(200).json({
            status: 'Success',
            state
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getStateHandler = getStateHandler;
const getLGAsHandler = async (req, res, next) => {
    try {
        const LGAs = await (0, utils_service_1.getLGAs)();
        return res.status(200).json({
            status: 'Success',
            LGAs
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getLGAsHandler = getLGAsHandler;
const getLocalGovtHandler = async (req, res, next) => {
    try {
        const id = +req.params.id;
        const lga = await (0, utils_service_1.getLGA)({ id: id });
        if (!lga) {
            return next(new app_error_1.default(401, 'Local Government does not exist'));
        }
        return res.status(200).json({
            status: 'Success',
            lga
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getLocalGovtHandler = getLocalGovtHandler;
const getLocalGovtinStateHandler = async (req, res, next) => {
    try {
        const id = +req.params.id;
        console.log(id);
        const lgas = await (0, utils_service_1.getLocalGovtByStateId)(id);
        if (!lgas) {
            return next(new app_error_1.default(401, 'Local Government does not exist'));
        }
        return res.status(200).json({
            status: 'Success',
            lgas
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getLocalGovtinStateHandler = getLocalGovtinStateHandler;
const getRolesHandler = async (req, res, next) => {
    try {
        const states = await (0, utils_service_1.getRoles)();
        return res.status(200).json({
            status: 'Success',
            states
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getRolesHandler = getRolesHandler;
const getRoleHandler = async (req, res, next) => {
    try {
        const id = +req.params.id;
        const lga = await (0, utils_service_1.getRole)({ id: id });
        if (!lga) {
            return next(new app_error_1.default(401, 'Local Government does not exist'));
        }
        return res.status(200).json({
            status: 'Success',
            lga
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getRoleHandler = getRoleHandler;
const getWardsHandler = async (req, res, next) => {
    try {
        const states = await (0, utils_service_1.getWards)();
        return res.status(200).json({
            status: 'Success',
            states
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getWardsHandler = getWardsHandler;
//# sourceMappingURL=utils.controller.js.map