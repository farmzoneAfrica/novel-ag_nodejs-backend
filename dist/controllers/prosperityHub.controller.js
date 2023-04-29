"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProsperityHubHandler = exports.updateProsperityHubHandler = exports.getProsperityHubHandler = exports.getProsperityHubsHandler = exports.createProsperityHubHandler = void 0;
const prosperityHub_service_1 = require("../services/prosperityHub.service");
const common_service_1 = require("../services/common.service");
const appError_1 = __importDefault(require("../utils/appError"));
const client_1 = require("@prisma/client");
const createProsperityHubHandler = async (req, res, next) => {
    try {
        const agentId = req.user.sub;
        const prosperityHub = await (0, prosperityHub_service_1.createProsperityHub)({
            name: req.body.name,
            address: req.body.address,
            state: req.body.state,
            localGovt: req.body.localGovt,
            remarks: req.body.remarks,
            agentId: agentId
        });
        console.log(prosperityHub);
        const inputState = prosperityHub.state;
        const inputLGA = prosperityHub.localGovt;
        const states = await (0, common_service_1.getStates)();
        const LGAs = await (0, common_service_1.getLGAs)(inputState);
        console.log("inputState", inputState, "inputLGA", inputLGA, "states", states, "LGAs", LGAs);
        if (states.includes(inputState) === false) {
            return next(new appError_1.default(400, 'Invalid state, please enter a valid state'));
        }
        if (LGAs.includes(inputLGA) === false) {
            return next(new appError_1.default(400, 'Invalid LGA, please enter a valid local government'));
        }
        console.log(prosperityHub);
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
            return next(new appError_1.default(401, 'Agent does not exist'));
        }
        return res.status(200).json({
            status: 'success',
            prosperityHub
        });
    }
    catch (err) {
        console.log(76, err);
        next(err);
    }
};
exports.getProsperityHubHandler = getProsperityHubHandler;
const updateProsperityHubHandler = async (req, res, next) => {
    try {
        const agent = res.locals.agent;
        res.status(200).status(200).json({
            hello: "hello updateProsperityHubHandler",
            status: 'success',
            data: {
                agent,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateProsperityHubHandler = updateProsperityHubHandler;
const deleteProsperityHubHandler = async (req, res, next) => {
    try {
        const agent = res.locals.agent;
        res.status(200).status(200).json({
            hello: "hello deleteProsperityHubHandler",
            status: 'success',
            data: {
                agent,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteProsperityHubHandler = deleteProsperityHubHandler;
//# sourceMappingURL=prosperityHub.controller.js.map