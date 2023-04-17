"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProsperityHubHandler = exports.updateProsperityHubHandler = exports.viewProsperityHubHandler = exports.viewProsperityHubsHandler = exports.createProsperityHubHandler = void 0;
const prosperityHub_service_1 = require("../services/prosperityHub.service");
const appError_1 = __importDefault(require("../utils/appError"));
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const createProsperityHubHandler = async (req, res, next) => {
    try {
        const agentId = req.user.sub;
        const prosperityHub = await (0, prosperityHub_service_1.createProsperityHub)({
            name: req.body.name,
            address: req.body.address,
            remarks: req.body.remarks,
            agentId: agentId
        });
        console.log(prosperityHub);
        return res.status(201).json({
            status: "success",
            prosperityHub
        });
    }
    catch (err) {
        console.log(37, err);
        next(err);
    }
};
exports.createProsperityHubHandler = createProsperityHubHandler;
const viewProsperityHubsHandler = async (req, res, next) => {
    try {
        const agents = await (0, prosperityHub_service_1.getAllProsperityHubs)();
        res.status(200).status(200).json({
            hello: "hello viewProsperityHubsHandler",
            status: 'success',
            data: {
                agents,
            },
        });
    }
    catch (err) {
        next(err);
    }
};
exports.viewProsperityHubsHandler = viewProsperityHubsHandler;
// get single agent
const viewProsperityHubHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log(id);
        const agent = await prismaClient_1.default.agent.findUnique({
            where: { id },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                avatar: true,
                prosperityHub: true,
                warhouse: true
            }
        });
        if (!agent) {
            return next(new appError_1.default(401, 'Agent does not exist'));
        }
        return res.status(200).status(200).json({
            hello: "hello viewProsperityHubHandler",
            status: 'success',
            data: {
                agent,
            },
        });
    }
    catch (err) {
        console.log(76, err);
        next(err);
    }
};
exports.viewProsperityHubHandler = viewProsperityHubHandler;
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