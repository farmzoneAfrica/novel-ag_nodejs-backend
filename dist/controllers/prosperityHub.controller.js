"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProsperityHubHandler = exports.updateProsperityHubHandler = exports.getProsperityHubHandler = exports.getProsperityHubsHandler = exports.createProsperityHubHandler = void 0;
const prosperityHub_service_1 = require("../services/prosperityHub.service");
const common_service_1 = require("../services/common.service");
const app_error_1 = __importDefault(require("../utils/app.error"));
const client_1 = require("@prisma/client");
// import agentRouter from '../routes/agent.routes';
// import { userInfo } from 'os';
const createProsperityHubHandler = async (req, res, next) => {
    try {
        const prosperityHub = await (0, prosperityHub_service_1.createProsperityHub)({
            name: req.body.name,
            location: req.body.location,
            closest_landmark: req.body.closest_landmark,
            state: req.body.state,
            local_govt: req.body.local_govt,
            ward: req.body.ward,
            status: req.body.status
        });
        console.log(prosperityHub);
        const inputState = prosperityHub.state;
        const inputLGA = prosperityHub.local_govt;
        const states = await (0, common_service_1.getStates)();
        const LGAs = await (0, common_service_1.getLGAs)(inputState);
        if (states.includes(inputState) === false) {
            return next(new app_error_1.default(400, 'Invalid state, please enter a valid state'));
        }
        if (LGAs.includes(inputLGA) === false) {
            return next(new app_error_1.default(400, 'Invalid LGA, please enter a valid local government'));
        }
        return res.status(201).json({
            status: "success",
            prosperityHub
        });
    }
    catch (err) {
        if (err instanceof client_1.Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2002') {
                return res.status(409).json({
                    status: 'fail',
                    message: 'Prosperity Hub with a similar name already exist, please use another name',
                });
            }
        }
        next(err);
    }
};
exports.createProsperityHubHandler = createProsperityHubHandler;
const getProsperityHubsHandler = async (req, res, next) => {
    try {
        const prosperityHubs = await (0, prosperityHub_service_1.getAllProsperityHubs)();
        res.status(200).status(200).json({
            status: 'success',
            prosperityHubs
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getProsperityHubsHandler = getProsperityHubsHandler;
const getProsperityHubHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prosperityHub = await (0, prosperityHub_service_1.findById)({ id: id });
        if (!prosperityHub) {
            return next(new app_error_1.default(401, 'Prosperity hub does not exist'));
        }
        return res.status(200).json({
            status: 'success',
            prosperityHub
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getProsperityHubHandler = getProsperityHubHandler;
const updateProsperityHubHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = {
            name: req.body.name,
            location: req.body.location,
            closest_landmark: req.body.closest_landmark,
            state: req.body.state,
            local_govt: req.body.local_govt,
            ward: req.body.ward,
            status: req.body.status,
        };
        const prosperityHub = await (0, prosperityHub_service_1.updateProsperityHub)({ id: id }, data);
        if (!prosperityHub)
            return next(new app_error_1.default(401, 'Prosperity Hub does not exist'));
        return res.status(200).json({
            status: 'Success',
            prosperityHub,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateProsperityHubHandler = updateProsperityHubHandler;
const deleteProsperityHubHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prosperityHub = await (0, prosperityHub_service_1.findById)({ id: id });
        if (!prosperityHub)
            return next(new app_error_1.default(401, 'Prosperity Hub not found in database'));
        const response = await (0, prosperityHub_service_1.deleteProsperityHub)(id);
        return res.status(200).json({
            status: 'success',
            response
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteProsperityHubHandler = deleteProsperityHubHandler;
//# sourceMappingURL=prosperityHub.controller.js.map