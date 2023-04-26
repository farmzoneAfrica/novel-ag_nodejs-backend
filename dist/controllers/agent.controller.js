"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAgentHandler = exports.updateAgentHandler = exports.getAgentHandler = exports.getAgentsByPageHandler = exports.getAgentsHandler = void 0;
const agent_service_1 = require("../services/agent.service");
const appError_1 = __importDefault(require("../utils/appError"));
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
// get all agents by page
const getAgentsByPageHandler = async (req, res, next) => {
    try {
        const { pageNo } = req.params;
        const agents = await (0, agent_service_1.pagination)(pageNo * 10, 10);
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
exports.getAgentsByPageHandler = getAgentsByPageHandler;
// get single agent
const getAgentHandler = async (req, res, next) => {
    try {
        console.log(82);
        const { id } = req.params;
        console.log(id);
        const agent = await (0, agent_service_1.findById)({ id: id });
        if (!agent) {
            return next(new appError_1.default(401, 'Agent does not exist'));
        }
        return res.status(200).json({
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
// update agent
const updateAgentHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findAgent = await (0, agent_service_1.findById)({ id: id });
        console.log(findAgent);
        if (!findAgent)
            return next(new appError_1.default(401, 'Agent not found in database'));
        const body = (Object.keys(req.body));
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            address: req.body.address,
            phone: req.body.phone,
            avatar: req.body.avatar,
            password: req.body.password,
        };
        const keys = Object.keys(data);
        if (keys.includes(body.toString()) === false) {
            return next(new appError_1.default(401, 'Wrong input value'));
        }
        const agent = await (0, agent_service_1.updateAgent)({ id: id }, data);
        if (!agent) {
            return next(new appError_1.default(401, 'Agent does not exist'));
        }
        return res.status(200).json({
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
exports.updateAgentHandler = updateAgentHandler;
// delete agent
const deleteAgentHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const findAgent = await (0, agent_service_1.findById)({ id: id });
        console.log(findAgent);
        if (!findAgent)
            return next(new appError_1.default(401, 'Agent not found in database'));
        const agent = await (0, agent_service_1.deleteAgent)(id);
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
exports.deleteAgentHandler = deleteAgentHandler;
//# sourceMappingURL=agent.controller.js.map