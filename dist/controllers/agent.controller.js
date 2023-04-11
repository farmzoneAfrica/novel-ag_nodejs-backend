"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAgentsHandler = exports.getMeHandler = void 0;
const agent_service_1 = require("../services/agent.service");
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
        // const agent = res.locals.agent;
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
//# sourceMappingURL=agent.controller.js.map