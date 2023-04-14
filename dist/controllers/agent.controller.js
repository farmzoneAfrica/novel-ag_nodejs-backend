"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgentHandler = exports.getAgentsHandler = exports.getMeHandler = void 0;
const agent_service_1 = require("../services/agent.service");
const appError_1 = __importDefault(require("../utils/appError"));
const prismaClient_1 = __importDefault(require("../utils/prismaClient"));
const getMeHandler = async (req, res, next) => {
    try {
        const agent = res.locals.agent;
        res.status(200).status(200).json({
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
exports.getMeHandler = getMeHandler;
// get all agents 
const getAgentsHandler = async (req, res, next) => {
    try {
        const agents = await (0, agent_service_1.findAll)();
        res.status(200).status(200).json({
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
exports.getAgentsHandler = getAgentsHandler;
// get single agent
const getAgentHandler = async (req, res, next) => {
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
exports.getAgentHandler = getAgentHandler;
//# sourceMappingURL=agent.controller.js.map